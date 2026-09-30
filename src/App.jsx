import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Footprints, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import RibbonDivider from './components/RibbonDivider';
import BenefitSlide from './components/BenefitSlide';
import AmbientGlows from './components/AmbientGlows';
import OrderForm from './components/OrderForm';
import ProductPage from './components/ProductPage';
import CheckoutPage from './components/CheckoutPage';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'product' | 'checkout'
  const [selectedColor, setSelectedColor] = useState('Azul Océano');
  const [activeSlide, setActiveSlide] = useState(0);

  const [checkoutItem, setCheckoutItem] = useState({
    color: 'Azul Océano',
    colorHex: '#3B82F6',
    size: '21',
    quantity: 1,
    price: 149,
    originalPrice: 189,
    imgFront: '/assets/azul_frente_webp.webp',
    imgBack: '/assets/azul_atras_webp.webp',
  });

  // 5 Secciones de la Landing Page con Scroll Continuo
  const slides = [
    { id: 'hero', name: 'Portada & Colores' },
    { id: 'beneficio-grafeno', name: 'Suela de Grafeno' },
    { id: 'beneficio-barefoot', name: 'Horma Barefoot' },
    { id: 'beneficio-bioflex', name: 'Suela Bio-Flex' },
    { id: 'contacto', name: 'Suscripción & Contacto' },
  ];

  const goToSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    const targetEl = document.getElementById(slides[index].id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSlide(index);
    }
  };

  // Sincronización con el historial / hash del navegador
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#product') {
        setCurrentView('product');
      } else if (hash === '#checkout') {
        setCurrentView('checkout');
      } else {
        setCurrentView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (view, item = null) => {
    if (item) {
      setCheckoutItem(item);
    }
    setCurrentView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sincronización de activeSlide mediante IntersectionObserver durante el scroll normal
  useEffect(() => {
    if (currentView !== 'home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slides.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveSlide(index);
            }
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    slides.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView]);

  return (
    <div className="relative w-full min-h-screen select-none bg-[#FAFAF5]">
      <AnimatePresence mode="wait">
        
        {/* VISTA 1: HOME / LANDING PRINCIPAL */}
        {currentView === 'home' && (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full min-h-screen"
          >
            {/* Header / Navbar (Se oculta al deslizar hacia abajo para mayor inmersión) */}
            <Navbar onContactClick={() => goToSlide(slides.length - 1)} visible={activeSlide === 0} />

            {/* INDICADOR LATERAL FLOTANTE DE SECCIONES (Adaptable a fondos claros) */}
            <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className="group relative flex items-center justify-end focus:outline-none cursor-pointer py-1"
                  aria-label={`Ir a ${s.name}`}
                >
                  <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bubbly font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    {s.name}
                  </span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? 'bg-purple-600 scale-135 ring-4 ring-purple-300/70 shadow-lg'
                        : 'bg-slate-400/60 border border-slate-500/30 group-hover:bg-purple-400 group-hover:scale-110 shadow-xs'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* CONTENEDOR PRINCIPAL CON SCROLL NORMAL */}
            <main className="w-full relative min-h-screen">
              
              {/* Sección 1: Portada Hero (Mantiene alto exacto ajustable a la pantalla 100dvh) */}
              <HeroSection 
                onReserveClick={() => goToSlide(slides.length - 1)} 
                onColorChange={(color) => setSelectedColor(color)}
                onProductClick={(color) => {
                  setSelectedColor(color);
                  navigateTo('product');
                }}
              />

              {/* FRANJA DIVISORA AMARILLA ENTRE SECCIÓN 1 Y 2 (ESTILO TICKER TAPE / MARQUEE) */}
              <RibbonDivider />

              {/* SECCIÓN 2: BENEFICIOS (FONDO BLANCO A BEIGE, ESTILO LIMPIO Y ESPACIADO REDUCIDO) */}
              <section
                id="seccion-beneficios"
                className="w-full relative py-2 sm:py-4 overflow-x-clip"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 40%, #F5F1E8 100%)'
                }}
              >
                {/* Halos ambientales suaves en movimiento continuo */}
                <AmbientGlows />

                {/* Beneficio 1 - Suela de Grafeno 1-2 mm */}
                <BenefitSlide
                  id="beneficio-grafeno"
                  number="01"
                  badgeText="NANOTECNOLOGÍA & PROPIOCEPCIÓN"
                  BadgeIcon={Layers}
                  themeColor="amber"
                  headline="Suela de Grafeno 1-2 mm"
                  highlight="Zero-Drop Real."
                  subtitle="Tan delgada que sienten la tierra. Tan resistente que nada la traspasa."
                  description="El calzado tradicional deprime y adormece los pies infantiles con suelas rígidas de 20 mm. La lámina nanométrica de grafeno de Go Gumi mide apenas 1 a 2 mm, permitiendo que el cerebro de tu pequeño reciba hasta un 300% más estímulos táctiles del suelo. Estimula la propiocepción y fortalece el equilibrio neurológico natural desde sus primeros pasos."
                  metrics={[
                    { value: '1-2 mm', label: 'Grosor Milimétrico' },
                    { value: '0 mm Drop', label: 'Postura Anatómica' },
                    { value: '+300%', label: 'Conexión Sensorial' },
                    { value: 'Grafeno', label: 'Blindaje Abrasivo' },
                  ]}
                  imageSrc="/assets/beneficio_grafeno_webp.webp"
                  imageAlt="Suela de Grafeno 1-2 mm Go Gumi"
                  imageBadgeText="Grafeno Milimétrico"
                  reverse={false}
                  onNextSlide={() => goToSlide(2)}
                  nextSlideLabel="Siguiente: Horma Barefoot"
                  onExploreProduct={(color) => {
                    setSelectedColor(color);
                    navigateTo('product');
                  }}
                  exploreColor="Rosa Pastel"
                />

                {/* Beneficio 2 - Horma Barefoot Ergonómica */}
                <BenefitSlide
                  id="beneficio-barefoot"
                  number="02"
                  badgeText="SALUD PODOLÓGICA INFANTIL"
                  BadgeIcon={Footprints}
                  themeColor="purple"
                  headline="Horma Barefoot Ergonómica"
                  highlight="Libertad en Abanico."
                  subtitle="Espacio real para pies que crecen sanos. Cero compresión en sus deditos."
                  description="Los pies de los bebés no son versiones mini de pies adultos; su anatomía natural se expande en forma de abanico. Las hormas estrechas tradicionales comprimen las falanges causando atrofia y deformidades. Go Gumi incorpora una puntera anatómica extra ancha que permite la apertura total de los dedos al pisar, estimulando el arco plantar y previniendo el pie plano."
                  metrics={[
                    { value: 'En Abanico', label: 'Puntera Anatómica' },
                    { value: '100% Libre', label: 'Cero Presión Ósea' },
                    { value: 'Arco Activo', label: 'Estimula el Músculo' },
                    { value: '0 Deformidad', label: 'Previene Pie Plano' },
                  ]}
                  imageSrc="/assets/beneficio_barefoot_webp.webp"
                  imageAlt="Horma Barefoot Ergonómica Go Gumi"
                  imageBadgeText="Puntera Anatómica Libre"
                  reverse={true}
                  onNextSlide={() => goToSlide(3)}
                  nextSlideLabel="Siguiente: Suela Bio-Flex"
                  onExploreProduct={(color) => {
                    setSelectedColor(color);
                    navigateTo('product');
                  }}
                  exploreColor="Naranja Safari"
                />

                {/* Beneficio 3 - Suela Bio-Flex Todo Terreno */}
                <BenefitSlide
                  id="beneficio-bioflex"
                  number="03"
                  badgeText="BIOMECÁNICA ACTIVA & AGARRE"
                  BadgeIcon={Zap}
                  themeColor="emerald"
                  headline="Suela Bio-Flex Todo Terreno"
                  highlight="Agarre y Flexibilidad Total."
                  subtitle="Seguridad y adherencia en cada salto, charco, roca y carrera."
                  description="Diseñada para la curiosidad incansable de los pequeños exploradores. Su compuesto elástico Bio-Flex acompaña la torsión 360° del pie al correr y trepar. Con labrado multidireccional que brinda máxima adherencia tanto en baldosas resbaladizas como en césped húmedo o rocas, garantizando estabilidad sin restringir el movimiento natural."
                  metrics={[
                    { value: '360° Flex', label: 'Torsión Multidireccional' },
                    { value: 'Wet & Dry', label: 'Tracción Todo Terreno' },
                    { value: '85 g', label: 'Peso Pluma Ultraligero' },
                    { value: 'BPA Free', label: 'Grado Médico Seguro' },
                  ]}
                  imageSrc="/assets/beneficio_bioflex_webp.webp"
                  imageAlt="Suela Bio-Flex y Agarre 360° Go Gumi"
                  imageBadgeText="Tracción Multidireccional"
                  reverse={false}
                  isLastBenefit={true}
                  onGoToOrder={() => goToSlide(4)}
                  onNextSlide={() => goToSlide(4)}
                  nextSlideLabel="Ir a Suscripción & Contacto"
                  onExploreProduct={(color) => {
                    setSelectedColor(color);
                    navigateTo('product');
                  }}
                  exploreColor="Verde Salvia"
                />
              </section>

              {/* SECCIÓN 3: SUSCRIPCIÓN & CONTACTO (CONTINUIDAD EN TONO BEIGE CÁLIDO) */}
              <div 
                className="w-full relative"
                style={{
                  background: '#F5F1E8'
                }}
              >
                <OrderForm />
              </div>

            </main>
          </motion.div>
        )}

        {/* VISTA 2: PÁGINA DE PRODUCTO DEDICADA */}
        {currentView === 'product' && (
          <motion.div
            key="product-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full min-h-screen"
          >
            <ProductPage 
              initialColor={selectedColor}
              onBack={() => navigateTo('home')}
              onBuyNow={(item) => navigateTo('checkout', item)}
            />
          </motion.div>
        )}

        {/* VISTA 3: PÁGINA DE PAGO (CHECKOUT SHOPIFY GOGUMI) */}
        {currentView === 'checkout' && (
          <motion.div
            key="checkout-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full min-h-screen"
          >
            <CheckoutPage 
              orderItem={checkoutItem}
              onBack={() => navigateTo('product')}
              onFinish={() => navigateTo('home')}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
