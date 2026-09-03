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
      bio: 'I design and craft refined, tactile web experiences. Rooted in brutalist minimalism, razor typography, and 120 FPS interactive engineering.',
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
      desc: 'A disciplined four-phase creative pipeline that balances brutalist aesthetic restraint with rigorous frontend engineering.',
      stage: 'STAGE',
    },
    about: {
      level: 'LEVEL 03 // ABOUT & MANIFESTO',
      phase: 'TWILIGHT DUSK // EVENING SKY',
      title: 'ABOUT',
      specimensTitle: 'DIGITAL SURFACE SPECIMENS',
    },
    dispatch: {
      level: 'LEVEL 04 // CONTACT & DISPATCH',
      phase: 'NOCTURNAL NIGHT // PILLAR FOUNDATION',
      title: 'CONTACT',
      intro: 'The round concrete pillar anchors at the nocturnal foundation. Send inquiries or commissions directly to Enver Eren Tatlıdil.',
      formName: 'NAME / STUDIO',
      formNamePlaceholder: 'Your Name or Studio',
      formEmail: 'EMAIL COORDINATES',
      formEmailPlaceholder: 'name@domain.com',
      formScope: 'PROJECT SCOPE',
      formScopePlaceholder: 'Describe your project, timeline, and architectural vision...',
      btnTransmit: 'TRANSMIT DISPATCH',
      btnTransmitting: 'TRANSMITTING...',
      successTitle: 'TRANSMISSION RECEIVED',
      successDesc: 'I will review your message and reply via email coordinates within 24 hours.',
      btnSendAnother: 'Send another message',
      directDispatch: 'DIRECT COORDINATES',
      btnCopy: 'COPY EMAIL',
      copied: 'COPIED TO CLIPBOARD',
      coordinates: 'COORDINATES',
      locationVal: 'ISTANBUL // 41°00\'49"N  28°57\'18"E',
      statusLabel: 'COMMISSION STATUS',
      statusVal: 'NOW SCHEDULING SELECT COMMISSIONS FOR 2025/2026',
    },
    footer: {
      portfolioTag: 'PORTFOLIO',
      subline: 'CREATIVE WEB DESIGN, INTERACTION ARCHITECTURE & DIGITAL INTERFACES',
      systemFps: 'SYSTEM: 120 FPS FLUID',
      designQuality: 'DESIGN QUALITY: 100%',
      returnTop: 'RETURN TO TOP',
      copyright: 'DESIGN SPEC: BRUTALIST LUXURY // COPYRIGHT',
      editHint: 'EDIT CONTENT IN:',
    },
    projects: {
      'aura-flagship': {
        title: 'AURA LUXURY DIGITAL FLAGSHIP',
        shortDesc: 'Bespoke e-commerce web design featuring real-time 3D interactive garment staging and architectural typography.',
        fullDesc: 'AURA redefines high-fashion digital retail through the lens of architectural brutalism. Stripping away conventional card carousels, the experience presents garments as monolithic gallery sculptures with real-time WebGL material draping, custom magnetic cursor ergonomics, and fluid layout morphing.',
        structuralSpecs: [
          { label: 'FRAME BUDGET', value: '120 FPS OPTIMIZED' },
          { label: 'TYPOGRAPHY', value: 'EDITORIAL SERIF + MONO' },
          { label: '3D ENGINE', value: 'THREE.JS + CUSTOM GLSL' },
          { label: 'CONVERSION', value: '+34% ENGAGEMENT TIME' }
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
        title: 'DISSECTING CONTENT & SPATIAL HIERARCHY',
        description: 'Before any styling begins, I construct the mathematical layout foundation: column rhythms, baseline typography grids, and disciplined negative space.',
        deliverables: ['Spatial Layout Blueprint', 'Typography Scale Matrix', 'Interactive Wireframe Flow']
      },
      {
        step: '02',
        phase: 'TACTILE MOTION & INTERACTION PHYSICS',
        title: 'CALIBRATING PHYSICAL DIGITAL ERGONOMICS',
        description: 'Defining the mechanical feel of the interface: spring stiffness, cursor damping, acoustic cues, and smooth viewport transitions that provide physical feedback.',
        deliverables: ['Framer Motion Prototypes', 'Three.js Spatial Sandboxes', 'Micro-Interaction Curves']
      },
      {
        step: '03',
        phase: 'HIGH-FIDELITY SURFACE & DESIGN SYSTEMS',
        title: 'SCULPTING REFINED VISUAL SURFACES',
        description: 'Applying refined brutalist aesthetics: cold obsidian/slate palettes, razor 1px borders, pristine typography, and tokenized design systems.',
        deliverables: ['Figma Design System', 'WCAG AAA Color Tokens', 'Editorial Visual Direction']
      },
      {
        step: '04',
        phase: 'CREATIVE FRONTEND & 120 FPS PRODUCTION',
        title: 'ROCK-SOLID PRODUCTION ENGINEERING',
        description: 'Translating design into uncompromising, fluid code using React 19, Three.js, and modern CSS. Zero layout shifts and sub-100ms response times.',
        deliverables: ['Production Web Architecture', 'Zero-Jank 120 FPS Pacing', 'Automated CI/CD Deployment']
      }
    ] as ProcessStepTranslation[],
    manifesto: [
      { title: '01. HONESTY OF DIGITAL MEDIUM', text: 'The web is not paper or billboard. We embrace resolution independence, fluid aspect ratios, and raw code integrity.' },
      { title: '02. REFINED MINIMALISM', text: 'Stripping away decorative vanity to reveal structural typography, deliberate negative space, and disciplined layout grids.' },
      { title: '03. TACTILE MICRO-INTERACTIONS', text: 'Every hover, scroll displacement, and press must convey physical weight and visceral responsive feedback.' },
      { title: '04. PERFORMANCE AS LUXURY', text: 'True elegance is instantaneous response. 60-120 FPS frame pacing, zero layout shifts, and lightweight assets.' }
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
      bio: 'Rafine, dokunsal web deneyimleri tasarlıyor ve üretiyorum. Brutalist minimalizm, jilet keskinliğinde tipografi ve 120 FPS etkileşim mühendisliğiyle temellendirilmiş.',
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
      desc: 'Brutalist estetik sadeliği titiz ön yüz mühendisliğiyle kusursuz biçimde dengeleyen dört aşamalı yaratıcı süreç.',
      stage: 'AŞAMA',
    },
    about: {
      level: 'KAT 03 // HAKKINDA & MANİFESTO',
      phase: 'ALACAKARANLIK // AKŞAM GÖKYÜZÜ',
      title: 'HAKKIMDA',
      specimensTitle: 'DİJİTAL YÜZEY NUMUNELERİ',
    },
    dispatch: {
      level: 'KAT 04 // İLETİŞİM & MESAJ',
      phase: 'GECE KARANLIĞI // SÜTUN TEMELİ',
      title: 'İLETİŞİM',
      intro: 'Yuvarlak beton sütun gece temelinde sonlanıyor. Proje teklifi veya iş birliği taleplerinizi doğrudan Enver Eren Tatlıdil\'e iletin.',
      formName: 'İSİM / STÜDYO',
      formNamePlaceholder: 'İsminiz veya Stüdyonuz',
      formEmail: 'E-POSTA ADRESİ',
      formEmailPlaceholder: 'isim@alanadi.com',
      formScope: 'PROJE KAPSAMI',
      formScopePlaceholder: 'Projenizi, takviminizi ve mimari vizyonunuzu anlatın...',
      btnTransmit: 'MESAJI GÖNDER',
      btnTransmitting: 'İLETİLİYOR...',
      successTitle: 'MESAJINIZ ALINDI',
      successDesc: 'Mesajınızı detaylıca inceleyip 24 saat içerisinde e-posta adresinize dönüş yapacağım.',
      btnSendAnother: 'Yeni bir mesaj gönder',
      directDispatch: 'DOĞRUDAN İLETİŞİM',
      btnCopy: 'E-POSTAYI KOPYALA',
      copied: 'PANONUA KOPYALANDI',
      coordinates: 'KONUM BİLGİSİ',
      locationVal: 'İSTANBUL // 41°00\'49"K  28°57\'18"D',
      statusLabel: 'PROJE DURUMU',
      statusVal: '2025/2026 İÇİN SEÇKİN PROJE TALEPLERİ KABUL EDİLİYOR',
    },
    footer: {
      portfolioTag: 'PORTFOLYO',
      subline: 'KREATİF WEB TASARIMI, ETKİLEŞİM MİMARİSİ VE DİJİTAL ARAYÜZLER',
      systemFps: 'SİSTEM: 120 FPS AKICI',
      designQuality: 'TASARIM KALİTESİ: %100',
      returnTop: 'BAŞA DÖN',
      copyright: 'TASARIM: BRUTALİST LÜKS // TÜM HAKLARI SAKLIDIR',
      editHint: 'İÇERİK DÜZENLEME:',
    },
    projects: {
      'aura-flagship': {
        title: 'AURA LÜKS DİJİTAL MAĞAZA',
        shortDesc: 'Gerçek zamanlı 3D etkileşimli ürün sergileme ve mimari tipografi sunan özel e-ticaret web tasarımı.',
        fullDesc: 'AURA, yüksek moda dijital perakendeciliğini mimari brutalizm perspektifinden yeniden tanımlıyor. Klasik kart kaydırıcılarını terk eden deneyim, ürünleri gerçek zamanlı WebGL kumaş simülasyonu, manyetik imleç ergonomisi ve akışkan yerleşim dönüşümleriyle anıtsal galeri heykelleri olarak sergiler.',
        structuralSpecs: [
          { label: 'KARE HEDEFİ', value: '120 FPS OPTİMİZE' },
          { label: 'TİPOGRAFİ', value: 'EDİTÖRYAL SERİF + MONO' },
          { label: '3D MOTORU', value: 'THREE.JS + ÖZEL GLSL' },
          { label: 'DÖNÜŞÜM', value: '+%34 ETKİLEŞİM SÜRESİ' }
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
        title: 'İÇERİK ANALİZİ & MEKANSAL HİYERARŞİ',
        description: 'Herhangi bir görsel stil oluşturulmadan önce matematiksel yerleşim temeli kurulur: sütun ritimleri, taban çizgisi tipografi ızgaraları ve disiplinli negatif alan.',
        deliverables: ['Mekansal Yerleşim Planı', 'Tipografi Ölçek Matrisi', 'Etkileşimli İskelet Akışı']
      },
      {
        step: '02',
        phase: 'DOKUNSAL HAREKET & ETKİLEŞİM FİZİĞİ',
        title: 'FİZİKSEL DİJİTAL ERGONOMİ KALİBRASYONU',
        description: 'Arayüzün mekanik hissinin tanımlanması: yay sertliği, imleç sönümlemesi, akustik geri bildirimler ve fiziksel tepki veren akıcı görünüm alanı geçişleri.',
        deliverables: ['Framer Motion Prototipleri', 'Three.js Mekansal Test Alanları', 'Mikro Etkileşim Eğrileri']
      },
      {
        step: '03',
        phase: 'YÜKSEK DOĞRULUKLU YÜZEY & TASARIM SİSTEMLERİ',
        title: 'RAFİNE GÖRSEL YÜZEYLERİN ŞEKİLLENDİRİLMESİ',
        description: 'Rafine brutalist estetiğin uygulanması: soğuk obsidyen/arduvaz paletleri, 1 piksellik jilet kenarlıklar, kusursuz tipografi ve belirteç tabanlı tasarım sistemleri.',
        deliverables: ['Figma Tasarım Sistemi', 'WCAG AAA Renk Belirteçleri', 'Editöryal Görsel Yönelim']
      },
      {
        step: '04',
        phase: 'KREATİF ÖN YÜZ & 120 FPS ÜRETİM',
        title: 'KUSURSUZ VE SAĞLAM ÜRETİM MÜHENDİSLİĞİ',
        description: 'Tasarımın React 19, Three.js ve modern CSS kullanılarak tavizsiz, akıcı koda dönüştürülmesi. Sıfır yerleşim kayması ve 100ms altı yanıt süreleri.',
        deliverables: ['Canlı Web Mimarisi', 'Takılmasız 120 FPS Akıcılık', 'Otomatik CI/CD Dağıtımı']
      }
    ] as ProcessStepTranslation[],
    manifesto: [
      { title: '01. DİJİTAL ORTAMIN DÜRÜSTLÜĞÜ', text: 'Web bir kağıt veya afiş değildir. Çözünürlük bağımsızlığını, akışkan en-boy oranlarını ve yalın kod bütünlüğünü benimsiyoruz.' },
      { title: '02. RAFİNE MİNİMALİZM', text: 'Yapısal tipografiyi, bilinçli negatif alanı ve disiplinli yerleşim ızgaralarını ortaya çıkarmak için süsleyici fazlalıklardan arınıyoruz.' },
      { title: '03. DOKUNSAL MİKRO ETKİLEŞİMLER', text: 'Her üzerine gelme, kaydırma hareketi ve basma eylemi fiziksel bir ağırlık ve anında hissedilir yanıt vermelidir.' },
      { title: '04. BİR LÜKS OLARAK PERFORMANS', text: 'Gerçek zarafet anında yanıttır. 60-120 FPS kare akıcılığı, sıfır yerleşim kayması ve hafif varlık mimarisi.' }
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
