# BÉTON // Brutalist Concrete Architecture Portfolio

An unapologetic, cold, heavy, and monolithic personal portfolio web application inspired by real-life *béton brut* (raw exposed concrete) architecture.

![Brutalist Architecture Concept](https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80)

---

## Key Architectural Features

- **Genuine Béton Brut Aesthetics**:
  - Procedural concrete textures and aggregate stippling (no external image assets needed).
  - Board-formed wooden plank seam lines (`board-formed-seams`).
  - Cast tie-rod anchor holes (`::before` / `::after` circular indentations with recessed center bolts).
  - Inset chiseled text grooves, heavy drop shadows, and bevel depression physics.
  - Brutalist typography pairing: **Syne** (heavy display), **Space Grotesk** (structural sans), and **JetBrains Mono** (engineering telemetry).

- **Interactive 3D Spatial Monolith (Three.js)**:
  - Interactive brutalist cantilevered monument rendered in real-time WebGL.
  - Directional architectural sunlight casting sharp, deep geometric shadows.
  - Interactive orbit/drag controls with inertial physics and telemetry readouts.
  - Automatic wireframe transformation when CAD mode is engaged.

- **Web Audio API Sound Synthesis**:
  - Zero-latency client-side sound engine (no external audio files required).
  - Low-frequency damped concrete thud (40–85Hz) on docking and navigation.
  - Pneumatic hydraulic pressure release hiss on modals and triggers.
  - Industrial relay switch clicks on toggles.
  - Instant mute toggle in the top HUD.

- **Atmosphere & Toolset Controls**:
  - **REBAR CAD Mode**: Instant toggle between raw concrete (*Béton Brut*) and an architectural wireframe / CAD rebar blueprint view.
  - **Finish Selector**: Toggle between "Rough Board-Formed" and "Smooth Polished Precast".
  - **Floating Coordinate Tracker**: Live screen coordinate telemetry readout in the bottom HUD.

- **Interactive Geotechnical Modules**:
  - **Zone 01 // Material Specimen Lab**: Inspect concrete specimens (Béton Brut, Ashlar Precast, Slag Bunker, Weathered Corten) with live compressive strength and aggregate breakdown.
  - **Zone 02 // Built Monuments (Vault)**: Filterable project showcase with deep CAD blueprint inspection drawers.
  - **Zone 03 // Rebar Arsenal & Seismic Stress Test**: Interactive load slider (20% to 150%) that dynamically tests system deflection, concurrency, and seismic dampening.
  - **Zone 04 // Geotechnical Stratigraphy (Dossier)**: Career progression mapped as elevation core samples (`EL: 0.0M` to `EL: +124.5M`).
  - **Zone 05 // Site Transmissions (Terminal)**: Industrial contact form with simulated cryptographic dispatch animation and 1-click copy for coordinates and PGP key.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## Customizing Your Content

All portfolio information is centralized in a single, typed file:
**[`src/data/portfolio.ts`](src/data/portfolio.ts)**

You can edit:
- **`identity`**: Your name, title, callsign, location coordinates, elevation, status, and manifesto.
- **`projects`**: Add or modify projects, tech stack, metrics, live links, and schematic typologies.
- **`skillsArsenal`**: Add or adjust technical competencies and load-bearing capacity ratings.
- **`constructionTimeline`**: Add your career roles, elevation markers, and key outputs.
- **`contactTelemetry`**: Update your email, PGP key, GitHub, LinkedIn, and X handles.

