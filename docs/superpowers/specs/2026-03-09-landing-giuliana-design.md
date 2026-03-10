# Landing Page "Para Giuliana" - Design Spec

## Overview

Landing page interactiva como regalo de aprecio para Giuliana, estudiante de medicina. Una experiencia inmersiva que combina múltiples dinámicas interactivas para expresar cariño y admiración.

## Objetivos

- Crear una experiencia memorable y emotiva
- Combinar múltiples interacciones: raspadita, timeline, cartas, quiz
- Diseño elegante con paleta negro + rojo violeta
- Optimizado para desktop y mobile

## Paleta de Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Negro profundo | `#0a0a0a` | Fondo principal |
| Rojo violeta | `#c41e5c` | Acento primario, botones, highlights |
| Rosa suave | `#ff6b9d` | Acento secundario, hover states |
| Blanco | `#ffffff` | Texto principal |
| Gris claro | `#a0a0a0` | Texto secundario |

## Stack Técnico

- **Framework:** Astro 4.x
- **Interactividad:** React 18 (Astro islands)
- **Estilos:** Tailwind CSS 3.x
- **Animaciones:** Framer Motion 10.x
- **Partículas:** tsparticles (intro)
- **Raspadita:** Canvas API nativo
- **Deploy:** Vercel

## Estructura de Archivos

```
src/
  components/
    Intro.tsx           # Pantalla inicial con partículas
    ScratchCard.tsx     # Componente de raspadita
    Timeline.tsx        # Scroll animado con fotos
    TimelineSection.tsx # Sección individual del timeline
    CardGallery.tsx     # Galería de cartas volteables
    FlipCard.tsx        # Carta individual
    Quiz.tsx            # Mini quiz interactivo
    Finale.tsx          # Pantalla final con confetti
    VideoPlayer.tsx     # Reproductor del video
  layouts/
    Layout.astro        # Layout base
  pages/
    index.astro         # Página principal
  styles/
    global.css          # Estilos globales + Tailwind
  data/
    content.ts          # Mensajes y contenido
  assets/
    fonts/              # Tipografías (si se usan custom)
public/
  img/                  # Fotos de Giuliana (ya existentes)
```

## Flujo de la Experiencia

### 1. Intro (Pantalla completa)

**Comportamiento:**
- Fondo negro con partículas sutiles flotando (efecto estrellado)
- Texto aparece letra por letra con efecto typewriter
- Botón "Comenzar" con efecto glow pulsante

**Contenido:**
```
"Hay personas que llegan a tu vida
y la cambian para siempre..."

[Comenzar]
```

**Transición:** Fade out al hacer click

### 2. Raspadita (Scratch Card)

**Comportamiento:**
- Canvas con capa gris/plateada que simula raspadita de lotería
- Usuario raspa con mouse/touch para revelar contenido
- Al revelar ~60%, se completa automáticamente con animación

**Contenido revelado:**
- Primera foto de Giuliana (centrada)
- Texto: "Giuliana, esto es para ti..."
- Botón: "Continuar"

**Técnico:**
- Canvas 2D con compositing `destination-out`
- Detección de porcentaje revelado
- Responsive (ajustar tamaño según viewport)

### 3. Timeline (Scroll animado)

**Comportamiento:**
- Scroll vertical suave
- Cada sección aparece con animación al entrar en viewport
- Fotos alternan izquierda/derecha
- Elementos decorativos: línea de latido cardiaco entre secciones

**Secciones:**

| # | Foto | Mensaje |
|---|------|---------|
| 1 | `71624c42-f793-4c85-9bb3-29c4c8d74f1f.jpg` | "Futura doctora que ya cura con su presencia" |
| 2 | `c86f21df-2701-4e1a-b5bd-c611a97a9fdf.jpg` | "La que estudia hasta las 3am pero siempre tiene tiempo para escuchar" |
| 3 | `c8f7f60f-2ca0-4aca-8f07-759a47c63686.jpg` | "Auténtica hasta en el color de pelo" |
| 4 | `unname4.jpg` | "Graciosa sin intentarlo" |

**Animaciones:**
- Fotos: slide in desde el lado + fade
- Texto: fade up con delay
- Línea de latido: SVG animado stroke-dasharray

### 4. Galería de Cartas

**Comportamiento:**
- Grid de 4-6 cartas con dorso elegante
- Al hacer click, carta voltea (3D flip)
- Muestra foto + mensaje corto
- Click de nuevo para volver a voltear

**Cartas:**

| # | Foto | Mensaje |
|---|------|---------|
| 1 | `unnamed.jpg` | "Esos lentes que ven el futuro" |
| 2 | `unnamed2.jpg` | "Corazón de oro" |
| 3 | `unnamed3.jpg` | "Shot on iPhone, vibes on point" |
| 4 | `41603e4a-74c0-49bb-acc9-ed0e5883a733.jpg` | "Siempre real" |

**Diseño de carta:**
- Dorso: patrón geométrico rojo violeta con borde dorado sutil
- Frente: foto con esquinas redondeadas + mensaje debajo
- Tamaño: ~200x280px (aspect ratio carta)

### 5. Quiz

**Comportamiento:**
- 3 preguntas secuenciales
- Respuesta correcta = efecto positivo + siguiente pregunta
- Respuesta incorrecta = shake + reintentar
- Al completar, transición al final

**Preguntas:**

```typescript
const questions = [
  {
    question: "¿Qué estudia esta persona increíble?",
    options: ["Derecho", "Medicina", "Ingeniería"],
    correct: 1
  },
  {
    question: "¿Por qué merece esta página?",
    options: ["Porque sí", "Porque es genial", "Todas las anteriores"],
    correct: 2
  },
  {
    question: "¿Cuánto la aprecio?",
    options: ["Mucho", "Demasiado", "No hay palabra suficiente"],
    correct: 2
  }
];
```

### 6. Finale

**Comportamiento:**
- Confetti animado al entrar
- Mensaje grande con animación de entrada
- Video opcional (autoplay muted, click para unmute)
- Corazón latiendo como elemento decorativo

**Contenido:**
```
🎉 [Confetti]

"Giuliana, gracias por existir"

"No necesito una fecha especial para decirte
que eres importante. Solo quería que lo supieras."

[Video: WhatsApp Video 2026-03-09 at 10.38.49 AM.mp4]

❤️ [Corazón animado]
```

## Responsive Design

| Breakpoint | Ajustes |
|------------|---------|
| Mobile (<640px) | Cards en 2 columnas, timeline vertical centrado |
| Tablet (640-1024px) | Cards en 3 columnas |
| Desktop (>1024px) | Layout completo, cards en 4 columnas |

## Accesibilidad

- Navegación por teclado en quiz y cartas
- Alt text descriptivo en todas las fotos
- Contraste suficiente (WCAG AA)
- Reducir movimiento si `prefers-reduced-motion`
- Focus visible en elementos interactivos

## Performance

- Imágenes optimizadas (webp con fallback)
- Lazy loading en timeline y cartas
- Partículas con throttle en mobile
- Video con poster y carga diferida

## Assets Existentes

**Fotos (en `/img`):**
- `41603e4a-74c0-49bb-acc9-ed0e5883a733.jpg`
- `71624c42-f793-4c85-9bb3-29c4c8d74f1f.jpg`
- `c86f21df-2701-4e1a-b5bd-c611a97a9fdf.jpg`
- `c8f7f60f-2ca0-4aca-8f07-759a47c63686.jpg`
- `unnamed.jpg`
- `unnamed2.jpg`
- `unnamed3.jpg`
- `unname4.jpg`
- `Gemini_Generated_Image_nixaranixaranixa.png`

**Video:**
- `WhatsApp Video 2026-03-09 at 10.38.49 AM.mp4`

## Dependencias

```json
{
  "dependencies": {
    "astro": "^4.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "@astrojs/react": "^3.x",
    "@astrojs/tailwind": "^5.x",
    "tailwindcss": "^3.x",
    "framer-motion": "^10.x",
    "@tsparticles/react": "^3.x",
    "tsparticles": "^3.x",
    "canvas-confetti": "^1.x"
  }
}
```

## Notas de Implementación

1. **ScratchCard:** Usar canvas con globalCompositeOperation = 'destination-out'
2. **Timeline:** Usar Intersection Observer para trigger de animaciones
3. **FlipCard:** CSS 3D transforms con preserve-3d
4. **Quiz:** Estado local con React useState
5. **Confetti:** canvas-confetti es más ligero que alternativas
6. **Video:** HTML5 video con controles custom minimalistas

## Criterios de Éxito

- [ ] Funciona en Chrome, Firefox, Safari, Edge
- [ ] Responsive en móvil, tablet y desktop
- [ ] Carga inicial < 3s en 4G
- [ ] Todas las interacciones funcionan con touch
- [ ] Sin errores en consola
- [ ] Giuliana sonríe al verlo
