import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, CheckCircle2, XCircle, Award } from 'lucide-react';

export default function ErgonomicScience() {
  const comparisonPoints = [
    {
      feature: "Horma del Calzado",
      traditional: "Estrecha, comprime los dedos hacia adentro",
      gogumi: "Puntera Barefoot ultra-ancha: dedos libres en abanico",
    },
    {
      feature: "Flexibilidad de Suela",
      traditional: "Rígida (15-20 mm), anula sensaciones del suelo",
      gogumi: "Suela milimétrica de Grafeno (1-2 mm), flexión total 360°",
    },
    {
      feature: "Drop (Elevación de talón)",
      traditional: "Talón elevado, altera postura de la espalda",
      gogumi: "Zero-Drop real (0 mm), alineación neutra de columna",
    },
    {
      feature: "Desarrollo del Arco",
      traditional: "Vuelve los músculos del pie perezosos",
      gogumi: "Estimula la formación natural del arco por propiocepción",
    },
    {
      feature: "Todo Terreno & Agua",
      traditional: "Tardan días en secar y acumulan olores",
      gogumi: "Evacuación de agua instantánea, lavables con agua y jabón",
    },
  ];

  return (
    <section 
      id="ergonomia"
      className="relative w-full h-screen h-[100dvh] snap-start snap-always shrink-0 bg-slate-900 text-white overflow-hidden flex flex-col justify-center px-4 sm:px-8 py-6"
    >
      {/* Resplandores de fondo */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col justify-center h-full max-h-[850px] relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-2xl mx-auto mb-6 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold font-bubbly mb-2 backdrop-blur-md">
            <HeartPulse className="w-3.5 h-3.5 text-pink-400" />
            <span>SALUD PODOLÓGICA INFANTIL</span>
          </div>

          <h2 className="font-bubbly text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Los primeros 5 años definen sus pies para siempre
          </h2>

          <p className="mt-2 text-slate-300 text-xs sm:text-sm font-normal">
            Hasta los 5 años sus pies son cartílago moldeable. Un zapato rígido altera su osificación.
          </p>
        </div>

        {/* TABLA COMPARATIVA COMPACTA PARA DIAPOSITIVA */}
        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-5 sm:p-7 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-700 uppercase tracking-wider text-[11px] sm:text-xs">
                  <th className="py-2.5 px-3 font-bubbly text-slate-400">Aspecto</th>
                  <th className="py-2.5 px-3 font-bubbly text-rose-300 bg-rose-950/20 rounded-t-xl">
                    ❌ Zapato Tradicional
                  </th>
                  <th className="py-2.5 px-3 font-bubbly text-emerald-300 bg-emerald-950/30 rounded-t-xl">
                    ✅ Calzado GO ErgoFlex
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {comparisonPoints.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-white font-bubbly">
                      {item.feature}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 bg-rose-950/10">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-white font-medium bg-emerald-950/20">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-100">{item.gogumi}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie de slide */}
          <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </span>
              <span>
                <strong className="text-white">Regla de oro:</strong> El mejor zapato infantil simula caminar descalzo.
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
              100% Bio-Adaptativo
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
