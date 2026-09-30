import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Send, 
  Mail, 
  User, 
  Feather, 
  CheckCircle, 
  RefreshCw,
  Compass,
  Award,
  Footprints
} from 'lucide-react';
import SafeImage from './SafeImage';

export default function ContactBenefits({ selectedColor = 'Turquesa Splash' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    childAge: '1-2 años',
    preferredColor: selectedColor,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [voucherCode] = useState(() => 'GOGUMI-' + Math.floor(1000 + Math.random() * 9000));

  const benefits = [
    {
      title: "Horma Barefoot Anatómica",
      desc: "Espacio amplio para que los 5 deditos se expandan libremente sin deformar el cartílago óseo.",
      badge: "Cero Compresión",
    },
    {
      title: "Capa de Grafeno Todo Terreno (1-2 mm)",
      desc: "Suela milimétrica ultraflexible de 360°, indestructible ante la fricción en rocas y asfalto.",
      badge: "Anti-Fricción",
    },
    {
      title: "Zero-Drop & Peso Pluma (85g)",
      desc: "Sin desnivel entre talón y puntera para una alineación neutra y natural de la columna vertebral.",
      badge: "85 Gramos",
    },
    {
      title: "Evacuación de Agua Express",
      desc: "Sal de los charcos o playa con secado inmediato. 100% lavables con agua y jabón.",
      badge: "100% Lavable",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    try {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#64C7F3', '#A855F7', '#FF6B6B', '#FFD166', '#06D6A0']
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`Consulta Calzado GO - Preventa ${voucherCode}`);
    const body = encodeURIComponent(
      `¡Hola equipo GO!\n\n` +
      `Me gustaría solicitar información y reservar mi calzado:\n` +
      `- Nombre: ${formData.name || 'Familiar'}\n` +
      `- Etapa del peque: ${formData.childAge}\n` +
      `- Color de preferencia: ${formData.preferredColor}\n` +
      `- Código de descuento: ${voucherCode} (15% Preventa)\n\n` +
      `Consulta o mensaje: ${formData.message || 'Quiero conocer detalles de entrega y disponibilidad.'}\n\n` +
      `¡Saludos!`
    );
    return `mailto:contacto@gogumi.com?subject=${subject}&body=${body}`;
  };

  return (
    <section 
      id="contacto"
      className="relative w-full h-screen h-[100dvh] snap-start snap-always shrink-0 bg-gradient-to-b from-[#F0F9FF] via-white to-[#FAFAF5] overflow-hidden flex flex-col justify-between px-4 sm:px-10 py-6 select-none"
    >
      {/* Resplandor de fondo */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-cyan-200/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl pointer-events-none" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-2xl mx-auto mb-6 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold font-bubbly mb-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>BENEFICIOS PODOLÓGICOS & CONTACTO DIRECTO</span>
          </div>

          <h2 className="font-bubbly text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Pies sanos, pasos seguros y atención personalizada
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
            Comunícate directamente con nuestro equipo y recibe la Guía Podológica + 15% OFF en preventa.
          </p>
        </div>

        {/* REJILLA DE 2 COLUMNAS: BENEFICIOS (IZQ) + FORMULARIO (DER) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMNA IZQUIERDA: BENEFICIOS ERGONÓMICOS & TODOTERRENO */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <Footprints className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bubbly text-lg sm:text-xl font-bold text-slate-800">
                    ¿Por qué elegir GO ErgoFlex?
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Diseñado para la etapa crucial de 1 a 5 años
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100/80 hover:bg-purple-50/40 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="font-bubbly text-xs sm:text-sm font-bold text-slate-800">
                        {b.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        {b.badge}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aval podológico footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Simulación de pisada descalza natural</span>
              </span>
              <span className="font-bold text-purple-700 text-[11px]">
                UTP • Estrategias Digitales
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO DE CONTACTO ATÍPICO & MARKETER */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onSubmit={handleSubmit}
                  className="space-y-3.5"
                >
                  <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
                    <div>
                      <h3 className="font-bubbly text-base sm:text-lg font-bold text-slate-800">
                        Reserva con 15% OFF y Consulta por Correo
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Te enviaremos los detalles directo a tu bandeja
                      </p>
                    </div>
                    <span className="text-xl">💌</span>
                  </div>

                  {/* Nombre y Correo en 2 columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <User className="w-3 h-3 text-purple-600" />
                        <span>Nombre / Apodo</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Sofía o Mateo"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-medium outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-purple-600" />
                        <span>Correo Electrónico</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tunombre@correo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-medium outline-none"
                      />
                    </div>
                  </div>

                  {/* Selector de Etapa y Color preferido */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Etapa del Peque
                      </label>
                      <select
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-medium outline-none bg-white"
                      >
                        <option value="12 a 24 meses">👶 1 a 2 años (Primeros Pasos)</option>
                        <option value="3 a 5 años">🏃 3 a 5 años (Exploradores)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Color Favorito
                      </label>
                      <input
                        type="text"
                        value={formData.preferredColor}
                        onChange={(e) => setFormData({ ...formData, preferredColor: e.target.value })}
                        placeholder="Ej: Turquesa Splash"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-medium outline-none"
                      />
                    </div>
                  </div>

                  {/* Mensaje opcional */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      ¿Tienes alguna duda médica o consulta de envío? (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ej: ¿Tienen envíos para esta semana? o ¿cómo mido su pie?"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-medium outline-none resize-none"
                    />
                  </div>

                  {/* Botón de Envío */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-bubbly text-sm sm:text-base font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-transform"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>¡Enviar Consulta y Generar Cupón 15%!</span>
                  </motion.button>
                </motion.form>
              ) : (
                /* ÉXITO: PASAPORTE / CUPÓN GENERADO */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-2"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <CheckCircle className="w-7 h-7" />
                  </div>

                  <h3 className="font-bubbly text-xl font-bold text-slate-800">
                    ¡Listo, {formData.name || 'Aventurero'}!
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Tu cupón preventa ha sido generado con éxito:
                  </p>

                  {/* Tarjeta de Cupón */}
                  <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white shadow-xl text-left text-xs">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                      <span className="font-bubbly text-sm text-purple-300">🪽 PASAPORTE OFICIAL GO</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        15% PREVENTA
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Modelo:</span>
                        <span className="font-bold text-white">{formData.preferredColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Etapa:</span>
                        <span className="font-bold text-sky-300">{formData.childAge}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/10">
                        <span className="text-slate-400">Código Cupón:</span>
                        <span className="font-mono text-sm font-bold text-amber-300">{voucherCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex items-center justify-center gap-2.5">
                    <a
                      href={generateMailto()}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bubbly font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Abrir Correo Prellenado</span>
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bubbly font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Nueva consulta</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* FOOTER COMPACTO INTEGRADO AL FINAL DEL SLIDE */}
      <div className="w-full max-w-6xl mx-auto pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bubbly font-bold text-slate-700 text-xs">🪽 GO Calzado Ergonómico</span>
          <span>• Calzado infantil para 1 a 5 años</span>
        </div>
        <div className="text-center sm:text-right">
          <span>Proyecto Académico Universitario • UTP Estrategias Digitales</span>
        </div>
      </div>

    </section>
  );
}
