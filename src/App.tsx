/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// Navigation Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-sand/90 backdrop-blur-md text-charcoal'
          : 'mix-blend-difference text-white'
      }`}
    >
      <div className="text-xl font-cormorant font-medium uppercase">
        Лофт & Свет
      </div>
      <button className="text-lg font-lora hover:italic transition-all duration-200 cursor-pointer">
        Меню
      </button>
    </motion.nav>
  );
};

// Hero Section
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
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Wedding table setting in a loft"
          loading="eager"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] font-cormorant text-center tracking-tight text-white mix-blend-overlay">
            Идеальное<br />Мгновение
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-4xl md:text-6xl lg:text-8xl font-accent font-light text-sand mix-blend-overlay">
              вашей истории
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-2 bg-white/70 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Introduction Section
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
        <p className="font-accent text-3xl md:text-5xl text-stone mb-8">
          воздушный, подлинный, элегантный
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-lora font-light leading-tight tracking-tight">
          Индустриальный холст, наполненный естественным светом. Мы создаем атмосферу, вы приносите любовь.
        </h2>
      </motion.div>
    </section>
  );
};

// Halls / Venues Showcase Block
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
      {/* Title Block */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-sand text-charcoal px-6 z-0 overflow-hidden">
        <div className="flex items-center justify-center gap-4 text-xl font-lora mb-6 text-charcoal/50">
          <span>( {hall.id} )</span>
        </div>
        <h2 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-cormorant tracking-tight text-center text-charcoal">
          {hall.title}
        </h2>
        <p className="font-accent text-4xl md:text-6xl text-charcoal/60 mt-8 font-light">
          {hall.subtitle}
        </p>
      </div>

      {/* Images - Slide over title from bottom to top */}
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

const VenueHalls = () => {
  return (
    <div className="w-full">
      {HALLS.map((hall) => (
        <HallSection key={hall.id} hall={hall} />
      ))}
    </div>
  );
};

// About River Loft Section
const AboutRiverLoft = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-sand flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-cormorant leading-[1.1] tracking-tight mb-16 text-center text-white">
          Светлый лофт
          <br />
          <span className="font-accent text-stone text-6xl md:text-8xl font-light block mt-4">
            в парке Дубровицы
          </span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-left max-w-5xl text-lg md:text-xl font-lora text-stone/90 leading-relaxed mb-16">
          <p className="flex-1">
            Ривер Лофт – это идеальное место для отдыха вдали от городской суеты. Пространство для Ваших событий любого формата в живописном и энергетически сильном месте слияния двух рек Пахры и Десны.
          </p>
          <p className="flex-1">
            Большие панорамные окна открывают вид на архитектурный ансамбль усадьбы Голицыных, увенчанный неповторимой и таинственной церковью Знамение.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-lora text-xl md:text-2xl text-stone/80 mb-8 max-w-2xl text-center">
            Осмотрите площадку для ваших событий прямо сейчас в виртуальном 3D-туре
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-sand text-charcoal px-8 py-4 rounded-full font-lora text-lg transition-colors duration-200 hover:bg-white cursor-pointer"
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
    desc: 'Четко соблюдаем сроки подготовки. Продумываем тайминг мероприятия по секундам.',
  },
  {
    title: 'Индивидуальный подход',
    desc: 'Формируем для Вас индивидуальное предложение, согласно вашему бюджету.',
  },
  {
    title: 'В самое сердце',
    desc: 'Организуем событие, которое запомнится Вам надолго.',
  }
];

const EditorialAdvantage = ({ title, desc, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      className="flex flex-col pt-4 pb-12 relative group"
    >
      <h3 className="text-3xl lg:text-4xl font-cormorant text-white mb-4 leading-tight">
        {title}
      </h3>
      <p className="font-lora text-lg lg:text-xl text-stone/80 italic leading-relaxed max-w-md">
        {desc}
      </p>
      {index === 3 && (
        <div className="absolute right-0 bottom-0 font-accent text-3xl lg:text-5xl text-stone transform -rotate-12 opacity-80">
          С любовью, команда
        </div>
      )}
    </motion.div>
  );
};

const AdvantagesSection = () => {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-24 bg-charcoal overflow-hidden min-h-screen flex items-center">
      {/* Moody background image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce386?q=80&w=2000&auto=format&fit=crop" loading="lazy" className="w-full h-full object-cover opacity-10" alt="Background Texture" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 lg:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-cormorant text-white leading-[1.1]">
            Наши
            <br />
            <span className="font-accent font-light text-stone">преимущества</span>
          </h2>
          <p className="font-lora text-stone/80 max-w-sm text-lg md:text-xl md:text-right pb-4">
            Идеальное мероприятие складывается из внимания к каждой детали.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12">
          {ADVANTAGES.map((adv, i) => (
            <EditorialAdvantage key={i} title={adv.title} desc={adv.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingSection = () => {
  const [date, setDate] = useState('');

  const isWeekend = date ? new Date(date).getDay() === 0 || new Date(date).getDay() === 6 : false;
  const price = isWeekend ? '450 000 ₽' : '350 000 ₽';

  return (
    <section className="py-32 px-6 lg:px-24 bg-sand text-charcoal min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-cormorant leading-[1.1] text-center mb-16">
            Условия
            <br />
            <span className="font-accent font-light text-charcoal/60">бронирования</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm p-8 md:p-16 rounded-[3rem] shadow-[0_8px_48px_rgba(25,25,25,0.08)] flex flex-col items-center"
        >
          <p className="font-lora text-2xl md:text-3xl text-center mb-8 text-charcoal/80">
            Когда вы планируете свой праздник?
          </p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent border-b border-charcoal/30 px-6 py-4 text-2xl font-cormorant text-center focus:outline-none focus:border-charcoal transition-colors duration-200 w-full max-w-sm mb-4 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: date ? 1 : 0, height: date ? 'auto' : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center overflow-hidden"
          >
            <div className="w-full h-px bg-charcoal/10 my-16" />

            <h3 className="text-4xl font-cormorant mb-10 text-center text-charcoal">Что входит в аренду</h3>

            <ul className="w-full max-w-2xl font-lora text-lg md:text-xl text-charcoal/80 space-y-6 mb-20 list-disc list-inside marker:text-charcoal/30">
              <li>Аренда всех залов: Главный зал, Зона сбора гостей, Терраса</li>
              <li>Профессиональное световое и звуковое оборудование</li>
              <li>Гримерные комнаты для артистов и молодоженов</li>
              <li>Базовая мебель (столы, стулья Кьявари для банкета)</li>
              <li>Координатор площадки на всё время монтажа и мероприятия</li>
              <li>Клининг до, во время и после события</li>
              <li>Закрытая парковка на 30 автомобилей</li>
            </ul>

            <div className="text-center w-full bg-sand/30 py-16 rounded-[2rem]">
              <p className="font-accent text-4xl text-charcoal/60 mb-6 font-light">Стоимость для вашей даты</p>
              <div className="font-cormorant text-7xl md:text-[8rem] lg:text-[10rem] leading-none tracking-tight text-charcoal">
                {price}
              </div>
            </div>

            <button className="mt-16 bg-charcoal text-sand px-12 py-6 rounded-full font-lora text-xl hover:bg-stone transition-colors duration-300 group flex items-center gap-4 cursor-pointer">
              Забронировать дату
              <span className="group-hover:translate-x-2 transition-transform duration-200">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Marquee Gallery
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
          <div
            key={i}
            className="flex-shrink-0 w-[320px] md:w-[380px] aspect-[3/4] overflow-hidden"
          >
            <img
              src={img}
              loading="lazy"
              alt="Gallery"
              className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-charcoal text-sand px-6 py-24 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6 pb-24">
        <div className="lg:col-span-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-cormorant leading-tight tracking-tight">
            Готовы создать вечное воспоминание?
            <br />
            <span className="font-accent font-light text-stone mt-4 block">
              давайте обсудим.
            </span>
          </h2>
          <div className="mt-12">
            <button className="text-xl font-lora border border-sand/30 rounded-full px-8 py-4 hover:bg-sand hover:text-charcoal transition-colors duration-300 cursor-pointer">
              Оставить заявку
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col lg:items-end justify-center gap-8 text-lg font-lora text-stone">
          <div className="flex flex-col gap-2">
            <span className="uppercase text-sm text-sand">( Контакты )</span>
            <a href="#" className="hover:text-sand transition-colors duration-200 cursor-pointer">hello@loftandlight.com</a>
            <a href="#" className="hover:text-sand transition-colors duration-200 cursor-pointer">+1 234 567 890</a>
          </div>
          <div className="flex flex-col gap-2 lg:text-right mt-8 md:mt-0">
            <span className="uppercase text-sm text-sand">( Адрес )</span>
            <p>123 Лофт Авеню,<br />Арт-Квартал, 10001</p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-sand/20 flex flex-col md:flex-row justify-between items-center text-sm text-stone font-lora">
        <p>© {new Date().getFullYear()} Лофт & Свет. Все права защищены.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-sand transition-colors duration-200 cursor-pointer">Instagram</a>
          <a href="#" className="hover:text-sand transition-colors duration-200 cursor-pointer">Pinterest</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-sand text-charcoal selection:bg-stone selection:text-charcoal w-full min-h-screen">
      <Navbar />
      <Hero />
      <Intro />
      <VenueHalls />
      <AboutRiverLoft />
      <AdvantagesSection />
      <BookingSection />
      <Gallery />
      <Footer />
    </div>
  );
}
