"use client";

import { useEffect, useState } from "react";
import { FlaskConical, Lightbulb, Pause, Play, type LucideIcon } from "lucide-react";

type PurposeSlide = {
  id: "mission" | "vision";
  label: string;
  title: string;
  copy: string;
  Icon: LucideIcon;
};

const slides: PurposeSlide[] = [
  {
    id: "mission",
    label: "Misión",
    title: "Una misión con propósito",
    Icon: FlaskConical,
    copy: [
      "La Carrera de Ingeniería Informática como unidad académica dependiente de la Universidad Autónoma Tomás Frías, a través de un permanente perfeccionamiento de su currículo acorde al desarrollo científico-tecnológico,",
      "incorporando en éste los títulos de pregrado y postgrado además de la participación activa en procesos multidisciplinarios, la promoción de la interacción social de mutua cooperación interinstitucional y el desarrollo de cursos de extensión libre;",
      "tiene la misión de formar profesionales competentes e idóneos capaces de diseñar, desarrollar e implementar soluciones integrales en el área de la Informática Aplicada, con conciencia crítica, innovadora, científica y comportamiento ético, capaces de transformar la realidad, cumpliendo de esta manera el encargo social.",
    ].join(" "),
  },
  {
    id: "vision",
    label: "Visión",
    title: "Una visión de futuro",
    Icon: Lightbulb,
    copy: [
      "La Carrera de Ingeniería Informática, unidad académica certificada y acreditada, formadora de profesionales de excelencia con conciencia crítica, innovadora, científica y comportamiento ético, capaces de transformar la realidad regional y nacional;",
      "que mediante la práctica del co-gobierno en los procesos docente-educativo, de administración y gestión legalmente establecidos fortalece la autonomía universitaria;",
      "que evalúa, actualiza y perfecciona permanentemente su currículo, promueve la investigación científica para la ejecución de convenios interinstitucionales de mutua cooperación y ofrece alternativas competitivas de formación continua a nivel de pregrado y postgrado para una capacitación y actualización permanente, acorde a los requerimientos de la sociedad.",
    ].join(" "),
  },
];

export function MissionVisionCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 15_000);

    return () => window.clearInterval(interval);
  }, [activeIndex, isPaused]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      className={`purpose-card neu-card purpose-carousel purpose-card-${activeSlide.id}`}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Misión y visión de Ingeniería Informática"
    >
      <div className="purpose-slide-stack">
        {slides.map((slide, index) => {
          const Icon = slide.Icon;
          const isActive = index === activeIndex;

          return (
            <article
              key={slide.id}
              className={`purpose-slide ${isActive ? "is-active" : ""}`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${slides.length}: ${slide.label}`}
              aria-hidden={!isActive}
            >
              <span
                className={`icon-well purpose-icon-well ${slide.id === "vision" ? "yellow-well" : ""}`}
              >
                <Icon size={24} />
              </span>
              <h3>{slide.title}</h3>
              <p>{slide.copy}</p>
            </article>
          );
        })}
      </div>

      <div className="purpose-controls">
        <div className="purpose-tabs" role="group" aria-label="Elegir misión o visión">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className="purpose-tab"
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {slide.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
