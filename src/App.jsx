import React, { useEffect, useMemo, useState } from "react";

/* -------------------- DATA -------------------- */

const LANGS = [
  { key: "ru", label: "Русский" },
  { key: "en", label: "English" },
  { key: "be", label: "Беларуская" },
  { key: "uk", label: "Українська" },
  { key: "kz", label: "Қазақша" },
  { key: "ky", label: "Кыргызча" },
  { key: "uz", label: "Oʻzbekcha" },
];

const COPY = {
  ru: {
    title: "CIS PathFinder",
    subtitle:
      "Некоммерческий навигатор по образованию для школьников и студентов из стран СНГ.",
    cta: "Начать путь",
    sections: [
      {
        title: "Поступление",
        text: "Гайды, чек-листы и дедлайны для университетов по всему миру.",
      },
      {
        title: "Экзамены",
        text: "IELTS, TOEFL, SAT, ЕГЭ и другие экзамены — понятно и структурировано.",
      },
      {
        title: "Олимпиады",
        text: "Конкурсы и соревнования, усиливающие твоё портфолио.",
      },
      {
        title: "Волонтёрство",
        text: "Проекты и инициативы, которые имеют реальный импакт.",
      },
    ],
  },
  en: {
    title: "CIS PathFinder",
    subtitle:
      "A nonprofit education navigator for students from CIS countries.",
    cta: "Start your journey",
    sections: [
      {
        title: "Admissions",
        text: "Guides, checklists, and deadlines for universities worldwide.",
      },
      {
        title: "Exams",
        text: "IELTS, TOEFL, SAT, EGE, and more — explained clearly.",
      },
      {
        title: "Olympiads",
        text: "Competitions that strengthen your academic profile.",
      },
      {
        title: "Volunteering",
        text: "Projects and initiatives with real impact.",
      },
    ],
  },
};

/* -------------------- APP -------------------- */

export default function App() {
  const [lang, setLang] = useState("ru");
  const t = useMemo(() => COPY[lang] || COPY.ru, [lang]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: 32 }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ marginTop: 12 }}
        >
          {LANGS.map((l) => (
            <option key={l.key} value={l.key}>
              {l.label}
            </option>
          ))}
        </select>
      </header>

      <main>
        {t.sections.map((s) => (
          <section
            key={s.title}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </main>

      <footer style={{ marginTop: 40, opacity: 0.6 }}>
        <small>© {new Date().getFullYear()} CIS PathFinder</small>
      </footer>
    </div>
  );
}
