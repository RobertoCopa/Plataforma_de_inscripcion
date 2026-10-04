# Ingeniería Informática · UATF

Web en Next.js App Router, React y TypeScript, preparada para Vercel. Diseño neumórfico adaptable, tipografía Manrope alojada en el proyecto y colores azul y amarillo. Los escudos originales se conservan en `image/`; sus copias públicas están en `public/images/` y se actualizan allí cuando cambian.

## Ejecutar localmente

Requiere Node.js 22 o superior.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abre http://localhost:3000. La presentación funciona sin credenciales. Para guardar solicitudes, configura Turso e inicializa el esquema como se explica abajo. Sin conexión configurada, el formulario informa que el servicio no está disponible y no muestra una confirmación ficticia.

## Configurar Turso

1. Crea una base de datos en tu cuenta de Turso desde su panel o CLI. La guía oficial está en https://docs.turso.tech/sdk/ts/quickstart.
2. Copia la URL `libsql://…` de la base y genera un token de acceso con permisos de escritura.
3. Completa las variables del archivo `.env.local`:

```dotenv
TURSO_DATABASE_URL=libsql://tu-base-tu-organizacion.turso.io
TURSO_AUTH_TOKEN=tu-token-de-turso
SITE_URL=http://localhost:3000
RATE_LIMIT_SECRET=un-secreto-aleatorio-largo
```

Puedes generar el secreto con `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Si no defines `RATE_LIMIT_SECRET`, el servidor utiliza el token de Turso para derivar claves anónimas.

4. Prepara las tablas:

```powershell
npm run db:setup
```

El script lee `.env.local` y aplica `database/schema.sql` sin borrar solicitudes existentes. Solo necesitas ejecutarlo al preparar una base nueva. Las futuras modificaciones de esquema deberán hacerse mediante migraciones explícitas; `CREATE TABLE IF NOT EXISTS` no modifica tablas ya creadas.

5. Reinicia el servidor local tras cambiar las variables. Envía una solicitud y verifica el registro en el panel de Turso.

## Páginas y comportamiento

- `/`: presentación, misión, visión, áreas de formación, perfil profesional, campo laboral, modalidades de titulación y contacto.
- `/inscripcion`: datos personales, contacto, revisión y consentimiento. Confirmación con un código imprimible o guardable como PDF desde el navegador.
- `/privacidad`: aviso del propósito y tratamiento de la información.
- `POST /api/inscripciones`: validación en el servidor y persistencia. No existe una API pública para listar o buscar datos personales.

El formulario registra **solicitudes de inscripción**, no confirma admisión ni matrícula. No envía correos automáticos ni promete fechas o vacantes no proporcionadas. El contenido académico se adaptó de las siete imágenes facilitadas. Fecha de fundación proporcionada: 19 de julio de 1991. No se inventó una malla de asignaturas.

## Datos y protecciones

Los registros incluyen los siete campos solicitados, código, fecha, consentimiento, versión del aviso y estado inicial `pendiente`. El CI se normaliza y es único. Se aceptan complementos, nombres con acentos, teléfonos internacionales y la opción de no declarar género.

Las consultas usan parámetros. Los reintentos con el mismo identificador conservan una sola solicitud. El límite de 10 envíos por hora se guarda en la base, por lo que funciona entre instancias de Vercel. Las claves de conexión se derivan con HMAC; las antiguas se eliminan durante la actividad del formulario. Se verifica el origen del envío, se limita el tamaño del cuerpo y se incorpora un campo señuelo. No se registran datos personales ni credenciales en logs de la aplicación.

El límite complementa, pero no reemplaza, una protección contra bots. Para campañas de alto tráfico puede configurarse el firewall de Vercel o incorporar un desafío verificado en el servidor. En desarrollo, los envíos comparten una clave local; en Vercel se usa la dirección suministrada por su infraestructura.

Antes de abrir inscripciones, la unidad académica debe verificar la información de contacto, requisitos y modalidades vigentes, aprobar el aviso de privacidad, definir la conservación de datos y asignar personal autorizado para atender solicitudes. El acceso administrativo se realiza desde Turso; no se añadió un panel público sin autenticación.

## Comprobaciones

```powershell
npm test
npm run typecheck
npm run build
```

Las pruebas usan SQLite en memoria y cubren normalización, validación, consentimiento, persistencia, duplicados concurrentes, reintentos y límites. No requieren credenciales ni escriben en una base de producción.
