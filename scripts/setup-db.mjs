import { createClient } from "@libsql/client";
import { readFile } from "node:fs/promises";

const url = process.env.TURSO_DATABASE_URL;
if (!url || (!url.startsWith("file:") && !process.env.TURSO_AUTH_TOKEN)) {
  throw new Error("Configura TURSO_DATABASE_URL y TURSO_AUTH_TOKEN en .env.local.");
}
const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
try {
  const sql = await readFile(new URL("../database/schema.sql", import.meta.url), "utf8");
  await client.executeMultiple(sql);
  console.log(
    "Base de datos preparada. El esquema es idempotente; los registros existentes se conservan.",
  );
} finally {
  client.close();
}
