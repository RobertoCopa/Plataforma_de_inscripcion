import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { title: "Aviso de privacidad" };
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="container privacy-main">
        <Link href="/inscripcion" className="back-link">
          <ArrowLeft size={16} />
          Volver a la inscripción
        </Link>
        <span className="eyebrow">TU INFORMACIÓN TIENE UN PROPÓSITO</span>
        <h1>Aviso de privacidad</h1>
        <p className="privacy-date">Versión del formulario: 3 de octubre de 2026.</p>
        <p>
          Este aviso describe el uso de los datos que envías mediante el formulario de solicitud de
          inscripción a Ingeniería Informática de la Facultad de Ciencias Puras de la Universidad
          Autónoma Tomás Frías.
        </p>
        <h2>Qué datos se solicitan</h2>
        <p>
          Nombre(s), apellido(s), cédula de identidad, fecha de nacimiento, género, número de
          celular y correo electrónico. También se registra la fecha de envío, un código de
          solicitud y la aceptación de este aviso.
        </p>
        <h2>Para qué se utilizan</h2>
        <p>
          Los datos se recogen para gestionar tu solicitud, evitar registros duplicados y permitir
          la comunicación sobre el proceso de inscripción. La aceptación corresponde a este
          propósito y no implica una autorización para recibir publicidad ajena al proceso.
        </p>
        <h2>Almacenamiento y acceso</h2>
        <p>
          Las solicitudes se almacenan en la base de datos configurada para este sitio, alojada en
          Turso. El sitio está preparado para funcionar en Vercel. El acceso a los registros se
          realiza mediante credenciales del servidor y debe limitarse al personal autorizado que
          gestione las solicitudes. El formulario no publica tu información ni ofrece una consulta
          pública de registros.
        </p>
        <h2>Protección del formulario</h2>
        <p>
          Para limitar envíos repetidos se mantiene temporalmente una clave derivada de la dirección
          de conexión, sin almacenar esa dirección en la tabla de solicitudes. Estas claves se
          eliminan cuando tienen más de 24 horas, durante la siguiente actividad del formulario. Los
          proveedores de alojamiento pueden gestionar registros técnicos propios.
        </p>
        <h2>Consultas, correcciones y conservación</h2>
        <p>
          Si necesitas consultar, corregir o solicitar la eliminación de tu información, comunícate
          con la carrera en <a href="mailto:informatica@uatf.edu.bo">informatica@uatf.edu.bo</a> o
          al <a href="tel:+59126227312">+591 2 6227312</a>. Conserva tu código de solicitud para
          facilitar la atención. La unidad académica deberá definir el período de conservación
          aplicable y atender las solicitudes según sus procedimientos.
        </p>
        <h2>Alcance de la solicitud</h2>
        <p>
          El registro de este formulario no sustituye la admisión, la presentación de documentos ni
          la matrícula oficial. Consulta los requisitos y las fechas vigentes directamente con la
          carrera.
        </p>
      </main>
      <Footer />
    </>
  );
}
