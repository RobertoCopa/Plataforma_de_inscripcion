CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY NOT NULL,
  reference TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  ci TEXT NOT NULL UNIQUE,
  birth_date TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Femenino', 'Masculino', 'Otro', 'Prefiero no decirlo')),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  consent_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  privacy_version TEXT NOT NULL DEFAULT '2026-10-03',
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'contactado', 'completado', 'cancelado')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS registrations_created_at ON registrations(created_at);
CREATE TABLE IF NOT EXISTS request_limits (
  key TEXT PRIMARY KEY NOT NULL,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 1
);
