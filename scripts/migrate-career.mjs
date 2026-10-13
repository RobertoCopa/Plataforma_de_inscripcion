import { createClient } from "@libsql/client";
import { readFile } from "node:fs/promises";

const url = process.env.TURSO_DATABASE_URL;
if (!url || (!url.startsWith("file:") && !process.env.TURSO_AUTH_TOKEN)) {
  throw new Error("Configura TURSO_DATABASE_URL y TURSO_AUTH_TOKEN en .env.local.");
}

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
try {
  const columns = await client.execute("PRAGMA table_info(registrations)");
  if (columns.rows.length === 0) {
    throw new Error("No existe la tabla registrations. Ejecuta npm run db:setup primero.");
  }
  if (columns.rows.some((column) => column.name === "career")) {
    console.log("La columna career ya existe; no se hicieron cambios.");
  } else {
    const migration = await readFile(
      new URL("../database/migrations/2026-10-13-add-career.sql", import.meta.url),
      "utf8",
    );
    await client.execute(migration);
    console.log("Migración aplicada. Las solicitudes existentes se conservaron.");
  }
} finally {
  client.close();
}
