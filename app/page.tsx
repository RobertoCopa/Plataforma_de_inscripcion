import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  Braces,
  Cpu,
  Globe2,
  GraduationCap,
  Layers3,
  Network,
  FlaskConical,
  Lightbulb,
  ShieldCheck,
  Terminal,
  Check,
  MapPin,
  Sparkles,
  Monitor,
  BriefcaseBusiness,
  Building2,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQ } from "@/components/faq";

const areas = [
  {
    number: "01",
    icon: Code2,
    title: "Desarrollo de software",
    copy: "Convierte ideas en aplicaciones, plataformas web y sistemas que resuelven problemas reales.",
    tags: ["Programación", "Aplicaciones web"],
  },
  {
    number: "02",
    icon: Network,
    title: "Redes y sistemas",
    copy: "Diseña, administra y conecta la infraestructura que hace posible nuestro mundo digital.",
    tags: ["Conectividad", "Infraestructura"],
  },
  {
    number: "03",
    icon: Layers3,
    title: "Gestión de la información",
    copy: "Organiza datos, optimiza procesos y crea herramientas para tomar mejores decisiones.",
    tags: ["Datos", "Sistemas de información"],
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Innovación e investigación",
    copy: "Explora tecnologías emergentes y desarrolla soluciones con impacto en tu comunidad.",
    tags: ["Investigación", "Tecnología aplicada"],
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="hero container">
          <div className="hero-copy">
            <span className="pill">
              <span className="tiny-mark" />
              TU PRÓXIMO CAPÍTULO EMPIEZA AQUÍ
            </span>
            <h1>
              Imagina.
              <br />
              Programa.
              <br />
              <span>Transforma.</span>
            </h1>
            <p className="hero-description">
              Hay ideas que cambian el mundo.
              <br />
              Aprende a construirlas con <strong>Ingeniería Informática</strong> en la UATF.
            </p>
            <div className="hero-actions">
              <Link href="/inscripcion" className="button button-yellow">
                Quiero ser parte <ArrowUpRight size={19} />
              </Link>
              <a href="#carrera" className="text-link">
                Descubre la carrera <ChevronDown size={17} />
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={15} />
              <span>Potosí, Bolivia</span>
              <span className="separator" />
              Facultad de Ciencias Puras
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Una formación que conecta ideas, código y soluciones"
          >
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <div className="visual-label label-top">
              <span className="icon-well">
                <Braces size={23} />
              </span>
              <span>
                Ideas que se convierten
                <br />
                <strong>en posibilidades.</strong>
              </span>
            </div>
            <div className="code-scene">
              <div className="code-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>tu_futuro.ts</span>
                <Code2 size={17} />
              </div>
              <div className="code-body">
                <div>
                  <em>01</em>
                  <span>
                    <b>const</b> tuFuturo = {"{"}
                  </span>
                </div>
                <div>
                  <em>02</em>
                  <span>
                    &nbsp; pasión: <mark>"crear"</mark>,
                  </span>
                </div>
                <div>
                  <em>03</em>
                  <span>
                    &nbsp; límites: <b>null</b>,
                  </span>
                </div>
                <div>
                  <em>04</em>
                  <span>
                    &nbsp; posibilidades: <mark>"infinitas"</mark>
                  </span>
                </div>
                <div>
                  <em>05</em>
                  <span>{"}"};</span>
                </div>
                <div className="code-spacer" />
                <div>
                  <em>07</em>
                  <span>
                    <strong>construye</strong>(tuFuturo);
                    <span className="cursor" />
                  </span>
                </div>
              </div>
              <div className="code-status">
                <span>
                  <Terminal size={13} /> Un nuevo comienzo
                </span>
                <span>UTF-8</span>
              </div>
            </div>
            <div className="floating-tile tile-code">
              <Code2 size={38} strokeWidth={1.6} />
            </div>
            <div className="floating-tile tile-spark">
              <Sparkles size={31} strokeWidth={1.5} />
            </div>
            <div className="career-badge">
              <div className="career-badge-image">
                <Image
                  style={{ height: "auto" }}
                  src="/images/carrera.jpg"
                  width={79}
                  height={76}
                  alt="Escudo de Ingeniería Informática UATF"
                  priority
                />
              </div>
              <div>
                <span>INGENIERÍA INFORMÁTICA</span>
                <strong>Tu talento. Nuestro futuro.</strong>
                <small>UATF · Desde 1991</small>
              </div>
              <span className="badge-check">
                <Check size={17} />
              </span>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="facts-bar">
            <div>
              <span className="fact-icon">
                <GraduationCap size={24} />
              </span>
              <p>
                <strong>
                  8 <small>semestres</small>
                </strong>
                <span>Para construir tu camino</span>
              </p>
            </div>
            <div>
              <span className="fact-icon">
                <BookOpen size={24} />
              </span>
              <p>
                <strong>Licenciatura</strong>
                <span>Diploma académico</span>
              </p>
            </div>
            <div>
              <span className="fact-icon">
                <Cpu size={24} />
              </span>
              <p>
                <strong>Ingeniero Informático</strong>
                <span>Título de provisión nacional</span>
              </p>
            </div>
            <div>
              <span className="fact-icon">
                <Globe2 size={24} />
              </span>
              <p>
                <strong>Desde 1991</strong>
                <span>Formando nuevas generaciones</span>
              </p>
            </div>
          </div>
        </div>
        <section className="section container about-section" id="carrera">
          <div className="section-heading">
            <span className="eyebrow">MÁS QUE UNA CARRERA</span>
            <h2>
              La tecnología cambia.
              <br />
              <span>Tu capacidad de crear, también.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-intro">
              <p>
                El mundo necesita personas que no solo usen la tecnología, sino que la entiendan, la
                cuestionen y la reinventen.
              </p>
              <p>
                En Ingeniería Informática de la Universidad Autónoma Tomás Frías, te preparas para
                diseñar y desarrollar soluciones con criterio científico, creatividad y compromiso
                con la sociedad.
              </p>
              <a href="#formacion" className="text-link blue-link">
                Encuentra lo que te mueve <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="purpose-card neu-card">
              <span className="icon-well">
                <FlaskConical size={24} />
              </span>
              <h3>Una misión con propósito</h3>
              <p>
                Formar profesionales capaces de crear soluciones informáticas integrales, con
                pensamiento crítico, innovación y ética para transformar su entorno.
              </p>
            </div>
            <div className="purpose-card neu-card">
              <span className="icon-well yellow-well">
                <Lightbulb size={24} />
              </span>
              <h3>Una visión de futuro</h3>
              <p>
                Impulsar una formación de excelencia que evoluciona con la ciencia, promueve la
                investigación y conecta a la universidad con las necesidades de la sociedad.
              </p>
            </div>
          </div>
        </section>
        <section className="formation-section" id="formacion">
          <div className="container section">
            <div className="section-top">
              <div className="section-heading">
                <span className="eyebrow">LO QUE APRENDERÁS A CONSTRUIR</span>
                <h2>
                  Una base sólida.
                  <br />
                  <span>Muchas posibilidades.</span>
                </h2>
              </div>
              <p>
                De tu primera línea de código a soluciones
                <br className="desktop-break" /> que hacen la diferencia.
              </p>
            </div>
            <div className="areas-grid">
              {areas.map(({ number, icon: Icon, title, copy, tags }) => (
                <article className="area-card neu-card" key={number}>
                  <div className="area-top">
                    <span className="icon-well">
                      <Icon size={25} />
                    </span>
                    <span className="area-number">{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className="tags">
                    {tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="formation-note">
              <ShieldCheck size={20} />
              <span>
                Conocimiento técnico, pensamiento crítico y ética profesional. Tu formación va más
                allá del código.
              </span>
            </div>
          </div>
        </section>
        <section className="section container future-section" id="futuro">
          <div className="future-copy">
            <span className="eyebrow">TU TALENTO PUEDE LLEGAR LEJOS</span>
            <h2>
              Un mundo conectado.
              <br />
              <span>Un futuro abierto.</span>
            </h2>
            <p>
              Planifica proyectos, desarrolla sistemas, administra redes y lidera equipos. Lleva tus
              conocimientos a organizaciones que necesitan transformar sus ideas en soluciones.
            </p>
            <div className="professional-note">
              <span className="icon-well">
                <BriefcaseBusiness size={24} />
              </span>
              <div>
                <strong>Construye tu propio camino</strong>
                <p>
                  En equipos multidisciplinarios, en la investigación o como consultor
                  independiente.
                </p>
              </div>
            </div>
          </div>
          <div className="opportunities neu-card">
            <div className="opportunity">
              <span className="icon-well">
                <Monitor size={22} />
              </span>
              <div>
                <h3>Empresas de tecnología</h3>
                <p>Software, aplicaciones web y servicios informáticos.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <div className="opportunity">
              <span className="icon-well">
                <Building2 size={22} />
              </span>
              <div>
                <h3>Organizaciones y sector público</h3>
                <p>Instituciones productivas, financieras y de servicios.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <div className="opportunity">
              <span className="icon-well">
                <GraduationCap size={22} />
              </span>
              <div>
                <h3>Educación e investigación</h3>
                <p>Universidades, formación técnica e investigación científica.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <div className="opportunity">
              <span className="icon-well yellow-well">
                <Lightbulb size={22} />
              </span>
              <div>
                <h3>Consultoría independiente</h3>
                <p>Asesoría, gestión y evaluación de soluciones tecnológicas.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </section>
        <section className="container">
          <div className="join-banner">
            <div className="banner-icon">
              <Braces size={52} strokeWidth={1.4} />
            </div>
            <div>
              <span className="eyebrow">EL SIGUIENTE PASO ES TUYO</span>
              <h2>
                Tu futuro comienza
                <br /> con una decisión.
              </h2>
              <p>Trae tu curiosidad. Aquí empieza lo que puedes crear.</p>
            </div>
            <Link className="button button-yellow" href="/inscripcion">
              Comenzar mi inscripción <ArrowUpRight size={19} />
            </Link>
            <div className="banner-circle" />
          </div>
        </section>
        <section className="section container faq-section" id="preguntas">
          <div className="section-heading">
            <span className="eyebrow">ANTES DE DAR EL PASO</span>
            <h2>
              Resolvamos
              <br /> <span>tus dudas.</span>
            </h2>
            <p>
              Tu próximo capítulo,
              <br />
              con las cosas claras.
            </p>
            <a href="mailto:informatica@uatf.edu.bo" className="text-link blue-link">
              Habla con la carrera <ArrowUpRight size={17} />
            </a>
          </div>
          <FAQ />
        </section>
      </main>
      <Footer />
    </>
  );
}
