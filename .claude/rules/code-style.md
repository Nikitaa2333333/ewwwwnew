# Правила стиля — Ривер Лофт

## Типографика

### Шрифты
| Роль | Класс | Применение |
|---|---|---|
| Заголовки, цифры | `font-cormorant` | h1–h4, крупные числа в статистике |
| Тело, UI | `font-lora` | параграфы, кнопки, подписи, навигация |
| Акцент-скрипт | `font-accent` | декоративные строки, подзаголовки-курсив |

### Размеры шрифтов
- **Всегда** `clamp()` — никаких фиксированных `px` или `rem` без clamp
- Примеры из проекта:
  - Hero h1: `clamp(3.2rem, 6.5vw, 8rem)`
  - Section h2: `clamp(3rem, 6vw, 6rem)`
  - Body/UI: `clamp(1rem, 1.4vw, 1.25rem)`
  - Nav/small: `clamp(0.85rem, 1.1vw, 1rem)`

### Запрещено
- `uppercase` / `text-transform: uppercase` — **никогда**
- `tracking-*` (letter-spacing) — **никогда**, кроме уже существующих декоративных исключений
- Фиксированные размеры без clamp для текста

## Цвета

Строго из темы (`@theme` в `index.css`):
- `sand` / `bg-sand` — `#EFEDEA` (светлый фон)
- `charcoal` / `bg-charcoal` — `#191919` (тёмный фон и текст)
- `stone` — `#D1CEC7`
- `gold` / `text-gold` — `#C9A86C` (акцент)

Прозрачность через Tailwind: `text-white/75`, `border-white/10`, `bg-gold/8` и т.д.

## Анимации

- **Только motion/react** (`import { motion, ... } from 'motion/react'`)
- CSS `@keyframes` допустим только для бесконечных петель (marquee)
- **Запрещены:** `animate.css`, `AOS`, GSAP, любые другие библиотеки

### Паттерны

```tsx
// Вход при скролле
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
>

// Параллакс
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

// Crossfade (слайдер)
<AnimatePresence mode="crossfade">
  <motion.img
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.93 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5, ease: 'easeInOut' }}
  />
</AnimatePresence>
```

### Easing
- Входы/выходы: `[0.16, 1, 0.3, 1]` (spring-like, плавно)
- Crossfade/opacity: `'easeInOut'`
- Hover-переходы: CSS `transition-all duration-300` (не motion)

### Запрещено
- Сложные анимации (3D-трансформации, path morphing, многоэтапные keyframe-цепочки)
- `whileHover` с `scale` больше `1.05`
- Анимации, которые мешают читабельности

## Компоненты и кнопки

- Кнопки-ссылки: `rounded-full`, `border border-white/40`, hover: `bg-white text-charcoal`
- Кнопки на светлом фоне: `border border-charcoal/30`, hover: `bg-charcoal text-sand`
- Никаких иконок-стрелок на кнопках
- Hover-подчёркивание ссылок: абсолютный `span` с `h-px bg-gold`, растущий через `w-0 → w-full`
