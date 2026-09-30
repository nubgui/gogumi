import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientGlows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Halo 1: Miel / Ámbar cálido superior (Beneficio Grafeno) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -25, 0],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-12 right-[10%] w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full bg-gradient-to-br from-amber-300/40 via-orange-200/30 to-transparent blur-3xl"
      />

      {/* Halo 2: Lavanda / Púrpura suave central (Beneficio Barefoot) */}
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: [0, -35, 0],
          y: [0, 30, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute top-[40%] left-[8%] w-[400px] sm:w-[560px] h-[400px] sm:h-[560px] rounded-full bg-gradient-to-tr from-purple-300/35 via-fuchsia-200/25 to-transparent blur-3xl"
      />

      {/* Halo 3: Menta / Esmeralda fresco inferior (Beneficio Bio-Flex) */}
      <motion.div
        animate={{
          scale: [0.95, 1.12, 0.95],
          x: [0, 25, 0],
          y: [0, -20, 0],
          opacity: [0.16, 0.26, 0.16],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute bottom-16 right-[12%] w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-tl from-emerald-300/35 via-teal-200/25 to-transparent blur-3xl"
      />
    </div>
  );
}
