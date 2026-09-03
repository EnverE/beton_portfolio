# BÉTON

Live: https://betonportfolio.vercel.app

My personal portfolio site. Built it around a 3D concrete pillar you can drag and spin, wrapped in a brutalist look, mostly because I wanted an excuse to actually use Three.js for something instead of just reading about it.

It's bilingual, English and Turkish, fully switchable with the toggle in the corner.

## What's actually in it

- A real-time 3D concrete pillar (Three.js) you can drag to spin, with project posters and graffiti painted onto it
- A day-to-night lighting cycle tied to how far you've scrolled, the background and pillar lighting shift from morning to night as you go
- A hidden ASCII art mode (Alt+A), don't ask, it was fun to build
- Small sound effects on clicks and transitions using the Web Audio API, no audio files, all synthesized
- A contact form that actually sends email (via Web3Forms), with a honeypot field for spam and a mailto fallback if the request fails
- A legal/privacy blurb written in plain language, not a real law degree talking

## Stack

React 19, TypeScript, Vite, Tailwind CSS, Three.js, Framer Motion, Lenis for the smooth scroll.

## Running it locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

If you want the contact form to actually send messages locally, you need a Web3Forms access key. Get one free at web3forms.com (just enter an email, no account needed), then create `.env.local`:

```
VITE_WEB3FORMS_KEY=your_key_here
```

## Where the content lives

- `src/data/translations.ts`, almost everything visible on the site, in both English and Turkish. This is what you're actually editing 90% of the time.
- `src/data/portfolio.ts`, contact info, project metadata, and a few fields the translations file falls back to.
- `src/data/pillarArtworks.ts`, the posters and graffiti text painted on the 3D pillar.

There's some unused code in here too (`ArsenalSection.tsx`, `DossierSection.tsx`), half-built skills and career-timeline sections I started and never wired into the actual page. Left them in for now, might finish them, might not.

## License

Source is here to look at, not to reuse. No license is granted, all rights reserved.
