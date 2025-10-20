"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const overlayY = useTransform(scrollY, [0, 600], [0, 80]);

  const initialForm = {
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    consumo: "",
    techo: "",
    mensaje: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) nextErrors.nombre = "Requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Email inválido";
    if (!/^[0-9+\-\s]{7,}$/.test(formData.telefono)) nextErrors.telefono = "Teléfono inválido";
    if (!formData.ciudad.trim()) nextErrors.ciudad = "Requerido";
    if (!/^[0-9]{1,5}$/.test(formData.consumo)) nextErrors.consumo = "Solo números (kWh)";
    if (!formData.techo.trim()) nextErrors.techo = "Requerido";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const resp = await fetch(
        "https://obsessive-solutions-n8n.vdwibu.easypanel.host/webhook/form_web_cursor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            source: "xodarcom-landing",
            url: typeof window !== "undefined" ? window.location.href : "",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      setStatus("success");
      setErrors({});
      setFormData(initialForm);
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch (err) {
      console.error("Error enviando formulario:", err);
      setStatus("error");
    }
  }

  const faqs = [
    { q: "¿Cuánto cuesta instalar paneles solares?", a: "Desde €3.500.000 según sistema. Ofrecemos financiamiento y beneficios tributarios. Solicita cotización personalizada gratuita." },
    { q: "¿Cuánto ahorro realmente?", a: "Entre 60% y 95% según consumo. Mayoría recupera inversión en 4-6 años." },
    { q: "¿Qué pasa en días nublados?", a: "Paneles generan energía incluso con nubes. De noche, con baterías usas energía almacenada, sin baterías consumes de la red." },
    { q: "¿Necesito baterías?", a: "No obligatorias. Sistema net billing permite usar excedentes como 'créditos'. Baterías ideales para independencia total." },
    { q: "¿Cuánto dura instalación?", a: "2-7 días según sistema. Trámites legales: 15-20 días." },
    { q: "¿Qué garantías tienen?", a: "Paneles: 25 años. Inversor: 10 años. Baterías: 10 años. Instalación: 5 años." },
    { q: "¿Mi techo es apto?", a: "Trabajamos con tejas, zinc, losa, fibrocemento. Evaluación técnica gratuita." },
    { q: "¿Cómo contacto?", a: "Escríbenos a info@xodarcom.com o llama al 650836635." },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqButtonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const successRef = useRef<HTMLParagraphElement | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  function onFaqKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % faqs.length;
      faqButtonsRef.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + faqs.length) % faqs.length;
      faqButtonsRef.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      faqButtonsRef.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      faqButtonsRef.current[faqs.length - 1]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenFaq((cur) => (cur === index ? null : index));
    }
  }

  return (
    <div>
      <section id="hero" className="section relative overflow-hidden text-white">
        {/* Fondo con imagen + degradado para resaltar el texto */}
        <div className="absolute inset-0 -z-10">
          <motion.div style={{ y: bgY }} className="absolute inset-0 bg-[url('https://fra.cloud.appwrite.io/v1/storage/buckets/68b0ba48003b3f3582c9/files/68f61b5f00231a447c5a/view?project=68b0b952001fbdbde30f&mode=admin')] bg-cover bg-center" />
          <motion.div style={{ y: overlayY }} className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>
        <div className="pointer-events-none absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.25),rgba(255,107,53,0)_60%)]" />
        <div className="container relative z-10 grid gap-10 items-center">
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeUp}>
            <span className="badge">Energía inteligente para zonas rurales y residenciales</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Ahorra hasta <span className="text-[var(--solar-orange)]">95%</span> en tu factura de luz con energía solar profesional
            </h1>
            <p className="text-base sm:text-lg text-white/85">
              Proyecta tu ahorro, elige el sistema ideal y gana independencia energética. Evaluación técnica gratuita sin compromiso.
            </p>
            <div className="flex gap-4">
              <a href="#formulario" className="btn-primary">
                Solicitar Presupuesto Gratis
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/80">
              <div>✔ Equipo certificado</div>
              <div>✔ Garantía paneles 25 años</div>
              <div>✔ Financiamiento y beneficios tributarios</div>
            </div>
          </motion.div>
          {/* Se eliminó el bloque de imagen decorativa con logo Next.js */}
        </div>
      </section>

      <section id="proceso" className="section">
        <div className="container">
          <motion.h2 className="text-3xl font-bold mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>Nuestro Proceso</motion.h2>
          <p className="text-black/70 mb-6">Así llevamos tu proyecto de la evaluación a la independencia energética.</p>
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-black/5">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/zAKd3PQDbBk"
              title="Xodarcom Proceso"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="beneficios" className="section bg-[var(--light-gray)]">
        <div className="container">
          <motion.h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>Beneficios de la energía solar con Xodarcom</motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Ahorro inmediato", d: "Reduce tu cuenta desde el primer mes con generación propia." },
              { t: "Independencia energética", d: "Opciones con baterías para suministro continuo 24/7." },
              { t: "Garantías líderes", d: "Paneles 25 años, inversor 10 años, instalación 5 años." },
              { t: "Monitoreo en tiempo real", d: "App con métricas de rendimiento y consumo." },
              { t: "Impacto ambiental", d: "Disminuye tu huella de carbono de forma medible." },
              { t: "Beneficios tributarios", d: "Aprovecha incentivos disponibles y mejora tu flujo de caja." },
            ].map((b) => (
              <motion.div key={b.t} className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4 }} variants={fadeUp}>
                <h3 className="font-semibold mb-2">{b.t}</h3>
                <p className="text-black/70">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="sistemas" className="section">
        <div className="container space-y-8">
          <motion.h2 className="text-2xl sm:text-3xl font-bold" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>Tipos de Sistemas</motion.h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sistema Residencial Básico",
                bullets: [
                  "6-8 paneles | Generación: 350-450 kWh/mes",
                  "Ideal: casas pequeñas, consumo hasta 300 kWh/mes",
                  "Instalación: 2-3 días | Ahorro: 60-70%",
                ],
              },
              {
                name: "Sistema Residencial Estándar",
                bullets: [
                  "10-14 paneles | Generación: 550-750 kWh/mes",
                  "Ideal: casas medianas, consumo 300-600 kWh/mes",
                  "Incluye: monitoreo app, garantías extendidas",
                  "Instalación: 3-4 días | Ahorro: 75-85%",
                ],
              },
              {
                name: "Sistema Premium con Respaldo",
                bullets: [
                  "16-24 paneles + baterías | Generación: 900-1300 kWh/mes",
                  "Ideal: casas grandes, independencia energética total",
                  "Incluye: respaldo nocturno, autonomía 24/7",
                  "Instalación: 5-7 días | Ahorro: 90-95%",
                ],
              },
            ].map((s) => (
              <motion.div key={s.name} className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm flex flex-col" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>
                <h3 className="font-semibold text-lg mb-3">{s.name}</h3>
                <ul className="space-y-2 text-black/70 mb-6 list-disc list-inside">
                  {s.bullets.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a href="#formulario" className="mt-auto btn-primary text-center">Solicitar Presupuesto</a>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-black/60">Cada proyecto es único. Solicita evaluación técnica gratuita para conocer la inversión exacta según tu consumo.</p>
        </div>
      </section>

      <section id="timeline" className="section bg-[var(--light-gray)]">
        <div className="container">
          <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>Proceso en 5 pasos</motion.h2>
          <ol className="space-y-6">
            {[
              { t: "Evaluación Gratuita (1 día)", d: "Visita técnica, análisis de techo y consumo" },
              { t: "Diseño Personalizado (2-3 días)", d: "Propuesta con simulación 3D y proyección de ahorro" },
              { t: "Tramitación Legal (15-20 días)", d: "Permisos municipales y conexión distribuidora" },
              { t: "Instalación Profesional (2-7 días)", d: "Equipo certificado SEC, sin daños" },
              { t: "Puesta en Marcha (1 día)", d: "Activación y app de monitoreo" },
            ].map((p, i) => (
              <motion.li
                key={p.t}
                className="relative pl-8"
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <span className="absolute left-0 top-1 h-5 w-5 rounded-full bg-[var(--electric-blue)] text-white grid place-items-center text-xs font-bold">{i + 1}</span>
                <p className="font-semibold">{p.t}</p>
                <p className="text-black/70">{p.d}</p>
                <span className="absolute left-[8px] top-6 bottom-[-18px] w-[2px] bg-gradient-to-b from-[var(--electric-blue)]/50 to-transparent" aria-hidden />
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="casos" className="section">
        <div className="container">
          <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>Casos de Éxito</motion.h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                t: "Chalet en Mata-Behid - Sistema 5.2 kWp",
                d: ["Reducción de cuenta mensual: de €180.000 a €25.000", "Ahorro anual: €1.860.000"],
              },
              {
                t: "Oficina Comercial - Sistema 8.4 kWp",
                d: ["Beneficio tributario aplicado", "Ahorro anual: €2.400.000"],
              },
              {
                t: "Casa Las Castañetas - Sistema Premium 10 kWp + Baterías",
                d: ["Autonomía energética 100%", "Sin dependencia de cortes ni alzas de tarifa"],
              },
            ].map((c) => (
              <motion.article key={c.t} className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>
                <h3 className="font-semibold mb-3">{c.t}</h3>
                <ul className="space-y-2 text-black/70 list-disc list-inside">
                  {c.d.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="section bg-white">
        <div className="container">
          <motion.h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>Solicitar Presupuesto</motion.h2>
          <form className="grid md:grid-cols-2 gap-4 max-w-3xl" onSubmit={onSubmit} noValidate aria-describedby="form-ayuda">
            {([
              { name: "nombre", label: "Nombre", autoComplete: "name" },
              { name: "email", label: "Email", type: "email", autoComplete: "email" },
              { name: "telefono", label: "Teléfono", autoComplete: "tel" },
              { name: "ciudad", label: "Comuna / Ciudad", autoComplete: "address-level2" },
              { name: "consumo", label: "Consumo mensual (kWh)" },
              { name: "techo", label: "Tipo de techo" },
            ] as Array<{ name: string; label: string; type?: string; autoComplete?: string }>).map((f) => (
              <div key={f.name} className="flex flex-col gap-1">
                <label htmlFor={f.name} className="text-sm font-semibold">{f.label}</label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type || "text"}
                  className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors[f.name] ? "border-red-400 focus:ring-red-400" : "border-black/10 focus:ring-[var(--electric-blue)]"}`}
                  value={(formData as Record<string, string>)[f.name] ?? ""}
                  onChange={onChange}
                  aria-invalid={Boolean(errors[f.name])}
                  aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                  autoComplete={f.autoComplete}
                />
                {errors[f.name] && (
                  <span id={`${f.name}-error`} className="text-xs text-red-600">{errors[f.name]}</span>
                )}
              </div>
            ))}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label htmlFor="mensaje" className="text-sm font-semibold">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                className="border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)]"
                value={formData.mensaje}
                onChange={onChange}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <button type="submit" className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed" disabled={status === "sending" || status === "success"}>
                {status === "sending" ? "Enviando..." : status === "success" ? "¡Solicitud enviada!" : "Enviar solicitud"}
              </button>
              {status === "error" && (
                <span className="text-sm text-red-600">Ocurrió un error al enviar. Inténtalo nuevamente.</span>
              )}
            </div>
            <p id="form-ayuda" className="md:col-span-2 text-sm text-black/60">Nos pondremos en contacto desde <strong>info@xodarcom.com</strong> o al <strong>650836635</strong>.</p>
            {status === "success" && (
              <p ref={successRef} className="md:col-span-2 text-sm text-green-700">¡Gracias! Recibimos tu solicitud. Te contactaremos pronto.</p>
            )}
          </form>
        </div>
      </section>

      <section id="faq" className="section bg-[var(--light-gray)]">
        <div className="container max-w-3xl">
          <motion.h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}>FAQ</motion.h2>
          <div className="divide-y divide-black/10 bg-white rounded-2xl border border-black/5 overflow-hidden" role="region" aria-label="Preguntas frecuentes">
            <ul role="list" className="m-0 p-0">
              {faqs.map((item, idx) => {
                const panelId = `faq-panel-${idx}`;
                const buttonId = `faq-button-${idx}`;
                const expanded = openFaq === idx;
                return (
                  <li key={item.q} className="list-none">
                    <h3 className="m-0">
                      <button
                        id={buttonId}
                        ref={(el) => { faqButtonsRef.current[idx] = el; }}
                        className="w-full text-left p-4 flex items-center justify-between font-medium focus:outline-none"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(expanded ? null : idx)}
                        onKeyDown={(e) => onFaqKeyDown(e, idx)}
                      >
                        <span>{item.q}</span>
                        <span className="ml-4 text-[var(--electric-blue)]" aria-hidden>
                          {expanded ? "−" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!expanded}
                      className="px-4 pb-4 text-black/70"
                    >
                      {item.a}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
