/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').replace(/^(7|8)/, '');
  let result = '+7';
  if (digits.length === 0) return result;
  result += ' (' + digits.slice(0, 3);
  if (digits.length < 3) return result;
  result += ') ' + digits.slice(3, 6);
  if (digits.length < 6) return result;
  result += '-' + digits.slice(6, 8);
  if (digits.length < 8) return result;
  result += '-' + digits.slice(8, 10);
  return result;
};

const isPhoneComplete = (phone: string) =>
  phone.replace(/\D/g, '').length === 11;

const BookingModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const nameInvalid = name.trim().length === 0;
    const phoneInvalid = !isPhoneComplete(phone);
    if (nameInvalid) setNameError(true);
    if (phoneInvalid) setPhoneError(true);
    if (nameInvalid || phoneInvalid) return;

    setSending(true);
    const formData = new FormData();
    formData.append('access_key', '38ecc3df-a7a2-4ef7-8c9a-8ff517567e1e');
    formData.append('name', name.trim());
    formData.append('phone', phone);
    if (note.trim()) formData.append('message', note.trim());
    try {
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
    } catch (_) {
      // отправляем лучший ответ пользователю в любом случае
    }
    setSending(false);
    setSent(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setName(''); setNameError(false); setPhone(''); setPhoneError(false); setNote(''); setSent(false); }, 400);
  };

  const fieldClass =
    'w-full bg-transparent border-b border-white/20 focus:border-gold focus:outline-none font-lora font-medium text-white placeholder:text-white/30 pb-2 transition-colors duration-300';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-charcoal w-full max-w-lg px-10 py-12 md:px-12 md:py-12 overflow-hidden"
            style={{}}
            onClick={e => e.stopPropagation()}
          >
            {/* Закрыть */}
            <button
              onClick={handleClose}
              aria-label="Закрыть"
              className="absolute top-5 right-6 text-white/35 hover:text-white transition-colors duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <span className="font-accent text-gold block mb-4" style={{ fontSize: 'clamp(2.30rem, 4.60vw, 3.45rem)' }}>
                    Спасибо!
                  </span>
                  <p className="font-lora font-medium text-white/80" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  {/* Заголовок */}
                  <div className="mb-10">
                    <h2
                      className="font-cormorant font-semibold text-white leading-none"
                      style={{ fontSize: 'clamp(2.07rem, 3.80vw, 2.88rem)' }}
                    >
                      Забронировать
                    </h2>
                    <span
                      className="font-accent text-gold block mt-1"
                      style={{ fontSize: 'clamp(1.84rem, 3.40vw, 2.59rem)', lineHeight: 1 }}
                    >
                      дату
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={e => { setName(e.target.value); setNameError(false); }}
                        className={`${fieldClass} ${nameError ? 'border-red-400 focus:border-red-400' : ''}`}
                        style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}
                      />
                      {nameError && (
                        <p className="font-lora text-red-400 mt-2" style={{ fontSize: '0.85rem' }}>
                          Введите ваше имя
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={e => {
                          const formatted = formatPhone(e.target.value);
                          setPhone(formatted);
                          setPhoneError(false);
                        }}
                        onFocus={() => { if (!phone) setPhone('+7 ('); }}
                        onBlur={() => { if (phone === '+7 (') setPhone(''); }}
                        className={`${fieldClass} ${phoneError ? 'border-red-400 focus:border-red-400' : ''}`}
                        style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}
                      />
                      {phoneError && (
                        <p className="font-lora text-red-400 mt-2" style={{ fontSize: '0.85rem' }}>
                          Введите корректный номер
                        </p>
                      )}
                    </div>
                    <div>
                      <textarea
                        placeholder="Примечания (желаемый способ связи, дата, пожелания)"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        rows={3}
                        className={`${fieldClass} resize-none`}
                        style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}
                      />
                    </div>

                    {/* Подвал: соцсети + кнопка */}
                    <div className="flex items-center justify-between pt-2">
                      {/* Соцсети */}
                      <div className="flex items-center gap-4">
                        {/* Instagram */}
                        <a href="#" aria-label="Instagram" className="text-white/45 hover:text-white transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                          </svg>
                        </a>
                        {/* VK */}
                        <a href="#" aria-label="ВКонтакте" className="text-white/45 hover:text-white transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.7c-.64 0-.84-.51-1.99-1.67-1-.97-1.44-.97-1.69-.97-.34 0-.44.1-.44.58v1.52c0 .42-.13.67-1.22.67-1.8 0-3.8-1.09-5.2-3.13C4.13 10.12 3.7 8.1 3.7 7.67c0-.25.1-.48.58-.48h1.7c.43 0 .59.19.75.65.83 2.38 2.21 4.47 2.78 4.47.21 0 .31-.1.31-.64V9.62c-.07-1.15-.67-1.25-.67-1.66 0-.2.16-.4.42-.4h2.68c.36 0 .49.19.49.61v3.26c0 .36.16.49.26.49.21 0 .39-.13.78-.52 1.21-1.35 2.07-3.43 2.07-3.43.11-.25.31-.48.74-.48h1.7c.51 0 .62.26.51.61-.21.98-2.28 3.91-2.28 3.91-.18.29-.24.42 0 .74.17.23.74.71 1.12 1.14.7.77 1.23 1.41 1.37 1.86.16.44-.07.67-.51.67z" />
                          </svg>
                        </a>
                        {/* WhatsApp */}
                        <a href="#" aria-label="WhatsApp" className="text-white/45 hover:text-white transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                        {/* Telegram */}
                        <a href="#" aria-label="Telegram" className="text-white/45 hover:text-white transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                          </svg>
                        </a>
                      </div>

                      {/* Кнопка отправки */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="font-lora font-medium text-white border border-white/30 rounded-full px-8 py-3 hover:bg-white hover:text-charcoal transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-default"
                        style={{ fontSize: 'clamp(1rem, 1.38vw, 1.15rem)' }}
                      >
                        {sending ? 'Отправка...' : 'Отправить заявку'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onBook }: { onBook: () => void }) => {
  const menuItems = [
    { label: 'О нас', href: '#' },
    { label: 'Залы', href: '#' },
    { label: 'Галерея', href: '#' },
    { label: 'Условия', href: '#' },
    { label: 'Контакты', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-charcoal border-b border-white/8">
      <div className="grid grid-cols-3 items-center px-8 md:px-12 py-4">

        {/* Лого — слева */}
        <div className="font-cormorant font-semibold text-white text-xl md:text-2xl font-medium">
          Ривер Лофт
        </div>

        {/* Навигация — по центру */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-lora font-medium text-[14px] text-white hover:text-white transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Правая часть — телефон, соцсети, кнопка */}
        <div className="hidden md:flex items-center justify-end gap-5">

          {/* Телефон */}
          <a href="tel:+74991234567" className="font-lora font-medium text-[13px] text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap">
            +7 (499) 123-45-67
          </a>

          {/* Соцсети */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="text-white/90 hover:text-white transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* VK */}
            <a href="#" aria-label="ВКонтакте" className="text-white/90 hover:text-white transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.7c-.64 0-.84-.51-1.99-1.67-1-.97-1.44-.97-1.69-.97-.34 0-.44.1-.44.58v1.52c0 .42-.13.67-1.22.67-1.8 0-3.8-1.09-5.2-3.13C4.13 10.12 3.7 8.1 3.7 7.67c0-.25.1-.48.58-.48h1.7c.43 0 .59.19.75.65.83 2.38 2.21 4.47 2.78 4.47.21 0 .31-.1.31-.64V9.62c-.07-1.15-.67-1.25-.67-1.66 0-.2.16-.4.42-.4h2.68c.36 0 .49.19.49.61v3.26c0 .36.16.49.26.49.21 0 .39-.13.78-.52 1.21-1.35 2.07-3.43 2.07-3.43.11-.25.31-.48.74-.48h1.7c.51 0 .62.26.51.61-.21.98-2.28 3.91-2.28 3.91-.18.29-.24.42 0 .74.17.23.74.71 1.12 1.14.7.77 1.23 1.41 1.37 1.86.16.44-.07.67-.51.67z" />
              </svg>
            </a>
          </div>

          {/* CTA кнопка */}
          <button
            onClick={onBook}
            className="font-lora font-medium text-[13px] text-white border border-white/40 hover:bg-white hover:text-charcoal transition-all duration-300 px-5 py-2 rounded-full whitespace-nowrap cursor-pointer"
          >
            Забронировать
          </button>
        </div>

        {/* Мобильный телефон */}
        <div className="md:hidden flex justify-end">
          <a href="tel:+74991234567" className="font-lora font-medium text-[12px] text-white/70">
            +7 (499) 123-45-67
          </a>
        </div>
      </div>
    </nav>
  );
};

const FACTS = [
  { num: '10+', label: 'лет опыта', desc: 'в организации мероприятий любого формата' },
  { num: '2 000+', label: 'мероприятий', desc: 'свадьбы, юбилеи, корпоративы, семинары и не только' },
  { num: '100+', label: 'отзывов 5★', desc: 'на Яндексе от довольных гостей и пар' },
  { num: null, label: 'Любой формат', desc: 'Свадьбы, юбилеи, корпоративы, семинары, презентации, дни рождения — всё зависит от вашей фантазии' },
  { num: '40+', label: 'подрядчиков', desc: 'проверенные партнёры на ваш выбор' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const HERO_SLIDES = [
  '/15-43-14.webp',
  '/wed-a-140.webp',
  '/wdfl357.webp',
  '/wdfl593.webp',
  '/wed-a-53.webp',
  '/20-14-11.webp',
  '/photo-443.webp',
];

const HERO_SLIDE_POSITION: Record<string, string> = {
  '/wed-a-53.webp': 'center 30%',
};

const Hero = ({ onBook }: { onBook: () => void }) => {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-charcoal" style={{ minHeight: '100svh' }}>
      {/* Parallax background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        {/* Preload all slides */}
        <div className="sr-only" aria-hidden="true">
          {HERO_SLIDES.map((src) => <img key={src} src={src} alt="" />)}
        </div>
        <AnimatePresence>
          <motion.img
            key={HERO_SLIDES[current]}
            src={HERO_SLIDES[current]}
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2, ease: 'easeInOut' },
              scale: { duration: 6, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: HERO_SLIDE_POSITION[HERO_SLIDES[current]] ?? 'center' }}
          />
        </AnimatePresence>
        {/* Bottom glow — keeps photo vivid, only darkens where text lives */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        {/* Subtle left vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
      </motion.div>

      {/* Main content — left-aligned, bottom */}
      <div className="absolute inset-0 flex flex-col justify-end items-start text-white px-10 md:px-16 pb-16 pt-[72px]">
        {/* Heading */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <h1
            className="leading-[0.88] font-cormorant font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(3.68rem, 7.47vw, 9.20rem)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f0e0c8 45%, #C9A86C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 40px rgba(0,0,0,0.5))',
            }}
          >
            Идеальное<br />мгновение
          </h1>

          <span
            className="font-accent block mt-2"
            style={{
              fontSize: 'clamp(3.45rem, 8.05vw, 10.92rem)',
              color: 'rgba(232, 208, 168, 0.95)',
              textShadow: '0 2px 32px rgba(0,0,0,0.5)',
              lineHeight: 1,
            }}
          >
            вашей истории
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-lora font-medium text-white mt-6 max-w-lg leading-relaxed text-left"
          style={{ fontSize: 'clamp(1.21rem, 1.72vw, 1.55rem)' }}
        >
          Потрясающее место для вашего праздника с огромными панорамными окнами
          {' '}и видом на Церковь Зна́мения Пресвятой Богоро́дицы
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4 items-center"
        >
          <button
            onClick={onBook}
            className="font-lora font-medium text-white border border-white/55 px-10 py-4 rounded-full hover:bg-white hover:text-charcoal transition-all duration-300 cursor-pointer"
            style={{ fontSize: 'clamp(1.03rem, 1.38vw, 1.21rem)' }}
          >
            Забронировать дату
          </button>
          <a
            href="#"
            className="font-lora font-medium text-white/90 px-5 py-4 hover:text-white transition-colors duration-250 cursor-pointer"
            style={{ fontSize: 'clamp(1.03rem, 1.38vw, 1.21rem)' }}
          >
            Смотреть площадку
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const VenueBar = () => (
  <div className="bg-charcoal border-y border-white/10 px-8 md:px-16 py-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
      {[
        { value: '200', unit: 'м²', label: 'пространства' },
        { value: 'до 100', unit: '', label: 'гостей при банкетной рассадке' },
        { value: 'до 150', unit: '', label: 'гостей на фуршет' },
      ].map((item, i) => (
        <div key={i} className="flex items-baseline gap-2 px-10 py-3 sm:py-0">
          <span className="font-cormorant font-semibold text-gold leading-none" style={{ fontSize: 'clamp(2.30rem, 4.02vw, 3.45rem)' }}>
            {item.value}{item.unit}
          </span>
          <span className="font-lora font-medium text-white" style={{ fontSize: 'clamp(0.98rem, 1.26vw, 1.15rem)' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const StatsSection = () => {
  return (
    <section className="bg-charcoal py-32 px-8 md:px-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto mb-20 text-center"
      >
        <h2 className="font-cormorant font-semibold text-white leading-none" style={{ fontSize: 'clamp(4.02rem, 8.05vw, 8.05rem)' }}>
          Почему<br />
          <span className="font-accent font-light text-gold/80">выбирают нас</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/10"
      >
        {/* Плашка 1 — широкая, большая */}
        <motion.div variants={itemVariants} className="relative col-span-2 lg:col-span-1 bg-charcoal px-10 py-14 flex flex-col justify-end min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(6.90rem, 11.50vw, 12.65rem)' }}>10+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.84rem, 2.88vw, 2.88rem)' }}>лет опыта</span>
          <span className="font-lora font-medium text-white mt-3" style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.38rem)' }}>в организации мероприятий любого формата</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 2 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-10 py-14 flex flex-col justify-end min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500 whitespace-nowrap" style={{ fontSize: 'clamp(5.75rem, 9.20vw, 10.35rem)' }}>2 000+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.84rem, 2.88vw, 2.88rem)' }}>мероприятий</span>
          <span className="font-lora font-medium text-white mt-3" style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.38rem)' }}>свадьбы, юбилеи, корпоративы, семинары и не только</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 3 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-10 py-14 flex flex-col justify-end min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(5.75rem, 9.20vw, 10.35rem)' }}>100+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.84rem, 2.88vw, 2.88rem)' }}>отзывов 5★</span>
          <span className="font-lora font-medium text-white mt-3" style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.38rem)' }}>на Яндексе от довольных гостей и пар</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 4 — широкая, текстовая */}
        <motion.div variants={itemVariants} className="relative col-span-2 bg-charcoal px-10 py-14 flex flex-col justify-end group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-white leading-tight group-hover:text-gold transition-colors duration-500" style={{ fontSize: 'clamp(2.88rem, 5.75vw, 6.32rem)' }}>Любой формат</span>
          <span className="font-lora font-medium text-white mt-4 max-w-2xl" style={{ fontSize: 'clamp(1.15rem, 1.61vw, 1.49rem)' }}>Свадьбы, юбилеи, корпоративы, семинары, презентации, дни рождения — всё зависит от вашей фантазии</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 5 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-10 py-14 flex flex-col justify-end group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(5.75rem, 9.20vw, 10.35rem)' }}>40+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.84rem, 2.88vw, 2.88rem)' }}>подрядчиков</span>
          <span className="font-lora font-medium text-white mt-3" style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.38rem)' }}>проверенные партнёры на ваш выбор</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

      </motion.div>
    </section>
  );
};




const AboutRiverLoft = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Church rises from below, covers text physically (no fake opacity fade on text)
  const churchY = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);
  const churchScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal text-white"
      style={{ minHeight: '220vh' }}
    >
      {/* Sticky viewport — everything is pinned here */}
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal z-10">

        {/* Text — stays white, church physically covers it */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-center z-10 pointer-events-none">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto flex flex-col items-center"
          >
            <h2
              className="font-cormorant font-semibold leading-[1.05] tracking-tight mb-16 text-white"
              style={{ fontSize: 'clamp(3.45rem, 6.90vw, 6.90rem)' }}
            >
              Светлый лофт
              <br />
              <span
                className="font-accent text-white font-light block mt-3"
                style={{ fontSize: 'clamp(2.88rem, 6.32vw, 6.32rem)' }}
              >
                рядом с парком Дубровицы
              </span>
            </h2>

            <div
              className="flex flex-col md:flex-row gap-8 md:gap-16 text-left max-w-5xl font-lora font-medium text-white leading-[1.7] mb-16"
              style={{ fontSize: 'clamp(1.26rem, 1.84vw, 1.58rem)' }}
            >
              <p className="flex-1">
                Ривер Лофт – это идеальное место для отдыха вдали от городской суеты. Пространство для Ваших событий любого формата в живописном и энергетически сильном месте слияния двух рек Пахры и Десны.
              </p>
              <p className="flex-1">
                Большие панорамные окна открывают вид на архитектурный ансамбль усадьбы Голицыных, увенчанный неповторимой и таинственной церковью Знамение.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Church — rises from below, overlaps text, z-20 */}
        <motion.div
          style={{ y: churchY, scale: churchScale, willChange: 'transform' }}
          className="absolute inset-x-0 bottom-0 z-20 origin-bottom"
        >
          <img
            src="/church-dubrovitsy.png"
            alt="Церковь Знамение в Дубровицах"
            className="w-full h-auto block"
          />
        </motion.div>

      </div>

    </section>
  );
};


const ADVANTAGES = [
  {
    title: 'Качество',
    desc: 'Работаем только с проверенными партнерами, артистами и персоналом.',
  },
  {
    title: 'Сроки',
    desc: 'Чётко соблюдаем сроки подготовки. Продумываем тайминг мероприятия по секундам.',
  },
  {
    title: 'Индивидуальный подход',
    desc: 'Формируем для вас индивидуальное предложение согласно вашему бюджету.',
  },
  {
    title: 'В самое сердце',
    desc: 'Организуем событие, которое запомнится вам надолго.',
  }
];

const EditorialAdvantage = ({ title, desc, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group flex items-start gap-6 md:gap-12 py-10 border-t border-white/10 cursor-default"
    >
      {/* Номер */}
      <span className="font-cormorant font-semibold text-2xl text-gold/60 font-light w-10 flex-shrink-0 pt-1 transition-colors duration-500 group-hover:text-gold">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 flex-1">
        {/* TITLE-M — заголовок преимущества */}
        <h3
          className="font-cormorant font-semibold text-white flex-shrink-0 md:w-72 leading-tight transition-colors duration-500 group-hover:text-gold"
          style={{ fontSize: 'clamp(2.30rem, 4.02vw, 4.02rem)' }}
        >
          {title}
        </h3>

        {/* Body — крупный, прямой, хорошо читается */}
        <p
          className="font-lora font-medium text-white leading-[1.7] transition-colors duration-500 group-hover:text-gold/75"
          style={{ fontSize: 'clamp(1.26rem, 1.72vw, 1.58rem)' }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const AdvantagesSection = () => {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-24 bg-charcoal overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="/IMG_20260414_202525.webp"
          loading="lazy"
          className="w-full h-full object-cover opacity-10"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          {/* TITLE-L */}
          <h2
            className="font-cormorant font-semibold text-white leading-[1.05]"
            style={{ fontSize: 'clamp(3.45rem, 6.90vw, 6.90rem)' }}
          >
            Наши
            <br />
            <span className="font-accent font-light text-white">преимущества</span>
          </h2>

          {/* Подзаголовок — читаемый размер */}
          <p
            className="font-lora font-medium text-white max-w-sm md:text-right pb-1"
            style={{ fontSize: 'clamp(1.15rem, 1.61vw, 1.44rem)' }}
          >
            Идеальное мероприятие складывается из внимания к каждой детали.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {ADVANTAGES.map((adv, i) => (
            <EditorialAdvantage key={i} title={adv.title} desc={adv.desc} index={i} />
          ))}
          <div className="border-t border-white/10" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 flex justify-end"
        >
          <span
            className="font-accent text-white/90 -rotate-6 inline-block"
            style={{ fontSize: 'clamp(1.72rem, 3.45vw, 3.45rem)' }}
          >
            С любовью, команда
          </span>
        </motion.div>
      </div>
    </section>
  );
};

const ZONES = [
  {
    title: 'Главный зал',
    images: ['/hall-1.webp', '/hall-2.webp', '/hall-3.webp'],
  },
  {
    title: 'Welcome-зона',
    images: ['/IMG_20260414_202517.webp', '/IMG_20260414_202525.webp', '/IMG_20260414_202529.webp'],
  },
  {
    title: 'Зона церемонии',
    images: ['/IMG_20260414_202551.webp', '/IMG_20260414_202553.webp'],
  },
  {
    title: 'Камерная терраса',
    images: ['/IMG_20260414_202558.webp', '/IMG_20260414_202520.webp'],
  },
  {
    title: 'Гримерная комната',
    images: [],
  },
];

const INCLUDED_SERVICES = [
  'Работа под закрытие',
  'Профессиональное обслуживание',
  'Вкусная кухня',
  'Гардеробная зона',
  '4 уборных комнаты',
  'Столы и стулья',
  'Белый текстиль',
  'Дизайнерская посуда',
  'Профессиональная музыкальная система',
  'Современная светомузыка',
  'Дыммашина',
  '3 LED-экрана 65″',
  'Wi-Fi',
  'Кондиционирование',
  'Охрана, видеонаблюдение, тревожная кнопка',
  'Пледы, зонтики, одноразовые тапочки',
  'Клининг',
  'Бесплатная парковка',
];

const EXTRA = [
  'VIP-обслуживание',
  'Услуги свадебного координатора',
  'Аренда дизайнерских стульев Кьявари',
  'Проведение выездной регистрации в помещении',
  'Лазерный проектор с «Эффектом Золушки»',
  'Подбор свадебного путешествия',
];

const ZonesSlider = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const zones = ZONES.filter(z => z.images.length > 0);

  const allImages = useMemo(() => {
    return zones.flatMap((z, zoneIndex) =>
      z.images.map((src) => ({ src, zoneIndex, title: z.title }))
    );
  }, [zones]);

  const scrollToZone = (zoneIndex: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstImageIndex = allImages.findIndex(img => img.zoneIndex === zoneIndex);
    if (firstImageIndex !== -1) {
      const card = el.children[firstImageIndex] as HTMLElement;
      el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < allImages.length; i++) {
      const child = el.children[i] as HTMLElement;
      if (!child) continue;
      // Calculate distance from center of the image to the center of the scroll container
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const scrollCenter = el.scrollLeft + el.offsetWidth / 2;
      const diff = Math.abs(childCenter - scrollCenter);

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    const currentZoneIndex = allImages[closestIndex]?.zoneIndex ?? 0;
    if (currentZoneIndex !== active) {
      setActive(currentZoneIndex);
    }
  };

  return (
    <div className="mb-14">
      {/* Заголовок */}
      <h3
        className="font-cormorant font-semibold text-charcoal leading-tight mb-10"
        style={{ fontSize: 'clamp(1.84rem, 3.45vw, 2.88rem)' }}
      >
        Что входит в стоимость
      </h3>

      {/* Таймлайн-табы */}
      <div className="relative mb-6">
        <div className="flex">
          {zones.map((zone, i) => (
            <button
              key={i}
              onClick={() => scrollToZone(i)}
              className="relative flex-1 text-left pt-1 pb-3 pr-4 transition-colors duration-200"
            >
              <span
                className="block font-lora font-medium text-[11px] mb-1 transition-colors duration-200"
                style={{ color: i === active ? '#C9A86C' : 'color-mix(in srgb, #191919 30%, transparent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="block font-cormorant font-semibold leading-tight transition-colors duration-200"
                style={{
                  fontSize: 'clamp(1.09rem, 2.07vw, 1.44rem)',
                  color: i === active ? '#191919' : 'color-mix(in srgb, #191919 40%, transparent)',
                }}
              >
                {zone.title}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal/10" />
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-gold"
                animate={{ width: i === active ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`.zones-scroll::-webkit-scrollbar{display:none}`}</style>
      {/* Полоса карточек — нативный скролл */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="zones-scroll flex gap-4 overflow-x-auto"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {allImages.map((img, i) => (
            <div
              key={i}
              className="flex-none snap-start overflow-hidden aspect-[4/3] bg-charcoal/5"
              style={{ width: 'calc(100vw - 3rem)', maxWidth: '380px' }}
            >
              <img
                src={img.src}
                loading="lazy"
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Градиент справа */}
        <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none bg-gradient-to-l from-sand to-transparent" />
      </div>
    </div>
  );
};

const BookingSection = ({ onBook }: { onBook: () => void }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const isComplete = day !== '' && month !== '' && year.length === 4;
  const parsedDate = isComplete
    ? new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    : null;
  const isValid =
    parsedDate !== null &&
    !isNaN(parsedDate.getTime()) &&
    parsedDate.getDate() === parseInt(day);

  const getRentalTariff = (date: Date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const dow = date.getDay(); // 0=вс,1=пн,...,6=сб

    const isDecLate = m === 12 && d >= 15 && d <= 30;
    const isSeason2 = (m >= 6 && m <= 9) || (m === 12 && !isDecLate);
    const isSeason3 = isDecLate;

    if (isSeason3) {
      return {
        label: 'Декабрь (15–30)',
        rows: [
          { days: 'Пн. — Чт.', price: 80000, match: dow >= 1 && dow <= 4 },
          { days: 'Пт., Сб.', price: 150000, match: dow === 5 || dow === 6 },
          { days: 'Вс.', price: 100000, match: dow === 0 },
        ],
      };
    }
    if (isSeason2) {
      return {
        label: 'Июнь — Сентябрь, Декабрь (до 15.12)',
        rows: [
          { days: 'Пн. — Чт.', price: 60000, match: dow >= 1 && dow <= 4 },
          { days: 'Пт.', price: 90000, match: dow === 5 },
          { days: 'Сб.', price: 100000, match: dow === 6 },
          { days: 'Вс.', price: 80000, match: dow === 0 },
        ],
      };
    }
    return {
      label: 'Январь — Май, Октябрь, Ноябрь',
      rows: [
        { days: 'Пн. — Чт.', price: 50000, match: dow >= 1 && dow <= 4 },
        { days: 'Пт., Сб.', price: 80000, match: dow === 5 || dow === 6 },
        { days: 'Вс.', price: 60000, match: dow === 0 },
      ],
    };
  };

  const tariff = isValid ? getRentalTariff(parsedDate!) : null;

  const inputClass =
    'w-16 md:w-24 bg-transparent border-b-2 border-charcoal/20 focus:border-gold focus:outline-none text-center font-cormorant font-semibold text-charcoal pb-1 transition-colors duration-200 placeholder:text-charcoal/25';

  return (
    <section className="py-32 px-6 lg:px-24 bg-sand text-charcoal flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2
            className="font-cormorant font-semibold leading-[1.05] text-charcoal"
            style={{ fontSize: 'clamp(3.45rem, 6.90vw, 6.90rem)' }}
          >
            Условия
            <br />
            <span className="font-accent font-light text-charcoal">бронирования</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p
            className="font-lora font-medium text-charcoal mb-12 text-center"
            style={{ fontSize: 'clamp(1.15rem, 1.61vw, 1.44rem)' }}
          >
            Когда вы планируете свой праздник?
          </p>

          <div className="flex items-end gap-3 md:gap-5">
            <input
              type="text" inputMode="numeric" placeholder="ДД" maxLength={2}
              value={day}
              onChange={e => {
                const raw = e.target.value.replace(/\D/g, '');
                if (raw === '') { setDay(''); return; }
                const n = parseInt(raw);
                if (n > 31) return;
                setDay(raw);
                if (raw.length === 2 || (raw.length === 1 && n > 3)) monthRef.current?.focus();
              }}
              className={inputClass}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            />
            <input
              ref={monthRef}
              type="text" inputMode="numeric" placeholder="ММ" maxLength={2}
              value={month}
              onChange={e => {
                const raw = e.target.value.replace(/\D/g, '');
                if (raw === '') { setMonth(''); return; }
                const n = parseInt(raw);
                if (n > 12) return;
                setMonth(raw);
                if (raw.length === 2 || (raw.length === 1 && n > 1)) yearRef.current?.focus();
              }}
              className={inputClass}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            />
            <input
              ref={yearRef}
              type="text" inputMode="numeric" placeholder="ГГГГ" maxLength={4}
              value={year}
              onChange={e => {
                const raw = e.target.value.replace(/\D/g, '');
                if (raw === '') { setYear(''); return; }
                const n = parseInt(raw);
                if (raw.length === 4 && (n < 2000 || n > 2099)) return;
                setYear(raw);
              }}
              className="w-28 md:w-48 bg-transparent border-b-2 border-charcoal/20 focus:border-gold focus:outline-none text-center font-cormorant font-semibold text-charcoal pb-1 transition-colors duration-200 placeholder:text-charcoal/25"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            />
          </div>

          {/* Контент раскрывается инлайн */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isValid ? 1 : 0, height: isValid ? 'auto' : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
            style={{ overflowY: 'clip', overflowX: 'visible' }}
          >
            <div className="w-full h-px bg-charcoal/10 mt-16 mb-14" />

            {/* Что входит в стоимость — зоны */}
            <ZonesSlider />

            {/* Остальное */}
            <div className="mt-12 pt-10 border-t border-charcoal/10 mb-14">
              <p className="font-lora font-medium text-charcoal mb-6" style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)' }}>Также включено</p>
              <ul className="columns-2 md:columns-3 gap-8">
                {INCLUDED_SERVICES.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 font-lora font-medium text-charcoal mb-2 md:mb-3 break-inside-avoid" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold mt-1 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* За дополнительную плату */}
            <div className="mb-14 border-t border-charcoal/10 pt-12">
              <h3
                className="font-cormorant font-semibold text-charcoal mb-2 leading-tight"
                style={{ fontSize: 'clamp(1.84rem, 3.45vw, 2.88rem)' }}
              >
                За дополнительную плату
              </h3>
              <p className="font-lora font-medium text-charcoal mb-7" style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)' }}>Доступны по запросу</p>
              <ul className="columns-1 md:columns-2 gap-10">
                {EXTRA.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 font-lora font-medium text-charcoal mb-2 md:mb-3 break-inside-avoid" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                    <span className="mt-2.5 w-1.5 h-1.5 bg-gold flex-shrink-0 rotate-45" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Условия */}
            <div className="mb-14 border-t border-charcoal/10 pt-12">
              <h3
                className="font-cormorant font-semibold text-charcoal mb-8 leading-tight"
                style={{ fontSize: 'clamp(1.84rem, 3.45vw, 2.88rem)' }}
              >
                Условия
              </h3>
              <ul className="flex flex-col gap-2 md:gap-3">
                {[
                  'Минимальный заказ по меню — от 5 000 ₽/чел.',
                  'Сервисный сбор за обслуживание — 10% от стоимости заказа.',
                  'Минимальный депозит — 200 000 ₽ (без учёта обслуживания и аренды зала).',
                  'Авансовый платеж — 50% стоимости аренды + 30 000 ₽ (депозит).'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 font-lora font-medium text-charcoal" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                    <span className="mt-2.5 w-1.5 h-1.5 bg-gold flex-shrink-0 rotate-45" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Аренда зала */}
            {tariff && (
              <div className="border-t border-charcoal/10 pt-12 mb-16">
                <h3
                  className="font-cormorant font-semibold text-charcoal mb-2 leading-tight"
                  style={{ fontSize: 'clamp(1.84rem, 3.45vw, 2.88rem)' }}
                >
                  Аренда зала
                </h3>
                <p className="font-lora font-medium text-charcoal mb-8" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                  {tariff.label}
                </p>
                <div className="flex flex-col gap-0 border-t border-charcoal/10">
                  {tariff.rows.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-4 border-b border-charcoal/10 ${row.match ? 'text-charcoal' : 'text-charcoal'}`}
                    >
                      <span className="font-lora font-medium" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                        {row.days}
                        {row.match && (
                          <span className="ml-4 px-3 py-1 bg-gold text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full">ваш день</span>
                        )}
                      </span>
                      <span
                        className={`font-cormorant font-semibold leading-none ${row.match ? 'text-charcoal' : 'text-charcoal'}`}
                        style={{ fontSize: row.match ? 'clamp(2.07rem, 3.45vw, 2.88rem)' : 'clamp(1.61rem, 2.88vw, 2.30rem)' }}
                      >
                        {row.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onBook}
              className="rounded-full border border-charcoal/30 text-charcoal px-12 py-5 font-lora font-medium hover:bg-charcoal hover:text-sand transition-all duration-300 cursor-pointer"
              style={{ fontSize: 'clamp(1.09rem, 1.49vw, 1.26rem)' }}
            >
              Забронировать эту дату
            </button>

            <div className="pb-16" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const GALLERY_IMAGES = [
  '/IMG_20260414_202514.webp',
  '/IMG_20260414_202517.webp',
  '/IMG_20260414_202520.webp',
  '/IMG_20260414_202525.webp',
  '/IMG_20260414_202529.webp',
  '/IMG_20260414_202543.webp',
  '/IMG_20260414_202547.webp',
  '/IMG_20260414_202551.webp',
  '/IMG_20260414_202553.webp',
  '/IMG_20260414_202558.webp',
];

const Gallery = () => {
  const doubled = [...GALLERY_IMAGES, ...GALLERY_IMAGES];
  return (
    <section className="py-24 overflow-hidden">
      <div className="flex gap-5 marquee-track" style={{ width: 'max-content' }}>
        {doubled.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[320px] md:w-[380px] aspect-[3/4] overflow-hidden">
            <img
              src={img} loading="lazy" alt="Gallery"
              className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = ({ onBook }: { onBook: () => void }) => {
  return (
    <footer className="bg-charcoal text-white px-6 py-24 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6 pb-24">
        <div className="lg:col-span-8">
          {/* TITLE-L */}
          <h2
            className="font-cormorant font-semibold leading-tight text-white"
            style={{ fontSize: 'clamp(2.88rem, 5.75vw, 5.75rem)' }}
          >
            Готовы создать вечное воспоминание?
            <br />
            <span className="font-accent font-light text-white mt-3 block">
              давайте обсудим.
            </span>
          </h2>
          <div className="mt-12">
            <button onClick={onBook} className="font-lora font-medium border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-charcoal transition-colors duration-300 cursor-pointer"
              style={{ fontSize: 'clamp(1.15rem, 1.61vw, 1.44rem)' }}
            >
              Оставить заявку
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col lg:items-end justify-center gap-8 font-lora font-medium text-white"
          style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.29rem)' }}
        >
          <div className="flex flex-col gap-2">
            <span className="uppercase text-base text-white/90">( Контакты )</span>
            <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">hello@loftandlight.com</a>
            <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">+1 234 567 890</a>
          </div>
          <div className="flex flex-col gap-2 lg:text-right mt-8 md:mt-0">
            <span className="uppercase text-base text-white/90">( Адрес )</span>
            <p>123 Лофт Авеню,<br />Арт-Квартал, 10001</p>
          </div>
        </div>
      </div>

      <div className="pb-8">
        <p
          className="font-cormorant font-semibold uppercase tracking-[0.2em] text-white/10 leading-none select-none"
          style={{ fontSize: 'clamp(3.45rem, 11.50vw, 10.35rem)' }}
        >
          Ривер Лофт
        </p>
      </div>

      <div className="pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center text-base text-white/90 font-lora font-medium">
        <p>© {new Date().getFullYear()} Ривер Лофт. Все права защищены.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Instagram</a>
          <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Pinterest</a>
        </div>
      </div>
    </footer>
  );
};

const TravelSection = () => (
  <section className="px-8 md:px-16 py-32" style={{ background: '#C9A86C', borderRadius: '50% 50% 0 0 / 120px 120px 0 0' }}>
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

      {/* Левая колонка — заголовок и контакты */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="font-cormorant font-semibold text-charcoal leading-[1.05] mb-10"
          style={{ fontSize: 'clamp(3.45rem, 6.32vw, 6.90rem)' }}
        >
          Свадебное<br />
          <span className="font-accent font-light text-charcoal">путешествие</span>
        </h2>

        <div className="flex flex-col gap-3 font-lora font-medium">
          <a
            href="tel:+79636491852"
            className="text-charcoal hover:text-charcoal transition-colors duration-200"
            style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.32rem)' }}
          >
            +7 963-649-18-52
          </a>
          <a
            href="https://emojitours.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal hover:text-charcoal transition-colors duration-200 underline underline-offset-4"
            style={{ fontSize: 'clamp(1.15rem, 1.49vw, 1.32rem)' }}
          >
            emojitours.ru
          </a>
        </div>
      </motion.div>

      {/* Правая колонка — текст */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 font-lora font-medium text-charcoal leading-[1.75]"
        style={{ fontSize: 'clamp(1.15rem, 1.55vw, 1.38rem)' }}
      >
        <p>
          Каждый гость для нас является особенным. Мы хотим, чтобы и после свадебного торжества праздник для Вас продолжился незабываемым свадебным путешествием.
        </p>
        <p>
          Туристическое агентство Emoji Tours — это место, где Вы сможете получить море незабываемых впечатлений и ощутить надёжность, заботу и новые впечатления от путешествия мечты.
        </p>
        <p className="text-charcoal">
          Наша задача — чтобы ваше путешествие стало индивидуальной историей, которую вы будете пересказывать годами. Каждая деталь продумана для вашего вдохновения.
        </p>
      </motion.div>

    </div>
  </section>
);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-sand text-charcoal selection:bg-stone selection:text-charcoal w-full min-h-screen">
      <BookingModal open={modalOpen} onClose={closeModal} />
      <Navbar onBook={openModal} />
      <Hero onBook={openModal} />
      <VenueBar />
      <StatsSection />
      <AboutRiverLoft />
      <BookingSection onBook={openModal} />
      <Gallery />
      <TravelSection />
      <Footer onBook={openModal} />
    </div>
  );
}
