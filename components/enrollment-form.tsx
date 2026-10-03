"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Download,
  Info,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import {
  contactFields,
  currentBoliviaDate,
  genders,
  personalFields,
  registrationSchema,
  type FormFields,
} from "@/lib/validation";

type Confirmation = { reference: string; createdAt: string };
const empty: FormFields = {
  firstName: "",
  lastName: "",
  ci: "",
  birthDate: "",
  gender: "",
  phone: "",
  email: "",
  consent: false,
};
const labels: Record<keyof FormFields, string> = {
  firstName: "Nombre(s)",
  lastName: "Apellido(s)",
  ci: "Cédula de identidad",
  birthDate: "Fecha de nacimiento",
  gender: "Género",
  phone: "N.º de celular",
  email: "Correo electrónico",
  consent: "Consentimiento",
};

export function EnrollmentForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormFields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const requestId = useRef<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  function update(key: keyof FormFields, value: string | boolean) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setError("");
    requestId.current = null;
  }
  function go(next: number) {
    setStep(next);
    setError("");
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  function validate(keys: readonly (keyof FormFields)[], values: FormFields = data) {
    const parsed = registrationSchema.safeParse(values);
    const next: Partial<Record<keyof FormFields, string>> = {};
    if (!parsed.success)
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormFields;
        if (keys.includes(key) && !next[key]) next[key] = issue.message;
      }
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => document.getElementById(Object.keys(next)[0])?.focus());
      return false;
    }
    return true;
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    // Leer también el formulario nativo admite autofill y selectores de fecha
    // que no siempre emiten los mismos eventos que la escritura manual.
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const values = { ...data };
    for (const key of [...personalFields, ...contactFields]) {
      if (form.has(key)) values[key] = String(form.get(key));
    }
    if (step === 2) values.consent = form.has("consent");
    if (JSON.stringify(values) !== JSON.stringify(data)) requestId.current = null;
    setData(values);
    if (step < 2) {
      if (validate(step === 0 ? personalFields : contactFields, values)) go(step + 1);
      return;
    }
    if (!validate(Object.keys(values) as (keyof FormFields)[], values)) return;
    setBusy(true);
    setError("");
    requestId.current ??= crypto.randomUUID();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: values,
          requestId: requestId.current,
          website: honeypot.current?.value || "",
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "No pudimos enviar la solicitud. Inténtalo de nuevo.");
        return;
      }
      setConfirmation(result);
      setData(empty);
      requestAnimationFrame(() => heading.current?.focus());
    } catch {
      setError(
        "No recibimos una confirmación. Comprueba tu conexión y vuelve a enviar; el reintento evita crear otra solicitud.",
      );
    } finally {
      clearTimeout(timeout);
      setBusy(false);
    }
  }
  function field(
    key: keyof FormFields,
    type: string,
    placeholder?: string,
    extra?: { autoComplete?: string; hint?: string; maxLength?: number },
  ) {
    return (
      <div className={`field ${key === "email" ? "field-full" : ""}`}>
        <label htmlFor={key}>
          {labels[key]} <span aria-hidden="true">*</span>
        </label>
        <input
          id={key}
          name={key}
          type={type}
          value={String(data[key])}
          onChange={(e) => update(key, e.target.value)}
          placeholder={placeholder}
          autoComplete={extra?.autoComplete}
          maxLength={extra?.maxLength}
          min={type === "date" ? "1900-01-01" : undefined}
          max={type === "date" ? currentBoliviaDate() : undefined}
          required
          aria-invalid={!!errors[key]}
          aria-describedby={
            [extra?.hint ? `${key}-hint` : "", errors[key] ? `${key}-error` : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        {extra?.hint && <small id={`${key}-hint`}>{extra.hint}</small>}
        {errors[key] && (
          <span className="field-error" id={`${key}-error`}>
            {errors[key]}
          </span>
        )}
      </div>
    );
  }
  if (confirmation)
    return (
      <div className="form-card neu-card">
        <div className="success-card" role="status">
          <span className="success-icon">
            <CheckCheck size={39} />
          </span>
          <span className="eyebrow">YA DISTE EL PRIMER PASO</span>
          <h2 ref={heading} tabIndex={-1}>
            ¡Solicitud registrada!
          </h2>
          <p>
            Tu solicitud se guardó correctamente.
            <br />
            Conserva este código para consultar con la carrera.
          </p>
          <div className="confirmation-code">
            <small>CÓDIGO DE TU SOLICITUD</small>
            <strong>{confirmation.reference}</strong>
            <small>
              {new Intl.DateTimeFormat("es-BO", {
                dateStyle: "long",
                timeZone: "America/La_Paz",
              }).format(new Date(confirmation.createdAt))}
            </small>
          </div>
          <div className="form-notice">
            <Info size={18} />
            <span>
              El siguiente paso es consultar con la carrera los requisitos y procedimientos
              oficiales. Este registro no confirma tu admisión ni tu matrícula.
            </span>
          </div>
          <div className="confirmation-actions">
            <button className="button button-blue" type="button" onClick={() => window.print()}>
              <Download size={17} />
              Guardar comprobante
            </button>
            <Link className="button button-soft" href="/">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  return (
    <div className="form-card neu-card">
      <div className="stepper" aria-label={`Paso ${step + 1} de 3`}>
        {["Tus datos", "Contacto", "Revisión"].map((title, i) => (
          <div key={title} style={{ display: "contents" }}>
            <div
              className={`step-indicator ${step === i ? "current" : ""} ${step > i ? "completed" : ""}`}
              aria-current={step === i ? "step" : undefined}
            >
              <span>{step > i ? <Check size={14} /> : i + 1}</span>
              {title}
            </div>
            {i < 2 && <div className="step-line" />}
          </div>
        ))}
      </div>
      <form onSubmit={submit} noValidate>
        <div className="honey-field" aria-hidden="true">
          <label htmlFor="website">Sitio web</label>
          <input ref={honeypot} id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="form-title">
          <h2 ref={heading} tabIndex={-1}>
            {
              ["Empecemos por conocerte", "Sigamos en contacto", "Todo listo para dar el paso"][
                step
              ]
            }
          </h2>
          <p>
            {
              [
                "Escribe tus datos tal como aparecen en tu documento. Los campos con * son obligatorios.",
                "Usaremos estos datos para orientarte sobre tu solicitud. Los campos con * son obligatorios.",
                "Revisa tu información. Puedes volver atrás para corregir cualquier dato.",
              ][step]
            }
          </p>
        </div>
        {step === 0 && (
          <div className="form-grid">
            {field("firstName", "text", "Tus nombres", {
              autoComplete: "given-name",
              maxLength: 100,
            })}
            {field("lastName", "text", "Tus apellidos", {
              autoComplete: "family-name",
              maxLength: 100,
            })}
            {field("ci", "text", "Ej. 1234567-1A", {
              maxLength: 20,
              hint: "Incluye el complemento si corresponde.",
            })}
            {field("birthDate", "date", undefined, { autoComplete: "bday" })}
            <div className="field field-full">
              <label htmlFor="gender">
                Género <span aria-hidden="true">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={data.gender}
                onChange={(e) => update("gender", e.target.value)}
                required
                aria-invalid={!!errors.gender}
                aria-describedby={errors.gender ? "gender-error" : undefined}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {genders.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              {errors.gender && (
                <span id="gender-error" className="field-error">
                  {errors.gender}
                </span>
              )}
            </div>
          </div>
        )}
        {step === 1 && (
          <>
            <div className="form-grid">
              {field("phone", "tel", "Ej. +591 71234567", {
                autoComplete: "tel",
                maxLength: 25,
                hint: "Puedes incluir el código de país.",
              })}
              {field("email", "email", "tu.nombre@correo.com", {
                autoComplete: "email",
                maxLength: 254,
              })}
            </div>
            <div className="form-notice">
              <ShieldCheck size={18} />
              <span>
                Utiliza un celular y un correo a los que tengas acceso. Así la carrera podrá
                orientarte sobre los siguientes pasos.
              </span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <dl className="review-list">
              {[...personalFields, ...contactFields].map((key) => (
                <div key={key}>
                  <dt>{labels[key]}</dt>
                  <dd>
                    {key === "birthDate"
                      ? new Intl.DateTimeFormat("es-BO", {
                          dateStyle: "long",
                          timeZone: "UTC",
                        }).format(new Date(`${data.birthDate}T12:00:00Z`))
                      : String(data[key])}
                  </dd>
                </div>
              ))}
            </dl>
            <label className="consent" htmlFor="consent">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                required
              />
              <span>
                Autorizo el uso de mis datos para gestionar esta solicitud de inscripción y
                contactarme sobre el proceso. He leído el{" "}
                <Link href="/privacidad" target="_blank" rel="noopener">
                  aviso de privacidad (se abre en otra pestaña)
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <span id="consent-error" className="field-error">
                {errors.consent}
              </span>
            )}
            <div className="form-notice">
              <Info size={18} />
              <span>
                El envío es una solicitud de inscripción. La admisión y la matrícula están sujetas a
                los procedimientos oficiales de la UATF.
              </span>
            </div>
          </>
        )}
        {error && (
          <div className="submit-error" role="alert">
            {error}
          </div>
        )}
        <div className={`form-actions ${step === 0 ? "single" : ""}`}>
          {step > 0 && (
            <button
              className="button button-soft"
              type="button"
              onClick={() => go(step - 1)}
              disabled={busy}
            >
              <ArrowLeft size={16} />
              Anterior
            </button>
          )}
          <button className="button button-blue" type="submit" disabled={busy}>
            {busy ? (
              <>
                <LoaderCircle className="spinner" size={17} />
                Enviando…
              </>
            ) : step === 2 ? (
              <>
                Enviar mi solicitud <Check size={17} />
              </>
            ) : (
              <>
                Continuar <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
        <div className="form-secure">
          <LockKeyhole size={13} />
          Tus datos se envían para gestionar tu solicitud.
        </div>
      </form>
    </div>
  );
}
