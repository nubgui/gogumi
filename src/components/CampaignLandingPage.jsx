import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  Check, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  ChevronRight, 
  Footprints, 
  Layers, 
  Zap, 
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Info,
  X,
  Eye,
  Heart,
  Quote
} from 'lucide-react';
import SafeImage from './SafeImage';

export default function CampaignLandingPage({ onBuyNow, onGoHome }) {
  // Parallax interactivo para hojas laterales decorativas al hacer scroll
  const { scrollY } = useScroll();
  const springConfig = { damping: 24, stiffness: 85 };

  // Hojas Lado Izquierdo (lado_iz)
  const yLeftGreen = useSpring(useTransform(scrollY, [0, 2500], [0, -220]), springConfig);
  const rotLeftGreen = useTransform(scrollY, [0, 2500], [0, 14]);

  const yLeftBlue = useSpring(useTransform(scrollY, [0, 2500], [0, -260]), springConfig);
  const rotLeftBlue = useTransform(scrollY, [0, 2500], [0, -12]);

  // Hojas Lado Derecho (lado_dr)
  const yRightBlue = useSpring(useTransform(scrollY, [0, 2500], [0, -320]), springConfig);
  const rotRightBlue = useTransform(scrollY, [0, 2500], [0, -16]);

  const yRightGreen = useSpring(useTransform(scrollY, [0, 2500], [0, -380]), springConfig);
  const rotRightGreen = useTransform(scrollY, [0, 2500], [0, 16]);

  // 6 Variantes de color de producto (las fotos reales de las zapatillas)
  const colorVariants = [
    {
      id: 'azul',
      name: 'Azul Océano',
      hex: '#3B82F6',
      tag: 'Playa y charcos',
      imgFront: '/assets/azul_frente_webp.webp',
      imgBack: '/assets/azul_atras_webp.webp',
      altFront: 'Zapatillas de bebe ergonómicas color Azul Océano Go Gumi',
      altBack: 'Suela antideslizante zero drop Azul Océano Go Gumi',
    },
    {
      id: 'rosa',
      name: 'Rosa Pastel',
      hex: '#F472B6',
      tag: 'Favorito para niñas',
      imgFront: '/assets/rosa_frente_webp.webp',
      imgBack: '/assets/rosa_atras_webp.webp',
      altFront: 'Zapatos para niñas ergonómicos Rosa Pastel Go Gumi',
      altBack: 'Suela antideslizante zero drop Rosa Pastel Go Gumi',
    },
    {
      id: 'verde',
      name: 'Verde Salvia',
      hex: '#34D399',
      tag: 'Naturaleza y parque',
      imgFront: '/assets/verde_frente_webp.webp',
      imgBack: '/assets/verde_atras_webp.webp',
      altFront: 'Zapatillas para bebés de 1 año Verde Salvia Go Gumi',
      altBack: 'Suela antideslizante zero drop Verde Salvia Go Gumi',
    },
    {
      id: 'naranja',
      name: 'Naranja Safari',
      hex: '#FB923C',
      tag: 'Primeros pasos activos',
      imgFront: '/assets/naranja_frente_webp.webp',
      imgBack: '/assets/naranja_atras_webp.webp',
      altFront: 'Zapatos para bebe que empiezan a caminar Naranja Safari',
      altBack: 'Suela antideslizante flexible Naranja Safari Go Gumi',
    },
    {
      id: 'morado',
      name: 'Morado Gummy',
      hex: '#A855F7',
      tag: 'Edición especial afiche',
      imgFront: '/assets/morado_frente_webp.webp',
      imgBack: '/assets/morado_atras_webp.webp',
      altFront: 'Zapatillas de bebe moradas anatómicas barefoot Go Gumi',
      altBack: 'Suela antideslizante zero drop Morado Gummy Go Gumi',
    },
    {
      id: 'gris',
      name: 'Gris Urbano',
      hex: '#94A3B8',
      tag: 'Neutral y elegante',
      imgFront: '/assets/gris_frente_webp.webp',
      imgBack: '/assets/gris_atras_webp.webp',
      altFront: 'Zapatos para bebe todoterreno Gris Urbano Go Gumi',
      altBack: 'Suela antideslizante zero drop Gris Urbano Go Gumi',
    },
  ];

  // Matriz de tallas por etapas anatómicas
  const sizes = [
    { num: '19', age: '9-12 m', mm: '118 mm', stage: '1-2' },
    { num: '20', age: '12-15 m', mm: '125 mm', stage: '1-2' },
    { num: '21', age: '15-18 m', mm: '132 mm', stage: '1-2' },
    { num: '22', age: '18-24 m', mm: '139 mm', stage: '1-2' },
    { num: '23', age: '2 a 2.5 a', mm: '146 mm', stage: '3-5' },
    { num: '24', age: '2.5 a 3 a', mm: '153 mm', stage: '3-5' },
    { num: '25', age: '3 a 4 a', mm: '160 mm', stage: '3-5' },
  ];

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('21');
  const [selectedStageTab, setSelectedStageTab] = useState('1-2');
  const [quantity, setQuantity] = useState(1);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAnatomicModalOpen, setIsAnatomicModalOpen] = useState(false);

  const currentColor = colorVariants[selectedColorIndex];

  // Precios y descuento redondeado al 20% para comunicación publicitaria (S/ 40 de ahorro real)
  const regularPrice = 189;
  const promoPrice = 149;
  const discountAmount = regularPrice - promoPrice;
  const discountPercent = 20;

  const handleCheckoutClick = () => {
    if (onBuyNow) {
      onBuyNow({
        color: currentColor.name,
        colorHex: currentColor.hex,
        size: selectedSize,
        quantity: quantity,
        price: promoPrice,
        originalPrice: regularPrice,
        imgFront: currentColor.imgFront,
        imgBack: currentColor.imgBack,
      });
    }
  };

  // Testimonios reales de mamás de la comunidad Go Gumi
  const momTestimonials = [
    {
      id: 1,
      name: 'Camila Rodríguez',
      location: 'Miraflores, Lima',
      momOf: 'Mamá de Mateo (14 meses)',
      stage: 'Primeros pasos',
      rating: 5,
      photo: '/assets/madre_1.jpg',
      avatarColor: 'bg-purple-100 text-[#5B21B6]',
      initials: 'CR',
      variantBought: 'Azul Océano • Talla 20',
      comment:
        'Mateo se tropezaba muchísimo con sus primeras zapatillas tradicionales porque eran pesadas y tiesas. Con Go Gumi el cambio fue inmediato: salió caminando con total estabilidad por la sala y se nota cómo abre sus deditos al pisar. ¡100% recomendadas!',
      highlight: 'Cero tropiezos desde el día 1',
    },
    {
      id: 2,
      name: 'Valeria Morales',
      location: 'Arequipa',
      momOf: 'Mamá de Sofía (2 años)',
      stage: 'Caminante activa',
      rating: 5,
      photo: '/assets/madre_2.jpg',
      avatarColor: 'bg-pink-100 text-pink-700',
      initials: 'VM',
      variantBought: 'Rosa Pastel • Talla 22',
      comment:
        'Nuestra pediatra nos recomendó calzado barefoot con puntera ancha para cuidar su arco plantar. Estas zapatillas son las únicas que no le dejan marcas rojas en los deditos y la suela es súper flexible. Además a Sofi le encanta ponérselas solita.',
      highlight: 'Recomendado por su pediatra',
    },
    {
      id: 3,
      name: 'Fiorella Gómez',
      location: 'Santiago de Surco, Lima',
      momOf: 'Mamá de Lucas (18 meses)',
      stage: 'Parque y exploración',
      rating: 5,
      photo: '/assets/madre_3.jpg',
      avatarColor: 'bg-amber-100 text-amber-800',
      initials: 'FG',
      variantBought: 'Morado Gummy • Talla 21',
      comment:
        'Tenía dudas con la talla pero la tabla de medidas en centímetros fue exacta. Es el único calzado que Lucas no intenta arrancarse desesperado a los 5 minutos; son ligeras como medias pero protegen excelente en el parque.',
      highlight: 'No intenta quitárselas',
    },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-800 select-none relative font-sans"
      style={{
        background: 'linear-gradient(145deg, #72DDF7 0%, #83E3ED 30%, #9EF1EA 65%, #C2FAF0 100%)'
      }}
    >
      {/* ============================================================== */}
      {/* CAPA 1: AMBIENTE, NUBES, ONDAS PAPER-CUT Y SUELO DE FONDO */}
      {/* ============================================================== */}

      {/* Nubes difuminadas suaves */}
      <div className="absolute top-12 -left-20 w-80 h-40 bg-white/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-48 bg-white/40 rounded-full blur-3xl pointer-events-none" />

      {/* Esquina Superior Derecha: Ondas Amarilla, Lavanda y Turquesa */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 lg:w-[480px] h-64 sm:h-80 md:h-96 lg:h-[480px] pointer-events-none select-none z-0 overflow-hidden">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <path d="M400 0C320 0 250 50 230 130C210 210 290 280 270 340C260 370 240 390 220 400H400V0Z" fill="#FDE047" fillOpacity="0.95" />
          <path d="M400 0C340 0 280 40 260 110C240 180 320 250 300 310C290 340 280 370 260 400H400V0Z" fill="#D8B4FE" fillOpacity="0.9" />
          <path d="M400 0C360 0 310 30 290 90C270 150 340 210 320 270C310 300 310 340 290 400H400V0Z" fill="#A5F3FC" fillOpacity="0.85" />
        </svg>
      </div>

      {/* Esquina Inferior Derecha: Ondas Papel Amarillo y Lavanda */}
      <div className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 pointer-events-none select-none z-0 overflow-hidden">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <path d="M400 400C320 400 260 360 250 290C240 220 310 160 300 90C295 55 280 25 260 0H400V400Z" fill="#FDE047" fillOpacity="0.95" />
          <path d="M400 400C345 400 295 365 285 305C275 245 330 185 320 125C315 95 310 50 290 0H400V400Z" fill="#C084FC" fillOpacity="0.9" />
          <path d="M400 400C365 400 325 375 315 325C305 275 345 220 335 165C330 135 330 80 315 0H400V400Z" fill="#A5F3FC" fillOpacity="0.85" />
        </svg>
      </div>

      {/* Suelo estático de fondo con rocas (Fiel al diseño de ProductPage) */}
      <div className="absolute bottom-0 left-0 right-0 w-full min-w-full pointer-events-none z-0 flex items-end justify-center overflow-hidden">
        <SafeImage
          src="/assets/suelo_webp.webp"
          alt="Terreno y rocas de fondo"
          className="w-full min-w-full h-auto object-cover -scale-x-100 drop-shadow-2xl opacity-90"
          style={{ transform: 'translate(0px, 300px)' }}
          fallback={
            <div className="w-full h-48 bg-gradient-to-t from-emerald-950/80 to-transparent" />
          }
        />
      </div>

      {/* Marca de agua sutil de pisada infantil */}
      <div className="absolute top-28 left-4 sm:left-8 opacity-15 pointer-events-none select-none z-0 text-purple-700">
        <svg width="120" height="180" viewBox="0 0 100 150" fill="currentColor">
          <path d="M35 15C38 8 45 5 50 8C55 11 54 18 50 22C46 25 40 24 37 20C35 18 34 16 35 15Z" />
          <path d="M58 20C62 14 68 13 72 17C75 21 73 27 68 30C64 32 59 30 57 26C56 24 57 22 58 20Z" />
          <path d="M72 32C76 27 82 28 85 32C87 37 84 43 80 44C76 46 71 43 70 39C69 36 71 34 72 32Z" />
          <path d="M80 50C83 46 88 47 90 51C92 55 89 60 86 61C83 62 79 59 78 56C78 54 79 52 80 50Z" />
          <path d="M45 40C30 55 25 80 32 105C38 125 50 140 60 145C68 142 70 128 68 110C65 92 68 70 65 52C62 40 52 35 45 40Z" />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* CAPA 2: HOJAS BOTÁNICAS CON PARALLAX (Bordes laterales) */}
      {/* ============================================================== */}
      {/* Hoja Verde Izquierda Superior */}
      <motion.div
        style={{ y: yLeftGreen, rotate: rotLeftGreen }}
        className="absolute top-[160px] sm:top-[200px] md:top-[230px] -left-14 sm:-left-20 md:-left-28 lg:-left-36 xl:-left-44 z-20 pointer-events-none select-none w-44 sm:w-60 md:w-80 lg:w-96 drop-shadow-2xl opacity-90 will-change-transform"
      >
        <motion.img
          src="/assets/hoja_verde_lado_iz.png"
          alt="Adorno botánico hoja verde lado izquierdo"
          animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Hoja Azul Derecha Superior */}
      <motion.div
        style={{ y: yRightBlue, rotate: rotRightBlue }}
        className="absolute top-[360px] sm:top-[420px] md:top-[460px] -right-14 sm:-right-20 md:-right-28 lg:-right-36 xl:-right-44 z-20 pointer-events-none select-none w-44 sm:w-60 md:w-80 lg:w-96 drop-shadow-2xl opacity-90 will-change-transform"
      >
        <motion.img
          src="/assets/hoja_azul_lado_dr.png"
          alt="Adorno botánico hoja azul lado derecho"
          animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Hoja Azul Izquierda Media */}
      <motion.div
        style={{ y: yLeftBlue, rotate: rotLeftBlue }}
        className="absolute top-[1050px] sm:top-[1200px] md:top-[1300px] -left-16 sm:-left-24 md:-left-36 lg:-left-44 xl:-left-52 z-20 pointer-events-none select-none w-48 sm:w-64 md:w-84 lg:w-[400px] drop-shadow-2xl opacity-90 will-change-transform"
      >
        <motion.img
          src="/assets/hoja_azul_lado_iz.png"
          alt="Adorno botánico hoja azul lado izquierdo"
          animate={{ y: [0, -12, 0], rotate: [0, -1.8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Hoja Verde Derecha Inferior */}
      <motion.div
        style={{ y: yRightGreen, rotate: rotRightGreen }}
        className="absolute top-[1650px] sm:top-[1800px] md:top-[1950px] -right-16 sm:-right-24 md:-right-36 lg:-right-44 xl:-right-52 z-20 pointer-events-none select-none w-48 sm:w-64 md:w-84 lg:w-[400px] drop-shadow-2xl opacity-90 will-change-transform"
      >
        <motion.img
          src="/assets/hoja_verde_lado_dr.png"
          alt="Adorno botánico hoja verde lado derecho"
          animate={{ y: [0, 10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* ============================================================== */}
      {/* 1. BARRA SUPERIOR DE CAMPAÑA GOOGLE ADS */}
      {/* ============================================================== */}
      <div className="w-full bg-[#5B21B6] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between border-b border-purple-400/30 relative z-50 shadow-md">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
          <span className="font-bubbly font-bold tracking-wide">
            PROMO EXCLUSIVA GOOGLE ADS: <span className="text-yellow-300">{discountPercent}% OFF PREVENTA</span> (Ahorras S/ {discountAmount * quantity}.00)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-purple-100 text-[11px] font-medium">
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-yellow-300" /> Envíos gratis a todo el Perú</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Cambio de talla 100% gratis</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. HEADER VIDRIO LÍQUIDO CON LOGO GO GUMI */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-3 bg-white/70 backdrop-blur-md border-b border-white/60 flex items-center justify-between shadow-xs">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white border border-purple-200 text-[#5B21B6] font-bubbly text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer group"
          title="Regresar a la página principal"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#5B21B6]" />
          <span>Volver al inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <img 
            src="/assets/logo-go.png" 
            alt="Logo GO GUMI" 
            className="h-8 sm:h-10 w-auto object-contain drop-shadow-sm" 
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#5B21B6] font-bubbly text-xs font-bold shadow-xs transition-all cursor-pointer group"
            title="Conoce los 3 beneficios de Go Gumi"
          >
            <span className="w-4 h-4 rounded-full bg-[#5B21B6] text-white flex items-center justify-center font-black text-[11px] group-hover:scale-110 transition-transform">
              i
            </span>
            <span className="hidden sm:inline">3 Beneficios</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FBBF24] border border-amber-300 text-xs font-bubbly font-black text-slate-950 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-900" />
            <span>20% OFF Activo</span>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. HERO PRINCIPAL: "CADA PIE ES ÚNICO Y MERECE CRECER LIBRE" */}
      {/* ============================================================== */}
      <main className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 flex-1 flex flex-col justify-center relative z-10">
        
        {/* Cabecera Principal con la Estética del Flyer */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-700/80 font-medium mb-3">
            <button onClick={onGoHome} className="hover:underline cursor-pointer">Inicio</button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span>Campaña SEM</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="font-bold text-[#5B21B6]">Preventa 20% OFF</span>
          </div>

          {/* Doodles y Titular Principal */}
          <div className="relative inline-block px-4">
            
            {/* Sol radiante a la izquierda */}
            <div className="absolute -top-3 -left-3 sm:-left-6 flex items-center gap-1 text-amber-500 font-bold text-lg select-none">
              <span className="rotate-[-20deg]">☀️</span>
            </div>

            {/* Titular Principal con Tipografía del Flyer */}
            <h1 className="font-bubbly text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              <span className="text-[#5B21B6] drop-shadow-xs">Cada pie es único </span>
              <br className="hidden sm:inline" />
              <span className="text-[#087E8B] drop-shadow-xs">y merece crecer libre</span>
            </h1>

            {/* Destellos a la derecha */}
            <div className="absolute -top-2 -right-3 sm:-right-6 flex items-center gap-1 text-purple-600 font-bold text-lg select-none">
              <span className="rotate-[20deg]">✨</span>
            </div>
          </div>

          <p className="mt-3 text-sm sm:text-base text-slate-700 font-medium max-w-2xl mx-auto">
            El calzado respetuoso Go Gumi con horma ancha que respeta la forma de abanico del pie de 1 a 5 años. Previene el pie plano y asegura sus primeros pasos.
          </p>

        </div>

        {/* ============================================================== */}
        {/* GRID PRINCIPAL: FOTOS DE PRODUCTO DUALES + CAJA DE COMPRA */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          
          {/* ============================================================== */}
          {/* COLUMNA IZQUIERDA (7 cols): FOTOS REALES DE PRODUCTO + 3 PÍLDORAS */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Escenario dual de fotos de producto limpias (Frente y Suela) con cambio dinámico de color */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full items-center justify-items-center py-2 sm:py-4">
              
              {/* 1. Imagen Frente (Izquierda) */}
              <motion.div 
                key={`front-${currentColor.id}`}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center justify-center w-full"
              >
                <div className="relative w-full aspect-square max-w-[270px] sm:max-w-[330px] md:max-w-[370px] flex items-center justify-center group cursor-pointer">
                  <SafeImage
                    src={currentColor.imgFront}
                    alt={currentColor.altFront}
                    className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 px-3 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-purple-200 text-[10px] sm:text-[11px] font-bubbly font-bold text-[#5B21B6] shadow-xs">
                    Vista Frontal • {currentColor.name}
                  </span>
                </div>
              </motion.div>

              {/* 2. Imagen Atrás / Suela (Derecha) */}
              <motion.div 
                key={`back-${currentColor.id}`}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                className="flex items-center justify-center w-full"
              >
                <div className="relative w-full aspect-square max-w-[270px] sm:max-w-[330px] md:max-w-[370px] flex items-center justify-center group cursor-pointer">
                  <SafeImage
                    src={currentColor.imgBack}
                    alt={currentColor.altBack}
                    className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 px-3 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-purple-200 text-[10px] sm:text-[11px] font-bubbly font-bold text-[#5B21B6] shadow-xs">
                    Suela Grafeno Zero-Drop
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Selector de Miniaturas de Color Rápido bajo las fotos */}
            <div className="flex items-center gap-2 mt-1 mb-4 bg-white/70 backdrop-blur-md p-1.5 px-3.5 rounded-full border border-purple-200 shadow-xs">
              <span className="text-[11px] font-bubbly font-bold text-[#5B21B6] mr-1 hidden sm:inline">Colores disponibles:</span>
              {colorVariants.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full relative transition-all cursor-pointer focus:outline-none ${
                    selectedColorIndex === idx
                      ? 'scale-115 ring-2 ring-[#5B21B6] ring-offset-2 shadow-sm'
                      : 'opacity-75 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`Ver fotos en color ${c.name}`}
                  aria-label={`Ver fotos en color ${c.name}`}
                >
                  {selectedColorIndex === idx && (
                    <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto stroke-[3]" />
                  )}
                </button>
              ))}
              <span className="text-[11px] font-bold text-slate-800 ml-1.5">
                {currentColor.name}
              </span>
            </div>

            {/* LAS 3 PÍLDORAS CLAVE DEL FLYER DE GO GUMI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              
              {/* Píldora 1: Puntera anatómica extra ancha (Morado) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/85 backdrop-blur-md border-2 border-purple-200 shadow-md shadow-purple-900/5 cursor-default"
              >
                <div className="w-9 h-9 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Footprints className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bubbly text-xs sm:text-[13px] font-black text-slate-900 leading-tight">
                    Puntera anatómica extra ancha
                  </span>
                  <span className="text-[10px] text-purple-700 font-bold mt-0.5">
                    Libertad en abanico 👣
                  </span>
                </div>
              </motion.div>

              {/* Píldora 2: Más comodidad para los dedos (Amarillo) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/85 backdrop-blur-md border-2 border-amber-200 shadow-md shadow-amber-900/5 cursor-default"
              >
                <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bubbly text-xs sm:text-[13px] font-black text-slate-900 leading-tight">
                    Más comodidad para los dedos
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold mt-0.5">
                    Cero compresión ósea ☀️
                  </span>
                </div>
              </motion.div>

              {/* Píldora 3: Movimiento natural (Cyan/Turquesa) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/85 backdrop-blur-md border-2 border-cyan-200 shadow-md shadow-cyan-900/5 cursor-default"
              >
                <div className="w-9 h-9 rounded-full bg-[#06B6D4] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bubbly text-xs sm:text-[13px] font-black text-slate-900 leading-tight">
                    Movimiento natural
                  </span>
                  <span className="text-[10px] text-cyan-700 font-bold mt-0.5">
                    Suela de grafeno 1-2 mm 🚀
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Botón para ver la radiografía/demostración anatómica (Modal) */}
            <div className="mt-3.5 flex items-center justify-between w-full flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsAnatomicModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-bubbly font-bold text-[#5B21B6] border border-purple-200 shadow-xs transition-all cursor-pointer group"
              >
                <Eye className="w-3.5 h-3.5 text-[#5B21B6] group-hover:scale-110 transition-transform" />
                <span>Demostración de dedos en abanico</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Calzado 100% respetuoso y barefoot</span>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* COLUMNA DERECHA (5 cols): CAJA DE COMPRA EN ESTILO FLYER GO GUMI */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="rounded-[32px] bg-white/95 backdrop-blur-xl border-2 border-purple-200/80 p-6 sm:p-7 shadow-2xl shadow-purple-950/10">
              
              {/* Badge de Oferta 20% OFF */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FDE047] text-purple-950 font-bubbly text-xs font-black border border-amber-300 inline-flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-purple-900" />
                  PREVENTA EXCLUSIVA 20% OFF
                </span>
                <span className="text-xs font-bold text-rose-600 animate-pulse">
                  ¡Solo 25 pares con descuento!
                </span>
              </div>

              {/* Título de Producto */}
              <h2 className="font-bubbly text-2xl sm:text-3xl font-black text-[#5B21B6] leading-tight">
                Go Gumi Barefoot ErgoFlex
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Edición Todo Terreno para bebés y niños (1 a 5 años)
              </p>

              {/* Precios Claros con Ahorro de S/ 40 por par */}
              <div className="mt-4 p-4 rounded-2xl bg-purple-50/80 border border-purple-200/90 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bubbly text-3xl sm:text-4xl font-black text-[#5B21B6]">
                      S/ {(promoPrice * quantity).toFixed(2)}
                    </span>
                    <span className="text-base text-slate-400 line-through font-semibold">
                      S/ {(regularPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-[#087E8B] font-bold mt-1">
                    🎉 Ahorras S/ {discountAmount * quantity}.00 con esta promoción ({discountPercent}% de descuento)
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#5B21B6] text-white font-bubbly text-xs font-black shadow-xs">
                  -20%
                </div>
              </div>

              {/* Selector de Color en la Tarjeta */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bubbly font-bold text-slate-800">
                    Color: <span className="font-normal text-[#5B21B6] font-bold">{currentColor.name}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">• {currentColor.tag}</span>
                </div>

                <div className="flex items-center gap-2">
                  {colorVariants.map((c, idx) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-8 h-8 rounded-full relative transition-all cursor-pointer focus:outline-none ${
                        selectedColorIndex === idx
                          ? 'scale-120 ring-2 ring-[#5B21B6] ring-offset-2 shadow-sm'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={`Seleccionar ${c.name}`}
                    >
                      {selectedColorIndex === idx && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Tallas con Etapas */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bubbly font-bold text-slate-800">
                    Selecciona la Talla del Bebé:
                  </span>
                  
                  {/* Tabs de etapas de edad */}
                  <div className="flex items-center gap-1 bg-purple-50 p-0.5 rounded-lg border border-purple-200">
                    <button
                      type="button"
                      onClick={() => setSelectedStageTab('1-2')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        selectedStageTab === '1-2' ? 'bg-[#5B21B6] text-white shadow-xs' : 'text-purple-900'
                      }`}
                    >
                      1 a 2 años
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedStageTab('3-5')}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        selectedStageTab === '3-5' ? 'bg-[#5B21B6] text-white shadow-xs' : 'text-purple-900'
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
                        type="button"
                        onClick={() => setSelectedSize(s.num)}
                        className={`p-2 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#5B21B6] text-white border-[#5B21B6] shadow-md ring-2 ring-purple-300 scale-103 font-bold'
                            : isHighlightStage
                            ? 'bg-purple-50/80 hover:bg-purple-100 text-purple-900 border-purple-200'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span className="font-bubbly text-sm font-bold">{s.num}</span>
                        <span className={`text-[9px] ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                          {s.age}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2">
                  <span>Largo de pie sugerido: <strong>{sizes.find(s => s.num === selectedSize)?.mm}</strong></span>
                  <span className="text-emerald-700 font-bold">✓ Stock de preventa disponible</span>
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Cantidad:</span>
                  <span className="text-[11px] text-slate-500">
                    {quantity} {quantity === 1 ? 'par en preventa' : 'pares en preventa'}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-purple-50 p-1 rounded-xl border border-purple-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-lg bg-white text-[#5B21B6] font-bold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <span className="font-bubbly text-sm font-black text-[#5B21B6] min-w-6 text-center">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                    disabled={quantity >= 10}
                    className="w-7 h-7 rounded-lg bg-white text-[#5B21B6] font-bold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Botón de Compra Llamativo en Estilo Dorado / Amarillo Go Gumi */}
              <div className="mt-5">
                <motion.button
                  onClick={handleCheckoutClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-bubbly text-base sm:text-lg font-black tracking-wide uppercase shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3 transition-all cursor-pointer border-2 border-white"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  <span>
                    COMPRAR CON 20% OFF — S/ {(promoPrice * quantity).toFixed(2)}
                  </span>
                </motion.button>

                <p className="text-center text-[11px] text-slate-500 mt-2 font-medium">
                  🔒 Pago 100% seguro • Envíos gratis a todo el Perú en preventa
                </p>
              </div>

              {/* Micro-garantías al pie de la tarjeta */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-purple-700 mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-800">Envío Gratis</span>
                  <span className="text-[9px] text-slate-500">A todo el Perú</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-purple-700 mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-800">Cambio Gratis</span>
                  <span className="text-[9px] text-slate-500">30 días garantizados</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-purple-700 mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-800">Salud Podológica</span>
                  <span className="text-[9px] text-slate-500">Barefoot real</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* 4. SECCIÓN DE LOS 3 BENEFICIOS CLAVE CONDENSADOS (Centrada) */}
        {/* ============================================================== */}
        <section className="mt-14 sm:mt-18 pt-8 max-w-5xl mx-auto w-full">
          <div className="text-center mb-8">
            <span className="text-xs font-bubbly font-bold uppercase tracking-wider text-[#5B21B6] bg-white/70 px-3.5 py-1 rounded-full border border-purple-200">
              Nanotecnología & Salud Infantil
            </span>
            <h3 className="font-bubbly text-2xl sm:text-3xl font-black text-[#5B21B6] mt-2">
              ¿Por qué los pediatras recomiendan Go Gumi frente al calzado rígido?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
              Diseño ergonómico respetuoso que previene el pie plano y estimula el equilibrio de 1 a 5 años.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Beneficio 1 */}
            <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-white text-slate-800 shadow-lg shadow-purple-900/5">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold mb-3 shadow-xs">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-bubbly text-lg font-black text-[#5B21B6] mb-1">
                Suela de Grafeno 1-2 mm
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Grosor milimétrico Zero-Drop. El cerebro del bebé recibe hasta un 300% más estímulos táctiles del relieve natural, fortaleciendo su equilibrio y motricidad.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-white text-slate-800 shadow-lg shadow-purple-900/5">
              <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold mb-3 shadow-xs">
                <Footprints className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-bubbly text-lg font-black text-[#5B21B6] mb-1">
                Horma Barefoot Anatómica
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Puntera ancha que permite la apertura total de los dedos en abanico al pisar. Cero compresión ósea para prevenir deformidades y pie plano.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-white text-slate-800 shadow-lg shadow-purple-900/5">
              <div className="w-11 h-11 rounded-2xl bg-[#06B6D4] text-white flex items-center justify-center font-bold mb-3 shadow-xs">
                <Zap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-bubbly text-lg font-black text-[#5B21B6] mb-1">
                Suela Bio-Flex Todo Terreno
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Torsión flexible 360° con labrado multidireccional antideslizante para jugar seguros en baldosas húmedas, tierra, parques y asfalto.
              </p>
            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. TESTIMONIOS DE MAMÁS GO GUMI (Reemplaza FAQ, Centrada) */}
        {/* ============================================================== */}
        <section className="mt-14 sm:mt-18 pt-6 max-w-5xl mx-auto w-full">
          
          {/* Cabecera de la Sección */}
          <div className="text-center mb-8">
            <span className="text-xs font-bubbly font-bold uppercase tracking-wider text-[#5B21B6] bg-white/70 px-3.5 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1.5 shadow-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Experiencias Reales de Mamás</span>
            </span>

            <h3 className="font-bubbly text-2xl sm:text-3xl font-black text-[#5B21B6] mt-2.5">
              Lo que dicen las mamás que ya dieron el paso barefoot
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl mx-auto font-medium">
              Más de 1,200 familias en el Perú ya cuidan los primeros pasos de sus pequeños con Go Gumi.
            </p>

            {/* Micro métricas de satisfacción */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 text-xs font-bold text-slate-800 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3.5 py-1 rounded-full border border-purple-100 shadow-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>4.9 / 5.0 (128 valoraciones)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3.5 py-1 rounded-full border border-purple-100 text-emerald-800 shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                <span>98% nota mejor equilibrio</span>
              </div>
            </div>
          </div>

          {/* Grid de 3 Tarjetas de Testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {momTestimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-white text-slate-800 shadow-lg shadow-purple-900/5 flex flex-col justify-between relative group"
              >
                {/* Comillas sutiles decorativas */}
                <div className="absolute top-4 right-5 text-purple-200 pointer-events-none select-none">
                  <Quote className="w-8 h-8 rotate-180 opacity-40 text-purple-300" />
                </div>

                <div>
                  {/* Calificación de Estrellas y Badge de Destacado */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {t.highlight}
                    </span>
                  </div>

                  {/* Comentario de la Mamá */}
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic relative z-10 mb-4">
                    "{t.comment}"
                  </p>
                </div>

                {/* Perfil de la Mamá al pie de la tarjeta con Foto Real */}
                <div className="pt-3 border-t border-purple-100 flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-purple-200 bg-purple-50">
                      <SafeImage
                        src={t.photo}
                        alt={`Foto de ${t.name}`}
                        className="w-full h-full object-cover"
                        fallback={
                          <div className={`w-full h-full ${t.avatarColor} font-bubbly font-black text-sm flex items-center justify-center`}>
                            {t.initials}
                          </div>
                        }
                      />
                    </div>
                    <span 
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shadow-xs border border-white" 
                      title="Compra Verificada"
                    >
                      ✓
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bubbly text-xs font-bold text-slate-900 truncate">
                        {t.name}
                      </span>
                      <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold shrink-0">
                        Verificada
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium truncate">
                      {t.momOf} • {t.location}
                    </span>
                    <span className="text-[9px] text-purple-700 font-semibold truncate mt-0.5">
                      {t.variantBought}
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </section>

        {/* ============================================================== */}
        {/* 6. BANNER FINAL CTA EN ESTILO FLYER GO GUMI (Centrado) */}
        {/* ============================================================== */}
        <div className="mt-14 mb-8 p-6 sm:p-9 rounded-[32px] bg-gradient-to-r from-[#5B21B6] via-[#6D28D9] to-[#087E8B] text-white text-center flex flex-col items-center shadow-2xl max-w-4xl mx-auto w-full border-2 border-white">
          <span className="text-3xl mb-1">👣</span>
          <h3 className="font-bubbly text-2xl sm:text-3xl font-black drop-shadow-sm">
            ¿Listo para darle a tu bebé la libertad de caminar sano?
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-lg font-medium">
            Asegura hoy tus zapatillas Go Gumi con <strong>S/ 40.00 de descuento (20% OFF)</strong> y cambio de talla 100% garantizado.
          </p>
          <button
            type="button"
            onClick={handleCheckoutClick}
            className="mt-5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-bubbly text-sm sm:text-base font-black shadow-xl transition-transform active:scale-95 cursor-pointer border-2 border-white"
          >
            APROVECHAR EL 20% OFF EN PREVENTA
          </button>
        </div>

      </main>

      {/* ============================================================== */}
      {/* FOOTER */}
      {/* ============================================================== */}
      <footer className="w-full py-6 bg-[#4C1D95] text-purple-200 text-center text-xs border-t border-purple-400/30 relative z-10">
        <p>© 2026 Go Gumi Perú — Calzado Infantil Ergonómico. Todos los derechos reservados.</p>
        <button onClick={onGoHome} className="text-yellow-300 hover:underline mt-1 cursor-pointer font-bold">
          Regresar a la portada principal (gogumi.pe)
        </button>
      </footer>

      {/* ============================================================== */}
      {/* MODAL 1: INFORMACIÓN CLÍNICA (3 BENEFICIOS) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-white text-slate-800 shadow-2xl p-6 sm:p-8 z-10 my-auto border-4 border-purple-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">
                    Salud Podológica Infantil
                  </span>
                  <h3 className="font-bubbly text-2xl font-black text-[#5B21B6] mt-0.5">
                    ¿Por qué Go Gumi es diferente?
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInfoModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-2">
                    01
                  </div>
                  <h4 className="font-bubbly font-bold text-base text-amber-900 mb-1">Suela de Grafeno</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1 a 2 mm de espesor que transmite sensaciones del terreno al cerebro sin riesgo de pinchazos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center font-bold mb-2">
                    02
                  </div>
                  <h4 className="font-bubbly font-bold text-base text-[#5B21B6] mb-1">Horma Barefoot</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Espacio anatómico en abanico que evita atrofia y deformidades en los dedos en crecimiento.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200">
                  <div className="w-8 h-8 rounded-lg bg-[#06B6D4] text-white flex items-center justify-center font-bold mb-2">
                    03
                  </div>
                  <h4 className="font-bubbly font-bold text-base text-cyan-900 mb-1">Suela Bio-Flex</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Torsión multidireccional que acompaña la pisada natural en cualquier tipo de superficie.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL 2: RADIOGRAFÍA / DEMOSTRACIÓN ANATÓMICA DEL AFICHE */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isAnatomicModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAnatomicModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-white text-slate-800 shadow-2xl p-6 sm:p-7 z-10 my-auto border-4 border-purple-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-purple-100 mb-4">
                <div>
                  <span className="text-xs font-bold text-[#087E8B] uppercase tracking-wider block">
                    Demostración Anatómica Barefoot
                  </span>
                  <h3 className="font-bubbly text-xl sm:text-2xl font-black text-[#5B21B6]">
                    Apertura de Dedos en Abanico
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnatomicModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-purple-100 shadow-md mb-4 bg-slate-100">
                <img 
                  src="/assets/anatomic_barefoot_demo.jpg" 
                  alt="Demostración anatómica de dedos en abanico Go Gumi" 
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-slate-700 leading-relaxed">
                <p className="font-medium">
                  <strong>¿Cómo funciona?</strong> La puntera extra ancha de Go Gumi permite que las falanges del bebé se extiendan naturalmente con cada paso (como caminar descalzo sobre arena o césped), fortaleciendo el arco plantar y evitando juanetes o dedos montados provocados por el calzado tradicional en punta.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
