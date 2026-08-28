import { useEffect, useState } from "react";
import { LineIcon, type IconName } from "./icons";
import { ArrowIcon, ConsultationModal, LegalModal, type LegalType, type ModalType } from "./page";
import type { SeoPageData } from "./seo-data";

const base = import.meta.env.BASE_URL;
const home = base;

const steps = [
  { n: "01", icon: "message" as IconName, title: "Заявка", text: "Оставляете заявку и выбираете удобный способ связи." },
  { n: "02", icon: "search" as IconName, title: "Консультация", text: "Уточняем ситуацию, цель и доступную сумму маткапитала." },
  { n: "03", icon: "document" as IconName, title: "Подбор варианта", text: "Сравниваем доступные возможности и объясняем условия." },
  { n: "04", icon: "shield" as IconName, title: "Результат", text: "Сопровождаем дальнейшие действия по выбранному варианту." },
];

const usefulPages = [
  ["Материнский капитал наличными", "materinskiy-kapital-nalichnymi"],
  ["Можно ли обналичить маткапитал", "obnalichit-materinskiy-kapital"],
  ["Займ под материнский капитал", "zaim-pod-materinskiy-kapital"],
  ["Как использовать остаток", "ostatok-materinskogo-kapitala"],
  ["На что потратить маткапитал", "na-chto-potratit-materinskiy-kapital"],
];

export default function SeoPage({ data }: { data: SeoPageData }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [legal, setLegal] = useState<LegalType>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.slug]);

  const openConsultation = () => setModal("consultation");
  const openSituation = () => setModal("situation");
  const closeMenu = () => setMenuOpen(false);

  return <main className="seo-page" id="top">
    <header className="site-header">
      <a className="brand" href={home} aria-label="МК Онлайн — на главную"><img src={`${base}logo.webp`} alt="МК Онлайн" /></a>
      <nav aria-label="Основная навигация"><a href="#options">Возможности</a><a href="#process">Как это работает</a><a href="#faq">Вопросы</a></nav>
      <button className="button button-small header-cta" onClick={openConsultation}>Получить консультацию</button>
      <button className="menu-toggle" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      {menuOpen && <div className="mobile-menu"><a href="#options" onClick={closeMenu}>Возможности</a><a href="#process" onClick={closeMenu}>Как это работает</a><a href="#faq" onClick={closeMenu}>Вопросы</a><button className="button button-primary" onClick={() => { closeMenu(); openConsultation(); }}>Получить консультацию</button></div>}
    </header>

    <section className="seo-hero">
      <div className="seo-hero-copy">
        <div className="breadcrumbs" aria-label="Хлебные крошки"><a href={home}>Главная</a><span aria-hidden="true">/</span><span>{data.crumb}</span></div>
        <h1>{data.h1}</h1>
        {data.lead.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="seo-prompt"><LineIcon name="message" /><b>{data.prompt}</b></div>
        <button className="button button-primary" onClick={openSituation}>{data.heroCta}<ArrowIcon /></button>
        <div className="trust-row"><span><LineIcon name="heart" /> Бесплатная консультация</span><span><LineIcon name="shield" /> Конфиденциально</span><span><LineIcon name="pin" /> По всей России</span></div>
      </div>
      <div className="seo-hero-photo"><img src={`${base}hero-family.webp`} alt="Семья изучает варианты использования материнского капитала" /><i className="photo-accent seo-accent-one" /><i className="photo-accent seo-accent-two" /></div>
    </section>

    {data.sections.map((section, sectionIndex) => <section className={`seo-content section ${sectionIndex % 2 ? "seo-content-tinted" : ""}`} id={sectionIndex === 0 ? "options" : undefined} key={section.title}>
      <div className="seo-section-heading"><h2>{section.title}</h2><p>{section.intro}</p></div>
      <div className={`seo-card-grid count-${section.cards.length}`}>{section.cards.map((card, index) => <article className={index === section.cards.length - 1 && section.cards.length === 3 ? "seo-card featured" : "seo-card"} key={card.title}>
        <span className={index % 2 ? "icon violet" : "icon"}><LineIcon name={card.icon} /></span><h3>{card.title}</h3><p>{card.text}</p>
        {card.link && <a className="seo-inline-link" href={`${base}${card.link}/`}>{card.linkLabel}<ArrowIcon /></a>}
      </article>)}</div>
      {section.note && <div className="seo-note"><LineIcon name="shield" /><p>{section.note}</p></div>}
      {section.cta && <div className="center-action"><button className="button button-primary" onClick={openSituation}>{section.cta}<ArrowIcon /></button></div>}
    </section>)}

    <section className="section seo-related" aria-labelledby="related-heading">
      <div className="seo-section-heading"><p className="eyebrow"><span /> Полезные материалы</p><h2 id="related-heading">Разные ситуации — разные возможности</h2><p>Изучите подробные материалы по смежным вопросам материнского капитала.</p></div>
      <div className="related-links">{usefulPages.filter(([, slug]) => slug !== data.slug).map(([label, slug]) => <a href={`${base}${slug}/`} key={slug}><span>{label}</span><ArrowIcon /></a>)}</div>
    </section>

    <section className="section process seo-process" id="process">
      <div className="seo-section-heading"><p className="eyebrow"><span /> Четыре шага</p><h2>Как всё проходит</h2><p>От первого вопроса до понятного плана дальнейших действий.</p></div>
      <div className="steps">{steps.map((step) => <article className="step-card" key={step.n}><b>{step.n}</b><span className="step-icon"><LineIcon name={step.icon} /></span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      <div className="support-strip"><span className="support-mark"><LineIcon name="shield" /></span><div><h3>Сопровождаем на всём пути</h3><p>Остаёмся на связи, отвечаем на вопросы и объясняем следующие шаги.</p></div><button className="button button-small" onClick={openConsultation}>Получить консультацию</button></div>
    </section>

    <section className="section faq seo-faq" id="faq">
      <div className="seo-section-heading"><p className="eyebrow"><span /> Коротко о главном</p><h2>Вопросы и ответы</h2></div>
      <div className="seo-faq-layout"><div className="faq-list">{data.faqs.map(([question, answer], index) => { const isOpen = openFaq === index; return <article className={`faq-item${isOpen ? " open" : ""}`} key={question}><h3><button aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span><b>{String(index + 1).padStart(2, "0")}</b>{question}</span><i aria-hidden="true">{isOpen ? "−" : "+"}</i></button></h3><div className="faq-answer"><p>{answer}</p></div></article>; })}</div>
        <aside className="question-card"><span><LineIcon name="message" /></span><h3>Не нашли ответ на свой вопрос?</h3><p>Задайте его специалисту — постараемся помочь разобраться.</p><button className="text-link" onClick={openConsultation}>Задать вопрос <ArrowIcon /></button></aside>
      </div>
    </section>

    <footer><div className="footer-top"><div className="footer-brand"><a href={home}><img src={`${base}logo.webp`} alt="МК Онлайн" /></a><p>Информационно-партнёрский сервис по вопросам использования материнского капитала.</p></div><div><h3>Материалы</h3>{usefulPages.slice(0, 4).map(([label, slug]) => <a href={`${base}${slug}/`} key={slug}>{label}</a>)}</div><div className="footer-documents"><h3>Документы</h3><button onClick={() => setLegal("privacy")}>Политика конфиденциальности</button><button onClick={() => setLegal("consent")}>Согласие на обработку данных</button><button onClick={() => setLegal("terms")}>Пользовательское соглашение</button></div><div><h3>Мы на связи</h3><p>Оставьте заявку — специалист свяжется с вами удобным способом.</p><button className="button button-small" onClick={openConsultation}>Получить консультацию</button></div></div><div className="footer-note"><p><b>Важно:</b> материалы носят информационный характер. Возможность распоряжения средствами определяется СФР, законодательством и условиями выбранной организации.</p></div><div className="footer-bottom"><span>© МК Онлайн, 2026</span><span>Работаем по всей России</span></div></footer>

    {modal && <ConsultationModal type={modal} onClose={() => setModal(null)} />}
    {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
  </main>;
}
