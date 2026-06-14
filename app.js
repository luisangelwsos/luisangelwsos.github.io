/* =========================================
   LANGUAGE SYSTEM
   ========================================= */
let lang = 'es';

const typewriterWords = {
  es: ['Sistemas con IA', 'Agentes Autónomos', 'Automatización', 'Análisis de Datos'],
  en: ['AI Systems', 'Autonomous Agents', 'Automation', 'Data Analysis']
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
   KPI COUNTER ANIMATION
   ========================================= */
const kpiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.kpi-count').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      kpiObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const kpiRow = document.querySelector('.kpi-row');
if (kpiRow) kpiObserver.observe(kpiRow);

/* =========================================
   CHAT Q&A DATA
   ========================================= */
const qa = [
  {
    keys: ['hola', 'hello', 'hi', 'hey', 'buenas', 'buenos', 'saludos', 'ola'],
    es: '¡Hola! Soy el asistente de Luis Angel. Puedo contarte sobre sus proyectos con IA, su empresa, su experiencia o cómo contactarle. ¿Qué te gustaría saber?',
    en: 'Hello! I\'m Luis Angel\'s assistant. I can tell you about his AI projects, his company, his experience or how to contact him. What would you like to know?'
  },
  {
    keys: ['quien', 'who', 'presentate', 'eres', 'es luis', 'about you', 'cuéntame de ti', 'cuentame'],
    es: 'Luis Angel Rojas Chacon es constructor de sistemas con IA y emprendedor, con base en Cantabria, España.\n\nDiseña y despliega sistemas multi-agente con Claude Code: CRMs, bots de trading y automatización de negocio. Es cofundador de C&C Liébana, una empresa de servicios forestales.\n\nSu base son +5 años liderando equipos y operaciones (KFC), lo que le da una perspectiva de negocio real al construir estos sistemas.\n\nBilingüe: español nativo + inglés fluido.',
    en: 'Luis Angel Rojas Chacon is an AI systems builder and entrepreneur based in Cantabria, Spain.\n\nHe designs and deploys multi-agent systems with Claude Code: CRMs, trading bots and business automation. He is co-founder of C&C Liébana, a forestry services company.\n\nHis foundation is +5 years leading teams and operations (KFC), which gives him a real business perspective when building these systems.\n\nBilingual: native Spanish + fluent English.'
  },
  {
    keys: ['experiencia', 'experience', 'trabajos', 'work', 'trayectoria', 'career', 'empresas', 'companies', 'trabajado'],
    es: 'Su trayectoria profesional:\n\n• Cofundador & Desarrollador — C&C Liébana (2026-presente). Empresa de servicios forestales en Cantabria; diseñó y desplegó su CRM con 6 agentes IA.\n\n• KFC Santander (2019-2025) — Gerente de Tienda durante 6 años. Análisis de ventas, gestión de equipos y control operativo.\n\n• Administrador de Propiedades (2016-2019) — Ecuador. Gestión integral de residencias.\n\n• Técnico Forestal (2025-2026) — Liébana, Cantabria. Formación técnica especializada.',
    en: 'His professional career:\n\n• Co-founder & Developer — C&C Liébana (2026-present). Forestry services company in Cantabria; designed and deployed its CRM with 6 AI agents.\n\n• KFC Santander (2019-2025) — Store Manager for 6 years. Sales analysis, team management and operational control.\n\n• Property Administrator (2016-2019) — Ecuador. Full residential management.\n\n• Forestry Technician (2025-2026) — Liébana, Cantabria. Specialized technical training.'
  },
  {
    keys: ['kfc', 'gerente', 'manager', 'restaurante', 'restaurant', 'santander', 'fast food'],
    es: 'En KFC Santander (2019–2025), Luis Angel fue Gerente de Tienda durante 6 años. Sus logros clave:\n\n📈 +15% en ventas de productos clave\n⚡ +10% mejora en eficiencia operativa\n👥 People Manager: horarios, altas/bajas, formación\n📦 Product/Facility: inventarios, trazabilidad, PCA\n🤝 Alianzas con comercios locales para visibilidad',
    en: 'At KFC Santander (2019–2025), Luis Angel was Store Manager for 6 years. Key achievements:\n\n📈 +15% in key product sales\n⚡ +10% operational efficiency improvement\n👥 People Manager: scheduling, onboarding, training\n📦 Product/Facility: inventory, traceability, PCA\n🤝 Partnerships with local businesses for visibility'
  },
  {
    keys: ['habilidades', 'skills', 'herramientas', 'tools', 'stack', 'tecnolog', 'sabe', 'domina', 'knows'],
    es: 'Stack técnico de Luis Angel:\n\n🧩 IA & Agentes: Claude Code, arquitectura multi-agente, prompt engineering\n🗄️ Datos & Programación: Python, SQL, Excel Avanzado\n☁️ Cloud & Deploy: Cloudflare Workers + D1, FastAPI, GitHub Pages\n📊 Business Intelligence: Power BI, Looker, Google Sheets\n👥 Gestión: Liderazgo de equipos, gestión operativa',
    en: 'Luis Angel\'s technical stack:\n\n🧩 AI & Agents: Claude Code, multi-agent architecture, prompt engineering\n🗄️ Data & Programming: Python, SQL, Advanced Excel\n☁️ Cloud & Deploy: Cloudflare Workers + D1, FastAPI, GitHub Pages\n📊 Business Intelligence: Power BI, Looker, Google Sheets\n👥 Management: Team leadership, operations management'
  },
  {
    keys: ['certificac', 'certif', 'cursos', 'courses', 'formacion', 'formación', 'estudios', 'education', 'titulac'],
    es: 'Certificaciones y formación:\n\n☁️ Google Cloud — Fundamentos de la Computación\n📊 Google Cloud — Analista de Datos\n🦄 Unicorn Academy — Data Analyst (Excel, PowerBI, Looker, Python, SQL)\n📋 Aspasia — Administración y Gestión Nivel 1\n🎓 Colegio Virgen del Valle — Bachillerato\n🌐 Universidad de los Andes — Idiomas Extranjeros',
    en: 'Certifications and education:\n\n☁️ Google Cloud — Computing Fundamentals\n📊 Google Cloud — Data Analyst\n🦄 Unicorn Academy — Data Analyst (Excel, PowerBI, Looker, Python, SQL)\n📋 Aspasia — Administration & Management Level 1\n🎓 Colegio Virgen del Valle — High School\n🌐 Universidad de los Andes — Foreign Languages'
  },
  {
    keys: ['contacto', 'contact', 'email', 'correo', 'telefon', 'phone', 'linkedin', 'escribir', 'reach', 'contratar', 'hire'],
    es: 'Puedes contactar a Luis Angel por:\n\n📧 rojasluisangel5@gmail.com\n📱 +34 624 235 446\n💼 LinkedIn: Luis Angel Rojas Chacon\n\nEstá abierto a colaboraciones, proyectos freelance y nuevas oportunidades en sistemas con IA, automatización y análisis de datos.',
    en: 'You can contact Luis Angel via:\n\n📧 rojasluisangel5@gmail.com\n📱 +34 624 235 446\n💼 LinkedIn: Luis Angel Rojas Chacon\n\nHe is open to collaborations, freelance projects and new opportunities in AI systems, automation and data analysis.'
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
    es: '¡Sí! Luis Angel está abierto a colaboraciones y proyectos en:\n\n• Diseño y despliegue de sistemas con IA (agentes, CRMs, automatización)\n• Desarrollo con Claude Code (FastAPI, Cloudflare Workers)\n• Análisis de datos y Business Intelligence\n\n¿Te interesa? Escríbele a rojasluisangel5@gmail.com',
    en: 'Yes! Luis Angel is open to collaborations and projects in:\n\n• Designing and deploying AI systems (agents, CRMs, automation)\n• Development with Claude Code (FastAPI, Cloudflare Workers)\n• Data analysis and Business Intelligence\n\nInterested? Reach out at rojasluisangel5@gmail.com'
  },
  {
    keys: ['logros', 'achievements', 'resultados', 'results', 'impacto', 'impact', 'éxitos', 'exitos'],
    es: 'Logros destacados de Luis Angel:\n\n🌲 Cofundó C&C Liébana y desplegó su CRM con 6 agentes IA en producción\n🤖 Bot de Trading "Murph": 25+ agentes IA, modelo ML con AUC=0.756\n📦 Sistema de 9 agentes IA para Amazon FBA España (Fase 1 completa)\n📈 +15% en ventas de productos clave (KFC)\n👥 Gestión de equipos de 20+ personas\n☁️ Certificado por Google Cloud en Análisis de Datos',
    en: 'Luis Angel\'s key achievements:\n\n🌲 Co-founded C&C Liébana and deployed its CRM with 6 AI agents in production\n🤖 Trading bot "Murph": 25+ AI agents, ML model with AUC=0.756\n📦 9-agent AI system for Amazon FBA Spain (Phase 1 complete)\n📈 +15% in key product sales (KFC)\n👥 Managed teams of 20+ people\n☁️ Google Cloud certified in Data Analysis'
  },
  {
    keys: ['power bi', 'powerbi', 'dashboard', 'visualizacion', 'visualization', 'looker', 'bi'],
    es: 'Luis Angel tiene sólidas habilidades en Business Intelligence:\n\n📊 Power BI (85%) — creación de dashboards e informes interactivos\n📈 Looker (70%) — análisis y reportes avanzados\n📋 Google Sheets (90%) — análisis y automatización\n\nCertificado como Analista de Datos por Google Cloud y Unicorn Academy.',
    en: 'Luis Angel has solid Business Intelligence skills:\n\n📊 Power BI (85%) — dashboard and interactive report creation\n📈 Looker (70%) — advanced analytics and reporting\n📋 Google Sheets (90%) — analysis and automation\n\nCertified as Data Analyst by Google Cloud and Unicorn Academy.'
  },
  {
    keys: ['proyecto', 'project', 'bot', 'trading', 'agente', 'agent', 'claude', 'construido', 'built', 'bybit', 'ml', 'machine learning', 'marketing', 'casa angel', 'casangel', 'restaurante', 'restaurant', 'sistemas'],
    es: 'Luis Angel ha construido 6 sistemas con Claude Code:\n\n🌲 C&C Liébana — CRM con 6 agentes IA para su empresa forestal (cofundador, en producción)\n🤖 Bot de Trading "Murph" v5.0 — 25+ agentes IA, ML con AUC=0.756\n📦 Amazon FBA España — 9 agentes IA (Fase 1 completa)\n🛡️ CRM con IA para Agente de Seguros — 6 agentes, mentor de ventas con RAG\n🍽️ Casa Ángel — Lo del Pibe — sistema completo para restaurante\n🏢 Agencia de Marketing — app full-stack con Next.js\n\nPregúntame por cualquiera de ellos para más detalles.',
    en: 'Luis Angel has built 6 systems with Claude Code:\n\n🌲 C&C Liébana — CRM with 6 AI agents for his forestry company (co-founder, in production)\n🤖 Trading Bot "Murph" v5.0 — 25+ AI agents, ML with AUC=0.756\n📦 Amazon FBA Spain — 9 AI agents (Phase 1 complete)\n🛡️ AI CRM for an Insurance Agent — 6 agents, sales mentor with RAG\n🍽️ Casa Ángel — Lo del Pibe — full restaurant system\n🏢 Marketing Agency — full-stack Next.js app\n\nAsk me about any of them for more details.'
  },
  {
    keys: ['liebana', 'liébana', 'c&c', 'cc liebana', 'forestal', 'cofundador', 'co-founder', 'cofounder', 'socio', 'empresa propia', 'mi propia empresa', 'negocio propio'],
    es: '🌲 C&C Liébana es la empresa de servicios forestales que cofundé con un socio en Cantabria.\n\nDiseñé y desplegué su CRM: 6 agentes IA (scoring de leads, presupuestos automáticos, briefing diario y chat de atención) y una web pública con captación de leads, todo sobre Cloudflare Workers + D1.\n\nEn producción desde 2026.',
    en: '🌲 C&C Liébana is the forestry services company I co-founded with a business partner in Cantabria.\n\nI designed and deployed its CRM: 6 AI agents (lead scoring, automatic quotes, daily briefing and chat support) and a public lead-capture website, all on Cloudflare Workers + D1.\n\nIn production since 2026.'
  },
  {
    keys: ['amazon', 'fba', 'ecommerce', 'e-commerce'],
    es: '📦 Amazon FBA España es un sistema de 9 agentes IA para lanzar y operar un negocio de Amazon FBA: investigación de producto, análisis de proveedores, márgenes, listings y seguimiento.\n\nIncluye un bot de Telegram activo 24/7 y un panel web de control. Fase 1 completada.',
    en: '📦 Amazon FBA Spain is a 9-agent AI system to launch and run an Amazon FBA business: product research, supplier analysis, margins, listings and tracking.\n\nIncludes an active 24/7 Telegram bot and a web control panel. Phase 1 complete.'
  },
  {
    keys: ['seguro', 'seguros', 'insurance', 'objeciones', 'comision', 'comisión', 'poliza', 'póliza', 'crm seguro'],
    es: '🛡️ He construido un CRM con IA para la gestión diaria de un agente de seguros: captación y scoring de leads, generación de presupuestos, simulador de objeciones de venta, calculadora de comisiones y un mentor de ventas con RAG sobre libros de formación.\n\n6 agentes especializados, con prompt caching para reducir costes. En uso diario.',
    en: '🛡️ I built an AI CRM for an insurance agent\'s daily operations: lead capture and scoring, quote generation, sales objection simulator, commission calculator and a sales mentor with RAG over training books.\n\n6 specialized agents, with prompt caching to cut costs. In daily use.'
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
    es: 'Claude Code es la herramienta de IA de Anthropic con la que Luis Angel diseña y despliega todos sus sistemas.\n\nCon ella ha construido:\n🌲 El CRM de C&C Liébana, su propia empresa (6 agentes)\n🤖 El bot de trading "Murph" (25+ agentes)\n📦 Un sistema de 9 agentes para Amazon FBA España\n🛡️ Un CRM con IA para un agente de seguros\n🍽️ Un sistema completo para un restaurante\n🌐 Esta misma web\n\nEs su herramienta principal para pasar de idea a sistema en producción.',
    en: 'Claude Code is Anthropic\'s AI tool that Luis Angel uses to design and deploy all his systems.\n\nWith it he has built:\n🌲 The CRM for C&C Liébana, his own company (6 agents)\n🤖 The trading bot "Murph" (25+ agents)\n📦 A 9-agent system for Amazon FBA Spain\n🛡️ An AI CRM for an insurance agent\n🍽️ A complete system for a restaurant\n🌐 This very website\n\nIt\'s his go-to tool for turning an idea into a production system.'
  },
  {
    keys: ['python', 'sql', 'programac', 'programm', 'codigo', 'code'],
    es: 'En programación y datos:\n\n🐍 Python (80%) — automatización, APIs y agentes IA con Claude\n🗄️ SQL (75%) — consultas y gestión de bases de datos\n📊 Excel Avanzado (92%) — modelado y análisis de datos\n\nAplicado en sistemas reales: bots de trading, CRMs con FastAPI y Cloudflare Workers.',
    en: 'In programming and data:\n\n🐍 Python (80%) — automation, APIs and AI agents with Claude\n🗄️ SQL (75%) — queries and database management\n📊 Advanced Excel (92%) — data modeling and analysis\n\nApplied in real systems: trading bots, CRMs with FastAPI and Cloudflare Workers.'
  }
];

const suggestions = {
  es: ['¿Quién es Luis Angel?', '¿Qué es C&C Liébana?', '¿Qué proyectos ha construido?', '¿Está disponible para proyectos?', '¿Cómo contactarle?'],
  en: ['Who is Luis Angel?', 'What is C&C Liébana?', 'What projects has he built?', 'Is he available for projects?', 'How to contact him?']
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
      ? '¡Hola! Soy el asistente de Luis Angel 👋\n\nPuedo contarte sobre sus proyectos con IA, su empresa o cómo contactarle. ¿En qué puedo ayudarte?'
      : "Hello! I'm Luis Angel's assistant 👋\n\nI can tell you about his AI projects, his company or how to contact him. How can I help you?";
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
   VISIT COUNTER
   ========================================= */
fetch('https://api.counterapi.dev/v1/luisangelwsos/visits/up')
  .then(r => r.json())
  .then(data => {
    const el = document.getElementById('visitCount');
    if (el && data.count) el.textContent = data.count.toLocaleString();
  })
  .catch(() => {
    const el = document.getElementById('visitCount');
    if (el) el.closest('.footer-visits').style.display = 'none';
  });

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
