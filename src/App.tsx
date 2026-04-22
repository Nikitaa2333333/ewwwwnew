/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const Navbar = ({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: (v: boolean | ((v: boolean) => boolean)) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const menuItems = [
    { label: 'О нас', href: '#' },
    { label: 'Залы', href: '#' },
    { label: 'Галерея', href: '#' },
    { label: 'Условия', href: '#' },
    { label: 'Контакты', href: '#' },
  ];

  const isLight = scrolled && !menuOpen;
  const textColor = menuOpen ? 'text-white' : isLight ? 'text-charcoal' : 'text-white';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full px-8 py-5 md:py-6 flex justify-between items-center z-50 transition-all duration-700 ease-in-out ${
          scrolled || menuOpen ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]' : 'bg-transparent'
        }`}
      >
        <div className={`text-xl md:text-2xl font-cormorant font-medium uppercase tracking-[0.25em] transition-colors duration-500 ${textColor}`}>
          Лофт & Свет
        </div>

        <button
          onClick={() => setMenuOpen((v: boolean) => !v)}
          className={`group flex items-center gap-5 cursor-pointer z-[60] relative transition-all duration-500 ${textColor}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span className="font-lora text-[10px] uppercase tracking-[0.4em] font-medium opacity-60 group-hover:opacity-100 transition-opacity hidden sm:block">
            {menuOpen ? 'Закрыть' : 'Меню'}
          </span>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-current opacity-20"
              animate={menuOpen ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.6 }}
            />
            <div className="flex flex-col gap-[7px] items-end">
              <motion.span
                className="block h-px bg-current"
                animate={menuOpen ? { rotate: 45, y: 4, width: '22px' } : { rotate: 0, y: 0, width: '28px' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="block h-px bg-current"
                animate={menuOpen ? { rotate: -45, y: -4, width: '22px' } : { rotate: 0, y: 0, width: '18px' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </div>
        </button>
      </motion.nav>

      {/* Fullscreen overlay menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-[#0f0f0f] flex flex-col items-center justify-center pointer-events-none"
        initial={false}
        animate={menuOpen
          ? { clipPath: 'circle(150% at calc(100% - 60px) 48px)', pointerEvents: 'auto' }
          : { clipPath: 'circle(0% at calc(100% - 60px) 48px)', pointerEvents: 'none' }
        }
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,108,0.1)_0%,transparent_70%)]" />
        </div>

        <nav className="flex flex-col items-center gap-1 mb-16 relative z-10">
          {menuItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="font-cormorant text-white leading-none tracking-tight hover:text-gold transition-all duration-300 cursor-pointer group flex items-center gap-8"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 7.5rem)' }}
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={menuOpen ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -20 }}
              transition={{ 
                duration: 0.8, 
                delay: menuOpen ? 0.3 + i * 0.1 : 0, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="font-lora text-gold/30 text-xs md:text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-[-10px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="group-hover:tracking-[0.05em] transition-all duration-500">
                {item.label}
              </span>
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: menuOpen ? 0.8 : 0, duration: 0.6 }}
          className="absolute bottom-12 flex flex-col items-center gap-6"
        >
          <div className="flex gap-8 font-lora text-white/40 text-sm tracking-widest uppercase">
            <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-gold transition-colors">Pinterest</a>
          </div>
          <div className="h-px w-12 bg-white/10" />
          <a href="tel:+74991234567" className="font-lora text-white/60 hover:text-white transition-colors tracking-widest text-sm">
            +7 (499) 123-45-67
          </a>
        </motion.div>

        <motion.span
          className="absolute left-10 bottom-10 font-accent text-white/5 -rotate-6 pointer-events-none select-none"
          style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
          initial={{ opacity: 0, x: -50 }}
          animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Лофт & Свет
        </motion.span>
      </motion.div>
    </>
  );
};

const HERO_THESES = [
  { value: '200+', label: 'незабываемых событий' },
  { value: '1 200', label: 'м² пространства' },
  { value: 'Панорамный', label: 'вид на усадьбу' },
  { value: 'с 2018', label: 'года работаем' },
];

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-charcoal">
      {/* Parallax background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Wedding table setting in a loft"
          loading="eager"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
      </motion.div>

      {/* Left floating handwritten accent */}
      <motion.span
        className="absolute left-8 top-[38%] font-accent text-white/28 -rotate-6 pointer-events-none hidden xl:block select-none"
        style={{ fontSize: 'clamp(1.4rem, 2vw, 2.6rem)' }}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        с любовью к каждой детали
      </motion.span>

      {/* Right floating handwritten accent */}
      <motion.span
        className="absolute right-8 top-[44%] font-accent text-white/20 rotate-3 pointer-events-none hidden xl:block select-none"
        style={{ fontSize: 'clamp(1.2rem, 1.7vw, 2.2rem)' }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.9, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        место силы
      </motion.span>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 pb-20">
        {/* Heading */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h1
            className="leading-[0.88] font-cormorant text-center tracking-tight"
            style={{
              fontSize: 'clamp(4.5rem, 11vw, 12rem)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f0e0c8 45%, #C9A86C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 40px rgba(0,0,0,0.5))',
            }}
          >
            Идеальное<br />Мгновение
          </h1>

          <span
            className="font-accent block mt-1"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 6.5rem)',
              color: 'rgba(232, 208, 168, 0.88)',
              textShadow: '0 2px 28px rgba(0,0,0,0.45)',
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
          className="font-lora text-white/62 mt-7 max-w-lg text-center leading-relaxed"
          style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1.08rem)' }}
        >
          Потрясающее место для вашего праздника с огромными панорамными окнами
          {' '}и видом на Церковь Зна́мения Пресвятой Богоро́дицы
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-4 justify-center items-center"
        >
          <a
            href="#"
            className="font-lora text-white border border-white/40 px-8 py-3.5 rounded-full hover:bg-white hover:text-charcoal transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/5"
            style={{ fontSize: 'clamp(0.85rem, 1.15vw, 1.02rem)' }}
          >
            Забронировать дату
          </a>
          <a
            href="#"
            className="font-lora text-white/55 px-5 py-3.5 hover:text-white transition-colors duration-250 cursor-pointer flex items-center gap-2 group"
            style={{ fontSize: 'clamp(0.85rem, 1.15vw, 1.02rem)' }}
          >
            Смотреть площадку
            <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">→</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom key theses bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="border-t border-white/12 bg-black/25 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {HERO_THESES.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + i * 0.08, duration: 0.7 }}
                className="text-center px-4"
              >
                <div
                  className="font-cormorant text-gold/85 leading-none"
                  style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.9rem)' }}
                >
                  {t.value}
                </div>
                <div className="font-lora text-white/38 uppercase tracking-widest mt-1" style={{ fontSize: '0.62rem' }}>
                  {t.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[76px] left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/28 flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-2 bg-white/55 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Intro = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="max-w-4xl text-center"
      >
        {/* Акцент-подпись — средний, Great Vibes */}
        <p
          className="font-accent text-stone mb-6"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          воздушный, подлинный, элегантный
        </p>
        {/* Lead-цитата — читаемая, крупная */}
        <p
          className="font-lora font-light leading-[1.6] text-charcoal/80"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
        >
          Индустриальный холст, наполненный естественным светом.
          Мы создаем атмосферу — вы приносите любовь.
        </p>
      </motion.div>
    </section>
  );
};

const HALLS = [
  {
    id: '01',
    title: 'Зона сбора гостей',
    subtitle: 'Welcome • Коктейли • Общение',
    images: [
      'https://images.unsplash.com/photo-1541250848049-b4f7146120e8?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533475850980-ee8c7db70bd7?q=80&w=2000&auto=format&fit=crop',
    ],
  },
  {
    id: '02',
    title: 'Главный Зал',
    subtitle: 'Торжество • Свет • Пространство',
    images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop',
    ],
  },
  {
    id: '03',
    title: 'Зона Церемонии',
    subtitle: 'Чувства • Декор • Воздух',
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop',
    ],
  },
  {
    id: '04',
    title: 'Камерная Терраса',
    subtitle: 'Вечер • Огни • Уют',
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
    ],
  }
];

const HallSection = ({ hall }: { hall: typeof HALLS[0] }) => {
  return (
    <section className="relative w-full bg-sand">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-sand text-charcoal px-6 z-0 overflow-hidden">
        {/* Vertical rotated label */}
        <span className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs font-lora text-charcoal/25 whitespace-nowrap">
          {hall.subtitle}
        </span>

        {/* Номер зала */}
        <div className="text-2xl font-lora mb-6 text-gold/80">
          ( {hall.id} )
        </div>

        {/* TITLE-XL — второй по размеру на сайте */}
        <h2
          className="leading-[0.9] font-cormorant tracking-tight text-center text-charcoal"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}
        >
          {hall.title}
        </h2>

        {/* Subtitle — Great Vibes accent */}
        <p
          className="font-accent text-charcoal/55 mt-6 font-light"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}
        >
          {hall.subtitle}
        </p>
      </div>

      {hall.images.map((img: string, idx: number) => (
        <div key={idx} className="sticky top-0 w-full h-screen relative shadow-[0_-20px_60px_rgba(0,0,0,0.22)] z-10 overflow-hidden">
          <img src={img} loading="lazy" className="w-full h-full object-cover" alt={`${hall.title} ${idx + 1}`} />
          <div className="absolute inset-0 bg-charcoal/10" />
          <div className="absolute bottom-12 right-12 text-white font-lora text-xl drop-shadow-md mix-blend-difference">
            {idx + 1} / {hall.images.length}
          </div>
        </div>
      ))}
    </section>
  );
};

const VenueHalls = () => (
  <div className="w-full">
    {HALLS.map((hall) => (
      <HallSection key={hall.id} hall={hall} />
    ))}
  </div>
);

const AboutRiverLoft = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-white flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto flex flex-col items-center"
      >
        {/* TITLE-L */}
        <h2
          className="font-cormorant leading-[1.05] tracking-tight mb-16 text-center text-white"
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

        {/* Body — крупный, читаемый */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-left max-w-5xl font-lora text-white leading-[1.7] mb-16"
          style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.375rem)' }}
        >
          <p className="flex-1">
            Ривер Лофт – это идеальное место для отдыха вдали от городской суеты. Пространство для Ваших событий любого формата в живописном и энергетически сильном месте слияния двух рек Пахры и Десны.
          </p>
          <p className="flex-1">
            Большие панорамные окна открывают вид на архитектурный ансамбль усадьбы Голицыных, увенчанный неповторимой и таинственной церковью Знамение.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-lora text-white/75 mb-8 max-w-xl text-center"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
          >
            Осмотрите площадку для ваших событий прямо сейчас в виртуальном 3D-туре
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-sand text-charcoal px-8 py-4 rounded-full font-lora text-lg transition-colors duration-200 hover:bg-white cursor-pointer"
          >
            Смотреть 3D-тур
            <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
          </motion.a>
        </div>
      </motion.div>
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
      className="flex items-start gap-6 md:gap-12 py-10 border-t border-white/10"
    >
      {/* Номер */}
      <span className="font-cormorant text-2xl text-gold/60 font-light w-10 flex-shrink-0 pt-1">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 flex-1">
        {/* TITLE-M — заголовок преимущества */}
        <h3
          className="font-cormorant text-white flex-shrink-0 md:w-72 leading-tight"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
        >
          {title}
        </h3>

        {/* Body — крупный, прямой, хорошо читается */}
        <p
          className="font-lora text-white leading-[1.7]"
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
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce386?q=80&w=2000&auto=format&fit=crop"
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

const BookingSection = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const datePickerRef = useRef<HTMLInputElement>(null);

  const isComplete = day !== '' && month !== '' && year.length === 4;
  const parsedDate = isComplete
    ? new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    : null;
  const isValid =
    parsedDate !== null &&
    !isNaN(parsedDate.getTime()) &&
    parsedDate.getDate() === parseInt(day);
  const isWeekend = isValid
    ? parsedDate!.getDay() === 0 || parsedDate!.getDay() === 6
    : false;
  const price = isWeekend ? '450 000 ₽' : '350 000 ₽';

  const inputClass =
    'w-16 bg-transparent border-b-2 border-charcoal/20 focus:border-gold focus:outline-none text-center font-cormorant text-charcoal pb-1 transition-colors duration-200 placeholder:text-charcoal/25';

  return (
    <section className="py-32 px-6 lg:px-24 bg-sand text-charcoal min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* TITLE-L */}
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
            className="font-lora text-charcoal/60 mb-12 text-center"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
          >
            Когда вы планируете свой праздник?
          </p>

          {/* Три поля даты */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative flex items-end gap-3 md:gap-5">
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
              {/* Скрытый нативный date picker */}
              <input
                type="date"
                ref={datePickerRef}
                tabIndex={-1}
                className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0"
                onChange={e => {
                  const val = e.target.value;
                  if (val) {
                    const [y, m, d] = val.split('-');
                    setYear(y);
                    setMonth(String(parseInt(m)));
                    setDay(String(parseInt(d)));
                  }
                }}
              />
              {/* Кнопка-календарь */}
              <motion.button
                type="button"
                onClick={() => datePickerRef.current?.showPicker()}
                whileHover={{ scale: 1.15, color: 'var(--color-gold)' }}
                whileTap={{ scale: 0.9 }}
                className="mb-1 ml-2 text-charcoal/35 hover:text-gold transition-colors duration-200 cursor-pointer flex-shrink-0"
                title="Выбрать дату из календаря"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </motion.button>
            </div>
            <p className="font-lora text-charcoal/35 text-sm tracking-wide">
              введите вручную или нажмите на иконку календаря
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isValid ? 1 : 0, height: isValid ? 'auto' : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center overflow-hidden"
          >
            <div className="w-full h-px bg-charcoal/10 my-16" />

            {/* TITLE-M */}
            <h3
              className="font-cormorant mb-10 text-center text-charcoal"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
            >
              Что входит в аренду
            </h3>

            {/* Body list — крупный */}
            <ul
              className="w-full max-w-2xl font-lora text-charcoal/75 leading-[1.7] space-y-5 mb-20 list-disc list-inside marker:text-gold"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
            >
              <li>Аренда всех залов: Главный зал, Зона сбора гостей, Терраса</li>
              <li>Профессиональное световое и звуковое оборудование</li>
              <li>Гримерные комнаты для артистов и молодоженов</li>
              <li>Базовая мебель (столы, стулья Кьявари для банкета)</li>
              <li>Координатор площадки на всё время монтажа и мероприятия</li>
              <li>Клининг до, во время и после события</li>
              <li>Закрытая парковка на 30 автомобилей</li>
            </ul>

            {/* Стоимость — без плашки */}
            <div className="text-center mb-20">
              <p className="font-lora text-sm text-charcoal/40 uppercase mb-4">
                Стоимость аренды
              </p>
              <div
                className="font-cormorant leading-none tracking-tight text-charcoal"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                {price}
              </div>
              <p className="font-lora text-sm text-charcoal/40 mt-3">
                {isWeekend ? 'Пятница, суббота, воскресенье' : 'Понедельник — четверг'}
              </p>
            </div>

            <button className="bg-charcoal text-sand px-12 py-5 rounded-full font-lora text-xl hover:bg-charcoal/80 transition-colors duration-300 group flex items-center gap-4 cursor-pointer">
              Забронировать дату
              <span className="group-hover:translate-x-2 transition-transform duration-200">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1541250848049-b4f7146120e8?w=600&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
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

      <div className="pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/60 font-lora">
        <p>© {new Date().getFullYear()} Лофт & Свет. Все права защищены.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Instagram</a>
          <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Pinterest</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-sand text-charcoal selection:bg-stone selection:text-charcoal w-full min-h-screen overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <motion.div
        animate={menuOpen ? { scale: 0.92, opacity: 0.4, filter: 'blur(10px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="origin-center"
      >
        <Hero />
        <Intro />
        <VenueHalls />
        <AboutRiverLoft />
        <AdvantagesSection />
        <BookingSection />
        <Gallery />
        <Footer />
      </motion.div>
    </div>
  );
}
