import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID, createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import { POST } from "../app/api/inscripciones/route";
import { getDatabase } from "../lib/db";
import { allowRequest } from "../lib/registration-store";

test("la API valida, guarda, confirma reintentos y responde a fallos sin exponer datos", async () => {
  const keys = [
    "NODE_ENV",
    "TURSO_DATABASE_URL",
    "TURSO_AUTH_TOKEN",
    "RATE_LIMIT_SECRET",
    "SITE_URL",
    "VERCEL",
  ];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  for (const key of keys) delete process.env[key];
  Object.assign(process.env, { NODE_ENV: "test", RATE_LIMIT_SECRET: "test-only-secret" });
  const data = {
    firstName: "Prueba",
    lastName: "Sistema",
    ci: "99887766",
    birthDate: "2005-01-01",
    gender: "Otro",
    phone: "+59171234567",
    email: "test@example.com",
    consent: true,
  };
  const payload = { data, requestId: randomUUID() };
  const request = (body: unknown = payload, headers: Record<string, string> = {}) =>
    new Request("http://0.0.0.0:3000/api/inscripciones", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        host: "localhost:3000",
        origin: "http://localhost:3000",
        ...headers,
      },
      body: JSON.stringify(body),
    });
  let client: ReturnType<typeof getDatabase> | undefined;
  try {
    assert.equal((await POST(request({}, { origin: "https://example.com" }))).status, 403);
    assert.equal((await POST(request({}, { "content-type": "text/plain" }))).status, 415);
    assert.equal((await POST(request({}, { "content-length": "10000" }))).status, 413);
    assert.equal((await POST(request({}))).status, 400);
    assert.equal((await POST(request({ ...payload, website: "spam.example" }))).status, 400);
    assert.equal(
      (await POST(request({ ...payload, data: { ...data, consent: false } }))).status,
      400,
    );
    const unavailable = await POST(request());
    assert.equal(unavailable.status, 503);
    assert.equal(unavailable.headers.get("cache-control"), "no-store");
    assert.equal((await unavailable.json()).reference, undefined);

    process.env.TURSO_DATABASE_URL = "file::memory:";
    client = getDatabase();
    await client.executeMultiple(
      await readFile(new URL("../database/schema.sql", import.meta.url), "utf8"),
    );
    const response = await POST(request());
    assert.equal(response.status, 201);
    const confirmation = await response.json();
    assert.match(confirmation.reference, /^INF-[A-F0-9]{16}$/);
    assert.equal(Object.keys(confirmation).length, 2);
    assert.equal((await POST(request())).status, 201);
    assert.equal(
      (await client.execute("SELECT COUNT(*) AS count FROM registrations")).rows[0].count,
      1,
    );
    const duplicate = await POST(request({ ...payload, requestId: randomUUID() }));
    assert.equal(duplicate.status, 409);
    assert.equal((await duplicate.text()).includes(data.ci), false);

    const key = createHmac("sha256", "test-only-secret").update("local").digest("hex");
    for (let i = 0; i < 7; i++) await allowRequest(client, key);
    const limited = await POST(request());
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get("retry-after"), "3600");
  } finally {
    client?.close();
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
