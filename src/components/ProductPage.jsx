import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Layers, 
  Footprints, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Star,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import SafeImage from './SafeImage';

export default function ProductPage({ 
  initialColor = 'Azul Océano', 
  onBack, 
  onBuyNow 
}) {
  const colorVariants = [
    {
      id: 'azul',
      name: 'Azul Océano',
      hex: '#3B82F6',
      tag: 'Playa y charcos',
      imgFront: '/assets/azul_frente_webp.webp',
      imgBack: '/assets/azul_atras_webp.webp',
    },
    {
      id: 'rosa',
      name: 'Rosa Pastel',
      hex: '#F472B6',
      tag: 'Dulce y activo',
      imgFront: '/assets/rosa_frente_webp.webp',
      imgBack: '/assets/rosa_atras_webp.webp',
    },
    {
      id: 'verde',
      name: 'Verde Salvia',
      hex: '#34D399',
      tag: 'Naturaleza y campo',
      imgFront: '/assets/verde_frente_webp.webp',
      imgBack: '/assets/verde_atras_webp.webp',
    },
    {
      id: 'naranja',
      name: 'Naranja Safari',
      hex: '#FB923C',
      tag: 'Energía y sol',
      imgFront: '/assets/naranja_frente_webp.webp',
      imgBack: '/assets/naranja_atras_webp.webp',
    },
    {
      id: 'morado',
      name: 'Morado Gummy',
      hex: '#A855F7',
      tag: 'Edición GO especial',
      imgFront: '/assets/morado_frente_webp.webp',
      imgBack: '/assets/morado_atras_webp.webp',
    },
    {
      id: 'gris',
      name: 'Gris Urbano',
      hex: '#94A3B8',
      tag: 'Elegante y neutral',
      imgFront: '/assets/gris_frente_webp.webp',
      imgBack: '/assets/gris_atras_webp.webp',
    },
  ];

  // Estado del color seleccionado (inicia con el color que trajo de la portada)
  const initialIndex = Math.max(0, colorVariants.findIndex(c => c.name === initialColor));
  const [selectedColorIndex, setSelectedColorIndex] = useState(initialIndex);
  const currentColor = colorVariants[selectedColorIndex];

  // Tallas disponibles
  const sizes = [
    { num: '19', age: '10-12m', mm: '118 mm', stage: '1-2' },
    { num: '20', age: '12-15m', mm: '125 mm', stage: '1-2' },
    { num: '21', age: '15-18m', mm: '132 mm', stage: '1-2' },
    { num: '22', age: '18-24m', mm: '138 mm', stage: '3-5' },
    { num: '23', age: '2-2.5a', mm: '145 mm', stage: '3-5' },
    { num: '24', age: '2.5-3a', mm: '152 mm', stage: '3-5' },
    { num: '25', age: '3-4a',   mm: '158 mm', stage: '3-5' },
    { num: '26', age: '4-5a',   mm: '165 mm', stage: '3-5' },
  ];

  const [selectedSize, setSelectedSize] = useState('21');
  const [selectedStageTab, setSelectedStageTab] = useState('1-2'); // '1-2' | '3-5'
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal de los 3 beneficios

  // 3 Diferenciadores oficiales de Gogumi con colores distintivos
  const differentiators = [
    {
      id: 'graphene',
      Icon: Layers,
      title: 'Suela de Grafeno 1-2 mm',
      badge: 'Zero-Drop Real',
      desc: 'Capa nanométrica ultradelgada e indestructible. Permite la estimulación neurosensorial directa del suelo mientras protege contra la abrasión.',
      cardBg: 'bg-amber-400/20 hover:bg-amber-400/30 border-amber-300/60 shadow-amber-950/10',
      iconBg: 'bg-amber-400/35 text-amber-100',
      badgeStyle: 'bg-amber-300/30 text-amber-100 border-amber-300/60',
      footerStyle: 'text-amber-200'
    },
    {
      id: 'barefoot',
      Icon: Footprints,
      title: 'Horma Barefoot Ergonómica',
      badge: 'Salud Podológica',
      desc: 'Puntera anatómica extra ancha en forma de abanico. Permite que los dedos crezcan libres y sin compresión, previniendo el pie plano.',
      cardBg: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-300/60 shadow-purple-950/10',
      iconBg: 'bg-purple-400/35 text-purple-100',
      badgeStyle: 'bg-purple-300/30 text-purple-100 border-purple-300/60',
      footerStyle: 'text-purple-200'
    },
    {
      id: 'bioflex',
      Icon: Zap,
      title: 'Suela Bio-Flex Todo Terreno',
      badge: 'Tracción 360°',
      desc: 'Grip antideslizante flexible que acompaña la torsión biomecánica natural del pie en rocas húmedas, charcos y césped.',
      cardBg: 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-300/60 shadow-emerald-950/10',
      iconBg: 'bg-emerald-400/35 text-emerald-100',
      badgeStyle: 'bg-emerald-300/30 text-emerald-100 border-emerald-300/60',
      footerStyle: 'text-emerald-200'
    }
  ];

  const handleCheckoutClick = () => {
    if (onBuyNow) {
      onBuyNow({
        color: currentColor.name,
        colorHex: currentColor.hex,
        size: selectedSize,
        price: 149,
        originalPrice: 189,
        imgFront: currentColor.imgFront,
        imgBack: currentColor.imgBack,
      });
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-800 select-none relative"
      style={{
        background: 'linear-gradient(rgb(49 186 247) 0%, rgb(80 194 212) 45%, rgb(156, 212, 215) 100%)'
      }}
    >
      {/* Nubes de fondo sutiles */}
      <div className="absolute top-10 -left-20 w-80 h-40 bg-white/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-48 bg-white/40 rounded-full blur-3xl pointer-events-none" />

      {/* CAPA: SUELO ESTÁTICO DE FONDO AL 100% DE ANCHO Y 100% DE OPACIDAD SIN RECORTES */}
      <div className="absolute bottom-0 left-0 right-0 w-full min-w-full pointer-events-none z-0 flex items-end justify-center overflow-hidden">
        <SafeImage
          src="/assets/suelo_webp.webp"
          alt="Terreno y rocas de fondo"
          className="w-full min-w-full h-auto object-cover -scale-x-100 drop-shadow-2xl"
          style={{ transform: 'translate(0px, 300px)' }}
          fallback={
            <div className="w-full h-48 bg-gradient-to-t from-emerald-950/80 to-transparent" />
          }
        />
      </div>

      {/* HEADER / NAVBAR DE LA PÁGINA DE PRODUCTO */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-3 bg-white/20 backdrop-blur-md border-b border-white/50 flex items-center justify-between shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 hover:bg-white/70 border border-white/70 text-sky-950 font-bubbly text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver al inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <img 
            src="/assets/logo-go.png" 
            alt="Logo GO" 
            className="h-8 sm:h-9 w-auto object-contain" 
          />
        </div>

        <div className="flex items-center gap-2">
          {/* BOTÓN "i" DE INFORMACIÓN */}
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/30 hover:bg-white/50 border border-white/70 text-white font-bubbly text-xs font-bold shadow-sm transition-all cursor-pointer group"
            title="Conoce los 3 beneficios de Go Gumi"
          >
            <span className="w-4 h-4 rounded-full bg-white text-sky-950 flex items-center justify-center font-black text-[11px] group-hover:scale-110 transition-transform">
              i
            </span>
            <span className="hidden sm:inline">3 Beneficios</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm border border-white/60 text-xs font-semibold text-white drop-shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Preventa 15% OFF</span>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL AL ANCHO TOTAL */}
      <main className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 flex-1 flex flex-col justify-center relative z-10">
        
        {/* BREADCRUMB */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/90 font-medium mb-4">
          <button onClick={onBack} className="hover:underline cursor-pointer">Inicio</button>
          <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          <span>Calzado Infantil Barefoot</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          <span className="font-bold text-white">GO ErgoFlex — {currentColor.name}</span>
        </div>

        {/* GRID PRINCIPAL: ESCENARIO DUAL DE IMÁGENES + PANEL DE COMPRA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ============================================================== */}
          {/* COLUMNA IZQUIERDA: ESCENARIO DUAL DE IMÁGENES (FRENTE Y ATRÁS) */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* ESCENARIO DUAL DE IMÁGENES LIMPIAS SIN CONTENEDOR (Frente izquierda, Atrás derecha) */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-8 md:gap-10 w-full items-center justify-items-center py-2 sm:py-4">
              
              {/* 1. Imagen Frente (Izquierda) */}
              <motion.div 
                key={`front-${currentColor.id}`}
                initial={{ opacity: 0, x: -25, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center w-full"
              >
                <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[340px] md:max-w-[390px] flex items-center justify-center group cursor-pointer">
                  <SafeImage
                    src={currentColor.imgFront}
                    alt={`Zapatilla GO ${currentColor.name} - Frente`}
                    className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>

              {/* 2. Imagen Atrás (Derecha) */}
              <motion.div 
                key={`back-${currentColor.id}`}
                initial={{ opacity: 0, x: 25, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                className="flex items-center justify-center w-full"
              >
                <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[340px] md:max-w-[390px] flex items-center justify-center group cursor-pointer">
                  <SafeImage
                    src={currentColor.imgBack}
                    alt={`Zapatilla GO ${currentColor.name} - Posterior`}
                    className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>

            </div>

            {/* Micro-guía de inspección */}
            <div className="flex items-center gap-2 mt-3 text-xs text-white/90 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Calzado 100% anatómico • Hecho para el desarrollo podológico infantil</span>
            </div>

          </div>

          {/* ============================================================== */}
          {/* COLUMNA DERECHA: ESPECIFICACIONES, TALLAS Y COMPRA LLAMATIVA */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* TARJETA PRINCIPAL DE COMPRA EN VIDRIO LÍQUIDO */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/25 backdrop-blur-md border border-white/60 shadow-xl shadow-sky-950/10 text-white">
              
              {/* TÍTULO Y PRECIO */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-300/30 border border-yellow-200/60 text-yellow-100 text-[10px] font-bold uppercase tracking-wider">
                    Preventa Exclusiva
                  </span>
                  <div className="flex items-center gap-1 text-yellow-200 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    <span>4.9 (128 reseñas)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mt-1">
                  <h1 className="font-bubbly text-2xl sm:text-3xl font-extrabold text-white drop-shadow-sm">
                    GO Barefoot ErgoFlex
                  </h1>
                  
                  {/* BOTÓN "i" DE INFORMACIÓN */}
                  <button
                    onClick={() => setIsInfoModalOpen(true)}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/25 hover:bg-white/45 border border-white/60 text-white font-bubbly text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 group shrink-0"
                    title="Conoce los 3 beneficios clave"
                  >
                    <span className="w-4 h-4 rounded-full bg-white text-sky-950 flex items-center justify-center font-black text-[11px] group-hover:scale-110 transition-transform">
                      i
                    </span>
                    <span className="hidden sm:inline text-[11px]">3 Beneficios</span>
                  </button>
                </div>

                {/* Precios */}
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-bubbly text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                    S/ 149.00
                  </span>
                  <span className="text-base sm:text-lg text-white/70 line-through font-semibold">
                    S/ 189.00
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/80 text-white text-xs font-bold shadow-sm">
                    Ahorras S/ 40
                  </span>
                </div>
              </div>

              {/* SELECTOR DE COLOR */}
              <div className="mt-4 pt-4 border-t border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white drop-shadow-sm">
                    Color: <span className="font-bubbly font-normal text-white/95">{currentColor.name}</span>
                  </span>
                  <span className="text-[11px] text-white/80">• {currentColor.tag}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {colorVariants.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`relative w-8 h-8 rounded-full transition-transform cursor-pointer focus:outline-none ${
                        selectedColorIndex === idx
                          ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-sky-400 shadow-md'
                          : 'hover:scale-110 opacity-75 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={`Seleccionar ${c.name}`}
                    >
                      {selectedColorIndex === idx && (
                        <Check className="w-4 h-4 text-white absolute inset-0 m-auto stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECTOR DE TALLA */}
              <div className="mt-4 pt-4 border-t border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white drop-shadow-sm">
                    Selecciona la Talla:
                  </span>
                  
                  {/* Tabs de etapas de edad */}
                  <div className="flex items-center gap-1 bg-white/20 p-0.5 rounded-lg border border-white/40">
                    <button
                      onClick={() => setSelectedStageTab('1-2')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        selectedStageTab === '1-2' ? 'bg-white text-sky-950 shadow-sm' : 'text-white/80'
                      }`}
                    >
                      1 a 2 años
                    </button>
                    <button
                      onClick={() => setSelectedStageTab('3-5')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        selectedStageTab === '3-5' ? 'bg-white text-sky-950 shadow-sm' : 'text-white/80'
                      }`}
                    >
                      3 a 5 años
                    </button>
                  </div>
                </div>

                {/* Grid de botones de tallas */}
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSize === s.num;
                    const isHighlightStage = s.stage === selectedStageTab;
                    return (
                      <button
                        key={s.num}
                        onClick={() => setSelectedSize(s.num)}
                        className={`relative p-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-white text-sky-950 shadow-lg ring-2 ring-white scale-105 font-bold'
                            : isHighlightStage
                            ? 'bg-white/30 hover:bg-white/50 text-white border border-white/60'
                            : 'bg-white/10 hover:bg-white/25 text-white/70 border border-white/20'
                        }`}
                      >
                        <span className="font-bubbly text-sm sm:text-base font-bold">
                          {s.num}
                        </span>
                        <span className={`text-[9px] ${isSelected ? 'text-sky-800' : 'text-white/80'}`}>
                          {s.age}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/90 mt-2">
                  <span>Largo del pie sugerido: <strong>{sizes.find(s => s.num === selectedSize)?.mm}</strong></span>
                  <span className="text-emerald-300 font-semibold">✓ Stock disponible</span>
                </div>
              </div>

              {/* BOTÓN LLAMATIVO DE COMPRAR */}
              <div className="mt-5">
                <motion.button
                  onClick={handleCheckoutClick}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 20px 35px -5px rgba(14, 165, 233, 0.4)" 
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 hover:from-yellow-200 hover:to-orange-300 text-sky-950 font-bubbly text-base sm:text-lg font-black tracking-wide uppercase shadow-xl shadow-sky-950/20 flex items-center justify-center gap-3 transition-all cursor-pointer border-2 border-white/80"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  <span>COMPRAR AHORA — S/ 149.00</span>
                </motion.button>

                <p className="text-center text-[10px] text-white/80 mt-2 font-medium">
                  🔒 Pago 100% seguro • Envíos gratis a todo el Perú en preventa
                </p>
              </div>

              {/* BENEFICIOS DE CONFIANZA */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/30 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-white mb-1" />
                  <span className="text-[10px] font-bold text-white">Envío Gratis</span>
                  <span className="text-[9px] text-white/80">Todo el país</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-white mb-1" />
                  <span className="text-[10px] font-bold text-white">30 Días</span>
                  <span className="text-[9px] text-white/80">Adaptación libre</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-white mb-1" />
                  <span className="text-[10px] font-bold text-white">Salud Podológica</span>
                  <span className="text-[9px] text-white/80">Previene pie plano</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ============================================================== */}
      {/* MODAL DE INFORMACIÓN (3 BENEFICIOS CLAVE) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop con blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
            />

            {/* Ventana Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-sky-900/95 via-sky-950/95 to-slate-950/98 border-2 border-white/40 shadow-2xl p-6 sm:p-8 text-white z-10 my-auto"
            >
              {/* Botón cerrar X */}
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Encabezado del Modal */}
              <div className="text-center max-w-xl mx-auto mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-bubbly font-bold text-yellow-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>TECNOLOGÍA & ANATOMÍA INFANTIL</span>
                </div>
                <h3 className="font-bubbly text-2xl sm:text-3xl font-black text-white">
                  ¿Por qué elegir GO Gumi para tu pequeño?
                </h3>
                <p className="text-xs sm:text-sm text-white/85 font-medium mt-1">
                  3 pilares de innovación diseñados para el desarrollo podológico y motor de 1 a 5 años.
                </p>
              </div>

              {/* Parrilla de los 3 Diferenciadores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {differentiators.map((diff) => {
                  const DiffIcon = diff.Icon;
                  return (
                    <div 
                      key={diff.id}
                      className={`p-5 rounded-2xl border backdrop-blur-md transition-all flex flex-col justify-between ${diff.cardBg}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`p-2.5 rounded-xl ${diff.iconBg}`}>
                            <DiffIcon className="w-5 h-5 stroke-[2.5]" />
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${diff.badgeStyle}`}>
                            {diff.badge}
                          </span>
                        </div>
                        <h4 className="font-bubbly text-base font-bold text-white mb-1.5 drop-shadow-sm">
                          {diff.title}
                        </h4>
                        <p className="text-xs text-white/90 leading-relaxed font-medium">
                          {diff.desc}
                        </p>
                      </div>

                      <div className={`mt-4 pt-3 border-t border-white/20 flex items-center gap-1.5 text-[11px] font-bold`}>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span className={diff.footerStyle}>Beneficio médico comprobado</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botón de cierre en el pie */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsInfoModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/35 border border-white/50 text-white font-bubbly text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  Entendido, volver al producto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
