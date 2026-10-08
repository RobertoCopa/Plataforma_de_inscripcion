"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header({
  enrollment = false,
  technical = false,
}: {
  enrollment?: boolean;
  technical?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const links = technical
    ? [
        ["/tecnico-superior#programas", "Carreras"],
        ["/tecnico-superior#admision", "Admisión"],
        ["/tecnico-superior#graduacion", "Graduación"],
        ["/#carrera", "Licenciatura"],
      ]
    : [
        ["/#oferta-academica", "Oferta académica"],
        ["/#formacion", "Tu formación"],
        ["/#menciones", "Menciones"],
        ["/#futuro", "Tu futuro"],
      ];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Ingeniería Informática UATF, inicio">
          <span className="brand-shield">
            <Image
              style={{ height: "auto" }}
              src="/images/carrera.jpg"
              width={49}
              height={48}
              alt=""
              priority
            />
          </span>
          <span className="brand-name">
            Ingeniería Informática<small>UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS</small>
          </span>
        </Link>
        <button
          className="icon-button menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          id="main-nav"
          aria-label="Navegación principal"
          className={open ? "navigation is-open" : "navigation"}
        >
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link
            href={
              enrollment ? "/#contacto" : technical ? "/tecnico-superior#admision" : "/inscripcion"
            }
            className="button button-blue header-cta"
            onClick={() => setOpen(false)}
          >
            {enrollment ? "¿Necesitas ayuda?" : technical ? "Admisión directa" : "Inscríbete"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
