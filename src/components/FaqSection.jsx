import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: '¿Mi hijo necesita zapatos ortopédicos para bebés o calzado ergonómico respetuoso?',
      answer:
        'Salvo prescripción médica específica por una condición clínica, la podología pediátrica actual desaconseja los zapatos ortopédicos para bebés tradicionales por su rigidez. Para los zapatos para bebés que empiezan a caminar, la evidencia científica respalda el calzado ergonómico y barefoot: una horma ancha y suela ultrafina que permite el libre movimiento de los dedos y el desarrollo natural del arco plantar.',
      keywordsBadge: 'Salud Podológica & Primeros Pasos',
    },
    {
      question: '¿Qué diferencia existe entre Go Gumi y las marcas en Ripley zapatillas niños?',
      answer:
        'A diferencia de los modelos comerciales populares en tiendas por departamento como Ripley zapatillas niños, que suelen incorporar suelas gruesas de 15 a 20 mm con drop elevado y punteras estrechas, nuestras zapatillas de bebé Go Gumi integran una lámina nanométrica de grafeno de 1 a 2 mm. Esto brinda protección total contra cortes y pinchazos mientras transmite hasta un 300% más de propiocepción y estímulos táctiles del terreno.',
      keywordsBadge: 'Innovación vs Calzado Convencional',
    },
    {
      question: '¿Qué talla debo elegir en zapatillas para bebés de 1 año?',
      answer:
        'Para las zapatillas para bebés de 1 año, la talla promedio suele estar entre la 19 y la 21 (aproximadamente 11.5 a 13 cm de longitud de pie). Nuestros zapatos para bebé cuentan con una puntera anatómica amplia que garantiza los 10 a 12 mm de holgura frontal recomendados por especialistas para permitir la expansión en abanico.',
      keywordsBadge: 'Guía de Tallas (1 a 5 años)',
    },
    {
      question: '¿Los zapatitos de bebé Go Gumi son comparables a los minimox clásicos?',
      answer:
        'Nuestros modelos toman la filosofía de los zapatitos de bebé tipo minimox (máxima ligereza, flexibilidad y sensación de pie descalzo) pero resuelven su principal limitación: la durabilidad en exteriores. Gracias a la suela Bio-Flex con refuerzo de grafeno, son zapatitos todoterreno que pueden usarse en parques, asfalto y tierra sin desgastarse prematuramente.',
      keywordsBadge: 'Estilo Minimox Todo Terreno',
    },
    {
      question: '¿Tienen opciones en zapatos para niñas y niños de diferentes estilos?',
      answer:
        'Toda la línea de zapatos para bebes Go Gumi comparte la misma base médica y biomecánica unisex. Para quienes buscan opciones de zapatos para niñas con tonos cálidos, nuestro modelo Rosa Pastel es el favorito de las familias, junto a colores neutros y enérgicos como Verde Salvia, Naranja Safari, Gris Urbano y Azul Océano.',
      keywordsBadge: 'Diseño Ergonómico Unisex',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq-podologia" 
      className="relative w-full py-14 sm:py-20 px-4 sm:px-8 md:px-12 select-none"
      style={{
        background: 'linear-gradient(180deg, #F5F1E8 0%, #FAF8F5 50%, #FFFFFF 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Cabecera de la Sección FAQ */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-bubbly font-bold mb-3 shadow-2xs"
          >
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>GUÍA DE SALUD & PREGUNTAS FRECUENTES</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-bubbly text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-snug"
          >
            Todo lo que debes saber sobre el{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Calzado Ergonómico para Bebés
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mt-2 font-medium"
          >
            Respuestas respaldadas por especialistas en desarrollo infantil y podología temprana.
          </motion.p>
        </div>

        {/* Lista de Acordeones */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen 
                    ? 'bg-white shadow-lg shadow-amber-950/5 border-amber-300/80 ring-2 ring-amber-100' 
                    : 'bg-white/80 hover:bg-white border-stone-200/90 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bubbly font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        {faq.keywordsBadge}
                      </span>
                    </div>
                    <h3 className="font-bubbly text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 ${
                    isOpen ? 'bg-amber-500 text-white rotate-180 shadow-xs' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-stone-600 text-sm sm:text-[15px] leading-relaxed border-t border-stone-100 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
