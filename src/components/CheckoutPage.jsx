import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  Tag, 
  Check, 
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SafeImage from './SafeImage';

export default function CheckoutPage({ 
  orderItem = {
    color: 'Azul Océano',
    colorHex: '#3B82F6',
    size: '21',
    price: 149,
    originalPrice: 189,
    imgFront: '/assets/azul_frente.png',
  },
  onBack,
  onFinish
}) {
  // Datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    newsOptIn: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    department: 'Lima',
    district: '',
    postalCode: '',
    shippingMethod: 'free', // 'free' | 'express'
    paymentMethod: 'card', // 'card' | 'yape' | 'delivery'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  // Estado del cupón de descuento
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0 o porcentaje
  const [couponMessage, setCouponMessage] = useState(null);

  // Estado de simulación de pago
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber] = useState(() => 'GO-' + Math.floor(100000 + Math.random() * 900000));

  // Cálculos de precios
  const basePrice = orderItem.price || 149;
  const shippingCost = formData.shippingMethod === 'express' ? 15 : 0;
  const discountAmount = appliedDiscount > 0 ? (basePrice * appliedDiscount) : 0;
  const finalTotal = (basePrice - discountAmount + shippingCost).toFixed(2);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'PREVENTA15' || clean === 'GOGUMI' || clean === 'UTP') {
      setAppliedDiscount(0.15); // 15% de descuento
      setCouponMessage({ type: 'success', text: '¡Cupón PREVENTA15 aplicado! Ahorraste 15% adicional' });
    } else if (clean === 'GOFREE') {
      setAppliedDiscount(0.10);
      setCouponMessage({ type: 'success', text: '¡Cupón GOFREE aplicado! 10% de descuento' });
    } else {
      setCouponMessage({ type: 'error', text: 'Cupón no válido. Prueba con "PREVENTA15"' });
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#A855F7', '#34D399', '#FB923C', '#F472B6']
        });
      } catch (err) {
        console.log('Confetti triggered');
      }
    }, 1400);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-800 select-none relative"
      style={{
        background: 'linear-gradient(180deg, #64C7F3 0%, #76CFDD 45%, #9CD4D7 100%)'
      }}
    >
      {/* HEADER DE CHECKOUT */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 bg-white/25 backdrop-blur-md border-b border-white/60 shadow-sm flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 hover:bg-white/70 border border-white/70 text-sky-950 font-bubbly text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver al producto</span>
        </button>

        <div className="flex items-center gap-2">
          <img 
            src="/assets/logo-go.png" 
            alt="Logo GO" 
            className="h-8 sm:h-9 w-auto object-contain drop-shadow-sm" 
          />
          <span className="hidden sm:inline font-bubbly text-xs font-bold text-sky-950 uppercase tracking-wider bg-white/40 px-2.5 py-0.5 rounded-md border border-white/60">
            Checkout Seguro
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-sky-950 font-bold bg-white/40 px-3 py-1 rounded-full border border-white/60 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Encriptación 256-Bit</span>
          <span className="sm:hidden">SSL</span>
        </div>
      </header>

      {/* CONTENEDOR CHECKOUT (ESTILO SHOPIFY DE 2 COLUMNAS) */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8 flex-1 flex flex-col justify-center relative z-10">
        
        {/* MODAL / PANTALLA DE ÉXITO DE COMPRA */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-md"
            >
              <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-400 text-center relative text-slate-800">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[2.5]" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-1">
                  ¡Pago Simulado Exitoso!
                </span>

                <h2 className="font-bubbly text-2xl sm:text-3xl font-extrabold text-sky-950">
                  ¡Gracias por tu pedido!
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Hemos confirmado tu reserva para el pequeño explorador. Tu número de pedido es:
                </p>

                <div className="my-4 p-3 bg-sky-50 rounded-2xl border border-sky-200">
                  <span className="text-xs text-sky-700 font-semibold block">Código de Orden Shopify:</span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-sky-900 tracking-wider">
                    #{orderNumber}
                  </span>
                </div>

                {/* Resumen breve */}
                <div className="text-left text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Producto:</span>
                    <span className="font-bold text-slate-800">GO Barefoot ErgoFlex</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Color y Talla:</span>
                    <span className="font-bold text-slate-800">{orderItem.color} • Talla {orderItem.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monto Pagado:</span>
                    <span className="font-extrabold text-emerald-600">S/ {finalTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Entrega Estimada:</span>
                    <span className="font-bold text-sky-800">24 a 48 horas (Preventa)</span>
                  </div>
                </div>

                <button
                  onClick={onFinish || onBack}
                  className="w-full py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bubbly text-base font-bold shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
                >
                  Volver a la tienda
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================== */}
          {/* COLUMNA IZQUIERDA: FORMULARIO CHECKOUT (INFORMACIÓN, ENVÍO Y PAGO) */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            <form onSubmit={handlePay} className="flex flex-col gap-5">
              
              {/* 1. MIGA DE PAN SHOPIFY */}
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                <span className="text-white">Información</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                <span className="text-white">Envío</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                <span className="text-white font-bold underline underline-offset-4">Pago</span>
              </div>

              {/* 2. EXPRESS CHECKOUT SIMULADO */}
              <div className="p-4 rounded-3xl bg-white/25 backdrop-blur-md border border-white/60 shadow-lg text-white">
                <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block text-center mb-2.5">
                  Express Checkout Rápido
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Simulación: Pago Express con Shop Pay')}
                    className="py-2.5 px-3 rounded-xl bg-[#5A31F4] hover:bg-[#4b27d4] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                  >
                    <span>Shop</span><span className="font-extrabold">Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, paymentMethod: 'yape' });
                      alert('Método Yape / Plin preseleccionado');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#742384] hover:bg-[#631c71] text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Yape / Plin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Simulación: Pago Express con Apple Pay')}
                    className="py-2.5 px-3 rounded-xl bg-black hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                  >
                    <span>Apple Pay</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-white/30 w-full" />
                  <span className="bg-white/30 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold text-white tracking-widest absolute">
                    O continúa con tu tarjeta
                  </span>
                </div>
              </div>

              {/* 3. INFORMACIÓN DE CONTACTO */}
              <div className="p-5 rounded-3xl bg-white/25 backdrop-blur-md border border-white/60 shadow-lg text-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bubbly text-base font-bold text-white drop-shadow-sm">
                    1. Información de Contacto
                  </h3>
                  <span className="text-[11px] text-white/80">¿Ya tienes cuenta? <strong className="underline cursor-pointer">Inicia sesión</strong></span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">
                      Correo Electrónico para el seguimiento del pedido *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all shadow-inner"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white/95">
                    <input
                      type="checkbox"
                      checked={formData.newsOptIn}
                      onChange={(e) => setFormData({ ...formData, newsOptIn: e.target.checked })}
                      className="rounded accent-sky-600 w-4 h-4 cursor-pointer"
                    />
                    <span>Enviarme novedades, ofertas exclusivas y guía podológica gratuita</span>
                  </label>
                </div>
              </div>

              {/* 4. DIRECCIÓN DE ENVÍO */}
              <div className="p-5 rounded-3xl bg-white/25 backdrop-blur-md border border-white/60 shadow-lg text-white">
                <h3 className="font-bubbly text-base font-bold text-white drop-shadow-sm mb-3">
                  2. Dirección de Entrega (Perú)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre del tutor"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Apellidos *</label>
                    <input
                      type="text"
                      required
                      placeholder="Apellidos"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Dirección y número *</label>
                    <input
                      type="text"
                      required
                      placeholder="Av. Las Palmeras 123, Dpto 402"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Departamento / Región *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    >
                      <option value="Lima">Lima Metropolitana</option>
                      <option value="Callao">Callao</option>
                      <option value="Arequipa">Arequipa</option>
                      <option value="Cusco">Cusco</option>
                      <option value="La Libertad">La Libertad (Trujillo)</option>
                      <option value="Piura">Piura</option>
                      <option value="Lambayeque">Lambayeque (Chiclayo)</option>
                      <option value="Otras Provincias">Otras Provincias del Perú</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Distrito / Ciudad *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Miraflores / San Borja"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="999 999 999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-white/90 block mb-1">Método de Envío</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, shippingMethod: 'free' })}
                        className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          formData.shippingMethod === 'free'
                            ? 'bg-white text-sky-950 shadow-md ring-2 ring-white'
                            : 'bg-white/20 text-white border border-white/40'
                        }`}
                      >
                        Estándar (Gratis)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                        className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          formData.shippingMethod === 'express'
                            ? 'bg-white text-sky-950 shadow-md ring-2 ring-white'
                            : 'bg-white/20 text-white border border-white/40'
                        }`}
                      >
                        Express (+S/15)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. MÉTODO DE PAGO SIMULADO */}
              <div className="p-5 rounded-3xl bg-white/25 backdrop-blur-md border border-white/60 shadow-lg text-white">
                <h3 className="font-bubbly text-base font-bold text-white drop-shadow-sm mb-3">
                  3. Método de Pago (Simulación Segura)
                </h3>

                {/* Tabs de Selección de Pago */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'bg-white text-sky-950 shadow-md ring-2 ring-white'
                        : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'yape' })}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      formData.paymentMethod === 'yape'
                        ? 'bg-white text-sky-950 shadow-md ring-2 ring-white'
                        : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Yape / Plin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'delivery' })}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      formData.paymentMethod === 'delivery'
                        ? 'bg-white text-sky-950 shadow-md ring-2 ring-white'
                        : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Contraentrega</span>
                  </button>
                </div>

                {/* Contenido según método */}
                {formData.paymentMethod === 'card' && (
                  <div className="p-3.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 space-y-2.5 text-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-950">Datos de la Tarjeta</span>
                      <span className="text-[10px] text-slate-600 font-semibold">Visa • Mastercard • Amex</span>
                    </div>

                    <input
                      type="text"
                      placeholder="Número de tarjeta: 4557 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / AA"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                      <input
                        type="password"
                        maxLength="4"
                        placeholder="CVV (3 dígitos)"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'yape' && (
                  <div className="p-3.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-center text-slate-800 space-y-2">
                    <div className="w-24 h-24 bg-white rounded-2xl p-2 mx-auto shadow-md border border-purple-200 flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-purple-700" />
                    </div>
                    <span className="text-xs font-bold text-purple-900 block">Número Yape / Plin: 999 888 777</span>
                    <p className="text-[11px] text-slate-600">Titular: Gogumi Perú SAC • Envía la captura luego de pulsar pagar</p>
                  </div>
                )}

                {formData.paymentMethod === 'delivery' && (
                  <div className="p-3.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-slate-800 text-xs flex items-center gap-2">
                    <Info className="w-5 h-5 text-sky-700 shrink-0" />
                    <p>Pagas en efectivo o con cualquier tarjeta POS al recibir el paquete en la puerta de tu casa.</p>
                  </div>
                )}
              </div>

              {/* BOTÓN FINAL DE PAGO SHOPIFY */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 hover:from-yellow-200 hover:to-orange-300 text-sky-950 font-bubbly text-base sm:text-lg font-black tracking-wide uppercase shadow-xl shadow-sky-950/20 flex items-center justify-center gap-3 cursor-pointer border-2 border-white/80 transition-all"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-sky-950 border-t-transparent rounded-full animate-spin" />
                    <span>Procesando pago seguro...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-5 h-5 stroke-[2.5]" />
                    <span>PAGAR AHORA — S/ {finalTotal}</span>
                  </>
                )}
              </motion.button>

            </form>

          </div>

          {/* ============================================================== */}
          {/* COLUMNA DERECHA: RESUMEN DE PEDIDO SHOPIFY (ORDER SUMMARY) */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="p-5 sm:p-6 rounded-3xl bg-white/30 backdrop-blur-md border border-white/70 shadow-xl shadow-sky-950/10 text-white sticky top-20">
              
              <h3 className="font-bubbly text-lg font-bold text-white drop-shadow-sm mb-4">
                Resumen del Pedido
              </h3>

              {/* ITEM SELECCIONADO */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/30">
                <div className="relative w-20 h-20 bg-white/40 rounded-2xl p-1.5 border border-white/70 flex items-center justify-center shrink-0 shadow-md">
                  <SafeImage
                    src={orderItem.imgFront || '/assets/azul_frente.png'}
                    alt={orderItem.color}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sky-950 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md">
                    1
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bubbly text-sm font-bold text-white truncate drop-shadow-sm">
                    GO Barefoot ErgoFlex
                  </h4>
                  <p className="text-xs text-white/90 font-medium">
                    Color: <strong>{orderItem.color}</strong>
                  </p>
                  <p className="text-xs text-white/90 font-medium">
                    Talla: <strong>{orderItem.size}</strong> ({orderItem.size <= 21 ? '1 a 2 años' : '3 a 5 años'})
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bubbly text-base font-bold text-white drop-shadow-sm">
                    S/ {basePrice.toFixed(2)}
                  </span>
                  <span className="block text-[10px] text-white/70 line-through">
                    S/ {orderItem.originalPrice || 189}.00
                  </span>
                </div>
              </div>

              {/* INPUT DE CUPÓN DE DESCUENTO */}
              <form onSubmit={handleApplyCoupon} className="my-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Código de descuento (ej: PREVENTA15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-sky-950 placeholder-sky-800/50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/80 border border-white/70 text-sky-950 font-bubbly text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Aplicar
                  </button>
                </div>

                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 font-semibold ${couponMessage.type === 'success' ? 'text-emerald-300' : 'text-rose-200'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* DESGLOSE DE PRECIOS */}
              <div className="space-y-2 pt-3 border-t border-white/30 text-xs text-white/95">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">S/ {basePrice.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-200 font-bold">
                    <span>Descuento aplicado (15% OFF)</span>
                    <span>-S/ {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envío a domicilio</span>
                  <span className="font-semibold text-emerald-300">
                    {formData.shippingMethod === 'free' ? 'GRATIS (Preventa)' : '+S/ 15.00 (Express)'}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-white/40 text-base sm:text-lg font-black text-white">
                  <span className="font-bubbly">TOTAL A PAGAR</span>
                  <span className="font-bubbly text-xl sm:text-2xl text-yellow-200 drop-shadow-md">
                    S/ {finalTotal}
                  </span>
                </div>
              </div>

              {/* SELLOS DE CONFIANZA */}
              <div className="mt-5 pt-4 border-t border-white/30 space-y-2 text-[11px] text-white/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Garantía de adaptación barefoot por 30 días sin costo.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-200 shrink-0" />
                  <span>Envíos protegidos con código de seguimiento en tiempo real.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-4 text-center text-xs text-white/80 border-t border-white/30 mt-8 bg-black/5 backdrop-blur-sm">
        <p>© 2026 GO / Gogumi — Plataforma de Compra Segura. Proyecto Estrategias Digitales (UTP).</p>
      </footer>

    </div>
  );
}
