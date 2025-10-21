import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--light-gray)]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--electric-blue)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">La página que buscas no existe.</p>
        <Link 
          href="/" 
          className="btn-primary"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
