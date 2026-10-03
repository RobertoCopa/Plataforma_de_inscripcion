import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { z } from "zod";
import { getDatabase } from "@/lib/db";
import { registrationSchema } from "@/lib/validation";
import { allowRequest, RegistrationConflict, storeRegistration } from "@/lib/registration-store";
import { allowedOrigins } from "@/lib/request-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const noCache = { "Cache-Control": "no-store" };
const reply = (body: object, status: number, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { ...noCache, ...headers } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  let allowed: Set<string>;
  try {
    allowed = allowedOrigins(request, process.env.SITE_URL, !!process.env.VERCEL);
  } catch {
    return reply({ error: "El servicio no está disponible. Contacta con la carrera." }, 503);
  }
  if (!origin || !allowed.has(origin))
    return reply({ error: "El envío debe realizarse desde el formulario de esta web." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "Formato de solicitud no válido." }, 415);
  if (Number(request.headers.get("content-length")) > 8192)
    return reply({ error: "La solicitud es demasiado grande." }, 413);
  let raw: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > 8192)
      return reply({ error: "La solicitud es demasiado grande." }, 413);
    raw = JSON.parse(body);
  } catch {
    return reply({ error: "No pudimos leer la solicitud. Inténtalo de nuevo." }, 400);
  }
  const payload = z
    .object({
      data: registrationSchema,
      requestId: z.uuid(),
      website: z.string().max(0).optional(),
    })
    .safeParse(raw);
  if (!payload.success)
    return reply(
      { error: "Revisa los datos del formulario.", fields: payload.error.flatten().fieldErrors },
      400,
    );
  try {
    const client = getDatabase();
    const secret = process.env.RATE_LIMIT_SECRET || process.env.TURSO_AUTH_TOKEN;
    if (!secret && process.env.NODE_ENV === "production")
      throw new Error("RATE_LIMIT_NOT_CONFIGURED");
    const ip =
      (process.env.VERCEL
        ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        : "local") || "unknown";
    const key = createHmac("sha256", secret || "local-development")
      .update(ip)
      .digest("hex");
    if (!(await allowRequest(client, key)))
      return reply(
        { error: "Se han enviado varias solicitudes. Espera una hora o contacta con la carrera." },
        429,
        { "Retry-After": "3600" },
      );
    const result = await storeRegistration(client, payload.data.data, payload.data.requestId);
    return reply(result, 201);
  } catch (error) {
    if (error instanceof RegistrationConflict)
      return reply(
        {
          error:
            "No pudimos crear otra solicitud con estos datos. Si ya te registraste, contacta con la carrera para recibir orientación.",
        },
        409,
      );
    // No registrar datos personales, cuerpos de solicitudes ni credenciales en los logs.
    console.error(
      "Registration service unavailable",
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "SERVICE_UNAVAILABLE",
    );
    return reply(
      {
        error:
          "La inscripción no está disponible en este momento. Tus datos no se han confirmado. Inténtalo más tarde o escribe a informatica@uatf.edu.bo.",
      },
      503,
    );
  }
}
