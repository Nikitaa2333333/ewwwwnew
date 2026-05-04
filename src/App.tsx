/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import PartnersView from './PartnersView';
import Footer from './Footer';

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
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (top) window.scrollTo(0, -parseInt(top, 10));
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (top) window.scrollTo(0, -parseInt(top, 10));
    };
  }, [open]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const nameInvalid = name.trim().length === 0;
    const phoneInvalid = !isPhoneComplete(phone);
    const agreedInvalid = !agreed;
    if (nameInvalid) setNameError(true);
    if (phoneInvalid) setPhoneError(true);
    if (agreedInvalid) setAgreedError(true);
    if (nameInvalid || phoneInvalid || agreedInvalid) return;

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
    setTimeout(() => { setName(''); setNameError(false); setPhone(''); setPhoneError(false); setNote(''); setAgreed(false); setAgreedError(false); setSent(false); }, 400);
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
            className="relative bg-charcoal w-full max-w-lg px-6 py-10 md:px-12 md:py-12 overflow-hidden"
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

                    {/* Чекбокс согласия */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={agreed}
                            onChange={e => { setAgreed(e.target.checked); setAgreedError(false); }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 border transition-colors duration-200 flex items-center justify-center ${agreed ? 'border-gold bg-gold/10' : agreedError ? 'border-red-400' : 'border-white/30 group-hover:border-white/60'}`}>
                            {agreed && (
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M1 3.5L3.5 6L8 1" stroke="#C9A86C" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className={`font-lora leading-snug transition-colors duration-200 ${agreedError ? 'text-red-400' : 'text-white/55 group-hover:text-white/75'}`} style={{ fontSize: 'clamp(0.8rem, 1.05vw, 0.9rem)' }}>
                          Я согласен с{' '}
                          <a
                            href="/privacy.html"
                            target="_blank"
                            onClick={e => e.stopPropagation()}
                            className="text-gold/70 hover:text-gold underline underline-offset-2 transition-colors duration-200"
                          >
                            обработкой персональных данных
                          </a>
                        </span>
                      </label>
                    </div>

                    {/* Подвал: соцсети + кнопка */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-2">
                      {/* Соцсети */}
                      <div className="flex items-center gap-4">
                        {/* MAX */}
                        <a href="https://max.ru/u/f9LHodD0cOI5BcMyH8vKICdBWrRm-ZX3tkvjT5Ii9BueQV0vs95kNt0rRPk" aria-label="MAX" className="group transition-colors duration-200">
                          <img src="https://maxicons.ru/icons/Max_logo.svg" alt="MAX" width={20} height={20} className="brightness-0 invert opacity-45 group-hover:opacity-100 transition-opacity duration-200" />
                        </a>
                        {/* VK */}
                        <a href="https://vk.com/river_loft" aria-label="ВКонтакте" className="opacity-45 hover:opacity-100 transition-opacity duration-200">
                          <img src="/vk.svg" alt="ВКонтакте" width={20} height={20} />
                        </a>
                        {/* WhatsApp */}
                        <a href="https://api.whatsapp.com/send/?phone=79258592225&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C+%D1%85%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C+%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D0%BA%D1%83" aria-label="WhatsApp" className="text-white/45 hover:text-white transition-colors duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                        {/* Telegram */}
                        <a href="https://t.me/RiverLoft_podolsk" aria-label="Telegram" className="text-white/45 hover:text-white transition-colors duration-200">
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { label: 'О нас', href: '#why' },
    { label: 'Условия', href: '#conditions' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'Партнеры', href: '#partners' },
    { label: 'Путешествия', href: '#travel' },
    { label: 'Контакты', href: '#footer-info' },
  ];

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      window.history.pushState(null, '', window.location.href);
      const onPop = () => setMenuOpen(false);
      window.addEventListener('popstate', onPop);
      return () => {
        window.removeEventListener('popstate', onPop);
        const top = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (top) window.scrollTo(0, -parseInt(top, 10));
      };
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between md:grid md:grid-cols-3 md:items-center px-5 md:px-16 py-4 md:py-5">

          {/* Лого */}
          <div
            onClick={() => { (window as any).setView('main'); setMenuOpen(false); }}
            className="cursor-pointer"
          >
            <img src="/ривьера белый.png" alt="Ривер Лофт" className="h-10 md:h-12 w-auto object-contain" />
          </div>

          {/* Навигация — desktop */}
          <div className="hidden md:flex items-center justify-center gap-5">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={(item as any).target}
                onClick={(e) => {
                  if (item.onClick) { e.preventDefault(); item.onClick(); }
                }}
                className="font-lora font-medium text-[clamp(0.85rem,1vw,1rem)] text-white hover:text-white transition-colors duration-200 relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Правая часть — desktop */}
          <div className="hidden md:flex items-center justify-end gap-5">
            <a href="tel:+79258592225" className="font-lora font-medium text-[clamp(0.85rem,1.05vw,1rem)] text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap">
              +7 925 859 22 25
            </a>
            <div className="flex items-center gap-3">
              <a href="https://max.ru/u/f9LHodD0cOI5BcMyH8vKICdBWrRm-ZX3tkvjT5Ii9BueQV0vs95kNt0rRPk" aria-label="MAX" className="group transition-colors duration-200">
                <img src="https://maxicons.ru/icons/Max_logo.svg" alt="MAX" width={18} height={18} className="brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
              <a href="https://vk.com/river_loft" aria-label="ВКонтакте" className="group transition-colors duration-200">
                <img src="/vk.svg" alt="ВКонтакте" width={18} height={18} className="opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            </div>
            <button
              onClick={onBook}
              className="font-lora font-medium text-[clamp(0.85rem,1.05vw,1rem)] text-white border border-white/40 hover:bg-white hover:text-charcoal transition-all duration-300 px-5 py-2 rounded-full whitespace-nowrap cursor-pointer"
            >
              Забронировать
            </button>
          </div>

          {/* Mobile: телефон + бургер */}
          <div className="md:hidden flex items-center gap-3">
            <a href="tel:+79258592225" className="font-lora font-medium text-white whitespace-nowrap" style={{ fontSize: 'clamp(0.72rem, 2.8vw, 0.85rem)' }}>
              +7 925 859 22 25
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className="text-white flex flex-col gap-[5px] p-1 flex-shrink-0"
            >
              <span className="block w-[22px] h-[1.5px] bg-white rounded-full" />
              <span className="block w-[15px] h-[1.5px] bg-white rounded-full" />
              <span className="block w-[22px] h-[1.5px] bg-white rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.8 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80 || info.velocity.x > 400) setMenuOpen(false);
            }}
            className="fixed inset-0 z-[100] bg-charcoal flex flex-col px-8 py-6 cursor-default"
          >
            <div className="flex justify-between items-center mb-6">
              <img src="/ривьера белый.png" alt="Ривер Лофт" className="h-11 w-auto object-contain" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
                className="text-white/50 hover:text-white transition-colors duration-200 flex items-center justify-center w-11 h-11 -mr-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col flex-1 justify-center">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    if (item.onClick) { e.preventDefault(); item.onClick(); }
                    setMenuOpen(false);
                  }}
                  className="font-cormorant font-semibold text-white border-b border-white/8 py-5 hover:text-gold transition-colors duration-200"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)' }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <a href="tel:+79258592225" className="font-lora font-medium text-white" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.1rem)' }}>
                  +7 925 859 22 25
                </a>
                <div className="flex items-center gap-4">
                  <a href="https://max.ru/u/f9LHodD0cOI5BcMyH8vKICdBWrRm-ZX3tkvjT5Ii9BueQV0vs95kNt0rRPk" aria-label="MAX" className="group">
                    <img src="https://maxicons.ru/icons/Max_logo.svg" alt="MAX" width={18} height={18} className="brightness-0 invert opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                  <a href="https://vk.com/river_loft" aria-label="ВКонтакте" className="opacity-50 hover:opacity-100 transition-opacity duration-200">
                    <img src="/vk.svg" alt="ВКонтакте" width={18} height={18} />
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=79258592225&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C+%D1%85%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C+%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D0%BA%D1%83" aria-label="WhatsApp" className="text-white/50 hover:text-white transition-colors duration-200">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                  <a href="https://t.me/RiverLoft_podolsk" aria-label="Telegram" className="text-white/50 hover:text-white transition-colors duration-200">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </div>
              <button
                onClick={() => { setMenuOpen(false); onBook(); }}
                className="w-full font-lora font-medium text-white border border-white/40 rounded-full py-4 hover:bg-white hover:text-charcoal transition-all duration-300 cursor-pointer"
                style={{ fontSize: 'clamp(1rem, 3.5vw, 1.15rem)' }}
              >
                Забронировать
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

type HeroSlide =
  | { type: 'single'; src: string; position?: string }
  | { type: 'pair'; left: string; right: string };

const HERO_SLIDES: HeroSlide[] = [
  { type: 'pair',   left: '/hero-pt-5.webp',      right: '/hero-pt-6.webp' },
  { type: 'pair',   left: '/hero-pt-7.webp',      right: '/hero-pt-8.webp' },
  { type: 'single', src: '/hero-ls-5.webp',       position: '50% 15%' },
  { type: 'pair',   left: '/hero-pt-9.webp',      right: '/hero-pt-10.webp' },
  { type: 'single', src: '/hero-ls-6.webp',       position: '50% 15%' },
  { type: 'pair',   left: '/hero-pt-11.webp',     right: '/hero-pt-12.webp' },
  { type: 'single', src: '/hero-ls-7.webp',       position: '50% 15%' },
  { type: 'pair',   left: '/hero-herrro-1.webp',  right: '/hero-herrro-2.webp' },
  { type: 'pair',   left: '/hero-herrro-3.webp',  right: '/hero-herrro-4.webp' },
  { type: 'pair',   left: '/hero-herrro-5.webp',  right: '/hero-herrro-6.webp' },
];

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
          {HERO_SLIDES.map((s) => s.type === 'single'
            ? <img key={s.src} src={s.src} alt="" />
            : <><img key={s.left} src={s.left} alt="" /><img key={s.right} src={s.right} alt="" /></>
          )}
        </div>
        <AnimatePresence>
          {(() => {
            const slide = HERO_SLIDES[current];
            if (slide.type === 'single') {
              return (
                <motion.img
                  key={slide.src}
                  src={slide.src}
                  alt=""
                  fetchPriority={current === 0 ? 'high' : 'auto'}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.95, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 2, ease: 'easeInOut' },
                    scale: { duration: 6, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: slide.position ?? '50% 15%' }}
                />
              );
            }
            return (
              <motion.div
                key={slide.left}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 2, ease: 'easeInOut' } }}
              >
                {/* Mobile: один портрет на весь экран */}
                <img
                  src={slide.left}
                  alt=""
                  className="md:hidden absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 10%' }}
                />
                {/* Desktop: две колонки */}
                <div className="hidden md:flex absolute inset-0">
                  <div className="w-[38%] h-full bg-charcoal shrink-0" />
                  <div className="relative flex w-[62%] h-full shrink-0">
                    <img src={slide.left}  alt="" className="w-1/2 h-full object-cover" style={{ objectPosition: '50% 10%' }} />
                    <img src={slide.right} alt="" className="w-1/2 h-full object-cover" style={{ objectPosition: '50% 10%' }} />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-charcoal via-charcoal/60 to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
        {/* Bottom glow — keeps photo vivid, only darkens where text lives */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        {/* Subtle left vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
      </motion.div>

      {/* Main content — left-aligned, centered vertically */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-start text-white px-8 md:px-16 pb-16 pt-24 md:pt-[140px]">
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
        <div key={i} className="flex flex-col items-center sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 px-5 sm:px-10 py-4 sm:py-0 text-center sm:text-left">
          <span className="font-cormorant font-semibold text-gold leading-none whitespace-nowrap" style={{ fontSize: 'clamp(2.30rem, 4.02vw, 3.45rem)' }}>
            {item.value}{item.unit}
          </span>
          <span className="font-lora font-medium text-white" style={{ fontSize: 'clamp(0.9rem, 1.26vw, 1.1rem)' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const StatsSection = () => {
  return (
    <section id="why" className="bg-charcoal py-16 md:py-32 px-8 md:px-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto mb-10 md:mb-20 text-center"
      >
        <h2 className="font-cormorant font-semibold text-white leading-none" style={{ fontSize: 'clamp(3.2rem, 8.05vw, 8.05rem)' }}>
          Почему<br />
          <span className="font-accent font-light text-gold/80">выбирают нас</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10"
      >
        {/* Плашка 1 */}
        <motion.div variants={itemVariants} className="relative col-span-1 md:col-span-2 lg:col-span-1 bg-charcoal px-6 py-10 md:px-10 md:py-14 flex flex-col justify-end min-h-[200px] md:min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(5rem, 11.50vw, 12.65rem)' }}>10+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.5rem, 2.88vw, 2.88rem)' }}>лет опыта</span>
          <span className="font-lora font-medium text-white mt-2" style={{ fontSize: 'clamp(1rem, 1.49vw, 1.38rem)' }}>в организации мероприятий любого формата</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 2 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-6 py-10 md:px-10 md:py-14 flex flex-col justify-end min-h-[200px] md:min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500 whitespace-nowrap" style={{ fontSize: 'clamp(4rem, 9.20vw, 10.35rem)' }}>2 000+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.5rem, 2.88vw, 2.88rem)' }}>мероприятий</span>
          <span className="font-lora font-medium text-white mt-2" style={{ fontSize: 'clamp(1rem, 1.49vw, 1.38rem)' }}>свадьбы, юбилеи, корпоративы, семинары и не только</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 3 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-6 py-10 md:px-10 md:py-14 flex flex-col justify-end min-h-[200px] md:min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(4rem, 9.20vw, 10.35rem)' }}>100+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.5rem, 2.88vw, 2.88rem)' }}>отзывов 5★</span>
          <span className="font-lora font-medium text-white mt-2" style={{ fontSize: 'clamp(1rem, 1.49vw, 1.38rem)' }}>на Яндексе от довольных гостей и пар</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 4 — широкая, текстовая */}
        <motion.div variants={itemVariants} className="relative col-span-1 md:col-span-2 bg-charcoal px-6 py-10 md:px-10 md:py-14 flex flex-col justify-end group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-white leading-tight group-hover:text-gold transition-colors duration-500" style={{ fontSize: 'clamp(2.2rem, 5.75vw, 6.32rem)' }}>Любой формат</span>
          <span className="font-lora font-medium text-white mt-3 max-w-2xl" style={{ fontSize: 'clamp(1rem, 1.61vw, 1.49rem)' }}>Свадьбы, юбилеи, корпоративы, семинары, презентации, дни рождения — всё зависит от вашей фантазии</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

        {/* Плашка 5 */}
        <motion.div variants={itemVariants} className="relative bg-charcoal px-6 py-10 md:px-10 md:py-14 flex flex-col justify-end min-h-[200px] md:min-h-[320px] group overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="font-cormorant font-semibold text-gold leading-none group-hover:text-white transition-colors duration-500" style={{ fontSize: 'clamp(4rem, 9.20vw, 10.35rem)' }}>40+</span>
          <span className="font-cormorant font-semibold text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.5rem, 2.88vw, 2.88rem)' }}>подрядчиков</span>
          <span className="font-lora font-medium text-white mt-2" style={{ fontSize: 'clamp(1rem, 1.49vw, 1.38rem)' }}>проверенные партнёры на ваш выбор</span>
          <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
        </motion.div>

      </motion.div>
    </section>
  );
};




const AboutRiverLoft = () => {

  return (
    <>
      {/* Мобильная версия — статичная */}
      <section id="about" className="md:hidden bg-charcoal text-white pt-20 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10 px-8"
        >
          <h2
            className="font-cormorant font-semibold leading-[1.05] mb-8 text-white"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 4rem)' }}
          >
            Светлый лофт
            <br />
            <span className="font-accent text-white font-light block mt-2" style={{ fontSize: 'clamp(2.4rem, 7vw, 3.5rem)' }}>
              рядом с парком Дубровицы
            </span>
          </h2>
          <div className="flex flex-col gap-5 font-lora font-medium text-white leading-[1.7]" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.15rem)' }}>
            <p>Ривер Лофт – это идеальное место для отдыха вдали от городской суеты. Пространство для Ваших событий любого формата в живописном и энергетически сильном месте слияния двух рек Пахры и Десны.</p>
            <p>Большие панорамные окна открывают вид на архитектурный ансамбль усадьбы Голицыных, увенчанный неповторимой и таинственной церковью Знамение.</p>
          </div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="/neewwwwwww.webp"
          alt="Церковь Знамение в Дубровицах"
          className="block w-full object-contain"
          style={{ maxHeight: '70vh' }}
        />
      </section>

      {/* Desktop версия */}
      <section className="hidden md:block relative bg-charcoal text-white overflow-hidden">
        <div className="relative flex items-stretch min-h-screen px-10 md:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center w-[48%] z-10 relative"
          >
            <h2
              className="font-cormorant font-semibold leading-[1.05] tracking-tight mb-10 text-white"
              style={{ fontSize: 'clamp(3.2rem, 5.5vw, 6.2rem)' }}
            >
              Светлый лофт
              <br />
              <span className="font-accent text-white font-light block mt-3" style={{ fontSize: 'clamp(2.7rem, 5vw, 5.6rem)' }}>
                рядом с парком Дубровицы
              </span>
            </h2>
            <div className="flex flex-col gap-6 font-lora font-medium text-white leading-[1.7] w-[85%]" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.3rem)' }}>
              <p>Ривер Лофт – это идеальное место для отдыха вдали от городской суеты. Пространство для Ваших событий любого формата в живописном и энергетически сильном месте слияния двух рек Пахры и Десны.</p>
              <p>Большие панорамные окна открывают вид на архитектурный ансамбль усадьбы Голицыных, увенчанный неповторимой и таинственной церковью Знамение.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 bottom-0 w-[58%] h-full flex items-end justify-end"
          >
            <img
              src="/neewwwwwww.webp"
              alt="Церковь Знамение в Дубровицах"
              className="block"
              style={{ height: '100%', width: 'auto', maxWidth: 'none' }}
            />
          </motion.div>
        </div>
      </section>
    </>
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
      className="group flex items-start gap-6 md:gap-12 py-7 md:py-10 border-t border-white/10 cursor-default"
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
    <section className="relative py-16 md:py-32 lg:py-48 px-8 md:px-16 bg-charcoal overflow-hidden flex items-center">
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
          className="mb-16 flex flex-col items-center text-center gap-6"
        >
          <h2
            className="font-cormorant font-semibold text-white leading-[1.05]"
            style={{ fontSize: 'clamp(3.45rem, 6.90vw, 6.90rem)' }}
          >
            Наши
            <br />
            <span className="font-accent font-light text-white">преимущества</span>
          </h2>

          <p
            className="font-lora font-medium text-white max-w-sm pb-1"
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
    title: 'Зона Welcome',
    images: [
      '/welcom/TUcRMbbNTug%20(1).webp',
      '/welcom/Z3UYehCHuBA%20(1).webp',
      '/welcom/uTTx8SkQugY%20(1).webp'
    ],
  },
  {
    title: 'Основной зал',
    images: [
      '/зал/11-41-12.webp',
      '/зал/4DSqBL5iUBY%20(1).webp',
      '/зал/Wed-A%20(92).webp',
      '/зал/_%20(308).webp',
    ],
  },
  {
    title: 'Гримерная комната',
    images: [
      '/ГРИМ/DSC04132.webp',
      '/ГРИМ/FelBUCHhYro.webp'
    ],
  },
  {
    title: 'Уборные комнаты',
    images: [
      '/ТУАЛЕТ/hOEEB_MyyJw.webp'
    ],
  },
];

const INCLUDED_SERVICES = [
  'Работа под закрытие',
  'Профессиональное обслуживание',
  'Вкусная кухня',
  'Гардеробная зона',
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
  const zones = ZONES.filter(z => z.images.length > 0);

  return (
    <div id="halls" className="mb-14">
      {/* Заголовок */}
      <h3
        className="font-cormorant font-semibold text-charcoal leading-tight mb-10"
        style={{ fontSize: 'clamp(1.84rem, 3.45vw, 2.88rem)' }}
      >
        Что входит в стоимость
      </h3>

      {/* Таймлайн-табы */}
      <div className="relative mb-8">
        <div className="flex flex-wrap md:flex-nowrap gap-y-2">
          {zones.map((zone, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative flex-1 min-w-[140px] text-left pt-1 pb-3 pr-4 transition-colors duration-200"
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

      {/* Сетка изображений */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {zones[active].images.map((img, i) => (
              <motion.div
                key={img + i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="overflow-hidden aspect-[4/3] bg-charcoal/5 group relative"
              >
                <img
                  src={img}
                  loading="lazy"
                  alt={zones[active].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
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
  const matchedRow = tariff?.rows.find(r => r.match) ?? null;
  const advanceAmount = matchedRow ? matchedRow.price * 0.5 + 30000 : null;

  const inputClass =
    'w-16 md:w-24 bg-transparent border-b-2 border-charcoal/20 focus:border-gold focus:outline-none text-center font-cormorant font-semibold text-charcoal pb-1 transition-colors duration-200 placeholder:text-charcoal/25';

  return (
    <section id="conditions" className="py-16 md:py-32 px-8 md:px-16 bg-sand text-charcoal flex flex-col justify-center items-center">
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
              <ul className="columns-1 sm:columns-2 md:columns-3 gap-8">
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
                  'Минимальный депозит — 200 000 ₽ (без учёта обслуживания и аренды зала).',
                  'Минимальный заказ по меню — от 5 000 ₽/чел.',
                  'Сервисный сбор за обслуживание — 10% от стоимости заказа.',
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
                      className="flex items-start justify-between py-4 border-b border-charcoal/10"
                    >
                      <div className="flex flex-col gap-1.5">
                        <span className="font-lora font-medium text-charcoal" style={{ fontSize: 'clamp(1.06rem, 1.49vw, 1.21rem)' }}>
                          {row.days}
                        </span>
                        {row.match && (
                          <span className="px-2.5 py-0.5 bg-gold text-white font-lora font-medium rounded-full whitespace-nowrap self-start" style={{ fontSize: '0.7rem' }}>ваш день</span>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className="font-cormorant font-semibold leading-none text-charcoal"
                          style={{ fontSize: row.match ? 'clamp(2.07rem, 3.45vw, 2.88rem)' : 'clamp(1.61rem, 2.88vw, 2.30rem)' }}
                        >
                          {row.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {row.match && advanceAmount && (
                          <span className="font-lora font-medium text-charcoal mt-1.5 text-right" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>
                            аванс: {advanceAmount.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onBook}
                className="rounded-full border border-charcoal/30 text-charcoal px-12 py-5 font-lora font-medium hover:bg-charcoal hover:text-sand transition-all duration-300 cursor-pointer"
                style={{ fontSize: 'clamp(1.09rem, 1.49vw, 1.26rem)' }}
              >
                Забронировать эту дату
              </button>
              <a
                href="/pamyatka.html"
                className="rounded-full border border-charcoal/30 text-charcoal px-8 py-5 font-lora font-medium hover:bg-charcoal hover:text-sand transition-all duration-300"
                style={{ fontSize: 'clamp(1.09rem, 1.49vw, 1.26rem)' }}
              >
                Памятка гостя
              </a>
            </div>

            <div className="pb-16" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const GALLERY_IMAGES = [
  '/gal/_ (309).webp',
  '/gal/15-00-00 (1).webp',
  '/gal/21-38-24 (1).webp',
  '/gal/20250819_124346.webp',
  '/gal/20250819_124353.webp',
  '/gal/20250819_124403.webp',
  '/gal/20250819_124416.webp',
  '/gal/20250819_124430.webp',
  '/gal/JfSrNIoO1Sc.webp',
  '/gal/OSmOgaf-OtA.webp',
  '/gal/QbOSemI5E4o.webp',
  '/gal/Wed-A (46).webp',
  '/gal/Wed-A (47).webp',
  '/gal/Wed-A (80).webp',
  '/gal/Wed-A (83).webp',
];

const Gallery = () => {
  const doubled = [...GALLERY_IMAGES, ...GALLERY_IMAGES];
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const setWidth = useRef(0);
  const SPEED = 0.9; // px per 16ms frame

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setWidth.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (isDragging.current || setWidth.current === 0) return;
    let next = x.get() - SPEED * (delta / 16);
    if (next <= -setWidth.current) next += setWidth.current;
    x.set(next);
  });

  const wrapX = (val: number) => {
    const w = setWidth.current;
    if (w === 0) return val;
    let v = val;
    while (v <= -w) v += w;
    while (v > 0) v -= w;
    return v;
  };

  return (
    <section id="gallery" className="pt-6 pb-0 overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <motion.div
        onPanStart={() => { isDragging.current = true; }}
        onPan={(_, info) => { x.set(wrapX(x.get() + info.delta.x)); }}
        onPanEnd={() => { isDragging.current = false; }}
      >
        <motion.div ref={trackRef} className="flex" style={{ x, width: 'max-content' }}>
          {doubled.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] md:w-[380px] aspect-[3/4] overflow-hidden mr-5">
              <img
                src={img} loading="lazy" alt="Gallery" draggable={false}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const PartnersSection = () => (
  <section id="partners" className="w-full bg-sand px-0 md:px-16 pt-20 pb-0 md:pt-24 md:pb-24">
    <motion.div
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        (window as any).setView('partners');
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full overflow-hidden bg-charcoal cursor-pointer mx-auto rounded-none md:rounded-[4px]"
      style={{ maxWidth: '1100px' }}
    >
      {/* Золотая черта сверху */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/60" />

      {/* Watermark */}
      <span
        className="pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 font-cormorant font-semibold text-white/[0.04] leading-none select-none"
        style={{ fontSize: 'clamp(10rem, 22vw, 22rem)' }}
      >
        40+
      </span>

      {/* Тёплое золотое свечение */}
      <div
        className="absolute bottom-0 right-0 w-96 h-64 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, #C9A86C 0%, transparent 70%)' }}
      />

      {/* Контент */}
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-7 md:px-14 py-14 md:py-16">

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gold/50" />
            <span className="font-lora text-gold" style={{ fontSize: 'clamp(0.82rem, 1vw, 0.92rem)' }}>
              Партнёры площадки
            </span>
            <div className="h-px w-8 bg-gold/50" />
          </div>
          <h2
            className="font-cormorant font-medium text-white leading-[0.9]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
          >
            Лучшие<br />
            <span className="font-accent">специалисты</span>
          </h2>
          <p
            className="font-lora font-medium text-white mt-1"
            style={{ fontSize: 'clamp(0.88rem, 1.15vw, 1.05rem)' }}
          >
            Диджеи · Декораторы · Фотографы · Организаторы
          </p>
        </div>

        <div className="flex flex-col items-start md:items-center gap-3 shrink-0">
          <span
            className="font-cormorant font-semibold text-gold leading-none"
            style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
          >
            40+
          </span>
          <span className="font-lora font-medium text-white" style={{ fontSize: 'clamp(0.82rem, 1vw, 0.92rem)' }}>
            проверенных специалистов
          </span>
          <span
            className="mt-4 inline-block font-lora font-medium text-white border border-white/40 px-8 py-3.5 rounded-full group-hover:bg-white group-hover:text-charcoal transition-all duration-300"
            style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)' }}
          >
            Собрать команду
          </span>
        </div>

      </div>

      {/* Анимированная золотая черта снизу при ховере */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
    </motion.div>
  </section>
);

const TravelSection = () => (
  <section id="travel" className="relative w-full bg-charcoal" style={{ minHeight: '100svh' }}>
    {/* Видео на весь блок */}
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/travel-video.mp4" type="video/mp4" />
      </video>
    </div>

    {/* Тёплый золотой оверлей */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(30,18,6,0.82) 0%, rgba(90,55,15,0.35) 50%, rgba(180,130,50,0.10) 100%)' }} />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(30,18,6,0.65) 0%, rgba(90,55,15,0.18) 50%, rgba(30,18,6,0.45) 100%)' }} />

    {/* Контент */}
    <div className="relative z-10 flex flex-col justify-end min-h-[100svh] px-8 md:px-16 py-14 md:py-20">
      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-10">

        {/* Левая колонка — заголовок + кнопка */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-8"
        >
          <div>
            <h2
              className="leading-[0.9] font-cormorant font-semibold text-white"
              style={{
                fontSize: 'clamp(3rem, 5vw, 6.5rem)',
                filter: 'drop-shadow(0 2px 40px rgba(0,0,0,0.5))',
              }}
            >
              Свадебное
            </h2>
            <span
              className="font-accent block text-white"
              style={{
                fontSize: 'clamp(2.8rem, 5.2vw, 7rem)',
                textShadow: '0 2px 32px rgba(0,0,0,0.5)',
                lineHeight: 1,
              }}
            >
              путешествие
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://emojitours.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lora font-medium text-white border border-white/50 px-9 py-4 rounded-full hover:bg-white hover:text-charcoal transition-all duration-300"
              style={{ fontSize: 'clamp(1rem, 1.35vw, 1.18rem)' }}
            >
              emojitours.ru
            </a>
            <a
              href="tel:+79636491852"
              className="font-lora font-medium text-white hover:text-white transition-colors duration-300 px-2 py-4"
              style={{ fontSize: 'clamp(1rem, 1.35vw, 1.18rem)' }}
            >
              +7 963-649-18-52
            </a>
          </div>
        </motion.div>

        {/* Правая колонка — текст (только десктоп) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col gap-5 font-lora font-medium text-white leading-[1.75] md:max-w-sm"
          style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)' }}
        >
          <p>
            Каждый гость для нас является особенным. Мы хотим, чтобы и после свадебного торжества праздник для Вас продолжился незабываемым свадебным путешествием.
          </p>
          <p>
            Туристическое агентство «Эмоджи Турс» — это место, где Вы сможете получить море незабываемых впечатлений и ощутить надёжность, заботу и новые впечатления от путешествия мечты.
          </p>
          <p>
            Наша задача — чтобы ваше путешествие стало индивидуальной историей, которую вы будете пересказывать годами.
          </p>
        </motion.div>

      </div>
    </div>
  </section>
);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState<'main' | 'partners'>('main');

  useEffect(() => {
    (window as any).setView = setView;
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-sand text-charcoal selection:bg-stone selection:text-charcoal w-full min-h-screen">
      <BookingModal open={modalOpen} onClose={closeModal} />
      {view === 'main' && <Navbar onBook={openModal} />}
      
      <AnimatePresence mode="wait">
        {view === 'main' ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onBook={openModal} />
            <VenueBar />
            <StatsSection />
            <AboutRiverLoft />
            <BookingSection onBook={openModal} />
            <Gallery />
            <PartnersSection />
            <TravelSection />
            <Footer onBook={openModal} />
          </motion.div>
        ) : (
          <PartnersView onBack={() => { setView('main'); }} onBook={openModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
