import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xodarcom | Instalación de Paneles Solares Residenciales y Rurales",
  description:
    "Ahorra hasta 95% en tu factura con instalaciones solares profesionales. Evaluación técnica gratuita.",
  openGraph: {
    title: "Xodarcom | Instalación de Paneles Solares",
    description:
      "Ahorra hasta 95% en tu factura con instalaciones solares profesionales.",
    type: "website",
    siteName: "Xodarcom",
    images: [
      {
        url: "https://xodarcom.com/wp-content/uploads/2025/05/logo-xodarcom-300x200.png",
        width: 300,
        height: 200,
        alt: "Xodarcom logo",
      },
    ],
  },
  metadataBase: new URL("https://xodarcom.com"),
  // themeColor moved to viewport
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xodarcom | Instalación de Paneles Solares",
    description: "Ahorra hasta 95% en tu factura con instalaciones solares profesionales.",
    images: [
      "https://xodarcom.com/wp-content/uploads/2025/05/logo-xodarcom-300x200.png",
    ],
    creator: "@xodarcom", // opcional si existiera
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--light-gray)] text-[var(--foreground)]`}
      >
        <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Link href="#hero" className="inline-flex items-center gap-2">
                <Image
                  src="https://xodarcom.com/wp-content/uploads/2025/05/logo-xodarcom-300x200.png"
                  alt="Xodarcom logo"
                  width={90}
                  height={60}
                  className="h-10 w-auto object-contain"
                  priority
                />
                <span className="font-bold text-[var(--electric-blue)] hidden sm:inline">Xodarcom Sol Inf SL</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#proceso" className="hover:text-[var(--electric-blue)]">Proceso</a>
              <a href="#beneficios" className="hover:text-[var(--electric-blue)]">Beneficios</a>
              <a href="#sistemas" className="hover:text-[var(--electric-blue)]">Sistemas</a>
              <a href="#timeline" className="hover:text-[var(--electric-blue)]">Pasos</a>
              <a href="#casos" className="hover:text-[var(--electric-blue)]">Casos</a>
              <a href="#faq" className="hover:text-[var(--electric-blue)]">FAQ</a>
            </nav>
            <nav className="md:hidden flex items-center overflow-x-auto no-scrollbar gap-4 text-sm font-medium" style={{ WebkitOverflowScrolling: 'touch' }}>
              <a href="#proceso" className="px-2 py-1 rounded bg-white/70 border border-black/5">Proceso</a>
              <a href="#beneficios" className="px-2 py-1 rounded bg-white/70 border border-black/5">Beneficios</a>
              <a href="#sistemas" className="px-2 py-1 rounded bg-white/70 border border-black/5">Sistemas</a>
              <a href="#timeline" className="px-2 py-1 rounded bg-white/70 border border-black/5">Pasos</a>
              <a href="#casos" className="px-2 py-1 rounded bg-white/70 border border-black/5">Casos</a>
              <a href="#faq" className="px-2 py-1 rounded bg-white/70 border border-black/5">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="#formulario" className="btn-primary">Solicitar Presupuesto</a>
            </div>
          </div>
        </header>
        <a href="#hero" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">Saltar al contenido</a>
        <main className="pt-[72px]">{children}</main>
        {/* Emojis solares flotantes: distribuidos y animados suavemente */}
        <div aria-hidden className="floating-emojis">
          <div className="sun-emoji" style={{ left: '5%', top: '20%', fontSize: '28px', ['--dur' as any]: '18s' }}>☀️</div>
          <div className="sun-emoji" style={{ left: '20%', top: '70%', fontSize: '22px', ['--dur' as any]: '15s' }}>☀️</div>
          <div className="sun-emoji" style={{ left: '38%', top: '30%', fontSize: '26px', ['--dur' as any]: '20s' }}>☀️</div>
          <div className="sun-emoji" style={{ left: '55%', top: '65%', fontSize: '24px', ['--dur' as any]: '17s' }}>☀️</div>
          <div className="sun-emoji" style={{ left: '72%', top: '25%', fontSize: '30px', ['--dur' as any]: '19s' }}>☀️</div>
          <div className="sun-emoji" style={{ left: '88%', top: '55%', fontSize: '20px', ['--dur' as any]: '16s' }}>☀️</div>
        </div>
        <footer className="border-t border-black/5 bg-white">
          <div className="container py-8 grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-[var(--electric-blue)]">Xodarcom Sol Inf SL</p>
              <p className="text-black/70">Instalación de paneles solares residenciales y rurales.</p>
            </div>
            <div>
              <p className="font-semibold">Contacto</p>
              <p className="text-black/70">info@xodarcom.com</p>
              <p className="text-black/70">650836635</p>
            </div>
            <div>
              <p className="font-semibold">Legal</p>
              <p className="text-black/70">© {new Date().getFullYear()} Xodarcom. Todos los derechos reservados.</p>
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Xodarcom Sol Inf SL',
                url: 'https://xodarcom.com',
                logo: 'https://xodarcom.com/wp-content/uploads/2025/05/logo-xodarcom-300x200.png',
                email: 'info@xodarcom.com',
                telephone: '650836635',
                sameAs: []
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Xodarcom',
                url: 'https://xodarcom.com',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://xodarcom.com/?s={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              })
            }}
          />
        </footer>
      </body>
    </html>
  );
}
