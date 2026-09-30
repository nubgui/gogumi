import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  User, 
  FileText,
  HeartHandshake
} from 'lucide-react';

export default function OrderForm() {
  // Estado para la Suscripción por Correo (Club Go Gumi)
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Estado para el Envío de Correo Estándar
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'Consulta sobre tallas y calzado',
    message: ''
  });
  const [isContactSent, setIsContactSent] = useState(false);

  // Manejador de Suscripción (Club Go Gumi - 15% OFF)
  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#64C7F3', '#A855F7', '#FF6B6B', '#FFD166', '#06D6A0']
      });
    } catch (err) {
      console.log('Confetti');
    }

    setIsSubscribed(true);
  };

  // Manejador de Envío de Correo Estándar
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) return;

    // Disparar cliente de correo estándar en segundo plano
    const mailSubject = encodeURIComponent(`[Go Gumi Web] ${contactData.subject} - ${contactData.name}`);
    const mailBody = encodeURIComponent(
      `Hola equipo de Go Gumi,\n\n` +
      `Nombre: ${contactData.name}\n` +
      `Correo: ${contactData.email}\n` +
      `Asunto: ${contactData.subject}\n\n` +
      `Mensaje:\n${contactData.message}\n\n` +
      `Enviado desde el formulario de contacto web Go Gumi.`
    );
    
    // Crear ventana mailto invisible para compatibilidad
    const mailtoLink = `mailto:contacto@gogumi.com?subject=${mailSubject}&body=${mailBody}`;
    window.location.href = mailtoLink;

    setIsContactSent(true);
  };

  return (
    <section 
      id="contacto"
      className="relative w-full min-h-[90vh] py-16 sm:py-24 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 select-none overflow-hidden"
    >
      {/* Nubes decorativas translúcidas de fondo */}
      <div className="absolute top-10 -left-20 w-80 h-40 bg-white/35 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-48 bg-white/35 rounded-full blur-3xl pointer-events-none" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/70 shadow-sm mb-3">
            <Mail className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-xs font-bold font-bubbly text-purple-950 uppercase tracking-wider">
              COMUNIDAD & ATENCIÓN DIRECTA
            </span>
          </div>

          <h2 className="font-bubbly text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Únete a la familia <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Go Gumi</span>
          </h2>
          <p className="text-slate-800/85 text-xs sm:text-sm md:text-base font-medium mt-2 leading-relaxed">
            Suscríbete para recibir un 15% OFF de bienvenida en tu primera compra o escríbenos directamente para resolver cualquier duda sobre salud podológica y tallas.
          </p>
        </div>

        {/* PARRILLA DE 2 COLUMNAS: SUSCRIPCIÓN & MENSAJE ESTÁNDAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* =========================================================================
              COLUMNA 1: SUSCRIPCIÓN POR CORREO (CLUB GO GUMI VIP & 15% OFF)
              ========================================================================= */}
          <div className="lg:col-span-5 bg-white/35 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-white/70 shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Resplandor decorativo */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-400/30 border border-amber-300/80 text-amber-950 text-[11px] font-bubbly font-bold tracking-wide flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  15% OFF EN TU PRIMER PAR
                </span>
                <span className="text-[11px] font-bold text-sky-900 bg-sky-200/50 px-2.5 py-0.5 rounded-full">
                  Exclusivo
                </span>
              </div>

              <h3 className="font-bubbly text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Club VIP Go Gumi
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-6">
                Recibe primicias de nuevos colores, avisos de reposición de tallas antes que nadie y artículos mensuales sobre desarrollo motor y podología infantil.
              </p>

              {/* Beneficios clave con checks */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Código de 15% de descuento directo en tu correo</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Acceso prioritario a lanzamientos y tallas limitadas</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Guías prácticas para medir y cuidar los pies de tu pequeño</span>
                </div>
              </div>
            </div>

            {/* Formulario de Suscripción */}
            <div className="mt-2">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="form-sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribeSubmit}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-bubbly font-bold uppercase tracking-wider text-slate-800 mb-1">
                        Ingresa tu correo electrónico:
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={subscribeEmail}
                          onChange={(e) => setSubscribeEmail(e.target.value)}
                          placeholder="mama_o_papa@ejemplo.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm font-medium text-slate-800 shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bubbly text-xs sm:text-sm font-bold shadow-lg shadow-purple-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Suscribirme & Obtener 15% OFF</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-600">
                      🔒 No enviamos spam. Puedes cancelar tu suscripción en cualquier momento.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-sub"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-bubbly text-base font-bold text-emerald-950">
                      ¡Bienvenido al Club Go Gumi!
                    </h4>
                    <p className="text-xs text-emerald-900 mt-1 font-medium">
                      Hemos registrado <span className="font-bold underline">{subscribeEmail}</span>. En unos instantes recibirás tu código de 15% de descuento.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubscribed(false);
                        setSubscribeEmail('');
                      }}
                      className="mt-3 text-[11px] font-bold text-emerald-900 hover:underline cursor-pointer"
                    >
                      Registrar otro correo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* =========================================================================
              COLUMNA 2: FORMULARIO DE ENVÍO DE CORREO ESTÁNDAR
              ========================================================================= */}
          <div className="lg:col-span-7 bg-white/35 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-white/70 shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Resplandor decorativo */}
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/50 border border-white/80 text-sky-950 text-[11px] font-bubbly font-bold tracking-wide flex items-center gap-1.5 shadow-xs">
                  <HeartHandshake className="w-3.5 h-3.5 text-sky-600" />
                  ATENCIÓN PERSONALIZADA
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Respuesta en &lt; 24h
                </span>
              </div>

              <h3 className="font-bubbly text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Envíanos un Mensaje
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-5">
                Escríbenos directamente para dudas sobre la medida del pie de tu pequeño, pedidos corporativos o tiempos de envío a nivel nacional.
              </p>

              {/* Formulario Estándar */}
              <AnimatePresence mode="wait">
                {!isContactSent ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Nombre */}
                      <div>
                        <label className="block text-[11px] font-bubbly font-bold uppercase tracking-wider text-slate-800 mb-1">
                          Tu Nombre:
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="text"
                            required
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            placeholder="Ej. Valeria Mendoza"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm font-medium text-slate-800 shadow-inner"
                          />
                        </div>
                      </div>

                      {/* Correo */}
                      <div>
                        <label className="block text-[11px] font-bubbly font-bold uppercase tracking-wider text-slate-800 mb-1">
                          Tu Correo:
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="email"
                            required
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            placeholder="valeria@correo.com"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm font-medium text-slate-800 shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Asunto */}
                    <div>
                      <label className="block text-[11px] font-bubbly font-bold uppercase tracking-wider text-slate-800 mb-1">
                        Motivo de tu consulta:
                      </label>
                      <select
                        value={contactData.subject}
                        onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm font-medium text-slate-800 shadow-inner cursor-pointer"
                      >
                        <option value="Consulta sobre tallas y calzado">Consulta sobre tallas y medidas exactas en mm</option>
                        <option value="Asesoría podológica infantil">Asesoría sobre beneficios barefoot y suela de grafeno</option>
                        <option value="Tiempos y cobertura de envíos">Tiempos y cobertura de envío en Lima y provincias</option>
                        <option value="Colaboraciones y ventas al por mayor">Colaboraciones o compras institucionales</option>
                        <option value="Otro tema">Otro tema</option>
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-[11px] font-bubbly font-bold uppercase tracking-wider text-slate-800 mb-1">
                        Mensaje o Consulta:
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        placeholder="Escribe aquí tu consulta con el mayor detalle posible..."
                        className="w-full p-3 rounded-xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm font-medium text-slate-800 shadow-inner resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bubbly text-xs sm:text-sm font-bold shadow-md shadow-sky-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensaje Estándar</span>
                      </button>

                      {/* Canal alternativo WhatsApp */}
                      <a
                        href="https://wa.me/51999999999?text=Hola%20Go%20Gumi!%20Quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20calzado%20barefoot."
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bubbly font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer py-1"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>O chatea por WhatsApp</span>
                      </a>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-contact"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 rounded-2xl bg-sky-500/20 border border-sky-400/50 text-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-sky-700 mx-auto mb-2" />
                    <h4 className="font-bubbly text-lg font-bold text-sky-950">
                      ¡Mensaje Preparado y Enviado!
                    </h4>
                    <p className="text-xs sm:text-sm text-sky-900 mt-1 font-medium">
                      Gracias, <span className="font-bold">{contactData.name}</span>. Hemos abierto tu cliente de correo para enviar tu mensaje a <span className="underline font-semibold">contacto@gogumi.com</span>. Te responderemos en menos de 24 horas.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsContactSent(false);
                        setContactData({ name: '', email: '', subject: 'Consulta sobre tallas y calzado', message: '' });
                      }}
                      className="mt-4 px-4 py-1.5 rounded-full bg-white/70 hover:bg-white text-xs font-bold text-sky-950 shadow-xs cursor-pointer"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* PIE DE SECCIÓN / GARANTÍAS DE CONFIANZA */}
        <div className="mt-10 pt-6 border-t border-white/30 flex flex-wrap items-center justify-between gap-4 text-xs font-bubbly font-semibold text-sky-950/75">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Calzado Saludable Infantil
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" />
              Envíos rápidos a todo el Perú
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-sky-600" />
              contacto@gogumi.com
            </span>
          </div>

          <div>
            <span>© 2026 Go Gumi. Todos los derechos reservados.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
