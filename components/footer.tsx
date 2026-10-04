import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="container">
        <div className="footer-main">
          <div>
            <div className="footer-brand">
              <Code2 size={28} />
              <strong>
                El futuro se construye.
                <br />
                Empieza aquí.
              </strong>
            </div>
            <p>
              Ingeniería Informática
              <br />
              Facultad de Ciencias Puras · UATF
            </p>
          </div>
          <div className="footer-contact">
            <span className="eyebrow">CONVERSEMOS</span>
            <a href="mailto:informatica@uatf.edu.bo">
              <Mail size={17} />
              informatica@uatf.edu.bo
            </a>
            <a href="tel:+59126227312">
              <Phone size={17} />
              +591 2 6227312
            </a>
            <span>
              <MapPin size={17} />
              Av. del Maestro s/n, edificio central
              <br />
              Potosí, Bolivia
            </span>
          </div>
          <div className="institutional-logos">
            <Image
              style={{ height: "auto" }}
              src="/images/universidad.png"
              width={58}
              height={68}
              alt="Escudo de la Universidad Autónoma Tomás Frías"
            />
            <Image
              style={{ height: "auto" }}
              src="/images/facultad.png"
              width={60}
              height={68}
              alt="Escudo de la Facultad de Ciencias Puras"
            />
            <div>
              Una carrera.
              <br />
              <strong>Una gran universidad.</strong>
              <small>Universidad Autónoma Tomás Frías</small>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ingeniería Informática · UATF</span>
          <div>
            <Link href="/privacidad">Privacidad</Link>
            <span>Hecho para quienes imaginan el mañana.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
