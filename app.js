/* =========================================
   LANGUAGE SYSTEM
   ========================================= */
let lang = 'es';

const typewriterWords = {
  es: ['Análisis de Datos', 'Business Intelligence', 'Gestión Operativa', 'Liderazgo de Equipos'],
  en: ['Data Analysis', 'Business Intelligence', 'Operations Management', 'Team Leadership']
};

function setLang(newLang) {
  lang = newLang;
  document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  const btn = document.getElementById('langBtn');
  btn.textContent = lang === 'es' ? 'EN' : 'ES';

  document.querySelectorAll('[data-es]').forEach(el => {
    const key = lang === 'es' ? 'es' : 'en';
    if (el.dataset[key]) el.textContent = el.dataset[key];
  });

  document.querySelectorAll('[data-es-ph]').forEach(el => {
    el.placeholder = lang === 'es' ? el.dataset['esPh'] : el.dataset['enPh'];
  });

  resetTypewriter();
  updateChatSuggestions();
}

document.getElementById('langBtn').addEventListener('click', () => {
  setLang(lang === 'es' ? 'en' : 'es');
});

/* =========================================
   TYPEWRITER
   ========================================= */
let twIndex = 0;
let twCharIndex = 0;
let twDeleting = false;
let twTimer = null;

function typeLoop() {
  const el = document.getElementById('typewriter');
  const words = typewriterWords[lang];
  const word = words[twIndex % words.length];

  if (!twDeleting) {
    el.textContent = word.slice(0, ++twCharIndex);
    if (twCharIndex === word.length) {
      twDeleting = true;
      twTimer = setTimeout(typeLoop, 2200);
      return;
    }
    twTimer = setTimeout(typeLoop, 70);
  } else {
    el.textContent = word.slice(0, --twCharIndex);
    if (twCharIndex === 0) {
      twDeleting = false;
      twIndex++;
      twTimer = setTimeout(typeLoop, 400);
      return;
    }
    twTimer = setTimeout(typeLoop, 38);
  }
}

function resetTypewriter() {
  clearTimeout(twTimer);
  twCharIndex = 0;
  twDeleting = false;
  document.getElementById('typewriter').textContent = '';
  twTimer = setTimeout(typeLoop, 300);
}

typeLoop();

/* =========================================
   SCROLL REVEAL
   ========================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================
   SKILL BARS
   ========================================= */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sbar-fill').forEach(fill => {
        const p = fill.dataset.p;
        fill.style.width = p + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

/* =========================================
   STICKY NAV
   ========================================= */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.background = window.scrollY > 20
    ? 'rgba(7,12,24,0.95)'
    : 'rgba(7,12,24,0.8)';
});

/* =========================================
   MOBILE NAV
   ========================================= */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.nm-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* =========================================
   CHAT Q&A DATA
   ========================================= */
const qa = [
  {
    keys: ['hola', 'hello', 'hi', 'hey', 'buenas', 'buenos', 'saludos', 'ola'],
    es: '¡Hola! Soy el asistente de Luis Angel. Puedo contarte sobre su experiencia, habilidades, certificaciones o cómo contactarle. ¿Qué te gustaría saber?',
    en: 'Hello! I\'m Luis Angel\'s assistant. I can tell you about his experience, skills, certifications or how to contact him. What would you like to know?'
  },
  {
    keys: ['quien', 'who', 'presentate', 'eres', 'es luis', 'about you', 'cuéntame de ti', 'cuentame'],
    es: 'Luis Angel Rojas Chacon es un Analista de Datos con +5 años de experiencia en gestión operativa y análisis de negocios.\n\nActualmente en Cantabria, España. Combina dominio técnico en Power BI, SQL y Python con experiencia real liderando equipos en entornos de alta demanda.\n\nBilingüe: español nativo + inglés fluido.',
    en: 'Luis Angel Rojas Chacon is a Data Analyst with +5 years of experience in operational management and business analysis.\n\nCurrently based in Cantabria, Spain. He combines technical mastery in Power BI, SQL and Python with real experience leading teams in high-demand environments.\n\nBilingual: native Spanish + fluent English.'
  },
  {
    keys: ['experiencia', 'experience', 'trabajos', 'work', 'trayectoria', 'career', 'empresas', 'companies', 'trabajado'],
    es: 'Su trayectoria profesional:\n\n• KFC Santander (2019-2025) — Gerente de Tienda durante 6 años. Análisis de ventas, gestión de equipos y control operativo.\n\n• Administrador de Propiedades (2016-2019) — Ecuador. Gestión integral de residencias.\n\n• Técnico Forestal (2025-2026) — Liébana, Cantabria. Formación técnica especializada.',
    en: 'His professional career:\n\n• KFC Santander (2019-2025) — Store Manager for 6 years. Sales analysis, team management and operational control.\n\n• Property Administrator (2016-2019) — Ecuador. Full residential management.\n\n• Forestry Technician (2025-2026) — Liébana, Cantabria. Specialized technical training.'
  },
  {
    keys: ['kfc', 'gerente', 'manager', 'restaurante', 'restaurant', 'santander', 'fast food'],
    es: 'En KFC Santander (2019–2025), Luis Angel fue Gerente de Tienda durante 6 años. Sus logros clave:\n\n📈 +15% en ventas de productos clave\n⚡ +10% mejora en eficiencia operativa\n👥 People Manager: horarios, altas/bajas, formación\n📦 Product/Facility: inventarios, trazabilidad, PCA\n🤝 Alianzas con comercios locales para visibilidad',
    en: 'At KFC Santander (2019–2025), Luis Angel was Store Manager for 6 years. Key achievements:\n\n📈 +15% in key product sales\n⚡ +10% operational efficiency improvement\n👥 People Manager: scheduling, onboarding, training\n📦 Product/Facility: inventory, traceability, PCA\n🤝 Partnerships with local businesses for visibility'
  },
  {
    keys: ['habilidades', 'skills', 'herramientas', 'tools', 'stack', 'tecnolog', 'sabe', 'domina', 'knows'],
    es: 'Stack técnico de Luis Angel:\n\n📊 Business Intelligence: Power BI, Looker, Google Sheets\n🗄️ Datos: Excel Avanzado, SQL, Python\n🔧 Software: Salesforce, Microsoft Office, Adobe Photoshop\n☁️ Cloud: Google Cloud (certificado)\n👥 Gestión: Liderazgo de equipos, gestión operativa',
    en: 'Luis Angel\'s technical stack:\n\n📊 Business Intelligence: Power BI, Looker, Google Sheets\n🗄️ Data: Advanced Excel, SQL, Python\n🔧 Software: Salesforce, Microsoft Office, Adobe Photoshop\n☁️ Cloud: Google Cloud (certified)\n👥 Management: Team leadership, operational management'
  },
  {
    keys: ['certificac', 'certif', 'cursos', 'courses', 'formacion', 'formación', 'estudios', 'education', 'titulac'],
    es: 'Certificaciones y formación:\n\n☁️ Google Cloud — Fundamentos de la Computación\n📊 Google Cloud — Analista de Datos\n🦄 Unicorn Academy — Data Analyst (Excel, PowerBI, Looker, Python, SQL)\n📋 Aspasia — Administración y Gestión Nivel 1\n🎓 Colegio Virgen del Valle — Bachillerato\n🌐 Universidad de los Andes — Idiomas Extranjeros',
    en: 'Certifications and education:\n\n☁️ Google Cloud — Computing Fundamentals\n📊 Google Cloud — Data Analyst\n🦄 Unicorn Academy — Data Analyst (Excel, PowerBI, Looker, Python, SQL)\n📋 Aspasia — Administration & Management Level 1\n🎓 Colegio Virgen del Valle — High School\n🌐 Universidad de los Andes — Foreign Languages'
  },
  {
    keys: ['contacto', 'contact', 'email', 'correo', 'telefon', 'phone', 'linkedin', 'escribir', 'reach', 'contratar', 'hire'],
    es: 'Puedes contactar a Luis Angel por:\n\n📧 rojasluisangel5@gmail.com\n📱 +34 624 235 446\n💼 LinkedIn: Luis Angel Rojas Chacon\n\nEstá abierto a nuevas oportunidades en análisis de datos, BI y gestión de operaciones.',
    en: 'You can contact Luis Angel via:\n\n📧 rojasluisangel5@gmail.com\n📱 +34 624 235 446\n💼 LinkedIn: Luis Angel Rojas Chacon\n\nHe is open to new opportunities in data analysis, BI and operations management.'
  },
  {
    keys: ['idioma', 'language', 'ingles', 'english', 'español', 'spanish', 'habla', 'speak', 'bilingue'],
    es: 'Luis Angel habla:\n\n🇪🇸 Español — Nativo\n🇬🇧 Inglés — Fluido (Fluent in English)\n\nPuede trabajar cómodamente en entornos internacionales.',
    en: 'Luis Angel speaks:\n\n🇪🇸 Spanish — Native\n🇬🇧 English — Fluent\n\nHe can work comfortably in international environments.'
  },
  {
    keys: ['ubicac', 'location', 'donde', 'where', 'ciudad', 'city', 'vive', 'reside', 'cantabria', 'españa', 'spain', 'ecuador'],
    es: 'Luis Angel reside actualmente en Cantabria, España.\n\nNació en Ecuador y lleva años en el norte de España, lo que le ha dado una perspectiva cultural amplia y adaptabilidad en diferentes entornos profesionales.',
    en: 'Luis Angel currently resides in Cantabria, Spain.\n\nBorn in Ecuador, he has lived in northern Spain for years, which has given him a broad cultural perspective and adaptability in different professional environments.'
  },
  {
    keys: ['disponible', 'available', 'buscando trabajo', 'looking for', 'oportunidad', 'opportunity', 'oferta', 'job offer'],
    es: '¡Sí! Luis Angel está disponible para nuevas oportunidades en:\n\n• Analista de Datos / Data Analyst\n• Business Intelligence\n• Gestión de Operaciones\n• People & Operations Manager\n\n¿Te interesa? Escríbele a rojasluisangel5@gmail.com',
    en: 'Yes! Luis Angel is available for new opportunities in:\n\n• Data Analyst\n• Business Intelligence\n• Operations Management\n• People & Operations Manager\n\nInterested? Reach out at rojasluisangel5@gmail.com'
  },
  {
    keys: ['logros', 'achievements', 'resultados', 'results', 'impacto', 'impact', 'éxitos', 'exitos'],
    es: 'Logros destacados de Luis Angel:\n\n📈 +15% en ventas de productos clave (KFC)\n⚡ +10% mejora en eficiencia operativa\n👥 Gestión de equipos de 20+ personas\n📊 Implementación de análisis de datos para decisiones estratégicas\n🤝 Creación de alianzas comerciales locales\n☁️ Certificado por Google Cloud en Análisis de Datos',
    en: 'Luis Angel\'s key achievements:\n\n📈 +15% in key product sales (KFC)\n⚡ +10% operational efficiency improvement\n👥 Managed teams of 20+ people\n📊 Implemented data analysis for strategic decisions\n🤝 Created local commercial partnerships\n☁️ Google Cloud certified in Data Analysis'
  },
  {
    keys: ['power bi', 'powerbi', 'dashboard', 'visualizacion', 'visualization', 'looker', 'bi'],
    es: 'Luis Angel tiene sólidas habilidades en Business Intelligence:\n\n📊 Power BI (85%) — creación de dashboards e informes interactivos\n📈 Looker (70%) — análisis y reportes avanzados\n📋 Google Sheets (90%) — análisis y automatización\n\nCertificado como Analista de Datos por Google Cloud y Unicorn Academy.',
    en: 'Luis Angel has solid Business Intelligence skills:\n\n📊 Power BI (85%) — dashboard and interactive report creation\n📈 Looker (70%) — advanced analytics and reporting\n📋 Google Sheets (90%) — analysis and automation\n\nCertified as Data Analyst by Google Cloud and Unicorn Academy.'
  },
  {
    keys: ['proyecto', 'project', 'bot', 'trading', 'agente', 'agent', 'claude', 'construido', 'built', 'bybit', 'ml', 'machine learning', 'marketing', 'casa angel', 'casangel', 'restaurante', 'restaurant'],
    es: 'Luis Angel ha construido 3 proyectos reales con Claude Code:\n\n🤖 Bot de Trading Algorítmico v5.0\n25+ agentes IA en Python, desplegado en Oracle Cloud. ML (AUC=0.7645), trading real en Bybit.\n\n🍽️ Casa Ángel — Lo del Pibe\nSistema completo para restaurante en Potes, Cantabria: web editorial, panel de admin con pedidos y reservas en tiempo real, menú QR y Google Apps Script.\n\n🏢 Agencia de Marketing\nApp full-stack con Next.js, TypeScript y Prisma ORM.',
    en: 'Luis Angel has built 3 real projects with Claude Code:\n\n🤖 Algorithmic Trading Bot v5.0\n25+ AI agents in Python, deployed on Oracle Cloud. ML (AUC=0.7645), real Bybit trading.\n\n🍽️ Casa Ángel — Lo del Pibe\nFull system for a restaurant in Potes, Cantabria: editorial website, admin panel with real-time orders and reservations, QR menu and Google Apps Script.\n\n🏢 Marketing Agency\nFull-stack app with Next.js, TypeScript and Prisma ORM.'
  },
  {
    keys: ['cv', 'curriculum', 'descargar', 'download', 'pdf', 'documento'],
    es: 'Puedes descargar el CV completo de Luis Angel directamente desde esta web.\n\n📄 Hay un botón "Descargar CV" en la parte superior (hero) y también en la sección de contacto al final de la página.\n\nSe descarga como PDF con toda su experiencia, habilidades y certificaciones.',
    en: 'You can download Luis Angel\'s full CV directly from this website.\n\n📄 There is a "Download CV" button at the top (hero) and also in the contact section at the bottom of the page.\n\nIt downloads as a PDF with all his experience, skills and certifications.'
  },
  {
    keys: ['qué es esta web', 'que es esta web', 'what is this', 'cómo funciona', 'como funciona', 'web', 'página', 'pagina', 'agente'],
    es: 'Esta es la web-agente personal de Luis Angel 🤖\n\nEn lugar de un CV estático, es una experiencia interactiva donde puedes:\n\n• Hablar con este asistente y preguntarme lo que quieras\n• Ver su experiencia, proyectos y habilidades\n• Descargar su CV en PDF\n• Contactarle directamente\n\nFue construida con Claude Code y desplegada en GitHub Pages.',
    en: 'This is Luis Angel\'s personal web-agent 🤖\n\nInstead of a static CV, it\'s an interactive experience where you can:\n\n• Chat with this assistant and ask anything\n• View his experience, projects and skills\n• Download his CV as PDF\n• Contact him directly\n\nBuilt with Claude Code and deployed on GitHub Pages.'
  },
  {
    keys: ['claude', 'claude code', 'anthropic', 'ia', 'inteligencia artificial', 'artificial intelligence'],
    es: 'Claude Code es la herramienta de IA de Anthropic con la que Luis Angel construye sus proyectos.\n\nCon ella ha creado:\n🤖 Un bot de trading con 25+ agentes IA\n🍽️ Un sistema completo para un restaurante\n🏢 Una plataforma web para agencia de marketing\n🌐 Esta misma web que estás viendo\n\nEs una de sus habilidades diferenciadoras: sabe construir soluciones reales con IA.',
    en: 'Claude Code is Anthropic\'s AI tool that Luis Angel uses to build his projects.\n\nWith it he has built:\n🤖 A trading bot with 25+ AI agents\n🍽️ A complete system for a restaurant\n🏢 A web platform for a marketing agency\n🌐 This very website you\'re looking at\n\nIt\'s one of his differentiating skills: he knows how to build real solutions with AI.'
  },
  {
    keys: ['python', 'sql', 'programac', 'programm', 'codigo', 'code'],
    es: 'En programación y datos:\n\n🐍 Python (60%) — análisis estadístico y automatización\n🗄️ SQL (75%) — consultas y gestión de bases de datos\n📊 Excel Avanzado (92%) — modelado y análisis de datos\n\nFormado en Unicorn Academy con enfoque práctico en herramientas de data analysis.',
    en: 'In programming and data:\n\n🐍 Python (60%) — statistical analysis and automation\n🗄️ SQL (75%) — queries and database management\n📊 Advanced Excel (92%) — data modeling and analysis\n\nTrained at Unicorn Academy with a practical focus on data analysis tools.'
  }
];

const suggestions = {
  es: ['¿Quién es Luis Angel?', '¿Qué proyectos ha hecho?', '¿Qué habilidades tiene?', '¿Cómo contactarle?', '¿Está disponible?'],
  en: ['Who is Luis Angel?', 'What projects has he built?', 'What are his skills?', 'How to contact him?', 'Is he available?']
};

/* =========================================
   CHAT ENGINE
   ========================================= */
let chatOpen = false;

function openChat() {
  chatOpen = true;
  const panel = document.getElementById('chatPanel');
  const fab = document.getElementById('fab');
  panel.classList.add('open');
  fab.classList.add('open');
  fab.querySelector('.fab-ping').style.display = 'none';

  const msgs = document.getElementById('cpMsgs');
  if (msgs.children.length === 0) {
    const greeting = lang === 'es'
      ? '¡Hola! Soy el asistente de Luis Angel 👋\n\nPuedo contarte sobre su experiencia, habilidades o cómo contactarle. ¿En qué puedo ayudarte?'
      : "Hello! I'm Luis Angel's assistant 👋\n\nI can tell you about his experience, skills or how to contact him. How can I help you?";
    addBotMessage(greeting);
    updateChatSuggestions();
  }

  setTimeout(() => document.getElementById('cpInput').focus(), 350);
}

function closeChat() {
  chatOpen = false;
  document.getElementById('chatPanel').classList.remove('open');
  document.getElementById('fab').classList.remove('open');
}

function toggleChat() {
  chatOpen ? closeChat() : openChat();
}

function addUserMessage(text) {
  const msgs = document.getElementById('cpMsgs');
  const div = document.createElement('div');
  div.className = 'msg msg--user';
  div.innerHTML = `<div class="msg-bubble">${escHtml(text)}</div>`;
  msgs.appendChild(div);
  scrollMsgs();
}

function addBotMessage(text) {
  const msgs = document.getElementById('cpMsgs');
  const div = document.createElement('div');
  div.className = 'msg msg--bot';
  div.innerHTML = `<div class="msg-bubble"></div>`;
  msgs.appendChild(div);
  scrollMsgs();

  const bubble = div.querySelector('.msg-bubble');
  let i = 0;
  const speed = 18;
  const tick = () => {
    if (i < text.length) {
      bubble.textContent += text[i++];
      scrollMsgs();
      setTimeout(tick, speed);
    }
  };
  tick();
  return div;
}

function addTypingIndicator() {
  const msgs = document.getElementById('cpMsgs');
  const div = document.createElement('div');
  div.className = 'msg msg--bot';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-bubble msg-typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  msgs.appendChild(div);
  scrollMsgs();
}

function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function scrollMsgs() {
  const msgs = document.getElementById('cpMsgs');
  msgs.scrollTop = msgs.scrollHeight;
}

function updateChatSuggestions() {
  const container = document.getElementById('cpSuggs');
  container.innerHTML = '';
  const msgs = document.getElementById('cpMsgs');
  if (msgs.children.length > 2) return;

  suggestions[lang].slice(0, 4).forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'sugg';
    btn.textContent = s;
    btn.onclick = () => {
      container.innerHTML = '';
      processMessage(s);
    };
    container.appendChild(btn);
  });
}

function getBotResponse(input) {
  const lower = input.toLowerCase();
  for (const item of qa) {
    if (item.keys.some(k => lower.includes(k))) {
      return lang === 'es' ? item.es : item.en;
    }
  }
  return lang === 'es'
    ? 'Puedo contarte sobre la experiencia, habilidades, certificaciones o formas de contactar a Luis Angel. ¿Qué te gustaría saber?'
    : 'I can tell you about Luis Angel\'s experience, skills, certifications or contact info. What would you like to know?';
}

function processMessage(text) {
  if (!text.trim()) return;
  document.getElementById('cpSuggs').innerHTML = '';
  addUserMessage(text);

  const delay = 700 + Math.random() * 500;
  addTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(text);
    addBotMessage(response);
  }, delay);
}

function sendChat() {
  const input = document.getElementById('cpInput');
  const val = input.value.trim();
  if (!val) return;
  input.value = '';
  processMessage(val);
}

function handleKey(e) {
  if (e.key === 'Enter') sendChat();
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* =========================================
   SMOOTH ANCHOR SCROLL
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
