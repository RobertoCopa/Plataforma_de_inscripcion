import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  Check,
  Code2,
  Database,
  Network,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  FolderCode,
  FileText,
  Phone,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Carreras Técnico Universitarias Superiores",
  description:
    "Desarrollo de Sistemas Informáticos, Administrador de Base de Datos y Redes y Ciberseguridad en la UATF. Formación de 6 semestres con admisión directa.",
};

const programs = [
  {
    id: "desarrollo-sistemas",
    number: "01",
    icon: Code2,
    theme: "software",
    title: "Desarrollo de Sistemas Informáticos",
    short: "Desarrollo",
    intro:
      "De una necesidad a una solución que funciona. Desarrolla habilidades para construir, probar y mantener aplicaciones y sistemas informáticos.",
    focus: [
      "Programación y desarrollo de aplicaciones",
      "Diseño de interfaces y experiencia de usuario",
      "Pruebas y mantenimiento de sistemas",
      "Integración de datos y servicios",
    ],
    outlook:
      "Aporta en equipos de desarrollo, áreas de sistemas y proyectos de digitalización de organizaciones públicas y privadas.",
    purpose: "Construye soluciones",
  },
  {
    id: "base-de-datos",
    number: "02",
    icon: Database,
    theme: "data",
    title: "Administrador de Base de Datos",
    short: "Datos",
    intro:
      "La información bien organizada hace la diferencia. Aprende a gestionar bases de datos y a cuidar su disponibilidad, integridad y rendimiento.",
    focus: [
      "Diseño y organización de bases de datos",
      "Consultas y gestión de la información",
      "Respaldo y recuperación de datos",
      "Control de acceso y optimización",
    ],
    outlook:
      "Apoya la gestión de información en empresas, instituciones y servicios que necesitan datos confiables para sus operaciones.",
    purpose: "Da estructura a la información",
  },
  {
    id: "redes-ciberseguridad",
    number: "03",
    icon: Network,
    theme: "networks",
    title: "Redes y Ciberseguridad",
    short: "Redes",
    intro:
      "Un mundo conectado necesita infraestructura confiable. Desarrolla habilidades para configurar redes, mantener servicios y proteger entornos digitales.",
    focus: [
      "Instalación y administración de redes",
      "Configuración de equipos y servicios",
      "Seguridad de sistemas e infraestructura",
      "Detección de riesgos y respuesta a incidentes",
    ],
    outlook:
      "Colabora en soporte de infraestructura, operación de redes y protección de servicios informáticos en organizaciones de distintos sectores.",
    purpose: "Conecta y protege",
  },
];

export default function TechnicalPage() {
  return (
    <>
      <Header technical />
      <main id="contenido" className="technical-main">
        <div className="container technical-back">
          <Link href="/#oferta-academica" className="back-link">
            <ArrowLeft size={16} />
            Volver a la oferta académica
          </Link>
        </div>
        <section className="container technical-hero">
          <div>
            <span className="pill">
              <span className="tiny-mark" />
              TÉCNICO UNIVERSITARIO SUPERIOR
            </span>
            <h1>
              Tu talento,
              <br />
              <span>en acción.</span>
            </h1>
            <p className="technical-lead">
              Aprende a crear sistemas, gestionar datos o proteger redes. Tres carreras con enfoque
              aplicado para construir tu camino en la tecnología.
            </p>
            <div className="hero-actions">
              <a href="#programas" className="button button-yellow">
                Encuentra tu carrera <ArrowUpRight size={19} />
              </a>
              <a href="#admision" className="text-link blue-link">
                Empieza tu futuro <ChevronDown size={17} />
              </a>
            </div>
            <p className="technical-institution">
              Facultad de Ciencias Puras · Universidad Autónoma Tomás Frías
            </p>
          </div>
          <div className="technical-board" aria-hidden="true">
            <div className="technical-board-heading">
              <span>IDEAS QUE SE PONEN EN PRÁCTICA</span>
              <span className="technical-board-dot" />
            </div>
            {programs.map(({ number, icon: Icon, purpose }) => (
              <div className="technical-board-row" key={number}>
                <span className="technical-board-icon">
                  <Icon size={27} />
                </span>
                <div>
                  <small>RUTA {number}</small>
                  <strong>{purpose}</strong>
                </div>
                <TrendingUp size={20} />
              </div>
            ))}
            <div className="technical-board-foot">
              <span>Formación aplicada</span>
              <span>UATF / POTOSÍ</span>
            </div>
          </div>
        </section>
        <section
          className="container technical-facts"
          aria-label="Datos de las carreras Técnico Universitarias Superiores"
        >
          <div>
            <BookOpen size={24} />
            <p>
              <strong>6 semestres</strong>
              <span>Para construir tu camino</span>
            </p>
          </div>
          <div>
            <GraduationCap size={25} />
            <p>
              <strong>Técnico Universitario Superior</strong>
              <span>Nivel de titulación</span>
            </p>
          </div>
          <div>
            <ClipboardCheck size={24} />
            <p>
              <strong>Admisión directa</strong>
              <span>Tu punto de partida</span>
            </p>
          </div>
        </section>
        <section
          className="section container technical-programs"
          id="programas"
          aria-labelledby="technical-programs-title"
        >
          <div className="section-top">
            <div className="section-heading">
              <span className="eyebrow">ELIGE LO QUE QUIERES HACER</span>
              <h2 id="technical-programs-title">
                Tres carreras.
                <br />
                <span>Tu propia dirección.</span>
              </h2>
            </div>
            <p>
              Una formación técnica universitaria para
              <br className="desktop-break" /> desarrollar habilidades y aplicarlas.
            </p>
          </div>
          <nav className="technical-program-nav" aria-label="Explorar las carreras técnicas">
            {programs.map(({ id, icon: Icon, short }) => (
              <a key={id} href={`#${id}`}>
                <Icon size={17} />
                {short}
              </a>
            ))}
          </nav>
          <div className="technical-program-list">
            {programs.map(
              ({ id, number, icon: Icon, title, intro, focus, outlook, theme, purpose }) => (
                <article
                  key={id}
                  id={id}
                  className={`technical-program neu-card technical-${theme}`}
                >
                  <div className="technical-program-art" aria-hidden="true">
                    <span>{number}:</span>
                    <div className="technical-art-icon">
                      <Icon size={66} strokeWidth={1.3} />
                    </div>
                    <strong>{purpose}</strong>
                  </div>
                  <div className="technical-program-copy">
                    <span className="eyebrow">TEC. UNIV. SUP.</span>
                    <h3>{title}</h3>
                    <p>{intro}</p>
                    <div className="technical-program-detail">
                      <div>
                        <h4>Áreas de enfoque</h4>
                        <ul>
                          {focus.map((item) => (
                            <li key={item}>
                              <Check size={15} aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Dónde puedes aportar</h4>
                        <p>{outlook}</p>
                      </div>
                    </div>
                    <a
                      className="text-link blue-link"
                      href="#admision"
                    >
                      Descubre como ingresar <ArrowUpRight size={17} />
                    </a>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
        <section
          className="container technical-admission neu-card"
          id="admision"
          aria-labelledby="technical-admission-title"
        >
          <div>
            <span className="eyebrow">DA EL SIGUIENTE PASO</span>
            <h2 id="technical-admission-title">
              Admisión directa.
              <br />
              <span>Empieza con una decisión.</span>
            </h2>
            <p>
              Las tres carreras cuentan con admisión directa. Contacta con la carrera para conocer
              las fechas, documentación y pasos de inscripción.
            </p>
          </div>
          <div className="technical-contact">
            <a href="/inscripcion" className="button button-blue">
              Envia tu solicitud
            </a>

            <span>Facultad de Ciencias Puras · UATF</span>
          </div>
        </section>
        <section
          className="section container technical-graduation"
          id="graduacion"
          aria-labelledby="technical-graduation-title"
        >
          <div className="section-heading">
            <span className="eyebrow">PARA CULMINAR TU FORMACIÓN</span>
            <h2 id="technical-graduation-title">
              Tu trabajo, convertido
              <br />
              <span>en un logro profesional.</span>
            </h2>
            <p>Modalidades de graduación para el nivel Técnico Universitario Superior.</p>
          </div>
          <div className="technical-graduation-grid">
            <article className="neu-card">
              <span className="icon-well">
                <FolderCode size={26} />
              </span>
              <h3>Proyecto de grado</h3>
              <p>
                Integra tus conocimientos en una propuesta aplicada que aborde una necesidad del
                área de tu carrera.
              </p>
            </article>
            <article className="neu-card">
              <span className="icon-well yellow-well">
                <FileText size={26} />
              </span>
              <h3>Monografía</h3>
              <p>
                Profundiza en un tema de tu campo mediante un trabajo documentado, con análisis y
                una presentación organizada.
              </p>
            </article>
          </div>
          <Link href="/#carrera" className="text-link blue-link technical-return">
            Explora también la Licenciatura en Ingeniería Informática <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <Footer technical />
    </>
  );
}
