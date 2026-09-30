import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Feather } from 'lucide-react';
import SafeImage from './SafeImage';

export default function ShoeStudio({ onSelectModel }) {
  const [selectedAge, setSelectedAge] = useState('1-2'); // '1-2' | '3-5'
  const [selectedColor, setSelectedColor] = useState('cyan');

  const colorVariants = [
    {
      id: 'cyan',
      name: 'Turquesa Splash',
      hex: '#38BDF8',
      tag: 'El favorito de playa y charcos',
    },
    {
      id: 'coral',
      name: 'Coral Aventura',
      hex: '#FB7185',
      tag: 'Energía y diversión en el parque',
    },
    {
      id: 'green',
      name: 'Verde Salvia',
      hex: '#34D399',
      tag: 'Camuflaje para exploradores',
    },
    {
      id: 'yellow',
      name: 'Mostaza Safari',
      hex: '#FBBF24',
      tag: 'Luz y visibilidad en todo terreno',
    },
    {
      id: 'purple',
      name: 'Gummy Purple',
      hex: '#A855F7',
      tag: 'Edición exclusiva GO con alas',
    },
  ];

  const currentColor = colorVariants.find(c => c.id === selectedColor) || colorVariants[0];

  const ageSpecs = {
    '1-2': {
      title: 'Etapa 1: Primeros Pasitos (12 a 24 meses)',
      subtitle: 'Enfoque en propiocepción sensorial y equilibrio natural',
      weight: '75 gramos',
      soleThickness: '1.2 mm ultra-flexible',
      benefits: [
        'Suela delgada para estimulación sensorial directa con el suelo',
        'Puntera ancha que evita la atrofia del dedo gordo',
        'Cierre de velcro envolvente fácil para manitas curiosas',
        'Material antialérgico sin costuras internas que rocen'
      ]
    },
    '3-5': {
      title: 'Etapa 2: Exploradores Activos (3 a 5 años)',
      subtitle: 'Enfoque en resistencia al impacto, salto y velocidad todo terreno',
      weight: '92 gramos',
      soleThickness: '2.0 mm con refuerzo de grafeno',
      benefits: [
        'Tracción All-Terrain para rocas, barro y asfalto urbano',
        'Puntera reforzada que resiste frenadas con patinete o bici',
        'Orificios de ventilación con evacuación instantánea de agua',
        '100% lavable a máquina: sal del charco directo a secar'
      ]
    }
  };

  const currentAgeInfo = ageSpecs[selectedAge];

  return (
    <section 
      id="variaciones" 
      className="relative w-full h-screen h-[100dvh] snap-start snap-always shrink-0 bg-gradient-to-b from-[#FAFAF5] via-white to-[#F0F9FF] overflow-hidden flex flex-col justify-center px-4 sm:px-8 py-6"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center h-full max-h-[850px]">
        
        {/* ENCABEZADO DE LA DIAPOSITIVA */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold font-bubbly mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>SHOWCASE INTERACTIVO DE MODELOS</span>
          </div>

          <h2 className="font-bubbly text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Un zapatito para cada etapa y personalidad
          </h2>

          {/* SELECTOR DE EDAD */}
          <div className="flex justify-center mt-3">
            <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 shadow-inner">
              <button
                onClick={() => setSelectedAge('1-2')}
                className={`relative px-5 py-2 rounded-xl font-bubbly text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedAge === '1-2' ? 'text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {selectedAge === '1-2' && (
                  <motion.div
                    layoutId="ageTabHighlight"
                    className="absolute inset-0 rounded-xl bg-purple-600 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  👶 1 a 2 Años (Primeros Pasos)
                </span>
              </button>

              <button
                onClick={() => setSelectedAge('3-5')}
                className={`relative px-5 py-2 rounded-xl font-bubbly text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedAge === '3-5' ? 'text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {selectedAge === '3-5' && (
                  <motion.div
                    layoutId="ageTabHighlight"
                    className="absolute inset-0 rounded-xl bg-purple-600 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  🏃 3 a 5 Años (Exploradores)
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* VISUALIZADOR PRINCIPAL INTERACTIVO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1 max-h-[520px]">
          
          {/* COLUMNA IZQUIERDA: VISUAL DEL ZAPATO */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <div className="relative rounded-3xl bg-gradient-to-tr from-sky-50 via-white to-sky-100/60 p-6 sm:p-8 border border-sky-100 shadow-xl flex flex-col items-center justify-between overflow-hidden h-full">
              
              <div className="w-full flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
                  {currentColor.tag}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                  <Feather className="w-3.5 h-3.5" />
                  <span>{currentAgeInfo.weight}</span>
                </span>
              </div>

              {/* Resplandor de color */}
              <motion.div
                animate={{
                  backgroundColor: currentColor.hex,
                  opacity: [0.18, 0.28, 0.18]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none"
              />

              {/* Zapatilla interactiva con filtro de color en tiempo real */}
              <div className="relative w-full max-w-sm my-auto py-2 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedColor}-${selectedAge}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full flex items-center justify-center"
                  >
                    <div 
                      className="relative w-full flex items-center justify-center transition-all duration-400"
                      style={{
                        filter: selectedColor === 'coral' 
                          ? 'hue-rotate(150deg) saturate(1.2)' 
                          : selectedColor === 'green'
                          ? 'hue-rotate(240deg) saturate(1.1)'
                          : selectedColor === 'yellow'
                          ? 'hue-rotate(185deg) brightness(1.15) saturate(1.3)'
                          : selectedColor === 'purple'
                          ? 'hue-rotate(80deg) saturate(1.3)'
                          : 'none'
                      }}
                    >
                      <SafeImage
                        src="/assets/zapatilla.png"
                        alt={`Zapatilla GO ${currentColor.name}`}
                        className="w-full h-auto max-h-[260px] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)]"
                        fallback={
                          <img
                            src="/assets/design-reference.png"
                            alt="Diseño GO"
                            className="w-full h-auto max-h-[220px] object-contain rounded-xl"
                          />
                        }
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SWATCHES DE COLOR */}
              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between gap-2 z-10">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Color</span>
                  <span className="text-sm font-bold text-slate-800 font-bubbly">{currentColor.name}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {colorVariants.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedColor(item.id)}
                      className={`relative w-8 h-8 rounded-full transition-transform cursor-pointer focus:outline-none ${
                        selectedColor === item.id ? 'scale-120 ring-2 ring-offset-2 ring-purple-500 shadow-md' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.hex }}
                      aria-label={`Seleccionar color ${item.name}`}
                    >
                      {selectedColor === item.id && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* COLUMNA DERECHA: ESPECIFICACIONES */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <motion.div
              key={selectedAge}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between h-full"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  Ficha Podológica
                </span>
                <h3 className="font-bubbly text-xl sm:text-2xl font-bold text-slate-800">
                  {currentAgeInfo.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5 mb-4 font-medium">
                  {currentAgeInfo.subtitle}
                </p>

                <div className="space-y-2.5 mb-5">
                  {currentAgeInfo.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-slate-700 text-xs sm:text-sm font-medium leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] text-slate-400 font-bold block">Grosor de Suela</span>
                    <span className="font-bubbly text-sm font-bold text-purple-700">
                      {currentAgeInfo.soleThickness}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] text-slate-400 font-bold block">Tecnología</span>
                    <span className="font-bubbly text-sm font-bold text-sky-600">
                      Grafeno Antifricción
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={() => onSelectModel({ age: selectedAge, color: currentColor.name })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bubbly text-base font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>¡Elegir este modelo para mi peque!</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
