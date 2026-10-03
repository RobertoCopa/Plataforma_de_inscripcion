export function allowedOrigins(request: Request, siteUrl?: string, vercel = false) {
  const url = new URL(request.url);
  const origins = new Set([url.origin]);
  const host = request.headers.get("host");
  // Next.js puede usar 0.0.0.0 como URL interna al escuchar en todas las interfaces.
  // Host conserva el dominio que abrió el navegador; Vercel termina HTTPS.
  if (host) origins.add(`${vercel ? "https:" : url.protocol}//${host}`);
  if (siteUrl) origins.add(new URL(siteUrl).origin);
  return origins;
}
