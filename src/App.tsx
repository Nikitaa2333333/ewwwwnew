/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
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
        <div className="font-cormorant text-white text-xl md:text-2xl font-medium">
          Ривер Лофт
        </div>

        {/* Навигация — по центру */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-lora text-[14px] text-white/75 hover:text-white transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Правая часть — телефон, соцсети, кнопка */}
        <div className="hidden md:flex items-center justify-end gap-5">

          {/* Телефон */}
          <a href="tel:+74991234567" className="font-lora text-[13px] text-white/60 hover:text-white transition-colors duration-200 whitespace-nowrap">
            +7 (499) 123-45-67
          </a>

          {/* Соцсети */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* VK */}
            <a href="#" aria-label="ВКонтакте" className="text-white/50 hover:text-white transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.7c-.64 0-.84-.51-1.99-1.67-1-.97-1.44-.97-1.69-.97-.34 0-.44.1-.44.58v1.52c0 .42-.13.67-1.22.67-1.8 0-3.8-1.09-5.2-3.13C4.13 10.12 3.7 8.1 3.7 7.67c0-.25.1-.48.58-.48h1.7c.43 0 .59.19.75.65.83 2.38 2.21 4.47 2.78 4.47.21 0 .31-.1.31-.64V9.62c-.07-1.15-.67-1.25-.67-1.66 0-.2.16-.4.42-.4h2.68c.36 0 .49.19.49.61v3.26c0 .36.16.49.26.49.21 0 .39-.13.78-.52 1.21-1.35 2.07-3.43 2.07-3.43.11-.25.31-.48.74-.48h1.7c.51 0 .62.26.51.61-.21.98-2.28 3.91-2.28 3.91-.18.29-.24.42 0 .74.17.23.74.71 1.12 1.14.7.77 1.23 1.41 1.37 1.86.16.44-.07.67-.51.67z"/>
              </svg>
            </a>
          </div>

          {/* CTA кнопка */}
          <a
            href="#"
            className="font-lora text-[13px] text-white border border-white/40 hover:bg-white hover:text-charcoal transition-all duration-300 px-5 py-2 rounded-full whitespace-nowrap"
          >
            Забронировать
          </a>
        </div>

        {/* Мобильный телефон */}
        <div className="md:hidden flex justify-end">
          <a href="tel:+74991234567" className="font-lora text-[12px] text-white/70">
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
  { num: '10+', label: 'лет в команде', desc: 'профессиональные официанты и повара с опытом' },
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
  '/IMG_20260414_202514.webp',
  '/IMG_20260414_202543.webp',
  '/IMG_20260414_202551.webp',
  '/IMG_20260414_202558.webp',
  '/IMG_20260414_202525.webp',
];

const Hero = () => {
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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-charcoal" style={{ minHeight: '100svh' }}>
      {/* Parallax background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="crossfade">
          <motion.img
            key={HERO_SLIDES[current]}
            src={HERO_SLIDES[current]}
            alt=""
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.93 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
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
            className="leading-[0.88] font-cormorant tracking-tight"
            style={{
              fontSize: 'clamp(3.2rem, 6.5vw, 8rem)',
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
              fontSize: 'clamp(3rem, 7vw, 9.5rem)',
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
          className="font-lora text-white/85 mt-6 max-w-lg leading-relaxed text-left"
          style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)' }}
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
          <a
            href="#"
            className="font-lora text-white border border-white/55 px-10 py-4 rounded-full hover:bg-white hover:text-charcoal transition-all duration-300 cursor-pointer"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
          >
            Забронировать дату
          </a>
          <a
            href="#"
            className="font-lora text-white/60 px-5 py-4 hover:text-white transition-colors duration-250 cursor-pointer"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
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
          <span className="font-cormorant text-gold leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            {item.value}{item.unit}
          </span>
          <span className="font-lora text-white" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>
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
        <h2 className="font-cormorant text-white leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}>
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
          <span className="font-cormorant text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(6rem, 10vw, 11rem)' }}>10+</span>
          <span className="font-cormorant text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}>лет опыта</span>
          <span className="font-lora text-white mt-3" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}>в организации мероприятий любого формата</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 2 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-10 py-14 flex flex-col justify-end min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant text-gold leading-none group-hover:text-white transition-colors duration-500 whitespace-nowrap" style={{ fontSize: 'clamp(5rem, 8vw, 9rem)' }}>2 000+</span>
          <span className="font-cormorant text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}>мероприятий</span>
          <span className="font-lora text-white mt-3" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}>свадьбы, юбилеи, корпоративы, семинары и не только</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 3 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-10 py-14 flex flex-col justify-end min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(5rem, 8vw, 9rem)' }}>100+</span>
          <span className="font-cormorant text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}>отзывов 5★</span>
          <span className="font-lora text-white mt-3" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}>на Яндексе от довольных гостей и пар</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 4 — широкая, текстовая */}
        <motion.div variants={itemVariants} className="relative col-span-2 bg-charcoal px-10 py-14 flex flex-col justify-end group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant text-white leading-tight group-hover:text-gold transition-colors duration-500" style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}>Любой формат</span>
          <span className="font-lora text-white mt-4 max-w-2xl" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.3rem)' }}>Свадьбы, юбилеи, корпоративы, семинары, презентации, дни рождения — всё зависит от вашей фантазии</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 5 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-10 py-14 flex flex-col justify-end group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(5rem, 8vw, 9rem)' }}>40+</span>
          <span className="font-cormorant text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}>подрядчиков</span>
          <span className="font-lora text-white mt-3" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}>проверенные партнёры на ваш выбор</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 6 */}
        <motion.div variants={itemVariants} className="relative col-span-2 lg:col-span-3 bg-charcoal px-10 py-14 flex flex-col justify-end group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(5rem, 8vw, 9rem)' }}>10+</span>
          <span className="font-cormorant text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}>лет в команде</span>
          <span className="font-lora text-white mt-3 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}>профессиональные официанты и повара с многолетним опытом</span>
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
  const churchY = useTransform(scrollYProgress, [0, 1], ['100vh', '-10vh']);
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
              className="font-cormorant leading-[1.05] tracking-tight mb-16 text-white"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
            >
              Светлый лофт
              <br />
              <span
                className="font-accent text-white/80 font-light block mt-3"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
              >
                в парке Дубровицы
              </span>
            </h2>

            <div
              className="flex flex-col md:flex-row gap-8 md:gap-16 text-left max-w-5xl font-lora text-white leading-[1.7] mb-16"
              style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.375rem)' }}
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
          style={{ y: churchY, scale: churchScale }}
          className="absolute inset-x-0 bottom-0 z-20 origin-bottom"
        >
          <img
            src="/church-dubrovitsy.png"
            alt="Церковь Знамение в Дубровицах"
            className="w-full h-auto block"
          />
          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: '38%', background: 'linear-gradient(to top, #191919 0%, #191919 18%, transparent 100%)' }}
          />
          {/* Side fades */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none w-[8%]"
            style={{ background: 'linear-gradient(to right, #191919, transparent)' }}
          />
          <div
            className="absolute inset-y-0 right-0 pointer-events-none w-[8%]"
            style={{ background: 'linear-gradient(to left, #191919, transparent)' }}
          />
        </motion.div>

      </div>

    </section>
  );
};

const AboutRiverLoftCTA = () => (
  <section className="bg-charcoal flex flex-col items-center text-center px-6 pt-16 pb-24">
    <p
      className="font-lora text-white/70 mb-10 max-w-md"
      style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
    >
      Осмотрите площадку для ваших событий прямо сейчас в виртуальном 3D-туре
    </p>
    <motion.a
      href="#"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center text-white border border-white/30 px-10 py-4 rounded-full font-lora transition-all duration-300 hover:bg-white hover:text-charcoal cursor-pointer"
      style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
    >
      Смотреть 3D-тур
    </motion.a>
  </section>
);

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
      <span className="font-cormorant text-2xl text-gold/60 font-light w-10 flex-shrink-0 pt-1 transition-colors duration-500 group-hover:text-gold">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 flex-1">
        {/* TITLE-M — заголовок преимущества */}
        <h3
          className="font-cormorant text-white flex-shrink-0 md:w-72 leading-tight transition-colors duration-500 group-hover:text-gold"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
        >
          {title}
        </h3>

        {/* Body — крупный, прямой, хорошо читается */}
        <p
          className="font-lora text-white/80 leading-[1.7] transition-colors duration-500 group-hover:text-gold/75"
          style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.375rem)' }}
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
            className="font-cormorant text-white leading-[1.05]"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            Наши
            <br />
            <span className="font-accent font-light text-white/75">преимущества</span>
          </h2>

          {/* Подзаголовок — читаемый размер */}
          <p
            className="font-lora text-white/80 max-w-sm md:text-right pb-1"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
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
            className="font-accent text-white/50 -rotate-6 inline-block"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
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
    images: ['/IMG_20260414_202543.webp', '/IMG_20260414_202547.webp'],
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

const BookingSection = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

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
          { days: 'Пн. — Чт.', price: '80 000 ₽', match: dow >= 1 && dow <= 4 },
          { days: 'Пт., Сб.',  price: '150 000 ₽', match: dow === 5 || dow === 6 },
          { days: 'Вс.',       price: '100 000 ₽', match: dow === 0 },
        ],
      };
    }
    if (isSeason2) {
      return {
        label: 'Июнь — Сентябрь, Декабрь (до 15.12)',
        rows: [
          { days: 'Пн. — Чт.', price: '60 000 ₽',  match: dow >= 1 && dow <= 4 },
          { days: 'Пт.',        price: '90 000 ₽',  match: dow === 5 },
          { days: 'Сб.',        price: '100 000 ₽', match: dow === 6 },
          { days: 'Вс.',        price: '80 000 ₽',  match: dow === 0 },
        ],
      };
    }
    return {
      label: 'Январь — Май, Октябрь, Ноябрь',
      rows: [
        { days: 'Пн. — Чт.', price: '50 000 ₽', match: dow >= 1 && dow <= 4 },
        { days: 'Пт., Сб.',  price: '80 000 ₽', match: dow === 5 || dow === 6 },
        { days: 'Вс.',       price: '60 000 ₽', match: dow === 0 },
      ],
    };
  };

  const tariff = isValid ? getRentalTariff(parsedDate!) : null;

  const inputClass =
    'w-16 bg-transparent border-b-2 border-charcoal/20 focus:border-gold focus:outline-none text-center font-cormorant text-charcoal pb-1 transition-colors duration-200 placeholder:text-charcoal/25';

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
            className="font-cormorant leading-[1.05] text-charcoal"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            Условия
            <br />
            <span className="font-accent font-light text-charcoal/45">бронирования</span>
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
            className="font-lora font-medium text-charcoal/60 mb-12 text-center"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
          >
            Когда вы планируете свой праздник?
          </p>

          <div className="flex items-end gap-3 md:gap-5">
            <input
              type="number" min={1} max={31} placeholder="ДД"
              value={day} onChange={e => setDay(e.target.value)}
              className={inputClass}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            />
            <span className="font-cormorant text-charcoal/30 pb-2 text-3xl">·</span>
            <input
              type="number" min={1} max={12} placeholder="ММ"
              value={month} onChange={e => setMonth(e.target.value)}
              className={inputClass}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            />
            <span className="font-cormorant text-charcoal/30 pb-2 text-3xl">·</span>
            <input
              type="number" min={2025} max={2030} placeholder="ГГГГ"
              value={year} onChange={e => setYear(e.target.value)}
              className="w-28 md:w-36 bg-transparent border-b-2 border-charcoal/20 focus:border-gold focus:outline-none text-center font-cormorant text-charcoal pb-1 transition-colors duration-200 placeholder:text-charcoal/25"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            />
          </div>

          {/* Контент раскрывается инлайн */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isValid ? 1 : 0, height: isValid ? 'auto' : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden"
          >
            <div className="w-full h-px bg-charcoal/10 mt-16 mb-14" />

            {/* Что входит в стоимость — зоны */}
            <div className="mb-14">
              <h3
                className="font-cormorant text-charcoal mb-12 leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
              >
                Что входит в стоимость
              </h3>

              <div className="flex flex-col gap-14">
                {ZONES.map((zone, i) => (
                  <div key={i}>
                    <p
                      className="font-lora text-charcoal/40 text-xs uppercase tracking-[0.2em] mb-2"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h4
                      className="font-cormorant text-charcoal leading-none mb-5"
                      style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
                    >
                      {zone.title}
                    </h4>
                    {zone.images.length > 0 && (
                      <div
                        className="grid gap-2"
                        style={{ gridTemplateColumns: `repeat(${zone.images.length}, 1fr)` }}
                      >
                        {zone.images.map((src, j) => (
                          <div key={j} className="overflow-hidden aspect-[4/3]">
                            <img
                              src={src}
                              loading="lazy"
                              alt={zone.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Остальное */}
              <div className="mt-12 pt-10 border-t border-charcoal/10">
                <p className="font-lora text-sm text-charcoal/40 mb-6">Также включено</p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                  {INCLUDED_SERVICES.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-lora font-medium text-charcoal/75" style={{ fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)' }}>
                      <span className="text-gold flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* За дополнительную плату */}
            <div className="mb-14 border-t border-charcoal/10 pt-12">
              <h3
                className="font-cormorant text-charcoal mb-2 leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
              >
                За дополнительную плату
              </h3>
              <p className="font-lora text-charcoal/45 text-sm mb-7">Доступны по запросу</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                {EXTRA.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-lora font-medium text-charcoal/75" style={{ fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)' }}>
                    <span className="text-gold/60 mt-[3px] flex-shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Условия */}
            <div className="mb-14 border-t border-charcoal/10 pt-12">
              <h3
                className="font-cormorant text-charcoal mb-8 leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
              >
                Условия
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Минимальный заказ по меню — от 5 000 ₽/чел.',
                  'Сервисный сбор за обслуживание — 10% от стоимости заказа.',
                  'Минимальный депозит — 200 000 ₽ (без учёта обслуживания и аренды зала).',
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 font-lora font-medium text-charcoal/80" style={{ fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)' }}>
                    <span className="text-gold mt-[3px] flex-shrink-0 text-lg leading-none">·</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Аренда зала */}
            {tariff && (
              <div className="border-t border-charcoal/10 pt-12 mb-16">
                <h3
                  className="font-cormorant text-charcoal mb-2 leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
                >
                  Аренда зала
                </h3>
                <p className="font-lora font-medium text-charcoal/40 mb-8" style={{ fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)' }}>
                  {tariff.label}
                </p>
                <div className="flex flex-col gap-0 border-t border-charcoal/10">
                  {tariff.rows.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-4 border-b border-charcoal/10 ${row.match ? 'text-charcoal' : 'text-charcoal/40'}`}
                    >
                      <span className="font-lora font-medium" style={{ fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)' }}>
                        {row.days}
                        {row.match && (
                          <span className="ml-3 font-lora font-normal text-xs text-gold tracking-widest">← ваш день</span>
                        )}
                      </span>
                      <span
                        className={`font-cormorant leading-none ${row.match ? 'text-charcoal' : 'text-charcoal/40'}`}
                        style={{ fontSize: row.match ? 'clamp(1.8rem, 3vw, 2.5rem)' : 'clamp(1.4rem, 2.5vw, 2rem)' }}
                      >
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="border border-charcoal/30 text-charcoal px-12 py-5 font-lora hover:bg-charcoal hover:text-sand transition-all duration-300 cursor-pointer"
              style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
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

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white px-6 py-24 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6 pb-24">
        <div className="lg:col-span-8">
          {/* TITLE-L */}
          <h2
            className="font-cormorant leading-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Готовы создать вечное воспоминание?
            <br />
            <span className="font-accent font-light text-white/75 mt-3 block">
              давайте обсудим.
            </span>
          </h2>
          <div className="mt-12">
            <button className="font-lora border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-charcoal transition-colors duration-300 cursor-pointer"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
            >
              Оставить заявку
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col lg:items-end justify-center gap-8 font-lora text-white/85"
          style={{ fontSize: 'clamp(1rem, 1.3vw, 1.125rem)' }}
        >
          <div className="flex flex-col gap-2">
            <span className="uppercase text-sm text-white/55">( Контакты )</span>
            <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">hello@loftandlight.com</a>
            <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">+1 234 567 890</a>
          </div>
          <div className="flex flex-col gap-2 lg:text-right mt-8 md:mt-0">
            <span className="uppercase text-sm text-white/55">( Адрес )</span>
            <p>123 Лофт Авеню,<br />Арт-Квартал, 10001</p>
          </div>
        </div>
      </div>

      <div className="pb-8">
        <p
          className="font-cormorant uppercase tracking-[0.2em] text-white/10 leading-none select-none"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
        >
          Ривер Лофт
        </p>
      </div>

      <div className="pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/60 font-lora">
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
          className="font-cormorant text-charcoal leading-[1.05] mb-10"
          style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)' }}
        >
          Свадебное<br />
          <span className="font-accent font-light text-charcoal/70">путешествие</span>
        </h2>

        <div className="flex flex-col gap-3 font-lora">
          <a
            href="tel:+79636491852"
            className="text-charcoal/70 hover:text-charcoal transition-colors duration-200"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)' }}
          >
            +7 963-649-18-52
          </a>
          <a
            href="https://emojitours.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal/60 hover:text-charcoal transition-colors duration-200 underline underline-offset-4"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)' }}
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
        className="flex flex-col gap-6 font-lora text-charcoal/75 leading-[1.75]"
        style={{ fontSize: 'clamp(1rem, 1.35vw, 1.2rem)' }}
      >
        <p>
          Каждый гость для нас является особенным. Мы хотим, чтобы и после свадебного торжества праздник для Вас продолжился незабываемым свадебным путешествием.
        </p>
        <p>
          Туристическое агентство Emoji Tours — это место, где Вы сможете получить море незабываемых впечатлений и ощутить надёжность, заботу и новые впечатления от путешествия мечты.
        </p>
        <p className="text-charcoal/90">
          Наша задача — чтобы ваше путешествие стало индивидуальной историей, которую вы будете пересказывать годами. Каждая деталь продумана для вашего вдохновения.
        </p>
      </motion.div>

    </div>
  </section>
);

export default function App() {
  return (
    <div className="bg-sand text-charcoal selection:bg-stone selection:text-charcoal w-full min-h-screen">
      <Navbar />
      <Hero />
      <VenueBar />
      <StatsSection />
      <AboutRiverLoft />
      <AboutRiverLoftCTA />
      <BookingSection />
      <Gallery />
      <TravelSection />
      <Footer />
    </div>
  );
}
