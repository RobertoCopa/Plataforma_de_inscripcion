"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header({ enrollment = false }: { enrollment?: boolean }) {
  const [open, setOpen] = useState(false);
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
          <Link href="/#carrera" onClick={() => setOpen(false)}>
            La carrera
          </Link>
          <Link href="/#formacion" onClick={() => setOpen(false)}>
            Tu formación
          </Link>
          <Link href="/#futuro" onClick={() => setOpen(false)}>
            Tu futuro
          </Link>
          <Link
            href={enrollment ? "/#contacto" : "/inscripcion"}
            className="button button-blue header-cta"
            onClick={() => setOpen(false)}
          >
            {enrollment ? "¿Necesitas ayuda?" : "Inscríbete"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
