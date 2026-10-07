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
        <p>
          Este aviso describe el uso de los datos que envías mediante el formulario.
        </p>
        <h2>Qué datos se solicitan</h2>
        <p>
          Nombre(s), apellido(s), cédula de identidad, fecha de nacimiento, género, número de
          celular y correo electrónico.
        </p>
        <h2>Para qué se utilizan</h2>
        <p>
          Los datos se recogen para gestionar tu solicitud y permitir
          la comunicación sobre el proceso de inscripción. No implica una autorización para recibir publicidad ajena al proceso.
        </p>
        <h2>Almacenamiento y acceso</h2>
        <p>
          Las solicitudes se almacenan en la base de datos configurada para este sitio. El acceso a los registros se
          realiza mediante credenciales confidenciales y se limita al personal autorizado que
          gestione las solicitudes. El formulario no publica tu información ni ofrece una consulta
          pública de registros.
        </p>
        {/*
        <h2>Protección del formulario</h2>
        <p>
          Para limitar envíos repetidos se mantiene temporalmente una clave derivada de la dirección
          de conexión, sin almacenar esa dirección en la tabla de solicitudes. Estas claves se
          eliminan cuando tienen más de 24 horas, durante la siguiente actividad del formulario. Los
          proveedores de alojamiento pueden gestionar registros técnicos propios.
        </p>
        */}
        <h2>Consultas e información</h2>
        <p>
          Comunícate
          con la carrera en <a href="mailto:informatica@uatf.edu.bo">informatica@uatf.edu.bo</a> o
          al <a href="tel:+59126227312">+591 2 6227312</a>. La unidad académica deberá atender las solicitudes según sus procedimientos.
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
