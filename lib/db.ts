import "server-only";
import { createClient, type Client } from "@libsql/client";

let client: Client | undefined;
export function getDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || (!url.startsWith("file:") && !authToken)) throw new Error("DATABASE_NOT_CONFIGURED");
  if (process.env.NODE_ENV === "production" && url.startsWith("file:"))
    throw new Error("REMOTE_DATABASE_REQUIRED");
  client ??= createClient({ url, authToken });
  return client;
}
