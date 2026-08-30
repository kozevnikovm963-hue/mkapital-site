"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { LineIcon, type IconName } from "./icons";

export type ModalType = "consultation" | "situation" | null;
export type LegalType = "privacy" | "consent" | "terms" | null;

const situations = [
  { icon: "wallet" as IconName, title: "Осталась сумма материнского капитала", text: "На сертификате остались средства, и вы не знаете, куда их направить." },
  { icon: "home" as IconName, title: "Ипотека сейчас не подходит", text: "Покупка жилья не планируется или этот вариант сейчас вам недоступен." },
  { icon: "compass" as IconName, title: "Хотите найти другой вариант", text: "Привычные способы вам не подходят - хотите узнать, какие ещё возможности существуют." },
  { icon: "sparkle" as IconName, title: "Хотите получить больше пользы", text: "Ищете подходящее решение и хотите узнать о специальных условиях и предложениях." },
];

const possibilities = [
  { icon: "globe" as IconName, title: "Онлайн по всей России", text: "Работаем дистанционно независимо от региона. Получить консультацию и подобрать подходящий вариант можно онлайн." },
  { icon: "shield" as IconName, title: "Проверенные партнёры", text: "Сотрудничаем с организациями разных направлений, уделяя особое внимание надёжности, прозрачности условий и качеству взаимодействия." },
  { icon: "layers" as IconName, title: "Больше вариантов", text: "Расскажем о доступных решениях с учётом именно вашей ситуации." },
];

const steps = [
  { n: "01", icon: "message" as IconName, title: "Заявка", text: "Оставляете заявку и выбираете, как вам удобнее получить консультацию." },
  { n: "02", icon: "search" as IconName, title: "Консультация и подбор", text: "Уточняем вашу ситуацию, отвечаем на вопросы и подбираем подходящее решение." },
  { n: "03", icon: "document" as IconName, title: "Оформление", text: "Знакомим с условиями выбранного варианта и сопровождаем на этапе оформления необходимых документов." },
  { n: "04", icon: "check" as IconName, title: "Результат", text: "Вы получаете результат в соответствии с выбранным вариантом и согласованными условиями." },
];

const benefits = [
  { icon: "message" as IconName, title: "Бесплатная консультация", text: "Разберём вашу ситуацию и расскажем о доступных вариантах без оплаты за консультацию." },
  { icon: "heart" as IconName, title: "Индивидуальный подбор", text: "Не предлагаем одно решение всем - учитываем вашу ситуацию, цели и доступную сумму." },
  { icon: "gift" as IconName, title: "Специальные условия партнёров", text: "Для клиентов МК Онлайн могут быть доступны дополнительные предложения и преимущества." },
  { icon: "pin" as IconName, title: "Работаем по всей России", text: "Консультация, подбор и взаимодействие с сервисом проходят дистанционно." },
  { icon: "list" as IconName, title: "Понятные условия", text: "До оформления подробно рассказываем об условиях выбранного варианта и дальнейших действиях." },
  { icon: "shield" as IconName, title: "Проверенные партнёры", text: "Работаем с организациями разных направлений, уделяя внимание надёжности и прозрачности условий." },
];

const faqs = [
  ["Какие варианты вы можете предложить?", "Всё зависит от вашей ситуации, суммы материнского капитала и цели обращения. Мы сотрудничаем с организациями разных направлений и помогаем подобрать подходящий вариант из доступных предложений партнёров."],
  ["Можно ли обратиться, если осталась небольшая сумма материнского капитала?", "Да. Размер остатка может влиять на доступные варианты, поэтому мы рассматриваем каждую ситуацию индивидуально. Оставьте заявку - расскажем, какие возможности есть именно в вашем случае."],
  ["Что делать, если ипотека мне не подходит?", "Ипотека - не единственный вариант использования материнского капитала. Расскажите о своей ситуации, и мы поможем разобраться, какие другие возможности могут быть вам доступны."],
  ["Можно ли получить материнский капитал наличными?", "Материнский капитал нельзя просто обменять на наличные по желанию владельца сертификата. При этом существуют предусмотренные законом выплаты и другие способы использования средств, а условия зависят от конкретной ситуации. Если ваша цель - понять, какие варианты доступны именно вам, расскажите о своей ситуации на консультации."],
  ["Сколько стоит консультация МК Онлайн?", "Консультация МК Онлайн бесплатна. Специалист уточнит вашу ситуацию, ответит на вопросы и расскажет о доступных вариантах и предложениях партнёров."],
  ["МК Онлайн сам оказывает услуги?", "Нет. МК Онлайн - партнёрский сервис. Мы помогаем разобраться в доступных возможностях, подобрать подходящий вариант и сопровождаем клиента при взаимодействии с партнёром. Оформление выбранного решения происходит с соответствующей организацией-партнёром."],
  ["Вы работаете по всей России?", "Да. Работа сервиса организована дистанционно, поэтому обратиться за консультацией можно из любого региона России. Возможность оформления конкретного предложения зависит от его условий и требований партнёра."],
];

const situationOptions = ["Осталась сумма материнского капитала", "Ипотека сейчас не подходит", "Хочу найти другой вариант использования средств", "Интересуют специальные условия и предложения", "Пока изучаю доступные возможности"];

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className={`arrow-icon${diagonal ? " arrow-icon-diagonal" : ""}`} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d={diagonal ? "M5 15 15 5M8 5h7v7" : "M3 10h13M11 5l5 5-5 5"} /></svg>;
}

export function ConsultationModal({ type, onClose }: { type: Exclude<ModalType, null>; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
  const [contact, setContact] = useState("Звонок");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; situation?: string }>({});
  const [ready, setReady] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Укажите корректный телефон";
    if (type === "situation" && !situation) next.situation = "Выберите подходящий вариант";
    setErrors(next);
    if (!Object.keys(next).length) setReady(true);
  }

  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}><button ref={closeRef} className="modal-close" aria-label="Закрыть окно" onClick={onClose}>×</button>{ready ? <div className="form-note" role="status"><span><LineIcon name="check" /></span><h2>Всё заполнено</h2><p>Форма будет подключена на следующем этапе. Сейчас данные никуда не отправляются.</p><button className="button button-primary" onClick={onClose}>Понятно</button></div> : <form onSubmit={submit} noValidate><p className="eyebrow"><span /> Бесплатно и конфиденциально</p><h2 id="modal-title">{type === "situation" ? "Подберём подходящий вариант" : "Получите бесплатную консультацию"}</h2><p className="modal-intro">{type === "situation" ? "Ответьте на один вопрос - это поможет лучше понять вашу ситуацию." : "Оставьте контакты - специалист МК Онлайн ответит на ваши вопросы."}</p>{type === "situation" && <fieldset className="situation-options"><legend>Что лучше всего описывает вашу ситуацию?</legend>{situationOptions.map((item) => <label key={item}><input type="radio" name="situation" value={item} checked={situation === item} onChange={(e) => setSituation(e.target.value)} /><span>{item}</span></label>)}{errors.situation && <small className="error">{errors.situation}</small>}</fieldset>}<label className="field"><span>Ваше имя</span><input value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} placeholder="Например, Анна" />{errors.name && <small className="error">{errors.name}</small>}</label><label className="field"><span>Телефон</span><input value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} inputMode="tel" placeholder="+7 900 000-00-00" />{errors.phone && <small className="error">{errors.phone}</small>}</label><fieldset className="contact-options"><legend>Как удобнее связаться?</legend>{["Звонок", "Telegram", "WhatsApp", "MAX"].map((item) => <label key={item}><input type="radio" name="contact" value={item} checked={contact === item} onChange={(e) => setContact(e.target.value)} /><span>{item}</span></label>)}</fieldset><button className="button button-primary modal-submit" type="submit">{type === "situation" ? "Узнать доступные варианты" : "Получить консультацию"}<ArrowIcon /></button><p className="privacy-note">Демонстрационная форма: данные не отправляются и не сохраняются</p></form>}</div></div>;
}

const legalDocuments = {
  privacy: {
    title: "Политика конфиденциальности",
    sections: [
      ["1. Общие положения", "Настоящая политика описывает порядок обращения с информацией пользователей сайта МК Онлайн. Используя сайт, пользователь подтверждает, что ознакомился с этой политикой."],
      ["2. Какие данные могут обрабатываться", "При обращении через форму пользователь может добровольно указать имя, номер телефона, предпочитаемый способ связи и сведения о своей ситуации. Технические данные могут включать тип устройства, браузер и обезличенную статистику посещения."],
      ["3. Цели обработки", "Данные используются для ответа на обращение, проведения консультации, подбора доступных вариантов и улучшения работы сайта. Они не должны использоваться для целей, не связанных с обращением пользователя."],
      ["4. Передача и хранение", "Информация может передаваться организации-партнёру только в объёме, необходимом для выбранного пользователем варианта и после информирования пользователя. Срок хранения ограничивается целями обработки и требованиями законодательства Российской Федерации."],
      ["5. Права пользователя", "Пользователь вправе запросить сведения об обработке своих данных, уточнить их или отозвать согласие, направив обращение через доступный на сайте канал связи."],
    ],
  },
  consent: {
    title: "Согласие на обработку персональных данных",
    sections: [
      ["Содержание согласия", "Отправляя форму на сайте МК Онлайн, пользователь свободно, своей волей и в своём интересе даёт согласие на обработку указанных им данных: имени, номера телефона, способа связи и сведений, содержащихся в обращении."],
      ["Цели и действия", "Обработка осуществляется для обратной связи, консультации и подбора доступных вариантов. Она может включать сбор, запись, систематизацию, хранение, уточнение, использование, передачу выбранному партнёру с ведома пользователя, блокирование и удаление данных."],
      ["Срок действия и отзыв", "Согласие действует до достижения целей обработки или до его отзыва пользователем. Отзыв можно направить через доступный на сайте канал связи."],
    ],
  },
  terms: {
    title: "Пользовательское соглашение",
    sections: [
      ["1. Назначение сайта", "МК Онлайн является информационно-партнёрским сервисом. Материалы сайта носят ознакомительный характер, не являются публичной офертой, юридической или финансовой консультацией."],
      ["2. Работа сервиса", "Сервис помогает пользователю разобраться в доступных возможностях и организует взаимодействие с профильными организациями. Условия, решения и оформление конкретной услуги предоставляются соответствующей организацией-партнёром."],
      ["3. Ответственность пользователя", "Пользователь обязуется предоставлять достоверные сведения и самостоятельно знакомиться с условиями выбранного предложения до его оформления."],
      ["4. Ограничение ответственности", "Доступность конкретного варианта зависит от ситуации пользователя, требований законодательства и условий партнёра. Размещение информации на сайте не гарантирует одобрение или получение конкретного результата."],
    ],
  },
} as const;

export function LegalModal({ type, onClose }: { type: Exclude<LegalType, null>; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const legalDocument = legalDocuments[type];
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={onClose}><article className="modal legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onMouseDown={(event) => event.stopPropagation()}><button ref={closeRef} className="modal-close" aria-label="Закрыть документ" onClick={onClose}>×</button><p className="eyebrow"><span /> Документы</p><h2 id="legal-title">{legalDocument.title}</h2><p className="legal-date">Редакция от 20 августа 2026 года</p><div className="legal-content">{legalDocument.sections.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p>{text}</p></section>)}</div><button className="button button-primary legal-close" onClick={onClose}>Понятно</button></article></div>;
}

export default function Home() {
  const [modal, setModal] = useState<ModalType>(null);
  const [legal, setLegal] = useState<LegalType>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const openConsultation = () => setModal("consultation");
  const openSituation = () => setModal("situation");

  const closeMenu = () => setMenuOpen(false);
  return <main className="home-page">
    <header className="site-header"><a className="brand" href="#top" aria-label="МК Онлайн - на главную"><img src="./logo.webp" alt="МК Онлайн" /></a><nav aria-label="Основная навигация"><a href="#possibilities">Возможности</a><a href="#process">Как это работает</a><a href="#benefits">Преимущества</a><a href="#faq">Вопросы</a></nav><button className="button button-small header-cta" onClick={openConsultation}>Получить консультацию</button><button className="menu-toggle" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>{menuOpen && <div className="mobile-menu"><a href="#possibilities" onClick={closeMenu}>Возможности</a><a href="#process" onClick={closeMenu}>Как это работает</a><a href="#benefits" onClick={closeMenu}>Преимущества</a><a href="#faq" onClick={closeMenu}>Вопросы и ответы</a><button className="button button-primary" onClick={() => { closeMenu(); openConsultation(); }}>Получить консультацию</button></div>}</header>

    <section className="hero hero-photo-layout" id="top"><div className="hero-copy reveal visible"><h1>Материнский капитал - <em>возможностей больше,</em> чем кажется</h1><p className="hero-lead">Для разных ситуаций - разные решения. Поможем разобраться в доступных вариантах и подобрать подходящий именно вам.</p><button className="button button-primary" onClick={openSituation}>Узнать свои возможности<ArrowIcon /></button></div><div className="hero-photo-wrap reveal visible" aria-label="Мама с детьми знакомится с возможностями сервиса"><img src="./hero-family.webp" alt="Мама с двумя детьми за ноутбуком" fetchPriority="high" /><i className="photo-accent photo-accent-one" /><i className="photo-accent photo-accent-two" /></div></section>

    <section className="section situations" aria-labelledby="situations-title"><div className="section-heading reveal"><p className="eyebrow"><span /> Возможно, это про вас</p><h2 id="situations-title">Одна из этих ситуаций знакома вам?</h2><p>Материнский капитал есть, но подходящий способ его использования не всегда очевиден.</p></div><div className="situation-grid">{situations.map((item, index) => <article className="situation-card reveal" key={item.title}><span className={index % 2 ? "icon violet" : "icon"}><LineIcon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="center-action reveal"><button className="button button-primary" onClick={openSituation}>Подобрать вариант для моей ситуации<ArrowIcon /></button><small>Бесплатно • Конфиденциально • Без обязательств</small></div></section>

    <section className="section clarity"><div className="clarity-panel reveal"><div><p className="eyebrow"><span /> Как мы работаем</p><h2>Не нужно разбираться во всём самостоятельно</h2><p>МК Онлайн поможет рассмотреть доступные варианты использования материнского капитала и понять, какие решения подходят именно в вашей ситуации.</p><button className="text-link" onClick={openConsultation}>Получить консультацию<ArrowIcon /></button></div><div className="clarity-path"><div><b>01</b><span>Расскажите о ситуации</span></div><i /><div><b>02</b><span>Рассмотрим возможности</span></div><i /><div><b>03</b><span>Подберём решение</span></div></div></div></section>

    <section className="section possibilities" id="possibilities"><div className="possibility-intro reveal"><div><p className="eyebrow"><span /> Разные возможности</p><h2>Материнский капитал - ваши возможности <em>шире, чем кажется</em></h2></div><p>МК Онлайн сотрудничает с организациями разных направлений. Поможем разобраться в доступных возможностях и подобрать подходящий вариант с учётом вашей ситуации.</p></div><div className="possibility-grid">{possibilities.map((item) => <article className="possibility-card reveal" key={item.title}><span className="icon"><LineIcon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}<article className="special-card reveal"><span className="icon violet"><LineIcon name="gift" /></span><h3>Специальные условия для клиентов</h3><p>Благодаря сотрудничеству с партнёрами могут быть доступны дополнительные условия и предложения.</p><b>Узнайте, что доступно именно вам.</b></article></div><div className="possibility-cta reveal"><div><span className="icon"><LineIcon name="sparkle" /></span><p><b>Узнайте, какие условия доступны именно вам</b><small>Расскажите о своей ситуации - мы рассмотрим доступные варианты партнёров.</small></p></div><button className="button button-primary" onClick={openSituation}>Узнать мои условия<ArrowIcon /></button></div></section>

    <section className="section process" id="process"><div className="section-heading reveal"><p className="eyebrow"><span /> Всего несколько шагов</p><h2>Как всё проходит</h2><p>От обращения до результата - понятно и последовательно.</p></div><div className="steps">{steps.map((step) => <article className="step-card reveal" key={step.n}><b>{step.n}</b><div className="step-icon"><LineIcon name={step.icon} /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="support-strip reveal"><div className="support-mark"><LineIcon name="heart" /></div><div><h3>Сопровождаем на всём пути</h3><p>Специалист МК Онлайн остаётся на связи, помогает с возникающими вопросами и сопровождает вас на всех этапах оформления.</p></div><button className="button button-primary" onClick={openConsultation}>Получить консультацию<ArrowIcon /></button></div></section>

    <section className="section benefits" id="benefits"><div className="section-heading reveal"><p className="eyebrow"><span /> Спокойно и понятно</p><h2>Почему выбирают МК Онлайн</h2><p>Понятные условия, индивидуальный подход и прозрачность на каждом этапе.</p></div><div className="benefit-grid">{benefits.map((item, index) => <article className="benefit-card reveal" key={item.title}><span className={index % 2 ? "icon violet" : "icon"}><LineIcon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div><div className="partner-note reveal"><div className="support-mark"><LineIcon name="handshake" /></div><div><h3>МК Онлайн - партнёрский сервис</h3><p>Мы помогаем разобраться в доступных возможностях, подобрать подходящий вариант и сопровождаем клиента при взаимодействии с партнёром. Оформление выбранного решения происходит с соответствующей организацией-партнёром.</p></div></div></section>

    <section className="section faq" id="faq"><div className="section-heading reveal"><p className="eyebrow"><span /> Полезно знать</p><h2>Вопросы и ответы</h2><p>Собрали ответы на частые вопросы о работе МК Онлайн и доступных возможностях.</p></div><div className="faq-list reveal">{faqs.map(([question, answer], index) => <article className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><h3><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span><b>{String(index + 1).padStart(2, "0")}</b>{question}</span><i>{openFaq === index ? "−" : "+"}</i></button></h3><div className="faq-answer" aria-hidden={openFaq !== index}><p>{answer}</p></div></article>)}</div></section>

    <section className="final-cta"><div className="final-orb one" /><div className="final-orb two" /><div className="final-copy reveal"><p className="eyebrow"><span /> Остались вопросы?</p><h2>Начните с бесплатной консультации</h2><p>Расскажите о своей ситуации - поможем разобраться в доступных возможностях и предложениях партнёров.</p><button className="button button-light" onClick={openConsultation}>Получить консультацию<ArrowIcon /></button><small>Бесплатно • Конфиденциально • Без обязательств</small></div></section>

    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#top"><img src="./logo.webp" alt="МК Онлайн" /></a>
          <p>Сервис по вопросам использования материнского капитала</p>
        </div>
        <div>
          <h3>Навигация</h3>
          <a href="#possibilities">Возможности</a>
          <a href="#process">Как это работает</a>
          <a href="#benefits">Преимущества</a>
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
      <div className="footer-seo-links">
        <h3>Полезные материалы</h3>
        <div>
          <a href="./materinskiy-kapital-nalichnymi/">Материнский капитал наличными</a>
          <a href="./obnalichit-materinskiy-kapital/">Можно ли обналичить маткапитал</a>
          <a href="./zaim-pod-materinskiy-kapital/">Займ под материнский капитал</a>
          <a href="./ostatok-materinskogo-kapitala/">Как использовать остаток</a>
          <a href="./na-chto-potratit-materinskiy-kapital/">На что потратить маткапитал</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2025 МК Онлайн</span></div>
    </footer>
    {modal && <ConsultationModal type={modal} onClose={() => setModal(null)} />}
    {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
  </main>;
}
