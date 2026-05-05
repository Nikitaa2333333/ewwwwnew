import { motion } from 'motion/react';
import { useState, useMemo, useRef } from 'react';
import Footer from './Footer';
import partnersDataRaw from '../partners_data.json';

interface Partner {
  category: string;
  name: string;
  description: string;
  link: string;
  image: string;
}

// Manually corrected categories for the extracted data
const partnersData: Partner[] = (partnersDataRaw as any[]).map(p => {
  const name = p.name.toLowerCase();
  const desc = p.description.toLowerCase();
  
  if (name.includes('filimonova') || name.includes('малина') || name.includes('дюкова') || desc.includes('кондитер')) {
    return { ...p, category: 'Кондитеры' };
  }
  if (name.includes('галкин') || name.includes('голева') || name.includes('каримов') || name.includes('солнечная') || name.includes('балашова') || name.includes('косоруков') || name.includes('халдин') || name.includes('иванов')) {
    if (name.includes('dj')) return { ...p, category: 'Диджеи' };
    return { ...p, category: 'Ведущие' };
  }
  if (name.includes('decor') || name.includes('rein') || name.includes('push') || desc.includes('декор')) {
    return { ...p, category: 'Декор и Флористика' };
  }
  if (name.includes('leshakov') || name.includes('нирвани') || name.includes('пустовой') || name.includes('кубрак') || name.includes('берзлева') || name.includes('сухорада')) {
    return { ...p, category: 'Фотографы' };
  }
  if (name.includes('чернина') || name.includes('назарова') || name.includes('ковалёва') || name.includes('рязанова')) {
    return { ...p, category: 'Стилисты' };
  }
  if (name.includes('сарайкин') || name.includes('зиновеев')) {
    return { ...p, category: 'Видеографы' };
  }
  if (name.includes('marshalkin') || name.includes('neo') || name.includes('wolume') || name.includes('dj')) {
    return { ...p, category: 'Диджеи' };
  }
  if (name.includes('петракова') || name.includes('nevesta') || name.includes('серегина') || desc.includes('организатор')) {
    return { ...p, category: 'Организаторы' };
  }
  return p;
});

const categories = [
  'Организаторы',
  'Кондитеры',
  'Ведущие',
  'Декор и Флористика',
  'Фотографы',
  'Стилисты',
  'Видеографы',
  'Диджеи'
];

export default function PartnersView({ onBack, onBook }: { onBack: () => void; onBook: () => void }) {
  const [activeFilter, setActiveFilter] = useState('Все');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const groupedPartners = useMemo(() => {
    const groups: { [key: string]: Partner[] } = {};
    categories.forEach(cat => {
      groups[cat] = partnersData.filter(p => p.category === cat);
    });
    return groups;
  }, []);

  const scrollToSection = (cat: string) => {
    setActiveFilter(cat);
    const element = sectionRefs.current[cat];
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-charcoal text-white pb-32"
    >
      {/* Навигация назад */}
      <button
        onClick={onBack}
        className="fixed top-10 left-8 md:left-16 z-[70] flex items-center gap-3 font-lora text-white hover:text-gold transition-colors duration-300 group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/50 transition-colors bg-charcoal/50 backdrop-blur-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="hidden sm:inline" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>Назад</span>
      </button>

      {/* Hero Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/0 via-charcoal/40 to-charcoal z-10" />
        <img 
            src="https://static.tildacdn.com/tild3533-3331-4137-b362-636365313962/B9iMHKOSFTM.jpg" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
            alt=""
        />
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 text-center px-6"
        >
          <img src="/riveeeeeeee.png" alt="Ривер Лофт" className="h-[67px] w-auto object-contain mx-auto mb-4" />
          <h1 className="font-cormorant font-semibold text-white leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}>
            Наши <span className="font-accent text-gold font-light">партнеры</span>
          </h1>
          <p className="font-lora text-white max-w-xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}>
            Мы собрали команду лучших профессионалов, которые разделяют наши ценности и помогут создать праздник вашей мечты.
          </p>
        </motion.div>
      </div>

      {/* Sticky Navigation / Category Filter */}
      <div className="sticky top-0 z-[60] bg-charcoal/80 backdrop-blur-md border-b border-white/5 py-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-start sm:justify-center gap-8 whitespace-nowrap">
          <button
            onClick={() => scrollToSection('Все')}
            className={`font-lora transition-colors cursor-pointer ${activeFilter === 'Все' ? 'text-gold' : 'text-white hover:text-gold'}`}
            style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}
          >
            Все
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => scrollToSection(cat)}
              className={`font-lora transition-colors cursor-pointer ${activeFilter === cat ? 'text-gold' : 'text-white hover:text-gold'}`}
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-20">
        {categories.map((cat) => (
          <div 
            key={cat} 
            ref={el => sectionRefs.current[cat] = el}
            className="mb-32 scroll-mt-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-12"
            >
              <h2 className="font-cormorant font-semibold text-white" style={{ fontSize: 'clamp(2.3rem, 4vw, 4rem)' }}>
                {cat}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </motion.div>

            <div className={`grid grid-cols-1 gap-x-10 gap-y-16 ${groupedPartners[cat].length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
              {groupedPartners[cat].map((partner, idx) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                  className="group"
                >
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[4/5] overflow-hidden mb-6"
                    >
                      <img
                          src={partner.image}
                          alt={partner.name}
                          onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://static.tildacdn.com/tild3133-3136-4139-b131-316331326433/photo.jpg';
                          }}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors duration-500" />
                      <div className="absolute inset-0 border border-white/0 group-hover:border-gold/30 transition-all duration-500 m-4" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-charcoal/40 backdrop-blur-[2px]">
                          <span className="px-6 py-3 border border-gold text-gold font-lora bg-charcoal/60" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>Посмотреть работы</span>
                      </div>
                    </a>
                  ) : (
                    <div className="block relative aspect-[4/5] overflow-hidden mb-6">
                      <img
                          src={partner.image}
                          alt={partner.name}
                          onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://static.tildacdn.com/tild3133-3136-4139-b131-316331326433/photo.jpg';
                          }}
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-charcoal/20" />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <h3 className="font-cormorant font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}>
                      {partner.name}
                    </h3>
                    <p className="font-lora text-white leading-[1.65] line-clamp-3" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer onBook={onBook} />
    </motion.div>
  );
}
