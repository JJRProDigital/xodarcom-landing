## Plan de implementación Xodarcom Landing (Next.js + Tailwind)

### Objetivo
Construir la mejor landing moderna para "Xodarcom Sol Inf SL" (instalaciones de paneles solares residenciales y rurales) con navegación por anclas, CTA al formulario, animaciones sutiles y performance/SEO sólidos.

### 1) Configuración de marca y base
- [x] Definir paleta (naranja #FF6B35, azul #004E89, verde #2A9D8F, blanco, gris claro)
- [x] Permitir imágenes remotas (`xodarcom.com`)
- [x] Tipografía base, tamaños, espacios y utilidades globales (smooth scroll)
- [x] Metadatos globales (título, descripción, OG)

### 2) Layout global y Header
- [x] Crear layout con header fijo y sombra sutil
- [x] Logo remoto y nombre de marca
- [x] Navegación por anclas: Hero, Proceso, Beneficios, Sistemas, Casos, Contacto, FAQ
- [x] CTA primario en header que hace scroll a formulario

### 3) Sección Hero
- [x] Titular de valor claro (ahorro y calidad profesional)
- [x] Subtítulo orientado a ROI
- [x] CTA visible “Solicitar Presupuesto” (scroll a formulario)
- [x] Fondo con gradientes/visual solar y micro-animación

### 4) Nuestro Proceso (video)
- [x] Título + descripción breve
- [x] Video embed YouTube de prueba (@https://www.youtube.com/watch?v=zAKd3PQDbBk)
- [x] Responsivo y accesible (caption opcional)

### 5) Beneficios
- [x] Grilla 2-3 columnas con iconografía
- [x] Beneficios: ahorro, independencia, garantía, monitoreo, eco, plus tributario
- [x] Animaciones on-scroll discretas

### 6) Tipos de Sistemas (sin precios)
- [x] 3 tarjetas: Básico, Estándar, Premium con Respaldo
- [x] Detalles exactos provistos (kWh/mes, ideal, instalación, ahorro, incluye)
- [x] CTA "Solicitar Presupuesto" en cada tarjeta
- [x] Nota inferior: evaluación técnica gratuita

### 7) Proceso (timeline 5 pasos)
- [x] Pasos: Evaluación, Diseño, Tramitación, Instalación, Puesta en Marcha
- [x] Indicadores de tiempo por paso
- [x] Línea/Stepper con animación progresiva

### 8) Casos de Éxito
- [x] 3 tarjetas sin datos personales
- [x] Métricas de ahorro y beneficios
- [ ] Testimonios breves opcionales

### 9) Formulario Presupuesto (sin backend)
- [x] Campos: nombre, email, teléfono, comuna/ciudad, consumo mensual, tipo de techo, mensaje
- [x] Validación y estados (enviando/listo)
- [x] Mensaje de éxito local

### 10) FAQ (accordion 8 preguntas)
- [x] Implementar preguntas/respuestas provistas
- [x] Accesible: roles ARIA, teclas y navegación (↑ ↓ Home End)

### 11) Animaciones y micro-interacciones
- [x] Integrar framer-motion
- [x] Fade/slide on-scroll, hover cards
- [x] Timeline progresivo

### 12) SEO, Performance, Accesibilidad
- [x] Títulos únicos, meta descripción, OG (Open Graph)
- [x] Twitter Cards
- [x] Semántica correcta, etiquetas alt, contraste AA/AAA (base)
- [ ] Lighthouse pass >= 95 en Performance/Best Practices/SEO/A11y

### 13) Build y verificación
- [x] Revisión responsiva (mobile-first)
- [x] `npm run build` sin errores
- [ ] Ajustes finales de estilos y textos

### 14) Despliegue (opcional)
- [ ] Elegir plataforma (Vercel/otro)
- [ ] Variables y dominio
- [ ] Pruebas post-despliegue

### 15) Responsive y Navegación Mobile
- [x] Añadir navegación horizontal accesible en mobile (sin JS)
- [x] Revisar escalas tipográficas y espaciados en <640px, 640-1024px, >1024px
- [x] Ajustar tamaños de imágenes e iframes para CLS bajo

### 16) Reportes
- [x] Generar reporte Lighthouse HTML (`lighthouse-report.html`) y JSON (`lighthouse-report.json`)

---

### Datos de la agencia
- **Nombre**: Xodarcom Sol Inf SL
- **Logo**: @https://xodarcom.com/wp-content/uploads/2025/05/logo-xodarcom-300x200.png
- **Email**: info@xodarcom.com
- **Teléfono**: 650836635


