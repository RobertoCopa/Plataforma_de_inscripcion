import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GraduationCap, ShieldCheck, ClipboardCheck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EnrollmentForm } from "@/components/enrollment-form";

export const metadata: Metadata = {
  title: "Solicitud de inscripción",
  robots: { index: false, follow: true },
};
export default function EnrollmentPage() {
  return (
    <>
      <Header enrollment />
      <main id="contenido" className="enrollment-main container">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          Volver a la carrera
        </Link>
        <div className="enrollment-layout">
          <aside className="enrollment-aside">
            <span className="eyebrow">UN NUEVO COMIENZO</span>
            <h1>
              El primer paso
              <br />
              hacia <span>tu futuro.</span>
            </h1>
            <p>
              Registra tu solicitud para Ingeniería Informática. Completa tus datos y revísalos
              antes de enviarlos.
            </p>
            <div className="enrollment-benefits">
              <div>
                <span className="icon-well">
                  <GraduationCap size={23} />
                </span>
                <div>
                  <strong>Ingeniería Informática</strong>
                  <p>Facultad de Ciencias Puras · UATF</p>
                </div>
              </div>
              <div>
                <span className="icon-well">
                  <ClipboardCheck size={23} />
                </span>
                <div>
                  <strong>Simple, paso a paso</strong>
                  <p>Datos personales, contacto y confirmación.</p>
                </div>
              </div>
              <div>
                <span className="icon-well yellow-well">
                  <ShieldCheck size={23} />
                </span>
                <div>
                  <strong>Tus datos, con un propósito</strong>
                  <p>Gestionar tu solicitud y orientarte.</p>
                </div>
              </div>
            </div>
            <div className="enrollment-help">
              ¿Necesitas ayuda con tu solicitud?
              <a href="mailto:informatica@uatf.edu.bo">informatica@uatf.edu.bo</a>
              <a href="tel:+59126227312">+591 2 6227312</a>
            </div>
          </aside>
          <EnrollmentForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
