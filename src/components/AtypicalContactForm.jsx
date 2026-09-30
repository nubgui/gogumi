import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  RefreshCw, 
  Mail, 
  User, 
  HelpCircle, 
  Compass, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AtypicalContactForm({ initialModel = null }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childAge: '1-2',
    terrain: 'parque',
    preferredColor: initialModel?.color || 'Turquesa Splash',
    childName: '',
    parentEmail: '',
    specialMessage: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [voucherCode] = useState(() => 'GOGUMI-' + Math.floor(1000 + Math.random() * 9000));

  const ageOptions = [
    { id: '1-2', title: '12 a 24 meses', desc: 'Primeros pasitos', emoji: '🐣', recommendedSize: 'Talla 19 - 21' },
    { id: '2-3', title: '2 a 3 años', desc: 'Caminante veloz', emoji: '⚡', recommendedSize: 'Talla 22 - 24' },
    { id: '4-5', title: '4 a 5 años', desc: 'Aventurero activo', emoji: '🚀', recommendedSize: 'Talla 25 - 28' },
  ];

  const terrainOptions = [
    { id: 'parque', title: 'Parques y Césped', desc: 'Suelo orgánico blando', emoji: '🌲' },
    { id: 'charcos', title: 'Charcos y Arena', desc: 'Agua y lodo', emoji: '🌧️' },
    { id: 'hogar', title: 'Hogar y Guardería', desc: 'Pisos lisos', emoji: '🏠' },
    { id: 'extremo', title: 'Todo Terreno', desc: 'Rocas y asfalto', emoji: '🧗' },
  ];

  const colorOptions = [
    { name: 'Turquesa Splash', hex: '#38BDF8' },
    { name: 'Coral Aventura', hex: '#FB7185' },
    { name: 'Verde Salvia', hex: '#34D399' },
    { name: 'Mostaza Safari', hex: '#FBBF24' },
    { name: 'Gummy Purple', hex: '#A855F7' },
  ];

  const selectedAgeObj = ageOptions.find(a => a.id === formData.childAge) || ageOptions[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentEmail) return;

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#64C7F3', '#A855F7', '#FF6B6B', '#FFD166', '#06D6A0']
      });
    } catch (err) {
      console.log('Confetti effect triggered');
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`Consulta Calzado GO para ${formData.childName || 'mi peque'} - Cupón ${voucherCode}`);
    const body = encodeURIComponent(
      `¡Hola equipo GO!\n\n` +
      `He completado el recomendador interactivo:\n` +
      `- Nombre del peque: ${formData.childName || 'Pequeño Aventurero'}\n` +
      `- Etapa: ${selectedAgeObj.title} (${selectedAgeObj.recommendedSize})\n` +
      `- Terreno: ${formData.terrain}\n` +
      `- Color: ${formData.preferredColor}\n` +
      `- Cupón: ${voucherCode} (15% OFF)\n\n` +
      `Consulta adicional: ${formData.specialMessage || 'Ninguna, quiero confirmar mi preventa.'}\n\n` +
      `Quedo a la espera de su respuesta.`
    );
    return `mailto:contacto@gogumi.com?subject=${subject}&body=${body}`;
  };

  return (
    <section 
      id="contacto" 
      className="relative w-full h-screen h-[100dvh] snap-start snap-always shrink-0 bg-gradient-to-b from-[#F0F9FF] to-[#FAFAF5] overflow-hidden flex flex-col justify-center px-4 sm:px-8 py-6"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-sky-200/30 via-purple-200/25 to-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full flex flex-col justify-center h-full max-h-[850px] relative z-10">
        
        {/* TITULAR */}
        <div className="text-center max-w-xl mx-auto mb-4 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-bubbly mb-1">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>ASESOR VIRTUAL DE AVENTURA</span>
          </div>

          <h2 className="font-bubbly text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-snug">
            Descubre el zapatito ideal en 3 clics y recibe 15% OFF
          </h2>
        </div>

        {/* TARJETA DEL FORMULARIO */}
        <div className="rounded-3xl bg-white border border-slate-100 shadow-xl p-5 sm:p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-stepper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* Indicador de 3 Pasos */}
                <div className="flex items-center justify-between max-w-xs mx-auto mb-6 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 -z-0" />
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-purple-600 -translate-y-1/2 -z-0 transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  />

                  {[1, 2, 3].map((stepNum) => (
                    <button
                      key={stepNum}
                      onClick={() => setStep(stepNum)}
                      className={`relative z-10 w-8 h-8 rounded-full font-bubbly font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                        step >= stepNum 
                          ? 'bg-purple-600 text-white shadow-md ring-4 ring-purple-100' 
                          : 'bg-white border-2 border-slate-200 text-slate-400'
                      }`}
                    >
                      {stepNum}
                    </button>
                  ))}
                </div>

                {/* PASO 1 */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-bubbly text-lg sm:text-xl font-bold text-slate-800">
                        Paso 1: ¿Cuántos meses o años tiene tu peque?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {ageOptions.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setFormData({ ...formData, childAge: opt.id })}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                            formData.childAge === opt.id
                              ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                              : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50/50'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{opt.emoji}</span>
                          <h4 className="font-bubbly text-sm font-bold text-slate-800">{opt.title}</h4>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white text-purple-700 text-[11px] font-bold border border-purple-100">
                            {opt.recommendedSize}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bubbly font-bold text-sm flex items-center gap-1.5 cursor-pointer shadow-md transition-transform active:scale-95"
                      >
                        <span>Siguiente: Terreno</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PASO 2 */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-bubbly text-lg sm:text-xl font-bold text-slate-800">
                        Paso 2: ¿Dónde juega habitualmente?
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {terrainOptions.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setFormData({ ...formData, terrain: opt.id })}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                            formData.terrain === opt.id
                              ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                              : 'border-slate-100 hover:border-purple-200'
                          }`}
                        >
                          <span className="text-2xl shrink-0">{opt.emoji}</span>
                          <div>
                            <h4 className="font-bubbly text-xs sm:text-sm font-bold text-slate-800">{opt.title}</h4>
                            <p className="text-[11px] text-slate-400">{opt.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Color preferido */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Color preferido:</span>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredColor: c.name })}
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                              formData.preferredColor === c.name
                                ? 'border-purple-600 bg-purple-100 text-purple-800'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bubbly font-bold text-xs cursor-pointer"
                      >
                        Atrás
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bubbly font-bold text-sm flex items-center gap-1.5 cursor-pointer shadow-md transition-transform active:scale-95"
                      >
                        <span>Siguiente: Contacto</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PASO 3 */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="text-center">
                      <h3 className="font-bubbly text-lg sm:text-xl font-bold text-slate-800">
                        Paso 3: ¿A qué correo te enviamos el cupón?
                      </h3>
                    </div>

                    <div className="space-y-3 max-w-md mx-auto pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-purple-600" />
                          <span>Nombre del peque</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.childName}
                          onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                          placeholder="Ej: Mateo, Lucas..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-purple-600" />
                          <span>Correo de papá o mamá</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.parentEmail}
                          onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                          placeholder="tunombre@correo.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3 text-purple-600" />
                          <span>Consulta o mensaje (Opcional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.specialMessage}
                          onChange={(e) => setFormData({ ...formData, specialMessage: e.target.value })}
                          placeholder="Ej: ¿Hacen envíos a provincia?"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px] text-purple-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>Tus datos son seguros. Recibirás tu cupón y guía podológica.</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 max-w-md mx-auto">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bubbly font-bold text-xs cursor-pointer"
                      >
                        Atrás
                      </button>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bubbly text-sm font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>¡Generar Tarjeta + Cupón!</span>
                      </motion.button>
                    </div>
                  </form>
                )}

              </motion.div>
            ) : (
              /* ÉXITO */
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-2"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <h3 className="font-bubbly text-xl font-bold text-slate-800">
                  ¡Tarjeta de Aventurero Lista para {formData.childName || 'tu peque'}!
                </h3>

                {/* TARJETA */}
                <div className="max-w-sm mx-auto my-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white shadow-xl border border-purple-500/30 text-left text-xs">
                  <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
                    <span className="font-bubbly text-sm font-bold text-purple-300">🪽 PASAPORTE GO</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      OFICIAL
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Explorador:</span>
                      <span className="text-sm font-bold font-bubbly text-white">{formData.childName || 'Aventurero'}</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Talla:</span>
                        <span className="font-bold text-sky-300">{selectedAgeObj.recommendedSize}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Color:</span>
                        <span className="font-bold text-pink-300">{formData.preferredColor}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Cupón 15%:</span>
                        <span className="font-mono text-sm font-bold text-amber-300">{voucherCode}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{formData.parentEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
                  <a
                    href={generateMailto()}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bubbly font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Enviar Correo Directo</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bubbly font-bold text-xs flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reiniciar</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
