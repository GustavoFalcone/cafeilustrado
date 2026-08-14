import { useEffect, useState } from 'react';

const BASIC_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-basico-120-tecnicas-de-poda-ornamental';
const COMPLETE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-120-tecnicas-de-poda-ornamental';
const UPGRADE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-120-tecnicas-de-poda-ornamental-1';

const HERO_IMAGE = '/assets/poda/hero.webp';
const PRODUCT_IMAGE = '/assets/poda/plano-completo.png';
const GARDENERS_IMAGE = '/assets/poda/jardineiros-com-guia.png';

const audienceCards = [
  ['Jardineiros autônomos', 'Para quem atende clientes e quer consultar diferentes cortes antes ou durante o serviço.'],
  ['Quem está começando', 'Para quem ainda sente insegurança ao podar arbustos, cercas-vivas e plantas ornamentais.'],
  ['Quem ainda aprende no improviso', 'Para quem aprendeu na prática, mas quer ter referências visuais organizadas em um só lugar.'],
  ['Quem quer melhorar o acabamento', 'Para quem deseja reduzir falhas, evitar cortes excessivos e entregar um resultado mais uniforme.'],
];

const bonuses = [
  { title: 'Atlas Visual de Formatos Ornamentais', text: 'Compare formatos como esfera, cone, oval, coluna, cerca-viva e topiaria em camadas antes de escolher o acabamento.', value: 'R$ 27,00', image: '/assets/poda/bonus-01.png' },
  { title: 'Guia Visual: Onde Cortar e Onde Não Cortar', text: 'Veja pontos de corte, brotações que devem ser preservadas e erros comuns que podem comprometer o resultado.', value: 'R$ 23,00', image: '/assets/poda/bonus-02.png' },
  { title: 'Ficha Profissional de Planejamento e Revisão da Poda', text: 'Organize o objetivo, as ferramentas, o formato desejado e a revisão final de cada serviço.', value: 'R$ 17,00', image: '/assets/poda/bonus-03.png' },
  { title: 'Certificado de Conclusão', text: 'Um certificado digital para preencher, salvar ou imprimir após concluir o material.', value: 'R$ 20,00', image: '/assets/poda/bonus-04.png' },
];

const deliverablePages = Array.from({ length: 9 }, (_, index) => `/assets/poda/pagina-${String(index + 1).padStart(2, '0')}.png`);

const basicItems = [
  ['yes', '+120 Técnicas de Poda Ornamental'],
  ['yes', 'Acesso digital imediato'],
  ['no', 'Sem Atlas Visual de Formatos Ornamentais'],
  ['no', 'Sem Guia Visual: Onde Cortar e Onde Não Cortar'],
  ['no', 'Sem Ficha Profissional de Planejamento e Revisão da Poda'],
  ['no', 'Sem Certificado de Conclusão'],
];

const completeCoreItems = [
  '+120 Técnicas de Poda Ornamental',
  'Acesso digital imediato',
  'Acesso vitalício',
  'Pagamento único',
];

const completeBonusItems = [
  'Atlas Visual de Formatos Ornamentais',
  'Guia Visual: Onde Cortar e Onde Não Cortar',
  'Ficha Profissional de Planejamento e Revisão da Poda',
  'Certificado de Conclusão',
];

const faqs = [
  ['O material é físico ou digital?', 'É digital. Após a confirmação do pagamento, você poderá acessar o material pelo celular, computador ou tablet.'],
  ['É indicado para quem está começando?', 'Sim. O conteúdo é visual, direto e organizado para ajudar quem ainda sente insegurança na hora de realizar diferentes tipos de poda ornamental.'],
  ['Serve para quem já trabalha com jardinagem?', 'Sim. O material também funciona como uma fonte de consulta para jardineiros que já atendem clientes e desejam ampliar suas referências.'],
  ['Preciso assistir a aulas longas?', 'Não. O conteúdo é apresentado em páginas visuais e orientações curtas para consulta rápida.'],
  ['Consigo consultar pelo celular?', 'Sim. O material pode ser acessado pelo celular, tablet ou computador sempre que você precisar.'],
  ['As técnicas servem para qualquer planta?', 'O material é voltado à poda ornamental e apresenta referências gerais. A resposta de cada planta pode variar conforme a espécie, o estado, a época e o objetivo da poda.'],
  ['O material ensina poda de árvores grandes ou trabalho em altura?', 'Não. O foco é poda ornamental. Trabalhos em altura, árvores de grande porte e situações próximas à rede elétrica exigem capacitação, equipamentos e avaliação adequada.'],
  ['O acesso é imediato?', 'Sim. O acesso é liberado digitalmente após a confirmação do pagamento.'],
  ['Tem certificado?', 'Sim. O Certificado de Conclusão está incluído no Plano Completo.'],
];

const formatTime = (seconds) => [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map((n) => String(n).padStart(2, '0')).join(':');

function useCountdown(targetTime) {
  const calculateRemaining = () => Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
  const [remaining, setRemaining] = useState(calculateRemaining);
  useEffect(() => {
    const timer = setInterval(() => setRemaining(calculateRemaining()), 250);
    return () => clearInterval(timer);
  }, [targetTime]);
  return remaining;
}

function CountdownBar({ targetTime }) {
  const remaining = useCountdown(targetTime);
  return <div className="topCountdown" role="timer" aria-label={`Oferta exclusiva apenas hoje, faltam ${formatTime(remaining)}`}><strong>OFERTA EXCLUSIVA APENAS HOJE</strong><span>•</span><b>FALTAM {formatTime(remaining)}</b></div>;
}

function FlipDigit({ value }) {
  const [display, setDisplay] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === display) return undefined;
    setPrevious(display);
    setDisplay(value);
    setFlipping(true);
    const animation = setTimeout(() => setFlipping(false), 620);
    return () => clearTimeout(animation);
  }, [value]);

  return <span className={`flipDigit${flipping ? ' isFlipping' : ''}`} aria-hidden="true">
    <span className="flipHalf flipTop"><span>{display}</span></span>
    <span className="flipHalf flipBottom"><span>{display}</span></span>
    {flipping && <><span className="flipFlap flipFlapTop"><span>{previous}</span></span><span className="flipFlap flipFlapBottom"><span>{display}</span></span></>}
    <span className="flipHinge" />
  </span>;
}

function FlipCountdown({ targetTime }) {
  const remaining = useCountdown(targetTime);
  const [hours, minutes, seconds] = formatTime(remaining).split(':');
  const groups = [[hours, 'HORAS'], [minutes, 'MINUTOS'], [seconds, 'SEGUNDOS']];
  return <div className="offerFlipClock" role="timer" aria-label={`Oferta termina em ${hours} horas, ${minutes} minutos e ${seconds} segundos`}>
    <span className="srOnly">Oferta termina em {formatTime(remaining)}</span>
    {groups.map(([digits, label], index) => <div className="flipUnit" key={label}>
      <div className="flipDigits"><FlipDigit value={digits[0]} /><FlipDigit value={digits[1]} /></div>
      <span className="flipLabel">{label}</span>
      {index < groups.length - 1 && <span className="flipSeparator" aria-hidden="true"><i /><i /></span>}
    </div>)}
  </div>;
}

function DeliverableCarousel() {
  const renderRow = (items, className) => <div className="carouselRow" aria-hidden="true"><div className={`deliverableTrack ${className}`}>
    {[0, 1, 2].map((loop) => <div className="deliverableLoopGroup" key={`${className}-group-${loop}`}>{items.map((src, index) => <figure className="deliverablePreview" key={`${className}-${loop}-${index}`}><img src={src} alt="" loading="eager" decoding="async" fetchPriority={index === 0 && loop === 0 ? 'high' : 'low'} /></figure>)}</div>)}
  </div></div>;
  return <div className="deliverableCarousel" role="group" aria-label="Prévia de páginas internas do material"><div className="carouselGlow" aria-hidden="true"/><div className="deliverableViewport">{renderRow(deliverablePages.slice(0, 5), 'trackForward')}{renderRow(deliverablePages.slice(5), 'trackReverse')}</div></div>;
}

const visualBenefits = [
  { number: '01', variant: 'learn', title: 'Mais clareza para quem está começando', text: 'Entenda a lógica de cada técnica com referências visuais que deixam o primeiro passo mais simples.' },
  { number: '02', variant: 'compare', title: 'Mais facilidade para diferenciar técnicas e formatos', text: 'Compare situações parecidas e reconheça com mais rapidez qual resultado combina com a planta.' },
  { number: '03', variant: 'decide', title: 'Mais segurança para decidir onde cortar', text: 'Visualize o ponto de corte, o que deve ser preservado e o acabamento esperado antes de usar a tesoura.' },
  { number: '04', variant: 'consult', title: 'Consulta rápida sempre que bater dúvida', text: 'Tenha uma referência organizada por perto, seja no início do aprendizado ou durante um serviço.' },
];

function BenefitIllustration({ variant }) {
  if (variant === 'learn') return <svg viewBox="0 0 180 140" role="img" aria-label="Guia visual, planta e lupa para aprendizado inicial">
    <path className="benefitBlob" d="M18 67c0-31 24-51 57-49 24 1 36 12 58 11 27-2 39 18 32 43-7 26-27 49-58 51-24 2-35-12-55-11-26 1-34-20-34-45Z"/>
    <rect className="benefitPaper" x="70" y="28" width="62" height="82" rx="9"/>
    <path className="benefitLine" d="M84 46h33M84 58h25M84 91h34"/>
    <path className="benefitLeaf" d="M100 81c-18-3-22-17-20-20 3-2 18-1 24 12m-3 7c15-3 20-15 18-19-4-1-17 1-21 12m2 17V70"/>
    <circle className="benefitLens" cx="54" cy="87" r="22"/>
    <path className="benefitHandle" d="m38 103-14 14"/>
  </svg>;

  if (variant === 'compare') return <svg viewBox="0 0 180 140" role="img" aria-label="Comparação visual entre dois formatos de arbustos">
    <path className="benefitBlob" d="M16 74c2-37 30-56 66-48 20 5 31-4 51 0 28 6 39 35 24 59-14 24-40 38-70 32-27-6-37 4-57-8-12-8-15-21-14-35Z"/>
    <path className="benefitPot" d="M31 93h47l-6 22H37Z"/>
    <path className="benefitPlant" d="M37 87c-2-27 8-48 18-48s22 19 17 48Z"/>
    <path className="benefitPot" d="M106 93h47l-6 22h-35Z"/>
    <path className="benefitPlant" d="M111 87c1-25 9-46 18-46s17 21 18 46Z"/>
    <path className="benefitCompare" d="M83 54h14m-7-7 7 7-7 7M97 79H83m7-7-7 7 7 7"/>
    <path className="benefitCut" d="M38 60c10-5 24-5 34 0M112 60c9-4 24-4 34 0"/>
  </svg>;

  if (variant === 'decide') return <svg viewBox="0 0 180 140" role="img" aria-label="Tesoura, ramo marcado e símbolo de verificação">
    <path className="benefitBlob" d="M22 62c8-34 40-48 70-35 20 8 29-5 48 3 24 10 29 40 12 61-18 22-45 28-72 23-31-5-55-19-59-40-1-4-1-8 1-12Z"/>
    <path className="benefitBranch" d="M45 103c23-16 41-37 52-65m-34 47c-3-12-1-24 6-33m4 23c12-2 23-8 31-18"/>
    <path className="benefitLeaf" d="M60 66c-14 0-22-9-22-14 6-3 20-1 26 9m28-8c11-8 23-7 27-3-1 6-11 15-24 12"/>
    <circle className="benefitScissor" cx="112" cy="88" r="12"/>
    <circle className="benefitScissor" cx="137" cy="106" r="12"/>
    <path className="benefitScissor" d="m120 94 23-39m-17 47-24-45"/>
    <circle className="benefitCheckCircle" cx="137" cy="42" r="18"/>
    <path className="benefitCheck" d="m129 42 6 6 11-13"/>
  </svg>;

  return <svg viewBox="0 0 180 140" role="img" aria-label="Guia digital aberto para consulta rápida">
    <path className="benefitBlob" d="M17 72c-1-28 22-49 53-49 23 0 34 10 55 5 29-7 46 17 37 45-9 29-31 47-61 48-26 0-39-10-61-7-19 2-22-22-23-42Z"/>
    <rect className="benefitDevice" x="48" y="22" width="77" height="102" rx="13"/>
    <rect className="benefitScreen" x="57" y="32" width="59" height="80" rx="6"/>
    <path className="benefitLeaf" d="M88 81c-17-3-23-16-20-21 5-2 19 1 24 12m-2 9c15-4 20-17 17-21-4-1-17 3-21 14m2 19V70"/>
    <path className="benefitLine" d="M67 44h39M67 99h39"/>
    <path className="benefitBookmark" d="M126 42h25v52l-12-8-13 8Z"/>
    <path className="benefitBolt" d="m139 52-7 13h7l-3 11 10-15h-7l4-9Z"/>
  </svg>;
}

function WhatChangesSection() {
  return <section className="whatChangesSection reveal" aria-labelledby="what-changes-title">
    <div className="whatChangesHeading">
      <p className="whatChangesEyebrow"><span /> NA PRÁTICA <span /></p>
      <h2 id="what-changes-title"><span>O QUE MUDA QUANDO VOCÊ TEM</span><strong>UM GUIA VISUAL PRONTO</strong><span>PARA CONSULTAR</span></h2>
      <p>Principalmente para quem está começando, mas extremamente útil também para jardineiros que querem mais clareza, segurança e praticidade na poda ornamental.</p>
    </div>
    <div className="whatChangesGrid">
      {visualBenefits.map((benefit) => <article className={`whatChangesCard whatChangesCard${benefit.number}`} key={benefit.number}>
        <figure className="whatChangesVisual"><BenefitIllustration variant={benefit.variant} /></figure>
        <div className="whatChangesCopy"><span>{benefit.number}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
      </article>)}
    </div>
  </section>;
}

const completePlanSummary = [
  { icon: 'book', title: '+120 Técnicas de Poda Ornamental', description: 'Mais de 120 técnicas ilustradas para consultar cortes, formatos, cercas-vivas, arbustos, topiarias e acabamentos diretamente pelo celular.' },
  { icon: 'shapes', title: 'Atlas Visual de Formatos Ornamentais', description: 'Referências visuais de esferas, cones, colunas, cercas-vivas e outros formatos para comparar antes de definir o acabamento.' },
  { icon: 'scissors', title: 'Guia Visual: Onde Cortar e Onde Não Cortar', description: 'Diagramas simples para identificar pontos de corte, partes que devem ser preservadas e erros que podem comprometer o resultado.' },
  { icon: 'clipboard', title: 'Ficha Profissional de Planejamento e Revisão', description: 'Uma ficha prática para organizar o objetivo da poda, revisar o acabamento e registrar os principais pontos do serviço.' },
  { icon: 'certificate', title: 'Certificado de Conclusão', description: 'Certificado digital incluído no Plano Completo para preencher, salvar ou imprimir após concluir o material.' },
];

function SummaryIcon({ name }) {
  if (name === 'book') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 6h9a4 4 0 0 1 4 4v16a4 4 0 0 0-4-4H5Zm22 0h-5a4 4 0 0 0-4 4v16a4 4 0 0 1 4-4h5Z"/><path d="M10 11h4m-4 5h4m8-5h1m-1 5h1"/></svg>;
  if (name === 'shapes') return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="9" cy="11" r="5"/><path d="m20 17 5-11 5 11ZM5 26h8v-7H5Zm15 0h8v-5h-8Z"/></svg>;
  if (name === 'scissors') return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="8" cy="23" r="4"/><circle cx="23" cy="24" r="4"/><path d="m11 20 15-15M11 20l15 1M15 16 7 5"/></svg>;
  if (name === 'clipboard') return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="5" width="20" height="24" rx="3"/><path d="M12 5V3h8v2M11 12h10M11 17h10M11 22h6"/><path d="m20 22 2 2 4-5"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 4h18v18H7z"/><path d="M11 9h10m-10 5h10m-10 4h6"/><circle cx="22" cy="22" r="6"/><path d="m19 27-1 4 4-2 4 2-1-4"/></svg>;
}

function CompletePlanSummary() {
  return <section className="completeSummarySection reveal" aria-labelledby="complete-summary-title">
    <div className="completeSummaryPattern" aria-hidden="true" />
    <figure className="gardenersShowcase"><img src={GARDENERS_IMAGE} alt="Dois jardineiros apresentando o guia +120 Técnicas de Poda Ornamental" loading="lazy" decoding="async" /></figure>
    <div className="completeSummaryHeading">
      <p className="completeSummaryEyebrow">PLANO COMPLETO</p>
      <h2 id="complete-summary-title">Veja tudo o que você terá <strong>acesso imediato</strong> ao escolher o material completo:</h2>
    </div>
    <div className="completeSummaryList">
      {completePlanSummary.map((item, index) => <article className="completeSummaryCard reveal" style={{ transitionDelay: `${index * 45}ms` }} key={item.title}>
        <span className="completeSummaryIcon"><SummaryIcon name={item.icon} /></span>
        <div><h3>{item.title}</h3><p>{item.description}</p></div>
      </article>)}
    </div>
    <p className="completeSummaryMicro"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4M13 6l-3 5h3l-2 4 5-6h-3l2-3Z"/></svg><span>Acesso digital imediato <b>•</b> Consulte pelo celular sempre que precisar</span></p>
  </section>;
}

function scrollToPlans(event) { event?.preventDefault(); document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function CTA({ children, className = '' }) { return <a href="#checkout" className={`cta ${className}`} onClick={scrollToPlans}>{children}</a>; }

function PlanList({ items, basic = false }) {
  return <ul className="planList">{items.map((item) => { const [type, text] = basic ? item : ['yes', item]; return <li className={type === 'no' ? 'notIncluded' : ''} key={text}><span className="planIcon" aria-hidden="true">{type === 'no' ? '×' : '✓'}</span><span className="planItemText">{text}</span></li>; })}</ul>;
}

function TrustStrip({ inverse = false }) {
  return <div className={`planTrust ${inverse ? 'planTrustInverse' : ''}`} aria-label="Pagamento seguro, acesso imediato e sem mensalidades">
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><small>Pagamento<br/>Seguro</small></span>
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13H11l-1 9 8.5-12H12l1-8Z"/></svg><small>Acesso<br/>Imediato</small></span>
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18M8 15l8 0M8 18h5"/></svg><small>Sem<br/>Mensalidades</small></span>
  </div>;
}

function UpgradeModal({ onClose }) {
  return <div className="upgradeOverlay" role="presentation" onMouseDown={onClose}>
    <section className="upgradeModal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onMouseDown={(event) => event.stopPropagation()}>
      <button className="upgradeClose" type="button" onClick={onClose} aria-label="Fechar oferta">×</button>
      <p className="upgradeEyebrow">OFERTA ESPECIAL</p>
      <h2 id="upgrade-title">Leve o material completo por apenas R$ 7,90 a mais</h2>
      <p>Além das +120 técnicas, você desbloqueia o Atlas Visual, o Guia de Cortes, a Ficha Profissional e o Certificado de Conclusão.</p>
      <img src={PRODUCT_IMAGE} alt="Material completo com o guia principal e os quatro bônus" />
      <ul><li>+120 técnicas ilustradas</li><li>Atlas Visual de Formatos Ornamentais</li><li>Guia Visual: Onde Cortar e Onde Não Cortar</li><li>Ficha Profissional de Planejamento e Revisão da Poda</li><li>Certificado de Conclusão</li><li>Acesso digital imediato</li></ul>
      <strong>TOTAL: R$ 17,90</strong>
      <a className="upgradeButton" href={UPGRADE_CHECKOUT_URL}>QUERO O PLANO COMPLETO</a>
      <a className="upgradeDecline" href={BASIC_CHECKOUT_URL}>Continuar apenas com o Plano Básico</a>
    </section>
  </div>;
}

export default function App() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [offerEndsAt] = useState(() => Date.now() + 30 * 60 * 1000);
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('isVisible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -35px' });
    elements.forEach((el) => observer.observe(el)); return () => observer.disconnect();
  }, []);

  return <>
    <CountdownBar targetTime={offerEndsAt} />
    <main>
      <section className="hero reveal">
        <div className="heroCopy"><p className="heroEyebrow">MATERIAL VISUAL DE CONSULTA RÁPIDA</p><h1><span className="heroHighlight">+120 Técnicas de Poda Ornamental</span><span>para saber onde cortar e deixar um</span><span>acabamento mais bonito</span></h1><p className="lead">Um material visual e direto para quem trabalha com jardinagem e quer entender onde cortar, o que preservar e qual resultado buscar em arbustos, cercas-vivas e plantas ornamentais.</p></div>
        <div className="heroMedia"><img className="heroImage" src={HERO_IMAGE} alt="Material +120 Técnicas de Poda Ornamental" width="1200" height="1600" loading="eager" fetchPriority="high"/><CTA className="primaryPulse">ACESSAR AS TÉCNICAS</CTA><p className="microcopy">Acesso digital imediato • Pagamento único • Consulta pelo celular</p></div>
      </section>

      <section className="section reveal"><h2>Para quem é este material?</h2><div className="audienceGrid">{audienceCards.map(([title, text]) => <article className="audienceCard" key={title}><span className="check">✓</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="section demoSection reveal"><h2>Olhe o que você vai receber</h2><p className="sectionLead">Cada técnica reúne marcações, diagramas e orientações curtas para você identificar a situação, entender o corte e visualizar o resultado antes de começar.</p><DeliverableCarousel/><div className="pillRow"><span>Onde cortar</span><span>O que preservar</span><span>Qual resultado buscar</span></div></section>

      <CompletePlanSummary />

      <div className="summaryCtaWrap reveal"><a className="summaryCtaButton" href="#checkout">Ver Planos</a></div>

      <WhatChangesSection />

      <section className="section bonusSection reveal" id="bonus-section"><p className="eyebrow">BÔNUS DO PLANO COMPLETO</p><h2>Além das +120 técnicas, você também recebe</h2><p className="bonusIntro">Quatro materiais práticos para visualizar formatos, planejar o serviço e revisar cada poda com mais clareza.</p><div className="bonusGrid">{bonuses.map((bonus, index) => <article className="bonusCard" key={bonus.title}><span className="bonusNumber">BÔNUS {String(index + 1).padStart(2, '0')}</span><figure className="bonusVisual"><img src={bonus.image} alt={bonus.title} loading="lazy"/></figure><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonusPrice"><s>{bonus.value}</s><strong>GRÁTIS</strong></div></article>)}</div><div className="bonusTotal"><span className="bonusTotalTag">PRESENTES INCLUÍDOS</span><h3>Somando tudo o que você vai levar</h3><div className="bonusBreakdown">{bonuses.map((bonus) => <div key={bonus.title}><span>{bonus.title}</span><s>{bonus.value}</s></div>)}</div><div className="bonusSum"><span>VALOR TOTAL DOS BÔNUS</span><strong>R$ 87,00</strong></div><p>Mas hoje, tudo sairá por:</p><b className="bonusFreePrice">R$0,00 <small>(GRÁTIS)</small></b></div></section>

      <section className="priceSection" id="checkout"><div className="priceIntro reveal"><p className="eyebrow">DECIDA O SEU PLANO</p><h2>Escolha o <span className="priceTitleHighlight">MELHOR PLANO PARA VOCÊ</span></h2><p className="offerDeadline">Oferta Limitada - Termina em:</p><FlipCountdown targetTime={offerEndsAt} /></div>
        <article className="basicCard reveal"><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Básico</h3><p>Para acessar apenas o material principal.</p><div className="basicPrice">R$ 10,00</div><PlanList items={basicItems} basic/><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>Quero o Plano Básico</button><TrustStrip/></article>
        <article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><h3>Plano Completo</h3><p>Para levar o guia principal com todos os materiais complementares.</p><figure className="productImage"><img src={PRODUCT_IMAGE} alt="Plano Completo com o guia principal e os quatro bônus" loading="lazy"/></figure><p className="priceAnchor">De R$ 97,00 por apenas</p><div className="completePrice">R$ 27,90</div><PlanList items={completeCoreItems}/><div className="completeBonusBox"><div className="completeBonusHeader"><span className="completeGiftIcon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M7 21h34v20H7zM4 14h40v9H4zM24 14v27M13 14c-5-8 7-12 11 0m11 0c5-8-7-12-11 0"/></svg></span><div><span>SEU PACOTE DE PRESENTES</span><p>BÔNUS EXCLUSIVOS</p></div></div><div className="completeBonusOffer"><s>DE R$ 87,00</s></div><PlanList items={completeBonusItems}/></div><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>Quero Ter Acesso as +120 Técnicas e os Bônus</a><TrustStrip inverse/></article>
      </section>

      <section className="section guarantee reveal"><div className="guaranteeSeal"><strong>7</strong><span>DIAS</span></div><div><h2>Garantia simples de 7 dias</h2><p>Você pode acessar o material e conferir se ele faz sentido para o seu trabalho. Caso não queira continuar, basta solicitar o reembolso dentro do prazo da garantia.</p></div></section>

      <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta reveal"><p className="eyebrow">TENHA MAIS CLAREZA ANTES DE CORTAR</p><h2>Consulte a técnica, entenda o corte e saiba qual resultado buscar</h2><p>Tenha mais de 120 referências visuais organizadas para consultar sempre que precisar.</p><CTA>QUERO ACESSAR O MATERIAL</CTA></section>
      <footer>O material apresenta referências gerais de poda ornamental. Respeite a espécie, o estado da planta, a época, o uso correto de ferramentas, os equipamentos de proteção e os limites de segurança de cada serviço.</footer>
    </main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)}/>}
  </>;
}
