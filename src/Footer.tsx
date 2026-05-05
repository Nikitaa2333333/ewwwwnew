import { motion } from 'motion/react';

const FOOTER_NAV = [
  { label: 'О нас', href: '#why' },
  { label: 'Условия', href: '#conditions' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Партнеры', href: '#partners' },
  { label: 'Путешествия', href: '#travel' },
  { label: 'Контакты', href: '#footer-info' },
];

const FOOTER_SOCIALS = [
  {
    label: 'MAX',
    href: 'https://max.ru/u/f9LHodD0cOI5BcMyH8vKICdBWrRm-ZX3tkvjT5Ii9BueQV0vs95kNt0rRPk',
    icon: <img src="https://maxicons.ru/icons/Max_logo.svg" alt="MAX" width={17} height={17} className="brightness-0 invert" />,
  },
  {
    label: 'ВКонтакте',
    href: 'https://vk.com/river_loft',
    icon: <img src="/vk.svg" alt="ВКонтакте" width={17} height={17} />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/RiverLoft_podolsk',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=79258592225&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C+%D1%85%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C+%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D0%BA%D1%83',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const Footer = ({ onBook }: { onBook: () => void }) => {
  return (
    <footer id="contacts" className="bg-charcoal text-white overflow-hidden">

      {/* CTA */}
      <div className="px-8 md:px-16 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto flex flex-col items-center text-center"
        >
          <h2
            className="font-cormorant font-semibold leading-[1.0] text-white"
            style={{ fontSize: 'clamp(2.88rem, 5.75vw, 5.75rem)' }}
          >
            Готовы создать<br />
            <span className="font-accent font-light" style={{ fontSize: 'clamp(2.59rem, 5.18vw, 5.18rem)' }}>
              вечное воспоминание?
            </span>
          </h2>
          <div className="mt-12">
            <button
              onClick={onBook}
              className="font-lora font-medium border border-white/30 rounded-full px-10 py-4 hover:bg-white hover:text-charcoal transition-all duration-300 cursor-pointer"
              style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}
            >
              Оставить заявку
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gold divider */}
      <div className="mx-8 md:mx-16">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-gold/70 via-gold/25 to-transparent"
        />
      </div>

      {/* Info columns */}
      <div id="footer-info" className="px-8 md:px-16 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-2 md:col-span-1"
          >
            <img src="/riveeeeeeee.png" alt="Ривер Лофт" className="h-[83px] w-auto object-contain mb-4" />
            <p className="font-lora font-medium text-white/45 leading-relaxed" style={{ fontSize: 'clamp(0.90rem, 1.15vw, 1rem)' }}>
              Премиальная площадка для мероприятий рядом с парком Дубровицы
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-lora font-medium text-white/35 mb-5" style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)' }}>
              Навигация
            </p>
            <ul className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={(link as any).target}
                    onClick={(e) => {
                      const custom = (link as any).onClick;
                      if (custom) { e.preventDefault(); custom(); return; }
                      const anchor = link.href.startsWith('#') ? link.href : null;
                      if (anchor) {
                        e.preventDefault();
                        (window as any).setView?.('main');
                        setTimeout(() => {
                          document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
                        }, 520);
                      }
                    }}
                    className="font-lora font-medium text-white/65 hover:text-gold transition-colors duration-300 relative group inline-block"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.06rem)' }}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-lora font-medium text-white/35 mb-5" style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)' }}>
              Мы в сети
            </p>
            <ul className="flex flex-col gap-3">
              {FOOTER_SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex items-center gap-3 font-lora font-medium text-white/65 hover:text-gold transition-colors duration-300 group"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.06rem)' }}
                  >
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      {s.icon}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-lora font-medium text-white/35 mb-5" style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)' }}>
              Режим работы
            </p>
            <ul className="flex flex-col gap-2 font-lora font-medium text-white/60" style={{ fontSize: 'clamp(0.90rem, 1.15vw, 1rem)' }}>
              <li>Ежедневно: <span className="text-white">11:00 – 23:00</span></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-lora font-medium text-white/35 mb-5" style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)' }}>
              Контакты
            </p>
            <div className="flex flex-col gap-1 mb-5">
              <a
                href="mailto:info@river-loft.ru"
                className="font-lora font-medium text-white/65 hover:text-gold transition-colors duration-300"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.06rem)' }}
              >
                info@river-loft.ru
              </a>
              <a
                href="tel:+79258592225"
                className="font-lora font-medium text-white/65 hover:text-gold transition-colors duration-300"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.06rem)' }}
              >
                +7 925 859 22 25
              </a>
            </div>
            <p className="font-lora font-medium text-white/35 mb-2" style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)' }}>
              Адрес
            </p>
            <p className="font-lora font-medium text-white/65 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.06rem)' }}>
              Поселок Дубровицы, д. 38
            </p>
          </motion.div>

        </div>
      </div>

      {/* Реквизиты */}
      <div className="mx-8 md:mx-16 py-6">
        <div className="flex flex-col md:flex-row md:gap-10 gap-1 font-lora font-medium text-white/30" style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)' }}>
          <span>ИП Щербаков Михаил Юрьевич</span>
          <span>ИНН 503613709003</span>
          <span>ОГРН 323508100415469</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-8 md:mx-16 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-lora font-medium text-white/30" style={{ fontSize: 'clamp(0.82rem, 1vw, 0.95rem)' }}>
          © {new Date().getFullYear()} Ривер Лофт. Все права защищены.
        </p>
        <div className="flex gap-6">
          <a href="/privacy.html" target="_blank" className="font-lora font-medium text-white/30 hover:text-white/65 transition-colors duration-300" style={{ fontSize: 'clamp(0.82rem, 1vw, 0.95rem)' }}>
            Политика конфиденциальности
          </a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
