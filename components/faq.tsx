"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
const questions = [
  [
    "¿Cuánto dura la carrera?",
    "La formación tiene una duración de 8 semestres. El diploma académico es a nivel Licenciatura.",
  ],
  [
    "¿Necesito saber programar para empezar?",
    "Puedes acercarte a la informática desde la curiosidad y las ganas de aprender. La formación integra ciencias básicas, informática y sistemas. Consulta con la carrera los requisitos académicos de ingreso vigentes.",
  ],
  [
    "¿Qué pasa después de enviar mi solicitud?",
    "Recibirás en esta página un código QR para ingresar al grupo de WhatsApp. Permanece en el grupo y espera los siguientes pasos y requisitos. El envío del formulario no sustituye los procedimientos oficiales de admisión o matrícula.",
  ],
  [
    "¿Cuáles son las modalidades de titulación?",
    "Las modalidades proporcionadas por la carrera son: tesis, proyecto de grado, vía diplomado, por excelencia y trabajo dirigido. Consulta las condiciones y la normativa vigente.",
  ],
  [
    "¿Dónde puedo recibir orientación?",
    "Puedes escribir a informatica@uatf.edu.bo, llamar al +591 2 6227312 o visitar la carrera en la Av. del Maestro s/n, edificio central, Potosí.",
  ],
];
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {questions.map(([q, a], i) => (
        <div className={`faq-item ${active === i ? "active" : ""}`} key={q}>
          <h3>
            <button
              aria-expanded={active === i}
              aria-controls={`answer-${i}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              {q}
              {active === i ? <Minus size={19} /> : <Plus size={19} />}
            </button>
          </h3>
          <div id={`answer-${i}`} hidden={active !== i}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
