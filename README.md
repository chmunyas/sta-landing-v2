# Smart Trade Africa — Landing v2 (Award-Winning Redesign)

Inspired by **PrivateHood** (UX Design Awards 2023 Winner).

## Improvements Implemented

| # | Pattern from PrivateHood | STA Implementation |
|---|---|---|
| 1 | Storytelling-first hero | Problem statement → solution narrative with animated stats |
| 2 | Numbered section system | `01 The Gap → 02 The Solution → 03 Four Pillars → 04 Live Map → 05 Impact` |
| 3 | Bold typography hierarchy | `clamp(2.5rem, 6vw, 4.5rem)` hero, Lora headings, massive section numbers |
| 4 | Micro-interaction demos | Animated trade flow pipeline + live UI mockup |
| 5 | Four pillars visual architecture | Icon cards: Tax Engine, FX Settlement, Supply Chain, AfCFTA Compliance |
| 6 | Full-bleed imagery / 3D elements | SVG globe, animated trade arcs, floating particles |
| 7 | Case study / proof section | Testimonials + animated big stats |
| 8 | Dark theme polish | Grain texture, cursor-reactive glow, animated gold borders |

## Run Locally

```bash
cd landing-v2
npx serve . -p 3000 -s
```

Then open: **http://localhost:3000**

## Files

```
landing-v2/
├── index.html     # Full page structure (semantic HTML5)
├── styles.css     # Complete stylesheet (~580 lines)
├── main.js        # Animations, counters, reveal, cursor glow
├── package.json   # Simple serve script
└── README.md      # This file
```

## Design Tokens (matching STA theme)

- **Gold**: `#D4AF37` / Light `#F0D060` / Dark `#B8962E`
- **Background**: `#0a0a0a` (default) / `#111111` (cards)
- **Fonts**: Outfit (body) + Lora (headings)
- **Border radius**: 50px (buttons) / 16px (cards)
- **Animations**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` easing

## Key UX Patterns for Award Submission

1. **No-auth-required entry** — Users see value before signing up
2. **Progressive disclosure** — Scroll-based reveal with stagger
3. **Data storytelling** — Stats animate as they enter viewport
4. **Interactive proof** — Live map preview links to full Explore page
5. **Trust signals** — REC badges, testimonials, pilot results
