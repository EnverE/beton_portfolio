export interface ProjectTranslation {
  title: string;
  shortDesc: string;
  fullDesc: string;
  structuralSpecs: {
    label: string;
    value: string;
  }[];
}

export interface ProcessStepTranslation {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface MaterialSpecimenTranslation {
  id: string;
  name: string;
  description: string;
  surfaceTexture: string;
}

export const TRANSLATIONS = {
  EN: {
    nav: {
      l00: '00 // HOME',
      l01: '01 // WORKS',
      l02: '02 // PROCESS',
      l03: '03 // ABOUT',
      l04: '04 // CONTACT',
      elevator: 'ELEVATOR',
    },
    phases: {
      morning: 'MORNING DAYLIGHT',
      midday: 'MIDDAY SUN',
      golden: 'GOLDEN HOUR',
      night: 'NOCTURNAL NIGHT',
      pillar: 'PILLAR',
    },
    hero: {
      subTag: 'EET // WEB DESIGN',
      elevation: 'LEVEL 00 // MORNING LIGHT',
      title: 'CREATIVE WEB DESIGNER & INTERACTION ENGINEER',
      bio: "I'm a senior Software Engineering student at METU, but I don't stay inside that box. Most of what I build lives in the browser, React, Three.js, GSAP, that kind of stack, but I'm just as likely to be soldering a board or writing a synth patch on the same day.",
      btnWorks: 'SELECTED WORKS',
      btnContact: 'CONTACT',
      scrollHint: 'CLICK & DRAG PILLAR TO SPIN OR SCROLL SITE // SCROLL TO DESCEND',
      monolithTag: '3D CONCRETE MONOLITH',
    },
    works: {
      level: 'LEVEL 01 // SELECTED WORKS',
      phase: 'MIDDAY SUNLIGHT',
      viewCase: 'VIEW CASE STUDY',
      year: 'YEAR',
      status: 'STATUS',
      close: 'CLOSE CASE STUDY (ESC)',
      specifications: 'DESIGN & MOTION SPECIFICATIONS',
      framework: 'FRAMEWORK ENGINE',
      typology: 'TYPOLOGY',
      liveUrl: 'LIVE EXPERIENCE',
      repoUrl: 'SOURCE REPOSITORY',
    },
    process: {
      level: 'LEVEL 02 // HOW I WORK',
      phase: 'GOLDEN HOUR SUNSET // LOW-ANGLE AMBER SUN',
      eyebrow: 'ARCHITECTURAL PIPELINE',
      title: 'HOW I WORK',
      desc: 'Roughly four stages, though they overlap more than this list makes it sound. Structure first, then how it moves, then how it looks, then making sure it actually runs well.',
      stage: 'STAGE',
    },
    about: {
      level: 'LEVEL 03 // ABOUT & MANIFESTO',
      phase: 'TWILIGHT DUSK // EVENING SKY',
      title: 'ABOUT',
      bioStatement: "I'm Eren, based in Istanbul. Web is where most of my work ends up, React, Three.js, GSAP, that kind of stack, but I don't stay in one lane. I've built PCBs, messed around in Fusion 360, put together a game or two, and spent a fair amount of time in a DAW. Still studying, still freelancing on the side, still figuring out which of these I want to get serious about.",
      specimensTitle: 'DIGITAL SURFACE SPECIMENS',
    },
    dispatch: {
      level: 'LEVEL 04 // CONTACT & DISPATCH',
      phase: 'NOCTURNAL NIGHT // PILLAR FOUNDATION',
      title: 'CONTACT',
      intro: 'If you want to talk about a project, or just have a question, send it over. I read everything myself.',
      formName: 'NAME / STUDIO',
      formNamePlaceholder: 'Your Name or Studio',
      formEmail: 'EMAIL COORDINATES',
      formEmailPlaceholder: 'name@domain.com',
      formScope: 'PROJECT SCOPE',
      formScopePlaceholder: 'Describe your project, timeline, and architectural vision...',
      btnTransmit: 'TRANSMIT DISPATCH',
      btnTransmitting: 'TRANSMITTING...',
      successTitle: 'TRANSMISSION RECEIVED',
      successDesc: "Got it. I'll read it properly and get back to you by email, usually within a day or two.",
      btnSendAnother: 'Send another message',
      directDispatch: 'DIRECT COORDINATES',
      btnCopy: 'COPY EMAIL',
      copied: 'COPIED TO CLIPBOARD',
      coordinates: 'COORDINATES',
      locationVal: 'ISTANBUL // 41°00\'49"N  28°57\'18"E',
      statusLabel: 'COMMISSION STATUS',
      statusVal: 'OPEN TO NEW PROJECTS, LIMITED HOURS AROUND SCHOOL',
    },
    footer: {
      portfolioTag: 'PORTFOLIO',
      subline: "WEB, INTERACTION DESIGN, AND WHATEVER ELSE I'M BUILDING THIS WEEK",
      systemFps: 'SYSTEM: 120 FPS FLUID',
      designQuality: 'SOURCE: GITHUB // OPEN REPO',
      returnTop: 'RETURN TO TOP',
      copyright: 'DESIGN SPEC: BRUTALIST LUXURY // COPYRIGHT',
      editHint: 'EDIT CONTENT IN:',
    },
    projects: {
      'aura-flagship': {
        title: 'MADCAT COLLECTIVE — WORK IN PROGRESS',
        shortDesc: 'Bilingual portfolio site in development for a graphic design collective, built around a single, deliberately-chosen motion language instead of a grab-bag of effects.',
        fullDesc: 'Currently under active construction — structural skeleton and routing are complete, visual design has not started yet. MadCat is architected around token-driven motion (every duration, easing curve, and transform value lives in one file) and a single site-wide animation verb, chosen only after comparing candidates side by side rather than assumed upfront. Full bilingual parity (Turkish/English) is enforced automatically at build time.',
        structuralSpecs: [
          { label: 'STATUS', value: 'WORK IN PROGRESS — SKELETON PHASE' },
          { label: 'FRAMEWORK', value: 'NEXT.JS 16 + TYPESCRIPT' },
          { label: 'MOTION ENGINE', value: 'GSAP SCROLLTRIGGER + LENIS' },
          { label: 'LOCALIZATION', value: 'NEXT-INTL (TR/EN PARITY ENFORCED)' }
        ]
      },
      'nebula-sound': {
        title: 'NEBULA SPATIAL AUDIO EXPERIENCE',
        shortDesc: 'Generative sound and visual playground reacting to cursor velocity and microphone acoustics.',
        fullDesc: 'An experimental interactive web experience exploring the intersection of spatial typography and generative acoustics. Features real-time FFT audio spectrum analysis driving particle deformation and fluid typographic wave distortions.',
        structuralSpecs: [
          { label: 'AUDIO DSP', value: 'WEB AUDIO BIQUAD API' },
          { label: 'SHADER PASS', value: 'RAYMARCHED DISPLACEMENT' },
          { label: 'LATENCY', value: '< 8MS AUDIO-VISUAL SYNC' },
          { label: 'COLOR PALETTE', value: 'MONOCHROME TITANIUM' }
        ]
      },
      'chrono-mag': {
        title: 'CHRONO EDITORIAL PUBLICATION',
        shortDesc: 'Digital architectural publication with asymmetric grid layouts and darkroom reading mode.',
        fullDesc: 'Engineered for deep-read cultural essays and architectural critiques. Implements a fluid responsive baseline grid, custom reading progress indicator, darkroom inverted mode, and physical tactile page transition physics.',
        structuralSpecs: [
          { label: 'PERFORMANCE', value: '100/100 LIGHTHOUSE SCORE' },
          { label: 'TYPOGRAPHY', value: 'PLUS JAKARTA SANS' },
          { label: 'GRID SYSTEM', value: '12-COLUMN ASYMMETRIC' },
          { label: 'ASSET WEIGHT', value: 'ZERO LAYOUT SHIFT (CLS: 0)' }
        ]
      },
      'monolith-system': {
        title: 'MONOLITH-UI DESIGN SYSTEM',
        shortDesc: 'Clean, uncompromising brutalist UI component architecture for high-density web software.',
        fullDesc: 'A rigorous design system built on mathematical proportions and raw honesty of materials. Includes 42 accessible UI components, standardized spacing tokens, refined tactile button physics, and comprehensive documentation.',
        structuralSpecs: [
          { label: 'COMPONENTS', value: '42 ACCESSIBLE MODULES' },
          { label: 'ACCESSIBILITY', value: 'WCAG AAA 14:1 CONTRAST' },
          { label: 'BUNDLE IMPACT', value: '< 12KB COMPRESSED' },
          { label: 'CUSTOMIZATION', value: 'VARIABLE CSS TOKENS' }
        ]
      },
      'synapse-ai': {
        title: 'SYNAPSE CREATIVE CANVAS',
        shortDesc: 'Node-based AI generative canvas featuring hardware-accelerated spatial panning and magnetic docking.',
        fullDesc: 'A revolutionary creative workspace allowing designers to orchestrate complex generative workflows on an infinite zoomable canvas. Designed with cold obsidian panels, laser-thin connector cables, and low-latency interaction loops.',
        structuralSpecs: [
          { label: 'RENDER MODEL', value: 'CANVAS2D + WEBGL HYBRID' },
          { label: 'CONCURRENCY', value: 'LOCAL-FIRST CRDT STATE' },
          { label: 'TOUCH SUPPORT', value: 'MULTI-FINGER PINCH ZOOM' },
          { label: 'DESIGN TOKENS', value: 'DARK TITANIUM OBSIDIAN' }
        ]
      }
    } as Record<string, ProjectTranslation>,
    processSteps: [
      {
        step: '01',
        phase: 'STRUCTURAL DISCOVERY & GRID ARCHITECTURE',
        title: 'FIGURING OUT WHAT GOES WHERE',
        description: "Before I touch any styling I work out the actual structure, what content exists, how it's grouped, what the grid needs to support.",
        deliverables: ['Spatial Layout Blueprint', 'Typography Scale Matrix', 'Interactive Wireframe Flow']
      },
      {
        step: '02',
        phase: 'TACTILE MOTION & INTERACTION PHYSICS',
        title: 'GETTING THE MOTION TO FEEL RIGHT',
        description: 'This is where I spend the most time honestly, tuning how things move until they stop feeling like animations and start feeling like responses.',
        deliverables: ['Framer Motion Prototypes', 'Three.js Spatial Sandboxes', 'Micro-Interaction Curves']
      },
      {
        step: '03',
        phase: 'HIGH-FIDELITY SURFACE & DESIGN SYSTEMS',
        title: 'MAKING IT LOOK LIKE SOMETHING',
        description: 'Typography, color, spacing, the actual visual layer, applied on top of a structure that already works without it.',
        deliverables: ['Figma Design System', 'WCAG AAA Color Tokens', 'Editorial Visual Direction']
      },
      {
        step: '04',
        phase: 'CREATIVE FRONTEND & 120 FPS PRODUCTION',
        title: "SHIPPING SOMETHING THAT DOESN'T CHOKE",
        description: "Turning the design into real code and making sure it stays fast once it's live, not just in the demo.",
        deliverables: ['Production Web Architecture', 'Zero-Jank 120 FPS Pacing', 'Automated CI/CD Deployment']
      }
    ] as ProcessStepTranslation[],
    manifesto: [
      { title: "01. BUILD FOR THE SCREEN IT'S ON", text: "A phone and a monitor aren't the same canvas. I design for what the browser actually gives you, not a fixed frame I wish it had." },
      { title: "02. CUT UNTIL IT'S HONEST", text: "If a piece of the layout isn't doing anything, it goes. I'd rather have three things that matter than ten that don't." },
      { title: "03. INTERACTIONS SHOULD FEEL LIKE SOMETHING", text: 'A hover, a scroll, a click, they should respond in a way that feels physical, not just technically correct.' },
      { title: "04. SLOW IS A BUG", text: "If something feels laggy, that's not a minor detail I'll get to later, that's the thing I fix first." }
    ],
    materialSpecimens: [
      {
        id: 'honed-slate',
        name: 'HONED BASALT & SLATE',
        description: 'Cold, matte stone surface engineered for high-contrast digital galleries and luxury editorial presentation. Absorbs glare, elevating typography and spatial hierarchy.',
        surfaceTexture: 'Fine matte grain with razor-sharp 1px border delineation'
      },
      {
        id: 'bone-titanium',
        name: 'BONE WHITE & TITANIUM',
        description: 'High-luminance monochrome architectural surface. Creates gallery-grade negative space, placing all visual focus on pristine type and interactive media.',
        surfaceTexture: 'Silky smooth mineral finish with precise micro-shadows'
      },
      {
        id: 'obsidian-glass',
        name: 'FROSTED OBSIDIAN ACRYLIC',
        description: 'Layered semi-transparent monolithic panels creating atmospheric depth without compromising typographic legibility or frame pacing.',
        surfaceTexture: 'Subtle frosted sheen with high-frequency edge reflection'
      },
      {
        id: 'wireframe-grid',
        name: 'REBAR CAD BLUEPRINT',
        description: 'Technical wireframe blueprint surface exposing structural layout coordinates, layout baseline grids, and viewport boundary vectors.',
        surfaceTexture: 'Geometric orthogonal grid with glowing vector intersections'
      }
    ] as MaterialSpecimenTranslation[]
  },
  TR: {
    nav: {
      l00: '00 // BAŞLANGIÇ',
      l01: '01 // PROJELER',
      l02: '02 // SÜREÇ',
      l03: '03 // HAKKINDA',
      l04: '04 // İLETİŞİM',
      elevator: 'ASANSÖR',
    },
    phases: {
      morning: 'SABAH IŞIĞI',
      midday: 'ÖĞLE GÜNEŞİ',
      golden: 'ALTIN SAAT',
      night: 'GECE KARANLIĞI',
      pillar: 'SÜTUN',
    },
    hero: {
      subTag: 'EET // WEB TASARIMI',
      elevation: 'KAT 00 // SABAH IŞIĞI',
      title: 'KREATİF WEB TASARIMCISI & ETKİLEŞİM MÜHENDİSİ',
      bio: "ODTÜ'de Yazılım Mühendisliği son sınıf öğrencisiyim, ama sadece o kutunun içinde kalmıyorum. Ürettiklerimin çoğu tarayıcıda yaşıyor, React, Three.js, GSAP, o tarz bir yığın, ama aynı gün bir devre kartı lehimlemem ya da bir synth patch'i yazmam da hiç şaşırtıcı değil.",
      btnWorks: 'SEÇİLMİŞ PROJELER',
      btnContact: 'İLETİŞİM',
      scrollHint: 'SÜTUNU SÜRÜKLEYEREK DÖNDÜRÜN VEYA SAYFAYI KAYDIRIN // İNMEK İÇİN KAYDIRIN',
      monolithTag: '3D BETON MONOLİT',
    },
    works: {
      level: 'KAT 01 // SEÇİLMİŞ PROJELER',
      phase: 'ÖĞLE GÜNEŞİ',
      viewCase: 'PROJEYİ İNCELE',
      year: 'YIL',
      status: 'DURUM',
      close: 'İNCELEMEYİ KAPAT (ESC)',
      specifications: 'TASARIM & HAREKET ÖZELLİKLERİ',
      framework: 'MİMARİ ALTYAPI',
      typology: 'TİPOLOJİ',
      liveUrl: 'CANLI DENEYİM',
      repoUrl: 'KAYNAK KODLARI',
    },
    process: {
      level: 'KAT 02 // ÇALIŞMA SÜRECİ',
      phase: 'ALTIN SAAT GÜNBATIMI // YATIK AÇILI KEHRİBAR GÜNEŞ',
      eyebrow: 'MİMARİ ÇALIŞMA SÜRECİ',
      title: 'NASIL ÇALIŞIRIM',
      desc: 'Kabaca dört aşama, gerçi bu liste kadar net ayrışmıyorlar. Önce yapı, sonra nasıl hareket ettiği, sonra nasıl göründüğü, sonra da gerçekten iyi çalıştığından emin olmak.',
      stage: 'AŞAMA',
    },
    about: {
      level: 'KAT 03 // HAKKINDA & MANİFESTO',
      phase: 'ALACAKARANLIK // AKŞAM GÖKYÜZÜ',
      title: 'HAKKIMDA',
      bioStatement: "Ben Eren, Istanbul'dayım. İşimin çoğu web'de bitiyor, React, Three.js, GSAP, o tarz bir yığın, ama tek bir alanda kalmıyorum. PCB tasarladım, Fusion 360'ta uğraştım, birkaç oyun bir araya getirdim, DAW'da da epey vakit geçirdim. Hala okuyorum, hala yan işlerde freelance yapıyorum, hangisine gerçekten ağırlık vereceğime hala karar veriyorum.",
      specimensTitle: 'DİJİTAL YÜZEY NUMUNELERİ',
    },
    dispatch: {
      level: 'KAT 04 // İLETİŞİM & MESAJ',
      phase: 'GECE KARANLIĞI // SÜTUN TEMELİ',
      title: 'İLETİŞİM',
      intro: 'Bir proje konuşmak istersen, ya da sadece bir sorun varsa, yaz. Her mesajı kendim okuyorum.',
      formName: 'İSİM / STÜDYO',
      formNamePlaceholder: 'İsminiz veya Stüdyonuz',
      formEmail: 'E-POSTA ADRESİ',
      formEmailPlaceholder: 'isim@alanadi.com',
      formScope: 'PROJE KAPSAMI',
      formScopePlaceholder: 'Projenizi, takviminizi ve mimari vizyonunuzu anlatın...',
      btnTransmit: 'MESAJI GÖNDER',
      btnTransmitting: 'İLETİLİYOR...',
      successTitle: 'MESAJINIZ ALINDI',
      successDesc: 'Ulaştı. Düzgünce okuyup e-postandan dönüş yapacağım, genelde bir iki gün içinde.',
      btnSendAnother: 'Yeni bir mesaj gönder',
      directDispatch: 'DOĞRUDAN İLETİŞİM',
      btnCopy: 'E-POSTAYI KOPYALA',
      copied: 'PANONUA KOPYALANDI',
      coordinates: 'KONUM BİLGİSİ',
      locationVal: 'İSTANBUL // 41°00\'49"K  28°57\'18"D',
      statusLabel: 'PROJE DURUMU',
      statusVal: 'YENİ PROJELERE AÇIĞIM, OKUL YÜZÜNDEN VAKTİM SINIRLI',
    },
    footer: {
      portfolioTag: 'PORTFOLYO',
      subline: 'WEB, ETKİLEŞİM TASARIMI VE O HAFTA NE ÜZERİNDE ÇALIŞIYORSAM',
      systemFps: 'SİSTEM: 120 FPS AKICI',
      designQuality: 'KAYNAK: GITHUB // AÇIK REPO',
      returnTop: 'BAŞA DÖN',
      copyright: 'TASARIM: BRUTALİST LÜKS // TÜM HAKLARI SAKLIDIR',
      editHint: 'İÇERİK DÜZENLEME:',
    },
    projects: {
      'aura-flagship': {
        title: 'MADCAT KOLEKTİFİ — YAPIM AŞAMASINDA',
        shortDesc: 'Bir grafik tasarım kolektifi için geliştirilmekte olan, bir dizi rastgele efekt yerine tek ve bilinçli seçilmiş bir hareket diline dayanan iki dilli portfolyo sitesi.',
        fullDesc: 'Şu anda aktif geliştirme aşamasında — yapısal iskelet ve yönlendirme tamamlandı, görsel tasarım henüz başlamadı. MadCat, belirteç tabanlı harekete (her süre, yumuşatma eğrisi ve dönüşüm değeri tek bir dosyada tutulur) ve baştan varsayılmak yerine adaylar birbiriyle karşılaştırılarak seçilen tek bir site geneli animasyon diline göre kurgulanmıştır. Türkçe/İngilizce tam çeviri eşleşmesi derleme sırasında otomatik olarak denetlenir.',
        structuralSpecs: [
          { label: 'DURUM', value: 'YAPIM AŞAMASINDA — İSKELET SÜRECİ' },
          { label: 'ALTYAPI', value: 'NEXT.JS 16 + TYPESCRIPT' },
          { label: 'HAREKET MOTORU', value: 'GSAP SCROLLTRIGGER + LENIS' },
          { label: 'YERELLEŞTİRME', value: 'NEXT-INTL (TR/EN EŞLEŞMESİ ZORUNLU)' }
        ]
      },
      'nebula-sound': {
        title: 'NEBULA MEKANSAL SES DENEYİMİ',
        shortDesc: 'İmleç hızına ve mikrofon akustiğine anında tepki veren üretken ses ve görsel deneyim alanı.',
        fullDesc: 'Mekansal tipografi ve üretken akustiğin kesişimini keşfeden deneysel etkileşimli web deneyimi. Gerçek zamanlı FFT ses spektrum analizi, parçacık deformasyonunu ve akışkan tipografik dalga bozulmalarını doğrudan yönetir.',
        structuralSpecs: [
          { label: 'SES DSP', value: 'WEB AUDIO BIQUAD API' },
          { label: 'SHADER ETKİSİ', value: 'RAYMARCHED DISPLACEMENT' },
          { label: 'GECİKME', value: '< 8MS SES-GÖRSEL SENKRON' },
          { label: 'RENK PALETİ', value: 'MONOKROM TİTANYUM' }
        ]
      },
      'chrono-mag': {
        title: 'CHRONO EDİTÖRYAL YAYIN',
        shortDesc: 'Asimetrik ızgara yerleşimleri ve karanlık oda okuma moduna sahip dijital mimarlık yayını.',
        fullDesc: 'Kapsamlı kültürel denemeler ve mimari eleştiriler için özel olarak tasarlandı. Akışkan taban çizgisi ızgarası, özel okuma ilerleme göstergesi, karanlık oda ters mod ve fiziksel dokunsal sayfa geçiş mekaniği barındırır.',
        structuralSpecs: [
          { label: 'PERFORMANS', value: '100/100 LIGHTHOUSE SKORU' },
          { label: 'TİPOGRAFİ', value: 'PLUS JAKARTA SANS' },
          { label: 'IZGARA SİSTEMİ', value: '12 SÜTUN ASİMETRİK' },
          { label: 'AĞIRLIK', value: 'SIFIR YERLEŞİM KAYMASI (CLS: 0)' }
        ]
      },
      'monolith-system': {
        title: 'MONOLITH-UI TASARIM SİSTEMİ',
        shortDesc: 'Yüksek yoğunluklu web yazılımları için temiz, tavizsiz brutalist UI bileşen mimarisi.',
        fullDesc: 'Matematiksel oranlar ve malzemelerin yalın dürüstlüğü üzerine inşa edilmiş titiz bir tasarım sistemi. 42 erişilebilir UI bileşeni, standartlaştırılmış boşluk belirteçleri, rafine dokunsal düğme fiziği ve kapsamlı dokümantasyon içerir.',
        structuralSpecs: [
          { label: 'BİLEŞENLER', value: '42 ERİŞİLEBİLİR MODÜL' },
          { label: 'ERİŞİLEBİLİRLİK', value: 'WCAG AAA 14:1 KONTRAST' },
          { label: 'PAKET ETKİSİ', value: '< 12KB SIKIŞTIRILMIŞ' },
          { label: 'ÖZELLEŞTİRME', value: 'DEĞİŞKEN CSS BELİRTEÇLERİ' }
        ]
      },
      'synapse-ai': {
        title: 'SYNAPSE YARATICI ÇALIŞMA ALANI',
        shortDesc: 'Donanım hızlandırmalı mekansal kaydırma ve manyetik kenetlenme sunan düğüm tabanlı yapay zeka tuvali.',
        fullDesc: 'Tasarımcıların sonsuz yakınlaştırılabilir bir tuval üzerinde karmaşık üretken iş akışlarını yönetmesini sağlayan devrim niteliğinde yaratıcı çalışma alanı. Soğuk obsidyen paneller, lazer inceliğinde bağlantı kabloları ve düşük gecikmeli etkileşim döngüleriyle tasarlandı.',
        structuralSpecs: [
          { label: 'ÇİZİM MODELİ', value: 'CANVAS2D + WEBGL HİBRİT' },
          { label: 'EŞZAMANLILIK', value: 'LOCAL-FIRST CRDT DURUMU' },
          { label: 'DOKUNMATİK', value: 'ÇOKLU PARMAKLA YAKINLAŞTIRMA' },
          { label: 'TASARIM BELİRTECİ', value: 'KOYU TİTANYUM OBSİDYEN' }
        ]
      }
    } as Record<string, ProjectTranslation>,
    processSteps: [
      {
        step: '01',
        phase: 'YAPISAL KEŞİF & IZGARA MİMARİSİ',
        title: 'NEYİN NEREYE GİDECEĞİNİ ÇÖZMEK',
        description: 'Herhangi bir stile dokunmadan önce gerçek yapıyı çözerim, ne içerik var, nasıl gruplanıyor, ızgara neyi taşımak zorunda.',
        deliverables: ['Mekansal Yerleşim Planı', 'Tipografi Ölçek Matrisi', 'Etkileşimli İskelet Akışı']
      },
      {
        step: '02',
        phase: 'DOKUNSAL HAREKET & ETKİLEŞİM FİZİĞİ',
        title: 'HAREKETİ DOĞRU HİSSETTİRMEK',
        description: 'Dürüst olmak gerekirse en çok burada vakit geçiriyorum, hareketleri artık animasyon gibi değil, tepki gibi hissettirene kadar ayarlıyorum.',
        deliverables: ['Framer Motion Prototipleri', 'Three.js Mekansal Test Alanları', 'Mikro Etkileşim Eğrileri']
      },
      {
        step: '03',
        phase: 'YÜKSEK DOĞRULUKLU YÜZEY & TASARIM SİSTEMLERİ',
        title: 'BİR ŞEYE BENZETMEK',
        description: 'Tipografi, renk, boşluk, gerçek görsel katman, zaten kendi başına çalışan bir yapının üzerine ekleniyor.',
        deliverables: ['Figma Tasarım Sistemi', 'WCAG AAA Renk Belirteçleri', 'Editöryal Görsel Yönelim']
      },
      {
        step: '04',
        phase: 'KREATİF ÖN YÜZ & 120 FPS ÜRETİM',
        title: 'TAKILMADAN ÇALIŞAN BİR ŞEY ÇIKARMAK',
        description: 'Tasarımı gerçek koda çevirmek ve yayına girdiğinde de hızlı kalmasını sağlamak, sadece demoda değil.',
        deliverables: ['Canlı Web Mimarisi', 'Takılmasız 120 FPS Akıcılık', 'Otomatik CI/CD Dağıtımı']
      }
    ] as ProcessStepTranslation[],
    manifesto: [
      { title: '01. HANGİ EKRANDAYSA ONA GÖRE', text: 'Telefon ile monitör aynı tuval değil. Tarayıcının gerçekten verdiğine göre tasarlıyorum, olmasını istediğim sabit bir çerçeveye göre değil.' },
      { title: '02. DÜRÜST OLANA KADAR KIRP', text: 'Bir işe yaramayan bir parça varsa gider. Önemli olan üç şeyi, önemsiz on şeye tercih ederim.' },
      { title: '03. ETKİLEŞİMLER BİR ŞEY HİSSETTİRMELİ', text: 'Hover, scroll, tıklama, bunlar sadece teknik olarak doğru değil, fiziksel gibi hissettiren bir şekilde yanıt vermeli.' },
      { title: '04. YAVAŞLIK BİR HATADIR', text: 'Bir şey yavaş hissettiriyorsa bu sonra bakılacak ufak bir detay değil, önce düzelttiğim şeydir.' }
    ],
    materialSpecimens: [
      {
        id: 'honed-slate',
        name: 'HONED BASALT & SLATE',
        description: 'Yüksek kontrastlı dijital galeriler ve lüks editoryal sunumlar için tasarlanmış soğuk, mat taş yüzey. Parıltıyı emerek tipografiyi ve mekansal hiyerarşiyi yükseltir.',
        surfaceTexture: 'Jilet keskinliğinde 1px kenarlık çizgileriyle ince mat doku'
      },
      {
        id: 'bone-titanium',
        name: 'BONE WHITE & TITANIUM',
        description: 'Yüksek parlaklıkta monokrom mimari yüzey. Galeri düzeyinde negatif alan yaratarak tüm görsel odağı kusursuz tipografiye ve etkileşimli medyaya yönlendirir.',
        surfaceTexture: 'Hassas mikro gölgelerle ipeksi pürüzsüz mineral kaplama'
      },
      {
        id: 'obsidian-glass',
        name: 'FROSTED OBSIDIAN ACRYLIC',
        description: 'Tipografik okunabilirlikten veya kare hızından ödün vermeden atmosferik derinlik yaratan yarı şeffaf monolitik paneller.',
        surfaceTexture: 'Yüksek frekanslı kenar yansımalarıyla hafif buzlu parlaklık'
      },
      {
        id: 'wireframe-grid',
        name: 'REBAR CAD BLUEPRINT',
        description: 'Yapısal yerleşim koordinatlarını, taban çizgisi ızgaralarını ve sınır vektörlerini açığa çıkaran teknik tel kafes plan yüzeyi.',
        surfaceTexture: 'Işıltılı vektör kesişimleriyle geometrik ortogonal ızgara'
      }
    ] as MaterialSpecimenTranslation[]
  }
};
