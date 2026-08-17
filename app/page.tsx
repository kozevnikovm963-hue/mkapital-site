"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ModalType = "consultation" | "situation" | null;

const situations = [
  { mark: "₽", title: "Осталась сумма материнского капитала", text: "На сертификате остались средства, и вы не знаете, куда их направить." },
  { mark: "⌂", title: "Ипотека сейчас не подходит", text: "Покупка жилья не планируется или этот вариант сейчас вам недоступен." },
  { mark: "↗", title: "Хотите найти другой вариант", text: "Привычные способы вам не подходят — хотите узнать, какие ещё возможности существуют." },
  { mark: "✦", title: "Хотите получить больше пользы", text: "Ищете подходящее решение и хотите узнать о специальных условиях и предложениях." },
];

const possibilities = [
  { mark: "◎", title: "Онлайн по всей России", text: "Работаем дистанционно независимо от региона. Получить консультацию и подобрать подходящий вариант можно онлайн." },
  { mark: "✓", title: "Проверенные партнёры", text: "Сотрудничаем с организациями разных направлений, уделяя особое внимание надёжности, прозрачности условий и качеству взаимодействия." },
  { mark: "↗", title: "Больше вариантов", text: "Расскажем о доступных решениях с учётом именно вашей ситуации." },
];

const steps = [
  { n: "01", title: "Заявка", text: "Оставляете заявку и выбираете, как вам удобнее получить консультацию." },
  { n: "02", title: "Консультация и подбор", text: "Уточняем вашу ситуацию, отвечаем на вопросы и подбираем подходящее решение." },
  { n: "03", title: "Оформление", text: "Знакомим с условиями выбранного варианта и сопровождаем на этапе оформления необходимых документов." },
  { n: "04", title: "Результат", text: "Вы получаете результат в соответствии с выбранным вариантом и согласованными условиями." },
];

const benefits = [
  ["◌", "Бесплатная консультация", "Разберём вашу ситуацию и расскажем о доступных вариантах без оплаты за консультацию."],
  ["♡", "Индивидуальный подбор", "Не предлагаем одно решение всем — учитываем вашу ситуацию, цели и доступную сумму."],
  ["✦", "Специальные условия партнёров", "Для клиентов МК Онлайн могут быть доступны дополнительные предложения и преимущества."],
  ["⌖", "Работаем по всей России", "Консультация, подбор и взаимодействие с сервисом проходят дистанционно."],
  ["✓", "Понятные условия", "До оформления подробно рассказываем об условиях выбранного варианта и дальнейших действиях."],
  ["◇", "Проверенные партнёры", "Работаем с организациями разных направлений, уделяя внимание надёжности и прозрачности условий."],
];

const faqs = [
  ["Какие варианты вы можете предложить?", "Всё зависит от вашей ситуации, суммы материнского капитала и цели обращения. Мы сотрудничаем с организациями разных направлений и помогаем подобрать подходящий вариант из доступных предложений партнёров."],
  ["Можно ли обратиться, если осталась небольшая сумма материнского капитала?", "Да. Размер остатка может влиять на доступные варианты, поэтому мы рассматриваем каждую ситуацию индивидуально. Оставьте заявку — расскажем, какие возможности есть именно в вашем случае."],
  ["Что делать, если ипотека мне не подходит?", "Ипотека — не единственный вариант использования материнского капитала. Расскажите о своей ситуации, и мы поможем разобраться, какие другие возможности могут быть вам доступны."],
  ["Можно ли получить материнский капитал наличными?", "Материнский капитал нельзя просто обменять на наличные по желанию владельца сертификата. При этом существуют предусмотренные законом выплаты и другие способы использования средств, а условия зависят от конкретной ситуации. Если ваша цель — понять, какие варианты доступны именно вам, расскажите о своей ситуации на консультации."],
  ["Сколько стоит консультация МК Онлайн?", "Консультация МК Онлайн бесплатна. Специалист уточнит вашу ситуацию, ответит на вопросы и расскажет о доступных вариантах и предложениях партнёров."],
  ["МК Онлайн сам оказывает услуги?", "Нет. МК Онлайн — партнёрский сервис. Мы помогаем разобраться в доступных возможностях, подобрать подходящий вариант и сопровождаем клиента при взаимодействии с партнёром. Оформление выбранного решения происходит с соответствующей организацией-партнёром."],
  ["Вы работаете по всей России?", "Да. Работа сервиса организована дистанционно, поэтому обратиться за консультацией можно из любого региона России. Возможность оформления конкретного предложения зависит от его условий и требований партнёра."],
];

const situationOptions = ["Осталась сумма материнского капитала", "Ипотека сейчас не подходит", "Хочу найти другой вариант использования средств", "Интересуют специальные условия и предложения", "Пока изучаю доступные возможности"];

function ConsultationModal({ type, onClose }: { type: Exclude<ModalType, null>; onClose: () => void }) {
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

  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}><button ref={closeRef} className="modal-close" aria-label="Закрыть окно" onClick={onClose}>×</button>{ready ? <div className="form-note" role="status"><span>✓</span><h2>Всё заполнено</h2><p>Форма будет подключена на следующем этапе. Сейчас данные никуда не отправляются.</p><button className="button button-primary" onClick={onClose}>Понятно</button></div> : <form onSubmit={submit} noValidate><p className="eyebrow"><span /> Бесплатно и конфиденциально</p><h2 id="modal-title">{type === "situation" ? "Подберём подходящий вариант" : "Получите бесплатную консультацию"}</h2><p className="modal-intro">{type === "situation" ? "Ответьте на один вопрос — это поможет лучше понять вашу ситуацию." : "Оставьте контакты — специалист МК Онлайн ответит на ваши вопросы."}</p>{type === "situation" && <fieldset className="situation-options"><legend>Что лучше всего описывает вашу ситуацию?</legend>{situationOptions.map((item) => <label key={item}><input type="radio" name="situation" value={item} checked={situation === item} onChange={(e) => setSituation(e.target.value)} /><span>{item}</span></label>)}{errors.situation && <small className="error">{errors.situation}</small>}</fieldset>}<label className="field"><span>Ваше имя</span><input value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} placeholder="Например, Анна" />{errors.name && <small className="error">{errors.name}</small>}</label><label className="field"><span>Телефон</span><input value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} inputMode="tel" placeholder="+7 900 000-00-00" />{errors.phone && <small className="error">{errors.phone}</small>}</label><fieldset className="contact-options"><legend>Как удобнее связаться?</legend>{["Звонок", "Telegram", "WhatsApp", "MAX"].map((item) => <label key={item}><input type="radio" name="contact" value={item} checked={contact === item} onChange={(e) => setContact(e.target.value)} /><span>{item}</span></label>)}</fieldset><button className="button button-primary modal-submit" type="submit">{type === "situation" ? "Узнать доступные варианты" : "Получить консультацию"} <span>→</span></button><p className="privacy-note">Демонстрационная форма: данные не отправляются и не сохраняются</p></form>}</div></div>;
}

export default function Home() {
  const [modal, setModal] = useState<ModalType>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const openConsultation = () => setModal("consultation");
  const openSituation = () => setModal("situation");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <main>
    <header className="site-header"><a className="brand" href="#top" aria-label="МК Онлайн — на главную"><img src="./logo.webp" alt="МК Онлайн" /></a><nav aria-label="Основная навигация"><a href="#possibilities">Возможности</a><a href="#process">Как это работает</a><a href="#benefits">Преимущества</a><a href="#faq">Вопросы</a></nav><button className="button button-small header-cta" onClick={openConsultation}>Получить консультацию</button><button className="menu-toggle" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>{menuOpen && <div className="mobile-menu"><a href="#possibilities" onClick={closeMenu}>Возможности</a><a href="#process" onClick={closeMenu}>Как это работает</a><a href="#benefits" onClick={closeMenu}>Преимущества</a><a href="#faq" onClick={closeMenu}>Вопросы и ответы</a><button className="button button-primary" onClick={() => { closeMenu(); openConsultation(); }}>Получить консультацию</button></div>}</header>

    <section className="hero" id="top"><div className="hero-copy reveal visible"><p className="eyebrow"><span /> Информационно-партнёрский сервис</p><h1>Материнский капитал — <em>возможностей больше,</em> чем кажется</h1><p className="hero-lead">Для разных ситуаций — разные решения. Поможем разобраться в доступных вариантах и подобрать подходящий именно вам.</p><button className="button button-primary" onClick={openSituation}>Узнать свои возможности <span>→</span></button><div className="trust-row"><span>Бесплатно</span><span>Конфиденциально</span><span>По всей России</span></div></div><div className="hero-visual reveal visible" aria-label="Персональный подбор возможностей"><div className="orb orb-one" /><div className="orb orb-two" /><div className="visual-card card-main"><p>Ваша ситуация</p><strong>Подберём подходящий вариант</strong><div className="progress"><i /></div><small>Учтём цели и доступную сумму</small></div><div className="visual-card card-note"><b>01</b><span>Расскажите о ситуации</span></div><div className="visual-card card-result"><b>✓</b><span>Понятные условия</span></div></div></section>

    <section className="section situations" aria-labelledby="situations-title"><div className="section-heading reveal"><p className="eyebrow"><span /> Возможно, это про вас</p><h2 id="situations-title">Одна из этих ситуаций знакома вам?</h2><p>Материнский капитал есть, но подходящий способ его использования не всегда очевиден.</p></div><div className="situation-grid">{situations.map((item, index) => <article className="situation-card reveal" key={item.title}><span className={index % 2 ? "icon violet" : "icon"}>{item.mark}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="center-action reveal"><button className="button button-primary" onClick={openSituation}>Подобрать вариант для моей ситуации <span>→</span></button><small>Бесплатно • Конфиденциально • Без обязательств</small></div></section>

    <section className="section clarity"><div className="clarity-panel reveal"><div><p className="eyebrow"><span /> Как мы работаем</p><h2>Не нужно разбираться во всём самостоятельно</h2><p>МК Онлайн поможет рассмотреть доступные варианты использования материнского капитала и понять, какие решения подходят именно в вашей ситуации.</p><button className="text-link" onClick={openConsultation}>Получить консультацию <span>→</span></button></div><div className="clarity-path"><div><b>01</b><span>Расскажите о ситуации</span></div><i /><div><b>02</b><span>Рассмотрим возможности</span></div><i /><div><b>03</b><span>Подберём решение</span></div></div></div></section>

    <section className="section possibilities" id="possibilities"><div className="possibility-intro reveal"><div><p className="eyebrow"><span /> Разные возможности</p><h2>Материнский капитал — ваши возможности <em>шире, чем кажется</em></h2></div><p>МК Онлайн сотрудничает с организациями разных направлений. Поможем разобраться в доступных возможностях и подобрать подходящий вариант с учётом вашей ситуации.</p></div><div className="possibility-grid">{possibilities.map((item) => <article className="possibility-card reveal" key={item.title}><span className="icon">{item.mark}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}<article className="special-card reveal"><span className="icon violet">✦</span><h3>Специальные условия для клиентов</h3><p>Благодаря сотрудничеству с партнёрами могут быть доступны дополнительные условия и предложения.</p><b>Узнайте, что доступно именно вам.</b></article></div><div className="possibility-cta reveal"><div><span className="icon">✦</span><p><b>Узнайте, какие условия доступны именно вам</b><small>Расскажите о своей ситуации — мы рассмотрим доступные варианты партнёров.</small></p></div><button className="button button-primary" onClick={openSituation}>Узнать мои условия <span>→</span></button></div></section>

    <section className="section process" id="process"><div className="section-heading reveal"><p className="eyebrow"><span /> Всего несколько шагов</p><h2>Как всё проходит</h2><p>От обращения до результата — понятно и последовательно.</p></div><div className="steps">{steps.map((step) => <article className="step-card reveal" key={step.n}><b>{step.n}</b><div className="step-icon">{step.n === "01" ? "…" : step.n === "02" ? "?" : step.n === "03" ? "✓" : "✦"}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="support-strip reveal"><div className="support-mark">♡</div><div><h3>Сопровождаем на всём пути</h3><p>Специалист МК Онлайн остаётся на связи, помогает с возникающими вопросами и сопровождает вас на всех этапах оформления.</p></div><button className="button button-primary" onClick={openConsultation}>Получить консультацию <span>→</span></button></div></section>

    <section className="section benefits" id="benefits"><div className="section-heading reveal"><p className="eyebrow"><span /> Спокойно и понятно</p><h2>Почему выбирают МК Онлайн</h2><p>Понятные условия, индивидуальный подход и прозрачность на каждом этапе.</p></div><div className="benefit-grid">{benefits.map(([mark,title,text], index) => <article className="benefit-card reveal" key={title}><span className={index % 2 ? "icon violet" : "icon"}>{mark}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="partner-note reveal"><div className="support-mark">◇</div><div><h3>МК Онлайн — партнёрский сервис</h3><p>Мы помогаем разобраться в доступных возможностях, подобрать подходящий вариант и сопровождаем клиента при взаимодействии с партнёром. Оформление выбранного решения происходит с соответствующей организацией-партнёром.</p></div></div></section>

    <section className="section faq" id="faq"><div className="section-heading reveal"><p className="eyebrow"><span /> Полезно знать</p><h2>Вопросы и ответы</h2><p>Собрали ответы на частые вопросы о работе МК Онлайн и доступных возможностях.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={`faq-item reveal ${openFaq === index ? "open" : ""}`} key={question}><h3><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span><b>{String(index + 1).padStart(2, "0")}</b>{question}</span><i>{openFaq === index ? "−" : "+"}</i></button></h3><div className="faq-answer" aria-hidden={openFaq !== index}><p>{answer}</p></div></article>)}</div></section>

    <section className="final-cta"><div className="final-orb one" /><div className="final-orb two" /><div className="final-copy reveal"><p className="eyebrow"><span /> Остались вопросы?</p><h2>Начните с бесплатной консультации</h2><p>Расскажите о своей ситуации — поможем разобраться в доступных возможностях и предложениях партнёров.</p><button className="button button-light" onClick={openConsultation}>Получить консультацию <span>→</span></button><small>Бесплатно • Конфиденциально • Без обязательств</small></div></section>

    <footer><div className="footer-top"><div className="footer-brand"><img src="./logo.webp" alt="МК Онлайн" /><p>Информационно-партнёрский сервис по вопросам использования материнского капитала.</p></div><div><h3>Навигация</h3><a href="#possibilities">Возможности</a><a href="#process">Как это работает</a><a href="#benefits">Преимущества</a><a href="#faq">Вопросы и ответы</a></div><div><h3>Важно</h3><p>Информация на сайте носит ознакомительный характер и не является публичной офертой.</p></div></div><div className="footer-note"><p><b>МК Онлайн — информационно-партнёрский сервис.</b> Условия и оформление выбранного решения предоставляются соответствующей организацией-партнёром.</p></div><div className="footer-bottom"><span>© МК Онлайн, 2026</span><span>Работаем по всей России</span></div></footer>
    {modal && <ConsultationModal type={modal} onClose={() => setModal(null)} />}
  </main>;
}
