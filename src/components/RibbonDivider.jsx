import React from 'react';
import { motion } from 'framer-motion';

export default function RibbonDivider() {
  // Frases solicitadas con emojis dinámicos y divertidos
  const tapeItems = [
    { text: 'ES LA HORA DE LA AVENTURA', icon: '🚀' },
    { text: 'SEGURIDAD Y CONFORT', icon: '🌼' },
    { text: 'ES LA HORA DE LA AVENTURA', icon: '☀️' },
    { text: 'SEGURIDAD Y CONFORT', icon: '👣' },
    { text: 'ES LA HORA DE LA AVENTURA', icon: '🦁' },
    { text: 'SEGURIDAD Y CONFORT', icon: '✨' },
    { text: 'ES LA HORA DE LA AVENTURA', icon: '🌈' },
    { text: 'SEGURIDAD Y CONFORT', icon: '💛' },
  ];

  // Cuadruplicar para crear un bucle continuo infinito y fluido
  const marqueeItems = [...tapeItems, ...tapeItems, ...tapeItems, ...tapeItems];

  return (
    <div className="relative w-full z-40 -mt-8 sm:-mt-10 md:-mt-12 -mb-8 sm:-mb-10 md:-mb-12 select-none pointer-events-none py-6 sm:py-8 overflow-x-clip">
      {/* Cinta inclinada amarilla sin recortes en top y bottom, por encima de las secciones */}
      <div className="w-[114%] -ml-[7%] transform -rotate-1 sm:-rotate-1.5 bg-[#FFDE00] border-y-2 border-slate-900/20 py-2.5 sm:py-3 shadow-2xl flex items-center overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ 
            duration: 240, // Velocidad reducida en un 90% (desplazamiento pausado y suave)
            ease: 'linear', 
            repeat: Infinity 
          }}
          className="flex items-center gap-14 sm:gap-20 md:gap-24 whitespace-nowrap will-change-transform"
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4 shrink-0">
              <span className="font-bubbly font-black text-xs sm:text-[13px] md:text-sm lg:text-[15px] text-slate-950 uppercase tracking-wider drop-shadow-xs">
                {item.text}
              </span>
              <span className="text-sm sm:text-base lg:text-lg drop-shadow-xs select-none">
                {item.icon}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
