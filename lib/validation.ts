import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(2, "Escribe al menos 2 caracteres.")
  .max(100, "Usa hasta 100 caracteres.")
  .regex(/^[\p{L}\p{M} .'’\-]+$/u, "Usa letras, espacios, guiones o apóstrofos.");
export const genders = ["Femenino", "Masculino"] as const;
export function currentBoliviaDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/La_Paz",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export const registrationSchema = z.object({
  firstName: name,
  lastName: name,
  ci: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s/g, "").toUpperCase())
    .pipe(
      z
        .string()
        .regex(
          /^[0-9]{4,12}(?:-?[A-Z0-9]{1,5})?$/,
          "Escribe un CI válido, con complemento si corresponde.",
        ),
    ),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Selecciona una fecha válida.")
    .refine((v) => {
      const d = new Date(`${v}T12:00:00Z`);
      return (
        !isNaN(d.getTime()) &&
        d.toISOString().slice(0, 10) === v &&
        v >= "1900-01-01" &&
        v <= currentBoliviaDate()
      );
    }, "La fecha debe ser real, posterior a 1899 y no futura."),
  gender: z.enum(genders, { error: "Selecciona una opción." }),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()\-]/g, ""))
    .pipe(z.string().regex(/^\+?[0-9]{7,15}$/, "Escribe un celular de 7 a 15 dígitos.")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z.email("Escribe un correo electrónico válido.").max(254, "El correo es demasiado largo."),
    ),
  consent: z.literal(true, {
    error: "Debes aceptar el uso de tus datos para tramitar la solicitud.",
  }),
});
export type Registration = z.infer<typeof registrationSchema>;
export type FormFields = {
  firstName: string;
  lastName: string;
  ci: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  consent: boolean;
};
export const personalFields = ["firstName", "lastName", "ci", "birthDate", "gender"] as const;
export const contactFields = ["phone", "email"] as const;
