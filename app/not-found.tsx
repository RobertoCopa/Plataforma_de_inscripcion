import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="container section">
        <span className="eyebrow">404 · PÁGINA NO ENCONTRADA</span>
        <div className="section-heading">
          <h2>Volvamos al comienzo.</h2>
        </div>
        <p style={{ margin: "20px 0 28px", color: "var(--muted)" }}>
          La página que buscas no está disponible.
        </p>
        <Link href="/" className="button button-blue">
          Descubrir la carrera
        </Link>
      </main>
      <Footer />
    </>
  );
}
