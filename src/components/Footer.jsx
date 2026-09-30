import React from 'react';
import SafeImage from './SafeImage';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 sm:px-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Logo & Marca */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <SafeImage
              src="/assets/logo-go.png"
              alt="GO"
              className="h-10 w-auto object-contain"
              fallback={
                <span className="font-bubbly text-2xl font-black text-white flex items-center">
                  <span className="text-pink-400 text-xl mr-1">🪽</span> GO
                </span>
              }
            />
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Calzado infantil ergonómico y todoterreno diseñado para acompañar el desarrollo óseo natural del pie de 1 a 5 años.
          </p>
        </div>

        {/* Enlaces de Navegación Rápida */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-bubbly font-medium text-slate-300">
          <a href="#hero" className="hover:text-purple-400 transition-colors">Inicio</a>
          <a href="#variaciones" className="hover:text-purple-400 transition-colors">Modelos</a>
          <a href="#contacto" className="hover:text-purple-400 transition-colors">Asesor de Tallas</a>
        </div>

        {/* Aviso de Proyecto Académico */}
        <div className="text-center md:text-right">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/40 text-xs font-semibold mb-1">
            UTP • Estrategias Digitales (Ciclo 9)
          </span>
          <p className="text-[11px] text-slate-500">
            Proyecto universitario con fines académicos demostrativos.
          </p>
        </div>

      </div>
    </footer>
  );
}
