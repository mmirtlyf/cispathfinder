import React, { useEffect, useMemo, useState } from "react";

/**
 * Hash routing:
 * Home: #/
 * Internal: #/admissions?lang=ru
 * Country:  #/country/russia?lang=en
 */

const LANGS = [
  { key: "ru", label: "Русский" },
  { key: "en", label: "English" },
  { key: "be", label: "Беларуская" },
  { key: "uk", label: "Українська" },
  { key: "kz", label: "Қазақша" },
  { key: "ky", label: "Кыргызча" },
  { key: "uz", label: "Oʻzbekcha" },
];

const STORAGE_KEY_LANG = "cpf_lang";

const COPY = {
  ru: {
    topTag: "Глобальные возможности",
    heroTitleA: "Твой путь к",
    heroTitleB: "образованию мирового уровня",
    heroSubtitle:
      "CIS PathFinder — некоммерческий навигатор для школьников и студентов из стран СНГ: поступление, экзамены, гранты и возможности по всему миру — понятным языком и с поддержкой.",
    ctaPrimary: "Начать свой путь",
    ctaSecondary: "Поддержать проект",
    joinTeam: "Вступить в команду",
    cardsTop: [
      {
        title: "Кто мы",
        text: "Некоммерческий проект, который помогает разобраться в поступлении и возможностях — шаг за шагом.",
      },
      {
        title: "Наша миссия",
        text: "Доступ к качественному образованию должен быть у каждого. Мы снимаем барьеры и соединяем людей с возможностями.",
      },
      {
        title: "Как пользоваться",
        text: "Выбирай направление, используй чек-листы, подписывайся на обновления и получай подсказки.",
      },
    ],
    sectionTitle: "Твой путь к успеху",
    sectionSubtitle:
      "Ресурсы для поступления и развития: от экзаменов до олимпиад и волонтёрства.",
    buckets: [
      {
        icon: "🎓",
        title: "Поступление в университет",
        desc: "Гайды по заявкам, документам и дедлайнам — для разных стран и программ.",
        bullets: [
          "Эссе и мотивационные письма",
          "Чек-лист документов",
          "Планирование таймлайна",
          "Подготовка к интервью",
          "Как выбирать университет",
        ],
        action: "Смотреть гайды",
        path: "/admissions",
      },
      {
        icon: "🧠",
        title: "Экзамены",
        desc: "Подготовка к IELTS/TOEFL/SAT и другим экзаменам — материалы, планы и требования.",
        bullets: [
          "Практика и разборы",
          "Планы подготовки",
          "Требования по баллам",
          "Где сдавать и как записаться",
          "Бесплатные ресурсы",
        ],
        action: "Открыть экзамены",
        path: "/exams",
      },
      {
        icon: "🏆",
        title: "Олимпиады и конкурсы",
        desc: "Соревнования, которые усиливают заявку и портфолио.",
        bullets: [
          "Математика и естественные науки",
          "Программирование",
          "Языковые конкурсы",
          "Дедлайны и требования",
          "Как оформить достижения",
        ],
        action: "Найти конкурсы",
        path: "/olympiads",
      },
      {
        icon: "🤝",
        title: "Волонтёрство и проекты",
        desc: "Опыт и влияние: как найти волонтёрство и показать его в заявке.",
        bullets: [
          "Локальные инициативы",
          "Международные программы",
          "Онлайн-волонтёрство",
          "Партнёрства с НКО",
          "Документация импакта",
        ],
        action: "Найти возможности",
        path: "/volunteering",
      },
    ],
    countryTitle: "По странам",
    countrySub:
      "Выбирай свою страну — страницы открываются в новой вкладке и сохраняют выбранный язык.",
    open: "Открыть",
    countries: [
      {
        title: "Казахстан",
        text: "ЕНТ, гранты, документы, полезные порталы.",
        path: "/country/kazakhstan",
      },
      {
        title: "Украина",
        text: "НМТ/ЗНО, требования, источники.",
        path: "/country/ukraine",
      },
      {
        title: "Беларусь",
        text: "Экзамены, поступление, альтернативные траектории.",
        path: "/country/belarus",
      },
      {
        title: "Кыргызстан",
        text: "ОРТ, стипендии, чек-листы и советы.",
        path: "/country/kyrgyzstan",
      },
      {
        title: "Узбекистан",
        text: "DTM, документы и дедлайны.",
        path: "/country/uzbekistan",
      },
      {
        title: "Россия",
        text: "ЕГЭ, документы, сроки, полезные ссылки.",
        path: "/country/russia",
      },
    ],
    footer: "Некоммерческий проект. Контент обновляется сообществом.",
    templateBadge: "Шаблон страницы",
    backHome: "На главную",
    templateBullets: [
      "Структурированные гайды и чек-листы",
      "Ссылки, которые можно обновлять позже",
      "Понятные шаги и дедлайны",
    ],
  },
  en: {
    topTag: "Global opportunities",
    heroTitleA: "Your path to",
    heroTitleB: "world-class education",
    heroSubtitle:
      "CIS PathFinder is a nonprofit guide for students from CIS countries: admissions, exams, scholarships, and opportunities worldwide — explained clearly and with support.",
    ctaPrimary: "Start your journey",
    ctaSecondary: "Support the project",
    joinTeam: "Join the team",
    cardsTop: [
      { title: "Who we are", text: "A nonprofit guide that helps students navigate opportunities step by step." },
      { title: "Our mission", text: "Everyone deserves access to quality education. We reduce barriers and connect people to opportunities." },
      { title: "How to use", text: "Pick a track, use checklists and guides, and get updates as we grow." },
    ],
    sectionTitle: "Your path to success",
    sectionSubtitle: "Resources for admissions and growth: exams, olympiads and volunteering.",
    buckets: [
      { icon: "🎓", title: "University admissions", desc: "Guides for applications, documents, and deadlines.", bullets: ["Essays & motivation letters","Documents checklist","Timeline planning","Interview prep","Choosing universities"], action: "View guides", path: "/admissions" },
      { icon: "🧠", title: "Exams", desc: "IELTS/TOEFL/SAT and more — materials and plans.", bullets: ["Practice & explanations","Study plans","Score requirements","Where to take tests","Free resources"], action: "Open exams", path: "/exams" },
      { icon: "🏆", title: "Olympiads & competitions", desc: "Contests that strengthen your profile.", bullets: ["Math & science","Programming","Language competitions","Deadlines & requirements","How to present awards"], action: "Find competitions", path: "/olympiads" },
      { icon: "🤝", title: "Volunteering", desc: "Meaningful experience and impact.", bullets: ["Local initiatives","International programs","Online volunteering","NGO partnerships","Impact documentation"], action: "Find opportunities", path: "/volunteering" },
    ],
    countryTitle: "By country",
    countrySub: "Choose your country — pages open in a new tab and keep your language selection.",
    open: "Open",
    countries: [
      { title: "Kazakhstan", text: "ENT, scholarships, documents.", path: "/country/kazakhstan" },
      { title: "Ukraine", text: "NMT/ZNO, requirements, sources.", path: "/country/ukraine" },
      { title: "Belarus", text: "Exams, admissions, pathways.", path: "/country/belarus" },
      { title: "Kyrgyzstan", text: "ORT, scholarships, checklists.", path: "/country/kyrgyzstan" },
      { title: "Uzbekistan", text: "DTM, documents & deadlines.", path: "/country/uzbekistan" },
      { title: "Russia", text: "EGE, documents, timelines.", path: "/country/russia" },
    ],
    footer: "Nonprofit project. Community-updated content.",
    templateBadge: "Template page",
    backHome: "Back to home",
    templateBullets: ["Structured guides and checklists", "Links you can update later", "Clear steps and deadlines"],
  },
};

function tFor(lang) {
  return COPY[lang] || COPY.ru;
}

function safeGetHash() {
  try {
    return window.location.hash || "#/";
  } catch {
    return "#/";
  }
}

function parseHash() {
  const raw = safeGetHash();
  const hash = raw.startsWith("#") ? raw.slice(1) : raw;
  const [pathPart, queryPart] = (hash || "/").split("?");
  const path = (pathPart || "/").startsWith("/") ? (pathPart || "/") : "/";
  const params = {};
  if (queryPart) {
    for (const kv of queryPart.split("&")) {
      const [k, v] = kv.split("=");
      if (!k) continue;
      try {
        params[decodeURIComponent(k)] = decodeURIComponent(v || "");
      } catch {
        params[k] = v || "";
      }
    }
  }
  return { path, params };
}

function buildHref(path, lang) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const q = lang ? `?lang=${encodeURIComponent(lang)}` : "";
  return `#${normalized}${q}`;
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function scrollTo(id) {
  try {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {}
}

function TemplatePage({ lang, title }) {
  const t = useMemo(() => tFor(lang), [lang]);
  return (
    <div>
      <div className="header" style={{ background: "white" }}>
        <div className="container headerInner" style={{ paddingBottom: 20 }}>
          <div className="topbar">
            <div className="brand">
              <div className="logo">🌍</div>
              <div>
                <div className="brandTitle">CIS PathFinder</div>
                <div className="brandSub">nonprofit</div>
              </div>
            </div>
            <a className="btn btnSecondary" href="#/">
              {t.backHome}
            </a>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="panel">
          <div className="pill">{t.templateBadge}</div>
          <h2 className="pageTitle">{title}</h2>
          <p className="pageText">
            {lang === "en"
              ? "This page is a template for future content. We’ll fill it with guides, checklists, and editable links."
              : "Это шаблон страницы. Позже мы заполним её гайдами, чек-листами и редактируемыми ссылками."}
          </p>
          <ul className="list">
            {t.templateBullets.map((x) => (
              <li className="li" key={x}>
                <span className="dot" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [{ path, params }, setRoute] = useState(() => parseHash());

  const [lang, setLang] = useState(() => {
    const fromHash = params.lang;
    const fromStore = storageGet(STORAGE_KEY_LANG);
    return String(fromHash || fromStore || "ru").toLowerCase();
  });

  useEffect(() => {
    storageSet(STORAGE_KEY_LANG, lang);
  }, [lang]);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (params.lang) setLang(String(params.lang).toLowerCase());
  }, [params.lang]);

  const t = useMemo(() => tFor(lang), [lang]);

  if (path && path !== "/") {
    const pageLang = lang === "en" ? "en" : "ru";
    const titleMap = {
      "/admissions": pageLang === "en" ? "University admissions" : "Поступление в университет",
      "/exams": pageLang === "en" ? "Exams" : "Экзамены",
      "/olympiads": pageLang === "en" ? "Olympiads & competitions" : "Олимпиады и конкурсы",
      "/volunteering": pageLang === "en" ? "Volunteering" : "Волонтёрство и проекты",
      "/country/kazakhstan": pageLang === "en" ? "Kazakhstan" : "Казахстан",
      "/country/ukraine": pageLang === "en" ? "Ukraine" : "Украина",
      "/country/belarus": pageLang === "en" ? "Belarus" : "Беларусь",
      "/country/kyrgyzstan": pageLang === "en" ? "Kyrgyzstan" : "Кыргызстан",
      "/country/uzbekistan": pageLang === "en" ? "Uzbekistan" : "Узбекистан",
      "/country/russia": pageLang === "en" ? "Russia (EGE)" : "Россия (ЕГЭ)",
    };
    return <TemplatePage lang={pageLang} title={titleMap[path] || (pageLang === "en" ? "Page" : "Страница")} />;
  }

  return (
    <div>
      <header className="header">
        <div className="heroBg" />
        <div className="container headerInner">
          <div className="topbar">
            <div className="brand">
              <div className="logo">🌍</div>
              <div>
                <div className="brandTitle">CIS PathFinder</div>
                <div className="brandSub">nonprofit</div>
              </div>
            </div>

            <div className="langSelect">
              <span className="langLabel">Language</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                {LANGS.map((l) => (
                  <option key={l.key} value={l.key}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btnSecondary" onClick={() => scrollTo("support")} type="button">
              {t.ctaSecondary}
            </button>
          </div>

          <div className="heroGrid">
            <div>
              <span className="pill">✨ {t.topTag}</span>
              <h1 className="h1">
                {t.heroTitleA} <span className="h1Soft">{t.heroTitleB}</span>
              </h1>
              <p className="lead">{t.heroSubtitle}</p>

              <div className="btnRow">
                <button className="btn btnPrimary" onClick={() => scrollTo("tracks")} type="button">
                  {t.ctaPrimary} →
                </button>
                <button className="btn btnSecondary" onClick={() => scrollTo("join")} type="button">
                  {t.joinTeam}
                </button>
              </div>
            </div>

            <div className="glassGrid">
              {t.cardsTop.map((c) => (
                <div key={c.title} className="glass">
                  <div className="glassTitle">{c.title}</div>
                  <div className="glassText">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section" id="tracks">
          <div className="sectionTitle">{t.sectionTitle}</div>
          <div className="sectionSub">{t.sectionSubtitle}</div>

          <div className="grid2">
            {t.buckets.map((b) => (
              <div className="card" key={b.title}>
                <div className="cardTop">
                  <div className="icon">{b.icon}</div>
                  <div>
                    <div className="cardTitle">{b.title}</div>
                    <div className="cardDesc">{b.desc}</div>
                  </div>
                </div>

                <ul className="list">
                  {b.bullets.map((x) => (
                    <li className="li" key={x}>
                      <span className="dot" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <a className="openBtn" href={buildHref(b.path, lang)} target="_blank" rel="noopener noreferrer">
                  {b.action}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="countries">
          <div className="panel">
            <div className="sectionTitle">{t.countryTitle}</div>
            <div className="sectionSub">{t.countrySub}</div>

            <div className="grid2">
              {t.countries.map((c) => (
                <div className="card lightCard" key={c.title}>
                  <div className="cardTitle smallTitle">{c.title}</div>
                  <div className="cardDesc">{c.text}</div>
                  <a className="openBtn" href={buildHref(c.path, lang)} target="_blank" rel="noopener noreferrer">
                    {t.open}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="support">
          <div className="panel">
            <div className="sectionTitle">{lang === "en" ? "Support" : "Поддержка"}</div>
            <div className="sectionSub">
              {lang === "en"
                ? "We’ll add contacts and ways to support the project here."
                : "Позже мы добавим сюда контакты и способы поддержать проект."}
            </div>
          </div>
        </section>

        <section className="section" id="join">
          <div className="panel">
            <div className="sectionTitle">{lang === "en" ? "Join the team" : "Вступить в команду"}</div>
            <div className="sectionSub">
              {lang === "en"
                ? "Soon: a simple form. For now you can add contacts here."
                : "Скоро: удобная форма. Пока можно будет добавить контакты здесь."}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerRow">
          <div className="small">{t.footer}</div>
          <div className="small">© {new Date().getFullYear()} CIS PathFinder</div>
        </div>
      </footer>
    </div>
  );
}
