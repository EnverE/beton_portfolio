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
      title: 'SOFTWARE ENGINEER & CREATIVE WEB DESIGNER',
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
      locationVal: 'ISTANBUL // TÜRKİYE',
      statusLabel: 'COMMISSION STATUS',
      statusVal: 'OPEN TO NEW PROJECTS, LIMITED HOURS AROUND SCHOOL',
      errorGeneric: "Something didn't go through. Email me directly instead.",
      errorNotConfigured: 'Form is still being wired up. Email me directly for now.',
      btnOpenMailClient: 'LAUNCH EMAIL CLIENT WITH PRE-FILLED MESSAGE',
    },
    footer: {
      portfolioTag: 'PORTFOLIO',
      subline: "WEB, INTERACTION DESIGN, AND WHATEVER ELSE I'M BUILDING THIS WEEK",
      systemFps: 'SYSTEM: 120 FPS FLUID',
      designQuality: 'SOURCE: GITHUB // VIEW ONLY',
      returnTop: 'RETURN TO TOP',
      copyright: 'DESIGN SPEC: BRUTALIST LUXURY // COPYRIGHT',
      editHint: 'EDIT CONTENT IN:',
      legalBtn: 'LEGAL // PRIVACY & TERMS',
      legalTitle: 'LEGAL PROTOCOL & PRIVACY SPECIFICATION',
      legalPrivacyHeader: '01. DATA PRIVACY (GDPR & KVKK COMPLIANCE)',
      legalPrivacyBody: 'This portfolio operates with zero tracking cookies, zero marketing telemetry, and zero behavioral profiling. Any data submitted via the dispatch terminal (name, email, project scope) is collected solely on the lawful basis of answering project inquiries. Data is never sold, leased, or distributed to third parties. Inquiries are processed via Web3Forms and hosted on Vercel.',
      legalTermsHeader: '02. TERMS OF USE',
      legalTermsBody: 'Materials and interactive spatial environments are provided for professional evaluation, design review, and commission proposals. Interactive 3D graphics, motion tokens, and interface architecture are crafted by Enver Eren Tatlıdil.',
      legalIpHeader: '03. INTELLECTUAL PROPERTY',
      legalIpBody: 'This site, its source code, design, 3D monolithic models, and graphic compositions are © 2026 Enver Eren Tatlıdil. All rights reserved. The repository at github.com/EnverE/beton_portfolio is public to view as a work sample, but no license is granted to copy, reuse, or redistribute it.',
      legalContactHeader: '04. DATA DELETION REQUESTS',
      legalContactBody: 'To inspect or request deletion of any correspondence sent through this terminal, submit a request directly to tatlidil.eren@gmail.com.',
      legalDisclaimer: 'WRITTEN IN PLAIN TERMS, NOT A SUBSTITUTE FOR LEGAL ADVICE',
      legalClose: 'CLOSE SPECIFICATION [ESC]',
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
      'next-project': {
        title: 'YOU COULD BE NEXT',
        shortDesc: "Have an ambitious idea, a portfolio, or a product that deserves distinct motion and brutalist craft? Let's build it together.",
        fullDesc: "I'm currently taking on select web design and creative frontend commissions around my software engineering studies at METU. Whether you need a bespoke portfolio, an interactive 3D WebGL experience, or a production-grade web application built with React, Three.js, or GSAP — reach out directly. Send an email to tatlidil.eren@gmail.com, connect on LinkedIn, or drop a message below at the dispatch terminal.",
        structuralSpecs: [
          { label: 'AVAILABILITY', value: 'OPEN FOR COMMISSIONS' },
          { label: 'DIRECT EMAIL', value: 'tatlidil.eren@gmail.com' },
          { label: 'COLLABORATION', value: 'GLOBAL & REMOTE' },
          { label: 'RESPONSE TIME', value: '< 24-48 HOURS' }
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
      title: 'YAZILIM MÜHENDİSİ & KREATİF WEB TASARIMCISI',
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
      locationVal: 'İSTANBUL // TÜRKİYE',
      statusLabel: 'PROJE DURUMU',
      statusVal: 'YENİ PROJELERE AÇIĞIM, OKUL YÜZÜNDEN VAKTİM SINIRLI',
      errorGeneric: 'Bir şeyler ters gitti. Bunun yerine bana doğrudan e-posta at.',
      errorNotConfigured: 'Form henüz tam bağlanmadı. Şimdilik bana doğrudan e-posta at.',
      btnOpenMailClient: 'MESAJLA E-POSTA İSTEMCİSİNİ AÇ',
    },
    footer: {
      portfolioTag: 'PORTFOLYO',
      subline: 'WEB, ETKİLEŞİM TASARIMI VE O HAFTA NE ÜZERİNDE ÇALIŞIYORSAM',
      systemFps: 'SİSTEM: 120 FPS AKICI',
      designQuality: 'KAYNAK: GITHUB // SADECE GÖRÜNTÜLEME',
      returnTop: 'BAŞA DÖN',
      copyright: 'TASARIM: BRUTALİST LÜKS // TÜM HAKLARI SAKLIDIR',
      editHint: 'İÇERİK DÜZENLEME:',
      legalBtn: 'YASAL // GİZLİLİK VE KULLANIM KOŞULLARI',
      legalTitle: 'YASAL PROTOKOL VE GİZLİLİK ŞARTLARI',
      legalPrivacyHeader: '01. VERİ GİZLİLİĞİ (KVKK VE GDPR UYUMLULUĞU)',
      legalPrivacyBody: 'Bu portfolyo hiçbir takip çerezi (cookie), reklam telemetrisi veya davranışsal profil çıkarma aracı kullanmaz. İletişim terminali aracılığıyla iletilen bilgiler (isim, e-posta, proje kapsamı) yalnızca gelen taleplere yanıt vermek amacıyla meşru menfaat temelinde toplanır. Bilgileriniz asla satılmaz, üçüncü taraflarla paylaşılmaz veya ticari bültenlerde kullanılmaz. Mesajlar Web3Forms altyapısıyla iletilir, site Vercel üzerinde barındırılır.',
      legalTermsHeader: '02. KULLANIM KOŞULLARI',
      legalTermsBody: 'Sitedeki materyaller ve etkileşimli mekansal ortamlar; profesyonel inceleme, tasarım değerlendirmesi ve iş birliği teklifleri amacıyla sunulmaktadır. Etkileşimli 3D grafikler, hareket token\'ları ve arayüz mimarisi Enver Eren Tatlıdil tarafından geliştirilmiştir.',
      legalIpHeader: '03. FİKRİ MÜLKİYET',
      legalIpBody: 'Bu site, kaynak kodu, tasarımı, 3D monolitik modelleri ve grafik kompozisyonları © 2026 Enver Eren Tatlıdil\'e aittir. Tüm hakları saklıdır. github.com/EnverE/beton_portfolio adresindeki depo bir çalışma örneği olarak herkese açık şekilde görüntülenebilir, ancak kopyalama, yeniden kullanma veya dağıtma izni verilmemektedir.',
      legalContactHeader: '04. VERİ SİLME TALEPLERİ',
      legalContactBody: 'Bu site üzerinden ilettiğiniz herhangi bir yazışmanın incelenmesini veya silinmesini talep etmek için doğrudan tatlidil.eren@gmail.com adresine yazabilirsiniz.',
      legalDisclaimer: 'SADE BİR DİLLE YAZILMIŞTIR, HUKUKİ DANIŞMANLIĞIN YERİNE GEÇMEZ',
      legalClose: 'KAPAT [ESC]',
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
      'next-project': {
        title: 'SIRADAKİ SEN OLABİLİRSİN',
        shortDesc: 'Özgün bir hareket dilini ve brutalist özeni hak eden iddialı bir fikrin, portfolyon ya da ürünün mü var? Birlikte inşa edelim.',
        fullDesc: 'Şu anda ODTÜ\'deki yazılım mühendisliği derslerimin yanında seçkin web tasarımı ve yaratıcı ön yüz projeleri alıyorum. İster özel bir portfolyo, ister etkileşimli bir WebGL deneyimi, ister React, Three.js veya GSAP ile geliştirilmiş canlıya hazır bir web uygulaması olsun — doğrudan iletişime geçebilirsin. tatlidil.eren@gmail.com adresine e-posta gönderebilir, LinkedIn\'den yazabilir veya aşağıdaki iletişim terminalinden mesaj bırakabilirsin.',
        structuralSpecs: [
          { label: 'UYGUNLUK', value: 'YENİ PROJELERE AÇIK' },
          { label: 'DOĞRUDAN E-POSTA', value: 'tatlidil.eren@gmail.com' },
          { label: 'İŞ BİRLİĞİ', value: 'KÜRESEL & UZAKTAN' },
          { label: 'DÖNÜŞ SÜRESİ', value: '< 24-48 SAAT' }
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
