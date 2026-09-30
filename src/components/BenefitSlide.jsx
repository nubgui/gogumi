import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  ChevronDown
} from 'lucide-react';
import SafeImage from './SafeImage';

export default function BenefitSlide({
  id,
  number,
  badgeText,
  BadgeIcon,
  themeColor = 'amber', // 'amber' | 'purple' | 'emerald'
  headline,
  highlight,
  subtitle,
  description,
  metrics = [],
  imageSrc,
  imageAlt,
  imageBadgeText,
  reverse = false, // false: text left, image right; true: image left, text right
  onNextSlide,
  nextSlideLabel = 'Siguiente beneficio',
  onExploreProduct,
  exploreColor = 'Azul Océano',
  isLastBenefit = false,
  onGoToOrder,
}) {
  const slideRef = useRef(null);

  // Parallax suave sensible al scroll en el contenido de texto
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ['start end', 'end start'],
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  // Configuración de temas visuales minimalistas y dinámicos
  const themes = {
    amber: {
      tag: 'text-amber-900 bg-amber-100/90 border-amber-200/90',
      tagIcon: 'text-amber-700',
      pingBg: 'bg-amber-400',
      dotBg: 'bg-amber-600',
      highlightGradient: 'from-amber-600 via-orange-600 to-amber-700',
      metricVal: 'text-amber-800',
      metricBar: 'bg-gradient-to-r from-amber-500 to-orange-400',
      btnSecondary: 'border-stone-300 hover:border-amber-400 bg-white/80 hover:bg-amber-50/50 text-stone-800',
    },
    purple: {
      tag: 'text-purple-900 bg-purple-100/90 border-purple-200/90',
      tagIcon: 'text-purple-700',
      pingBg: 'bg-purple-400',
      dotBg: 'bg-purple-600',
      highlightGradient: 'from-purple-600 via-indigo-600 to-purple-800',
      metricVal: 'text-purple-800',
      metricBar: 'bg-gradient-to-r from-purple-500 to-indigo-400',
      btnSecondary: 'border-stone-300 hover:border-purple-400 bg-white/80 hover:bg-purple-50/50 text-stone-800',
    },
    emerald: {
      tag: 'text-emerald-900 bg-emerald-100/90 border-emerald-200/90',
      tagIcon: 'text-emerald-700',
      pingBg: 'bg-emerald-400',
      dotBg: 'bg-emerald-600',
      highlightGradient: 'from-emerald-600 via-teal-600 to-emerald-800',
      metricVal: 'text-emerald-800',
      metricBar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      btnSecondary: 'border-stone-300 hover:border-emerald-400 bg-white/80 hover:bg-emerald-50/50 text-stone-800',
    },
  };

  const currentTheme = themes[themeColor] || themes.amber;

  return (
    <section
      ref={slideRef}
      id={id}
      className="relative w-full py-10 sm:py-14 md:py-16 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 select-none"
    >
      {/* CONTENIDO PRINCIPAL: Layout Split dinámico con Parallax y Micro-animaciones */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center w-full ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* =========================================================================
              COLUMNA DE TEXTO & ESPECIFICACIONES TÉCNICAS
              ========================================================================= */}
          <motion.div 
            style={{ y: textParallaxY }}
            className={`lg:col-span-6 flex flex-col justify-center ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
          >
            
            {/* Tag / Micro-Badge de Innovación Limpio con Indicador Pulsante */}
            <motion.div
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="flex items-center gap-2 mb-2 sm:mb-2.5"
            >
              <span className={`px-3 py-1 rounded-full border text-[11px] sm:text-xs font-bubbly font-bold tracking-wider inline-flex items-center gap-2 shadow-2xs ${currentTheme.tag}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentTheme.pingBg}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme.dotBg}`} />
                </span>
                {BadgeIcon && <BadgeIcon className={`w-3.5 h-3.5 ${currentTheme.tagIcon}`} />}
                <span>{number} • {badgeText}</span>
              </span>
            </motion.div>

            {/* Titular Principal Apple-Style */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="font-bubbly text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.12] mb-2"
            >
              <span>{headline} </span>
              <br className="hidden sm:inline" />
              <span className={`bg-gradient-to-r ${currentTheme.highlightGradient} bg-clip-text text-transparent`}>
                {highlight}
              </span>
            </motion.h2>

            {/* Subtítulo de impacto */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="font-bubbly text-xs sm:text-sm md:text-base font-bold text-stone-700 mb-3"
            >
              {subtitle}
            </motion.p>

            {/* Narrativa Explicativa Profunda (Texto Libre y Limpio) */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="text-stone-700 text-sm sm:text-base md:text-[16px] leading-relaxed font-normal mb-5"
            >
              {description}
            </motion.p>

            {/* Parrilla de Métricas Técnicas con Barra de Crecimiento Fluido */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-2 border-t border-stone-200/90 mb-6">
                {metrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + idx * 0.08, ease: 'easeOut' }}
                    viewport={{ once: true, margin: "-40px" }}
                    className="flex flex-col group/metric"
                  >
                    <motion.span
                      initial={{ scale: 0.88 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.18 + idx * 0.08 }}
                      viewport={{ once: true }}
                      className={`font-bubbly text-xl sm:text-2xl lg:text-3xl font-black ${currentTheme.metricVal} tracking-tight leading-none`}
                    >
                      {metric.value}
                    </motion.span>

                    {/* Barra de acento temática que se expande al entrar en vista */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 0.55, delay: 0.28 + idx * 0.08, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className={`h-[2.5px] rounded-full mt-2 mb-1 ${currentTheme.metricBar}`}
                    />

                    <span className="text-[11px] sm:text-xs font-semibold text-stone-600 leading-snug mt-0.5">
                      {metric.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Acciones Rápidas / Botones de Navegación Limpios */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {isLastBenefit ? (
                <button
                  onClick={onGoToOrder}
                  className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bubbly text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer transform hover:scale-102 active:scale-98"
                >
                  <span>Suscribirse & Contacto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNextSlide}
                  className="px-4 py-2 rounded-full border border-stone-300 hover:border-stone-400 bg-white/80 hover:bg-white text-stone-800 font-bubbly text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer transform hover:scale-102 active:scale-98"
                >
                  <span>{nextSlideLabel}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>
              )}

              {onExploreProduct && (
                <button
                  onClick={() => onExploreProduct(exploreColor)}
                  className={`px-4 py-2 rounded-full border font-bubbly text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer transform hover:scale-102 active:scale-98 ${currentTheme.btnSecondary}`}
                >
                  <span>Ver modelo {exploreColor}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>

          </motion.div>

          {/* =========================================================================
              COLUMNA DE LA IMAGEN PROTAGÓNICA (CON PARALLAX, FLOTACIÓN & MICRO-HOVER)
              ========================================================================= */}
          <div className={`lg:col-span-6 flex justify-center items-center ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px]"
            >
              {/* Contenedor con Flotación Levitatoria Suave Continua (6 segundos) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.025,
                  rotate: reverse ? -0.8 : 0.8,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl shadow-stone-900/10 group cursor-pointer"
              >
                <SafeImage
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-104"
                  fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-6 text-center">
                      <Sparkles className="w-10 h-10 text-stone-400 mb-2 animate-pulse" />
                      <span className="font-bubbly text-base font-bold text-stone-800">{headline}</span>
                      <span className="text-xs text-stone-500 mt-1">{imageAlt}</span>
                    </div>
                  }
                />

                {/* Sutil destello de luz al pasar el cursor (Sheen Effect) */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* Micro-Badge flotante interactivo con leve pulso */}
                {imageBadgeText && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-3.5 left-3.5 z-10"
                  >
                    <span className="px-3 py-1 rounded-full bg-stone-950/75 backdrop-blur-md text-white font-bubbly text-[11px] sm:text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {imageBadgeText}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}
