import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { createClient } from "@libsql/client";
import { registrationSchema, currentBoliviaDate } from "../lib/validation";
import { allowRequest, RegistrationConflict, storeRegistration } from "../lib/registration-store";
import { allowedOrigins } from "../lib/request-origin";

const sample = {
  firstName: " María José ",
  lastName: "Mamani-Pérez",
  ci: "1234567-1a",
  birthDate: "2005-02-15",
  gender: "Femenino",
  phone: "+591 7123 4567",
  email: " MARIA@EXAMPLE.COM ",
  consent: true,
};

test("verifica el origen en desarrollo, dominios de Vercel y dominio configurado", () => {
  const request = new Request("http://0.0.0.0:3000/api/inscripciones", {
    headers: { host: "localhost:3000" },
  });
  assert.ok(allowedOrigins(request).has("http://localhost:3000"));
  assert.equal(allowedOrigins(request).has("https://example.com"), false);
  const production = new Request("http://internal/api/inscripciones", {
    headers: { host: "informatica.vercel.app" },
  });
  assert.ok(allowedOrigins(production, undefined, true).has("https://informatica.vercel.app"));
  assert.ok(
    allowedOrigins(production, "https://informatica.example.edu", true).has(
      "https://informatica.example.edu",
    ),
  );
});

test("normaliza datos y conserva nombres con acentos", () => {
  const parsed = registrationSchema.parse(sample);
  assert.equal(parsed.firstName, "María José");
  assert.equal(parsed.ci, "1234567-1A");
  assert.equal(parsed.email, "maria@example.com");
  assert.equal(parsed.phone, "+59171234567");
});
test("rechaza fechas irreales o futuras, sin impedir personas de mayor edad", () => {
  for (const birthDate of ["2005-02-29", "2000-13-01", "2026-02-30", "2099-01-01", "1899-12-31"])
    assert.equal(registrationSchema.safeParse({ ...sample, birthDate }).success, false);
  for (const birthDate of ["2000-02-29", "1950-01-01", currentBoliviaDate()])
    assert.equal(registrationSchema.safeParse({ ...sample, birthDate }).success, true);
});
test("exige consentimiento y valida contacto, género y documento", () => {
  for (const patch of [
    { consent: false },
    { phone: "123" },
    { email: "sin-correo" },
    { gender: "" },
    { ci: "';DROP TABLE registrations;--" },
    { firstName: "<script>" },
  ])
    assert.equal(registrationSchema.safeParse({ ...sample, ...patch }).success, false);
});
test("guarda todos los campos, evita duplicados y hace idempotentes los reintentos", async () => {
  const client = createClient({ url: "file::memory:" });
  try {
    await client.executeMultiple(
      await readFile(new URL("../database/schema.sql", import.meta.url), "utf8"),
    );
    const data = registrationSchema.parse(sample);
    const id = randomUUID();
    const first = await storeRegistration(client, data, id);
    const retry = await storeRegistration(client, data, id);
    assert.deepEqual(first, retry);
    assert.match(first.reference, /^INF-[A-F0-9]{16}$/);
    await assert.rejects(storeRegistration(client, data, randomUUID()), RegistrationConflict);
    const result = await client.execute("SELECT * FROM registrations");
    assert.equal(result.rows.length, 1);
    assert.equal(result.rows[0].first_name, "María José");
    assert.equal(result.rows[0].gender, "Femenino");
    assert.equal(result.rows[0].status, "pendiente");
    assert.ok(result.rows[0].consent_at);
    await assert.rejects(
      storeRegistration(client, { ...data, ci: "7654321" }, id),
      RegistrationConflict,
    );
  } finally {
    client.close();
  }
});
test("el límite persistente admite 10 envíos, se reinicia y elimina claves antiguas", async () => {
  const client = createClient({ url: "file::memory:" });
  try {
    await client.executeMultiple(
      await readFile(new URL("../database/schema.sql", import.meta.url), "utf8"),
    );
    const now = 3_600_000 * 100;
    for (let i = 0; i < 10; i++)
      assert.equal(await allowRequest(client, "hash-anonimo", now), true);
    assert.equal(await allowRequest(client, "hash-anonimo", now), false);
    assert.equal(await allowRequest(client, "hash-anonimo", now + 3_600_000), true);
    await allowRequest(client, "nueva-clave", now + 93_600_000);
    const result = await client.execute("SELECT * FROM request_limits");
    assert.equal(result.rows.length, 1);
  } finally {
    client.close();
  }
});
test("la restricción de CI impide solicitudes simultáneas duplicadas", async () => {
  const client = createClient({ url: "file::memory:" });
  try {
    await client.executeMultiple(
      await readFile(new URL("../database/schema.sql", import.meta.url), "utf8"),
    );
    const results = await Promise.allSettled([
      storeRegistration(client, registrationSchema.parse(sample), randomUUID()),
      storeRegistration(client, registrationSchema.parse(sample), randomUUID()),
    ]);
    assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
    assert.equal(results.filter((r) => r.status === "rejected").length, 1);
    assert.equal(
      (await client.execute("SELECT COUNT(*) AS count FROM registrations")).rows[0].count,
      1,
    );
  } finally {
    client.close();
  }
});
