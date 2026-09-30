import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Check, Layers, Footprints, Zap, X, RotateCw } from 'lucide-react';
import SafeImage from './SafeImage';

export default function HeroSection({ onReserveClick, onColorChange, onProductClick }) {
  // =========================================================================
  // ⚙️ CONTROL MANUAL DEL DESPLAZAMIENTO DEL SUELO EN EL EJE "Y":
  // Modifica este valor (en píxeles) para subir o bajar el suelo a tu gusto:
  // =========================================================================
  const SUELO_DESPLAZAMIENTO_Y = 260; // 👈 AJUSTA AQUÍ LOS PÍXELES EN EL EJE Y

  // Tecnología activa en el Dock (0: Grafeno, 1: Barefoot, 2: Bio-Flex, null: cerrado)
  const [activeTech, setActiveTech] = useState(0);

  // Estado de hover para mostrar la segunda imagen
  const [isHovered, setIsHovered] = useState(false);

  // Estado de giro manual de imagen para móvil (en móvil no existe hover)
  const [mobileFlipped, setMobileFlipped] = useState({});

  const toggleMobileFlip = (index) => {
    setMobileFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Carrusel de Colores
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  // Espaciado horizontal responsivo entre zapatos
  // Espaciado horizontal responsivo: distribuye los 3 zapatos abarcando el 90% de la pantalla
  const [spacing, setSpacing] = useState(
    typeof window !== 'undefined' ? Math.max(260, Math.round(window.innerWidth * 0.36)) : 480
  );

  // Detección de dispositivo móvil / táctil sin hover para desacoplar el giro del hover
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth < 640 || (window.matchMedia && !window.matchMedia('(hover: hover)').matches)
      : false
  );

  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640 || (window.matchMedia && !window.matchMedia('(hover: hover)').matches));
      // Con 36% a cada lado, la distancia total entre centros es 72% + anchos de zapatos = ~90% de la pantalla
      const targetSpacing = Math.max(260, Math.round(width * 0.36));
      setSpacing(targetSpacing);
    };
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

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

  // Pre-carga fluida de todas las imágenes definitivas (frente y atrás) para transiciones instantáneas
  useEffect(() => {
    colorVariants.forEach((variant) => {
      const imgF = new Image();
      imgF.src = variant.imgFront;
      const imgB = new Image();
      imgB.src = variant.imgBack;
    });
  }, []);

  const currentColor = colorVariants[activeColorIndex];

  const handleSelectColor = (index) => {
    setActiveColorIndex(index);
    setIsHovered(false);
    setMobileFlipped({});
    if (onColorChange) {
      onColorChange(colorVariants[index].name);
    }
  };

  const handlePrev = () => {
    const nextIndex = activeColorIndex > 0 ? activeColorIndex - 1 : colorVariants.length - 1;
    handleSelectColor(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeColorIndex < colorVariants.length - 1 ? activeColorIndex + 1 : 0;
    handleSelectColor(nextIndex);
  };

  // Navegación opcional por teclado (flechas izquierda / derecha)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeColorIndex]);

  // 3D Tilt interactivo con mouse para el zapato central
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const techPills = [
    {
      id: 'graphene',
      Icon: Layers,
      shortTitle: 'Grafeno 1-2 mm',
      title: 'Grosor Milimétrico de Grafeno',
      badge: 'Ultra-delgado & Resistente',
      metric: '1-2 mm',
      metricLabel: 'Zero-Drop Real',
      description: 'Suela de grafeno ultradelgada que transmite la estimulación sensorial natural del suelo al cerebro del niño, con una resistencia insuperable ante la fricción y el desgaste.',
    },
    {
      id: 'barefoot',
      Icon: Footprints,
      shortTitle: 'Horma Barefoot',
      title: 'Puntera Barefoot Ergonómica',
      badge: 'Salud Podológica',
      metric: '100%',
      metricLabel: 'Espacio Anatómico',
      description: 'Horma anatómica extra ancha que respeta la forma de abanico del pie en desarrollo. Permite a los deditos abrirse libremente sin compresión, previniendo deformidades óseas.',
    },
    {
      id: 'bioflex',
      Icon: Zap,
      shortTitle: 'Suela Bio-Flex',
      title: 'Tracción Bio-Flex Todo Terreno',
      badge: 'Seguridad Antideslizante',
      metric: '360°',
      metricLabel: 'Flexibilidad Total',
      description: 'Grip antideslizante multidireccional que acompaña la torsión bio-mecánica natural al correr, trepar rocas húmedas y jugar sobre superficies resbaladizas.',
    },
  ];

  return (
    <section 
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between pt-20 pb-4 select-none shrink-0"
      style={{
        background: 'linear-gradient(180deg, #64C7F3 0%, #76CFDD 50%, #9CD4D7 100%)'
      }}
    >
      {/* CAPA: NUBE IZQUIERDA (Ancho 540px en móvil, ampliada en PC) */}
      <motion.div 
        animate={{ 
          y: [0, -18, 0],
          x: [0, 14, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[100px] sm:top-2 md:top-4 -left-[270px] sm:-left-[380px] md:-left-[520px] lg:-left-[720px] xl:-left-[880px] 2xl:-left-[1020px] w-[540px] sm:w-[720px] md:w-[980px] lg:w-[1450px] xl:w-[1750px] 2xl:w-[2000px] max-w-none pointer-events-none z-10 opacity-95"
      >
        <SafeImage
          src="/assets/nube-izq_webp.webp"
          alt="Nube izquierda"
          className="w-full h-auto drop-shadow-lg"
          fallback={
            <div className="w-full aspect-[16/9] bg-white/90 rounded-full" />
          }
        />
      </motion.div>

      {/* CAPA: NUBE DERECHA (Ancho 540px en móvil, top calc(26% + 250px), majestuosa en PC) */}
      <motion.div 
        animate={{ 
          y: [0, 16, 0],
          x: [0, -12, 0]
        }}
        transition={{ 
          duration: 11, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute top-[calc(26%+250px)] sm:top-[32%] md:top-[36%] lg:top-[30%] xl:top-[28%] -right-[270px] sm:-right-[380px] md:-right-[520px] lg:-right-[720px] xl:-right-[880px] 2xl:-right-[1020px] w-[540px] sm:w-[720px] md:w-[980px] lg:w-[1450px] xl:w-[1750px] 2xl:w-[2000px] max-w-none pointer-events-none z-50 opacity-95"
      >
        <SafeImage
          src="/assets/nube-der_webp.webp"
          alt="Nube derecha"
          className="w-full h-auto drop-shadow-2xl"
          fallback={
            <div className="w-full aspect-[16/9] bg-white/90 rounded-full" />
          }
        />
      </motion.div>

      {/* CAPA: SUELO DE TIERRA, ROCAS Y FLORES (z-index z-[5], 100% ancho) */}
      <div 
        style={{ transform: `translateY(${SUELO_DESPLAZAMIENTO_Y}px)` }}
        className="absolute bottom-0 left-0 right-0 w-full z-[5] pointer-events-none flex items-end justify-center"
      >
        <SafeImage
          src="/assets/suelo_webp.webp"
          alt="Suelo con rocas, musgo y flores"
          className="w-full min-w-full h-auto drop-shadow-2xl -scale-x-100"
          fallback={
            <div className="w-full h-36 sm:h-48 bg-gradient-to-t from-[#405436] via-[#657d4a] to-transparent relative overflow-hidden -scale-x-100" />
          }
        />
      </div>

      {/* CAPA CENTRAL: CARRUSEL EXACTAMENTE CENTRADO (Muestra solo 3 productos: centro 100%, laterales 30%) */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full z-20 my-auto overflow-visible">
        
        {/* ESCENARIO DEL CARRUSEL (Centrado 100% en la pantalla) */}
        <div className="relative w-full max-w-7xl mx-auto h-[320px] sm:h-[380px] flex items-center justify-center">
          
          {colorVariants.map((variant, index) => {
            // Cálculo de distancia modular circular relativa al activo (loop infinito en ambas direcciones)
            const total = colorVariants.length;
            let diff = (index - activeColorIndex) % total;
            if (diff < -Math.floor(total / 2)) diff += total;
            if (diff > Math.floor(total / 2)) diff -= total;

            const isCenter = diff === 0;
            const isSide = Math.abs(diff) === 1;
            const isVisible = Math.abs(diff) <= 1; // SOLO 3 PRODUCTOS VISIBLES
            const isFlipped = Boolean(mobileFlipped[index]);
            // En móvil se controla exclusivamente con el botón (isFlipped). En desktop con hover de cursor.
            const showBack = isMobile ? isFlipped : (isCenter && isHovered);

            return (
              <motion.div
                key={variant.id}
                className="absolute flex items-center justify-center"
                animate={{
                  x: diff * spacing,
                  scale: isCenter ? 1 : 0.65,
                  opacity: isCenter ? 1 : isSide ? 0.3 : 0,
                  zIndex: isCenter ? 25 : isSide ? 15 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 26,
                  mass: 0.8,
                }}
                style={{
                  pointerEvents: isVisible ? 'auto' : 'none',
                  perspective: 1000,
                }}
                onClick={() => {
                  if (!isCenter) {
                    handleSelectColor(index);
                  } else if (onProductClick) {
                    onProductClick(variant.name);
                  }
                }}
              >
                {/* Contenedor del producto individual */}
                <motion.div
                  onMouseEnter={() => {
                    if (isCenter && !isMobile) setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (isCenter && !isMobile) setIsHovered(false);
                  }}
                  animate={{
                    y: isCenter ? [0, -12, 0] : 0,
                  }}
                  transition={{
                    y: isCenter ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }
                  }}
                  style={
                    isCenter
                      ? {
                          rotateX,
                          rotateY,
                          transformStyle: "preserve-3d",
                        }
                      : {}
                  }
                  className={`relative flex items-center justify-center w-[300px] sm:w-[380px] md:w-[420px] ${
                    !isCenter ? 'cursor-pointer hover:opacity-50 transition-opacity' : 'cursor-grab active:cursor-grabbing'
                  }`}
                >
                  {/* Imagen del zapato con vista definitiva de frente y vista posterior en hover / giro móvil */}
                  <div className="relative w-full flex items-center justify-center select-none">
                    
                    {/* Botón Girar (Exclusivo para versión móvil: centrado en X y más arriba) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCenter) {
                          handleSelectColor(index);
                        }
                        toggleMobileFlip(index);
                      }}
                      aria-label="Girar zapatilla"
                      title="Girar zapatilla"
                      className="sm:hidden absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-sky-950 font-bubbly text-xs font-bold shadow-md shadow-sky-950/15 active:scale-90 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <RotateCw className={`w-3.5 h-3.5 text-sky-600 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
                      <span>{isFlipped ? 'Frente' : 'Girar'}</span>
                    </button>

                    {/* Imagen 1 (Vista Frente: variant.imgFront) */}
                    <motion.div
                      animate={{
                        opacity: showBack ? 0 : 1,
                        scale: showBack ? 0.96 : 1,
                      }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="w-full flex items-center justify-center"
                    >
                      <SafeImage
                        src={variant.imgFront}
                        alt={`Zapatilla GO ${variant.name} - Frente`}
                        className="w-full h-auto object-contain"
                        fallback={
                          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <img 
                              src="/assets/design-reference.png" 
                              alt="Referencia de diseño" 
                              className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                            />
                          </div>
                        }
                      />
                    </motion.div>

                    {/* Imagen 2 (Vista Atrás en Hover o Giro Móvil: variant.imgBack) */}
                    <motion.div
                      animate={{
                        opacity: showBack ? 1 : 0,
                        scale: showBack ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                    >
                      <SafeImage
                        src={variant.imgBack}
                        alt={`Zapatilla GO ${variant.name} - Vista Posterior`}
                        className="w-full h-auto object-contain"
                        fallback={
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img 
                              src={variant.imgFront} 
                              alt="Vista Posterior" 
                              className="w-full h-auto object-contain scale-x-[-1] brightness-105"
                            />
                          </div>
                        }
                      />
                    </motion.div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}

        </div>

        {/* SELECTOR DE SWATCHES DE COLOR & NOMBRE */}
        <div className="relative z-30 mt-2 sm:mt-3 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/60 shadow-lg">
            <span className="text-xs font-bubbly font-bold text-white drop-shadow-sm">
              {currentColor.name}
            </span>
            <span className="text-[11px] text-white/80">• {currentColor.tag}</span>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            {colorVariants.map((variant, idx) => (
              <button
                key={variant.id}
                onClick={() => handleSelectColor(idx)}
                className={`relative w-8 h-8 rounded-full transition-transform cursor-pointer focus:outline-none ${
                  activeColorIndex === idx ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-sky-400 shadow-md' : 'hover:scale-110 opacity-75 hover:opacity-100'
                }`}
                style={{ backgroundColor: variant.hex }}
                aria-label={`Seleccionar ${variant.name}`}
              >
                {activeColorIndex === idx && (
                  <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* FILA INFERIOR: DOCK TECH A LA IZQUIERDA Y BOTÓN RESERVAR AHORA A LA DERECHA */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-40 px-3 sm:px-8 md:px-12 flex items-center justify-between pointer-events-none">
        
        {/* LADO IZQUIERDO: DOCK TECH ("TECH PILLS" Estilo Nike Lab / On Running) */}
        <div className="relative pointer-events-auto flex flex-col items-start">
          
          {/* FICHA TÉCNICA DESPLEGABLE HACIA ARRIBA */}
          <AnimatePresence mode="wait">
            {activeTech !== null && (
              <motion.div
                key={activeTech}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ 
                  opacity: isHovered ? 0.25 : 1, 
                  y: 0, 
                  scale: 1 
                }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute bottom-full mb-3 left-0 z-50 w-[88vw] sm:w-[380px] md:w-[420px] p-3 sm:p-3.5 rounded-2xl bg-white/25 backdrop-blur-md border border-white/60 shadow-xl shadow-sky-950/15 text-white pointer-events-auto"
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/20 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-white/30 backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                    </span>
                    <div>
                      <h4 className="font-bubbly text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                        {techPills[activeTech].title}
                      </h4>
                      <span className="text-[10px] font-semibold text-white/90 bg-sky-900/30 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {techPills[activeTech].badge}
                      </span>
                    </div>
                  </div>

                  {/* Métrica / Badge & Botón cerrar */}
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-bubbly text-xs sm:text-sm font-black text-yellow-200 drop-shadow-sm">
                        {techPills[activeTech].metric}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-white/80 font-medium">
                        {techPills[activeTech].metricLabel}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTech(null)}
                      className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                      title="Cerrar ficha"
                      aria-label="Cerrar ficha"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-white/95 text-[11px] sm:text-xs font-medium leading-relaxed drop-shadow-sm">
                  {techPills[activeTech].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CÁPSULA FLOTANTE DE PÍLDORAS */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/25 backdrop-blur-md border border-white/60 shadow-lg shadow-sky-950/10">
            {techPills.map((tech, idx) => {
              const isActive = activeTech === idx;
              const TechIcon = tech.Icon;
              return (
                <button
                  key={tech.id}
                  onClick={() => setActiveTech(isActive ? null : idx)}
                  className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-1.5 cursor-pointer focus:outline-none ${
                    isActive 
                      ? 'text-sky-950 font-bold' 
                      : 'text-white hover:text-white hover:bg-white/20'
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTechDockPill"
                      className="absolute inset-0 bg-white/95 rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <TechIcon className={`w-3.5 h-3.5 stroke-[2.5] ${isActive ? 'text-sky-700' : 'text-white'}`} />
                  <span className="font-bubbly tracking-tight drop-shadow-sm">{tech.shortTitle}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* LADO DERECHO: BOTÓN "VER PRODUCTO" (Estilo Glassmorphic) */}
        <div className="pointer-events-auto">
          <motion.button
            onClick={() => onProductClick ? onProductClick(currentColor.name) : onReserveClick()}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.18)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/80 text-white font-bubbly text-xs sm:text-base font-bold tracking-wider uppercase shadow-xl shadow-sky-950/15 transition-all cursor-pointer"
          >
            <span className="drop-shadow-sm">VER PRODUCTO</span>
          </motion.button>
        </div>

      </div>

    </section>
  );
}
