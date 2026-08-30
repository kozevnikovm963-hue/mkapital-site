import { useEffect, useState } from "react";
import { LineIcon, type IconName } from "./icons";
import { ArrowIcon, ConsultationModal, LegalModal, type LegalType, type ModalType } from "./page";
import type { SeoPageData } from "./seo-data";

const base = import.meta.env.BASE_URL;
const home = base;

const selectionSteps = [
  { n: "01", icon: "messages" as IconName, title: "Заявка", text: "Оставляете заявку и выбираете удобный способ получить консультацию." },
  { n: "02", icon: "person" as IconName, title: "Консультация", text: "Уточняем вашу ситуацию, цели и доступную сумму материнского капитала." },
  { n: "03", icon: "documentCheck" as IconName, title: "Подбор варианта", text: "Рассматриваем доступные возможности и рассказываем об условиях подходящего решения." },
  { n: "04", icon: "shield" as IconName, title: "Результат", text: "Сопровождаем вас при дальнейших действиях и остаёмся на связи до результата." },
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
  const [h1Before, h1After = ""] = data.h1.split(data.h1Accent);
  const pageSteps = data.processSteps ?? selectionSteps;
  const benefitsHref = data.benefits ? "#benefits" : "#options";

  return <main className="seo-page" id="top">
    <header className="site-header">
      <a className="brand" href={home} aria-label="МК Онлайн - на главную"><img src={`${base}logo.webp`} alt="МК Онлайн" /></a>
      <nav aria-label="Основная навигация"><a href="#options">Возможности</a><a href="#process">Как это работает</a><a href={benefitsHref}>Преимущества</a><a href="#faq">Вопросы</a></nav>
      <button className="button button-small header-cta" onClick={openConsultation}>Получить консультацию</button>
      <button className="menu-toggle" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      {menuOpen && <div className="mobile-menu"><a href="#options" onClick={closeMenu}>Возможности</a><a href="#process" onClick={closeMenu}>Как это работает</a><a href={benefitsHref} onClick={closeMenu}>Преимущества</a><a href="#faq" onClick={closeMenu}>Вопросы</a><button className="button button-primary" onClick={() => { closeMenu(); openConsultation(); }}>Получить консультацию</button></div>}
    </header>

    <section className="seo-hero">
      <div className="seo-hero-copy">
        <div className="breadcrumbs" aria-label="Хлебные крошки"><a href={home}>Главная</a><span aria-hidden="true">/</span><span>{data.crumb}</span></div>
        <h1>{h1Before}<em>{data.h1Accent}</em>{h1After}</h1>
        {data.lead.map((paragraph, index) => <p className={index === data.lead.length - 1 ? "hero-strong" : undefined} key={paragraph}>{paragraph}</p>)}
        <div className="seo-prompt"><LineIcon name="question" /><b>{data.prompt}</b></div>
        <button className="button button-primary" onClick={openSituation}>{data.heroCta}<ArrowIcon /></button>
        <div className="trust-row"><span><LineIcon name="person" /> Бесплатная консультация</span><span><LineIcon name="shield" /> Конфиденциально</span><span><LineIcon name={data.trustThird === "Ответим на ваши вопросы" ? "messages" : "pin"} /> {data.trustThird ?? "По всей России"}</span></div>
      </div>
      <div className="seo-hero-photo"><img src={`${base}hero-family.webp`} alt="Семья изучает варианты использования материнского капитала" /><i className="photo-accent seo-accent-one" /><i className="photo-accent seo-accent-two" /></div>
    </section>

    {data.sections.map((section, sectionIndex) => <section className={`seo-content section seo-section-${sectionIndex + 1} ${sectionIndex % 2 ? "seo-content-tinted" : ""} ${section.variant === "split" ? "seo-content-split" : ""}`} id={sectionIndex === 0 ? "options" : undefined} key={section.title}>
      <div className="seo-section-heading"><h2>{section.title}</h2><p>{section.intro}</p></div>
      <div className={`seo-card-grid count-${section.cards.length}`}>{section.cards.map((card, index) => <article className={index === section.cards.length - 1 && section.cards.length === 3 ? "seo-card featured" : "seo-card"} key={card.title}>
        <span className={card.tone === "violet" ? "icon violet" : "icon"}><LineIcon name={card.icon} /></span><h3>{card.title}</h3><p>{card.text}</p>
        {card.tag && <b className={`seo-card-tag${card.tone === "violet" ? " violet" : ""}`}>{card.tag}</b>}
        {card.link && <a className="seo-inline-link" href={`${base}${card.link}/`}>{card.linkLabel}<ArrowIcon /></a>}
        {section.ctaInLastCard && index === section.cards.length - 1 && <button className="button button-outline seo-card-cta" onClick={openSituation}>{section.cta}<ArrowIcon /></button>}
      </article>)}</div>
      {section.note && section.ctaStyle === "outline" ? <div className="seo-note seo-note-action"><LineIcon name={section.noteIcon ?? "sparkle"} /><p>{section.note}</p><button className="button button-outline" onClick={openSituation}>{section.cta}<ArrowIcon /></button></div> : <>
        {section.note && <div className="seo-note"><LineIcon name="shield" /><p>{section.note}</p></div>}
        {section.cta && !section.ctaInLastCard && <div className="center-action"><button className={`button ${section.ctaStyle === "outline" ? "button-outline" : "button-primary"}`} onClick={openSituation}>{section.cta}<ArrowIcon /></button></div>}
      </>}
    </section>)}

    <section className="section process seo-process" id="process">
      <div className="seo-section-heading"><p className="eyebrow"><span /> Четыре шага</p><h2>Как всё проходит</h2><p>От первого вопроса до понятного плана дальнейших действий.</p></div>
      <div className="steps">{pageSteps.map((step) => <article className="step-card" key={step.n}><b>{step.n}</b><span className="step-icon"><LineIcon name={step.icon} /></span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      {data.showSupport && <div className="support-strip"><span className="support-mark"><LineIcon name="shield" /></span><div><h3>Сопровождаем на всём пути</h3><p>{data.supportText}</p></div></div>}
    </section>

    {data.benefits && <section className="section seo-benefits" id="benefits"><div className="seo-section-heading"><h2>Почему обращаются в МК Онлайн</h2></div><div className="seo-benefit-grid">{data.benefits.map((benefit) => <article key={benefit.title}><span className={benefit.tone === "violet" ? "icon violet" : "icon"}><LineIcon name={benefit.icon} /></span><div><h3>{benefit.title}</h3><p>{benefit.text}</p></div></article>)}</div></section>}

    <section className="section faq seo-faq" id="faq">
      <div className="seo-section-heading"><p className="eyebrow"><span /> Коротко о главном</p><h2>Вопросы и ответы</h2></div>
      <div className="seo-faq-layout"><div className="faq-list">{data.faqs.map(([question, answer], index) => { const isOpen = openFaq === index; return <article className={`faq-item${isOpen ? " open" : ""}`} key={question}><h3><button aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span><b>{String(index + 1).padStart(2, "0")}</b>{question}</span><i aria-hidden="true">{isOpen ? "−" : "+"}</i></button></h3><div className="faq-answer"><p>{answer}</p></div></article>; })}</div>
        <aside className="question-card"><span><LineIcon name="question" /></span><h3>Не нашли ответ на свой вопрос?</h3><p>Задайте его нашему специалисту - мы с радостью поможем.</p><button className="text-link" onClick={openConsultation}>Задать вопрос <ArrowIcon /></button></aside>
      </div>
    </section>

    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href={home}><img src={`${base}logo.webp`} alt="МК Онлайн" /></a>
          <p>Сервис по вопросам использования материнского капитала</p>
        </div>
        <div>
          <h3>Навигация</h3>
          <a href="#options">Возможности</a>
          <a href="#process">Как это работает</a>
          <a href={benefitsHref}>Преимущества</a>
          <a href="#faq">Вопросы</a>
        </div>
        <div className="footer-documents">
          <h3>Документы</h3>
          <button onClick={() => setLegal("privacy")}>Политика обработки персональных данных</button>
          <button onClick={() => setLegal("terms")}>Пользовательское соглашение</button>
          <button onClick={() => setLegal("consent")}>Согласие на обработку данных</button>
        </div>
        <div className="footer-contacts">
          <h3>Мы на связи</h3>
          <div className="contact-grid">
            <span><LineIcon name="telegram" />Telegram</span>
            <span><LineIcon name="whatsapp" />WhatsApp</span>
            <span><LineIcon name="vk" />ВКонтакте</span>
            <span><LineIcon name="max" />Макс</span>
          </div>
          <a className="footer-email" href="mailto:info@mkapital.online"><LineIcon name="mail" />info@mkapital.online</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2025 МК Онлайн - сервис по вопросам использования материнского капитала</span></div>
    </footer>

    {modal && <ConsultationModal type={modal} onClose={() => setModal(null)} />}
    {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
  </main>;
}
