import { useEffect, useState } from 'react';

const BASIC_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-basico-120-tecnicas-de-poda-ornamental';
const COMPLETE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-120-tecnicas-de-poda-ornamental';
const UPGRADE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-120-tecnicas-de-poda-ornamental-1';

const HERO_IMAGE = '/assets/poda/hero.webp';
const PRODUCT_IMAGE = '/assets/poda/plano-completo.png';

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

      <section className="section bonusSection reveal"><p className="eyebrow">BÔNUS DO PLANO COMPLETO</p><h2>Além das +120 técnicas, você também recebe</h2><p className="bonusIntro">Quatro materiais práticos para visualizar formatos, planejar o serviço e revisar cada poda com mais clareza.</p><div className="bonusGrid">{bonuses.map((bonus, index) => <article className="bonusCard" key={bonus.title}><span className="bonusNumber">BÔNUS {String(index + 1).padStart(2, '0')}</span><figure className="bonusVisual"><img src={bonus.image} alt={bonus.title} loading="lazy"/></figure><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonusPrice"><s>{bonus.value}</s><strong>GRÁTIS</strong></div></article>)}</div><div className="bonusTotal"><span className="bonusTotalTag">PRESENTES INCLUÍDOS</span><h3>Somando tudo o que você vai levar</h3><div className="bonusBreakdown">{bonuses.map((bonus) => <div key={bonus.title}><span>{bonus.title}</span><s>{bonus.value}</s></div>)}</div><div className="bonusSum"><span>VALOR TOTAL DOS BÔNUS</span><strong>R$ 87,00</strong></div><p>Mas hoje, no Plano Completo, todos os bônus serão incluídos por:</p><b>R$ 0 <small>— GRÁTIS</small></b></div></section>

      <section className="priceSection" id="checkout"><div className="priceIntro reveal"><p className="eyebrow">DECIDA O SEU PLANO</p><h2>Escolha o <span className="priceTitleHighlight">MELHOR PLANO PARA VOCÊ</span></h2><p className="offerDeadline">Oferta Limitada - Termina em:</p><FlipCountdown targetTime={offerEndsAt} /></div>
        <article className="basicCard reveal"><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Básico</h3><p>Para acessar apenas o material principal.</p><div className="basicPrice">R$ 10,00</div><PlanList items={basicItems} basic/><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>Quero o Plano Básico</button><TrustStrip/></article>
        <article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><h3>Plano Completo</h3><p>Para levar o guia principal com todos os materiais complementares.</p><figure className="productImage"><img src={PRODUCT_IMAGE} alt="Plano Completo com o guia principal e os quatro bônus" loading="lazy"/></figure><p className="priceAnchor">De R$ 97,00 por apenas</p><div className="completePrice">R$ 27,90</div><PlanList items={completeCoreItems}/><div className="completeBonusBox"><p>🎁 BÔNUS EXCLUSIVOS - DE R$ 87,00 POR R$ 0,00</p><PlanList items={completeBonusItems}/></div><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>Quero Ter Acesso as +120 Técnicas e os Bônus</a><TrustStrip inverse/></article>
      </section>

      <section className="section guarantee reveal"><div className="guaranteeSeal"><strong>7</strong><span>DIAS</span></div><div><h2>Garantia simples de 7 dias</h2><p>Você pode acessar o material e conferir se ele faz sentido para o seu trabalho. Caso não queira continuar, basta solicitar o reembolso dentro do prazo da garantia.</p></div></section>

      <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta reveal"><p className="eyebrow">TENHA MAIS CLAREZA ANTES DE CORTAR</p><h2>Consulte a técnica, entenda o corte e saiba qual resultado buscar</h2><p>Tenha mais de 120 referências visuais organizadas para consultar sempre que precisar.</p><CTA>QUERO ACESSAR O MATERIAL</CTA></section>
      <footer>O material apresenta referências gerais de poda ornamental. Respeite a espécie, o estado da planta, a época, o uso correto de ferramentas, os equipamentos de proteção e os limites de segurança de cada serviço.</footer>
    </main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)}/>}
  </>;
}
