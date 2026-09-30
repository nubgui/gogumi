import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Share2 } from 'lucide-react';
import SafeImage from './SafeImage';

export default function Navbar({ onContactClick, visible = true }) {
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const socialMenuRef = useRef(null);

  // Cerrar menú social al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (socialMenuRef.current && !socialMenuRef.current.contains(event.target)) {
        setIsSocialMenuOpen(false);
      }
    }
    if (isSocialMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSocialMenuOpen]);

  const socialLinks = [
    {
      label: 'Instagram',
      handle: '@gogumi.pe',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4 fill-sky-500" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      label: 'TikTok',
      handle: '@gogumi.oficial',
      href: 'https://tiktok.com',
      icon: (
        <svg className="w-4 h-4 fill-sky-500" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      label: 'Facebook',
      handle: 'Go Gumi Calzado',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4 fill-sky-500" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      label: 'YouTube',
      handle: 'Go Gumi Oficial',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-sky-500" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.header 
      initial={{ y: -40, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100, 
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3 sm:py-6 max-w-7xl mx-auto"
    >
      {/* Botón / Icono Izquierdo: CONTÁCTANOS */}
      <div>
        {/* En PC: Botón completo con texto */}
        <motion.button
          onClick={onContactClick}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-md text-white font-bubbly text-base sm:text-lg tracking-wider font-semibold shadow-lg shadow-sky-900/10 transition-colors cursor-pointer"
        >
          CONTÁCTANOS
        </motion.button>

        {/* En Móvil: Icono de Contacto */}
        <motion.button
          onClick={onContactClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Contáctanos"
          title="Contáctanos"
          className="sm:hidden w-10 h-10 rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-md shadow-sky-900/15 cursor-pointer active:bg-white/40"
        >
          <Mail className="w-5 h-5 stroke-[2.2]" />
        </motion.button>
      </div>

      {/* Logo Central: GO con alas */}
      <div className="flex items-center justify-center">
        <motion.a 
          href="#hero"
          whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
          transition={{ duration: 0.3 }}
          className="relative block"
        >
          <SafeImage
            src="/assets/logo-go.png"
            alt="GO Logo"
            className="h-11 sm:h-16 md:h-20 w-auto object-contain"
            fallback={
              <div className="flex items-center gap-1.5 font-bubbly text-3xl sm:text-5xl font-black select-none">
                <span className="relative text-white flex items-center">
                  <span className="text-pink-300 text-2xl sm:text-4xl -mr-1">🪽</span>
                  <span className="bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-700 bg-clip-text text-transparent px-1">
                    GO
                  </span>
                </span>
              </div>
            }
          />
        </motion.a>
      </div>

      {/* Redes Sociales Derecha */}
      <div>
        {/* En PC: 4 botones directos */}
        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3.5">
          {socialLinks.map((item) => (
            <SocialIcon key={item.label} href={item.href} label={item.label}>
              <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                {item.icon}
              </span>
            </SocialIcon>
          ))}
        </div>

        {/* En Móvil: Botón de "Social" con submenú interactivo */}
        <div className="relative sm:hidden" ref={socialMenuRef}>
          <motion.button
            onClick={() => setIsSocialMenuOpen(prev => !prev)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Redes Sociales"
            aria-expanded={isSocialMenuOpen}
            className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center shadow-md shadow-sky-900/15 cursor-pointer ${
              isSocialMenuOpen 
                ? 'bg-white text-sky-600 border-white shadow-lg' 
                : 'bg-white/20 text-white border-white/80 backdrop-blur-md active:bg-white/40'
            }`}
          >
            <Share2 className="w-5 h-5 stroke-[2.2]" />
          </motion.button>

          {/* Submenú desplegable de redes sociales */}
          <AnimatePresence>
            {isSocialMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -6, originX: 1, originY: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -6 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="absolute right-0 top-12 w-52 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-2xl shadow-sky-950/25 p-2 z-50 overflow-hidden"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bubbly font-bold text-sky-950 uppercase tracking-wider">
                    Redes Sociales
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="flex flex-col gap-1">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsSocialMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-sky-50 active:bg-sky-100 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-sky-100 transition-all">
                        {item.icon}
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-bubbly text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.handle}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

function SocialIcon({ href, children, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-md shadow-sky-900/15 cursor-pointer transition-shadow hover:shadow-xl"
    >
      {children}
    </motion.a>
  );
}
