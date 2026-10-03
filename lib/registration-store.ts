import type { Client } from "@libsql/client";
import type { Registration } from "./validation";

export class RegistrationConflict extends Error {}

export async function allowRequest(client: Client, key: string, now = Date.now()) {
  const window = Math.floor(now / 3_600_000) * 3_600_000;
  await client.execute({
    sql: "DELETE FROM request_limits WHERE window_start < ?",
    args: [now - 86_400_000],
  });
  const result = await client.execute({
    sql: `INSERT INTO request_limits (key, window_start, attempts) VALUES (?, ?, 1)
      ON CONFLICT(key) DO UPDATE SET
        attempts = CASE WHEN request_limits.window_start = excluded.window_start THEN request_limits.attempts + 1 ELSE 1 END,
        window_start = excluded.window_start RETURNING attempts`,
    args: [key, window],
  });
  return Number(result.rows[0].attempts) <= 10;
}

export async function storeRegistration(client: Client, data: Registration, id: string) {
  const reference = `INF-${id.replaceAll("-", "").slice(0, 16).toUpperCase()}`;
  // La restricción UNIQUE de CI también protege frente a envíos concurrentes.
  try {
    await client.execute({
      sql: `INSERT INTO registrations
      (id, reference, first_name, last_name, ci, birth_date, gender, phone, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`,
      args: [
        id,
        reference,
        data.firstName,
        data.lastName,
        data.ci,
        data.birthDate,
        data.gender,
        data.phone,
        data.email,
      ],
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      String(error.code).startsWith("SQLITE_CONSTRAINT")
    )
      throw new RegistrationConflict();
    throw error;
  }
  const stored = await client.execute({
    sql: "SELECT reference, created_at, ci FROM registrations WHERE id = ?",
    args: [id],
  });
  const row = stored.rows[0];
  if (!row || row.ci !== data.ci) throw new RegistrationConflict();
  return { reference: String(row.reference), createdAt: String(row.created_at) };
}
