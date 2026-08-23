import { useEffect, useState } from 'react';

const BASIC_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-basico-150-tecnicas-para-identificar-defeitos-em-graos-de-cafe';
const COMPLETE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-150-tecnicas-para-identificar-defeitos-em-graos-de-cafe';
const UPGRADE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-150-tecnicas-para-identificar-defeitos-em-graos-de-cafe-1';

const HERO_IMAGE = '/assets/coffee/hero-guide.webp';
const PRODUCT_IMAGE = '/assets/coffee/complete-plan.webp';
const GARDENERS_IMAGE = '/assets/coffee/showcase-people.webp';

const audienceCards = [
  { title: 'Quem Está Começando', text: 'Para quem está começando e quer aprender a reconhecer os defeitos de forma visual, sem depender apenas de textos difíceis ou tentar decorar tudo de uma vez.', image: '/assets/coffee-mini/audience-learning.png', alt: 'Grãos de café, lupa e guia aberto', primary: true },
  { title: 'Cafeicultores e Produtores de Café', text: 'Para quem produz café e quer conhecer melhor os próprios grãos, perceber alterações com mais facilidade e ampliar seu repertório sobre qualidade.', image: '/assets/coffee-mini/audience-producer.png', alt: 'Mãos de produtor segurando uma amostra de grãos de café' },
  { title: 'Produtores de Café Especial', text: 'Para quem trabalha buscando mais qualidade e quer desenvolver um olhar ainda mais atento para diferenças, defeitos e características dos grãos.', image: '/assets/coffee-mini/audience-specialty.png', alt: 'Seleção cuidadosa de grãos em bandeja clara' },
  { title: 'Classificadores e Quem Estuda Classificação', text: 'Para quem trabalha ou está aprendendo classificação e quer ter uma referência visual rápida para comparar, diferenciar e revisar defeitos sempre que precisar.', image: '/assets/coffee-mini/audience-classification.png', alt: 'Bandeja de classificação com grãos, pinça e lupa' },
];

const bonuses = [
  { title: 'Atlas Visual de Comparações', text: 'Compare defeitos parecidos lado a lado e enxergue com mais facilidade os detalhes que ajudam a diferenciar cada um.', value: 'R$ 27,00', image: '/assets/coffee/bonus-atlas.webp' },
  { title: '+30 Desafios de Identificação', text: 'Teste seu olhar com 30 casos visuais, tente identificar cada um e confira depois quais características entregam a resposta.', value: 'R$ 23,00', image: '/assets/coffee/bonus-challenges.webp' },
  { title: 'Mapas Mentais dos Defeitos do Café', text: 'Revise os principais defeitos, grupos e diferenças através de mapas simples, organizados e fáceis de consultar.', value: 'R$ 17,00', image: '/assets/coffee/bonus-maps.webp' },
  { title: 'Certificado de Conclusão', text: 'Ao finalizar o material, receba seu certificado de conclusão para registrar mais uma etapa do seu aprendizado sobre identificação de defeitos do café.', value: 'R$ 20,00', image: '/assets/coffee/bonus-certificate.webp' },
];

const deliverablePages = Array.from({ length: 9 }, (_, index) => `/assets/coffee/carousel/page-${String(index + 1).padStart(2, '0')}.webp`);

const basicItems = [
  ['yes', '+150 Técnicas para Identificar Defeitos em Grãos de Café'],
  ['yes', 'Acesso digital imediato'],
  ['yes', 'Consulta pelo celular'],
  ['no', 'Sem Atlas Visual de Comparações'],
  ['no', 'Sem +30 Desafios de Identificação'],
  ['no', 'Sem Mapas Mentais dos Defeitos do Café'],
  ['no', 'Sem Certificado de Conclusão'],
];

const completeCoreItems = [
  '+150 Técnicas para Identificar Defeitos em Grãos de Café',
  'Acesso digital imediato',
  'Acesso vitalício',
  'Pagamento único',
];

const completeBonusItems = [
  'Atlas Visual de Comparações',
  '+30 Desafios de Identificação',
  'Mapas Mentais dos Defeitos do Café',
  'Certificado de Conclusão',
];

const faqs = [
  ['O material é físico ou digital?', 'É 100% digital. Após a confirmação do pagamento, você poderá acessar o material pelo celular, computador ou tablet.'],
  ['Serve para quem está começando?', 'Sim. O material foi pensado para ser visual, direto e fácil de consultar, justamente para facilitar a vida de quem ainda está desenvolvendo o olhar para os defeitos dos grãos.'],
  ['E para quem já trabalha com café?', 'Também. Produtores, classificadores, beneficiadores, técnicos e outros profissionais podem usar o material como referência visual e consulta rápida.'],
  ['Preciso entender de classificação de café para usar?', 'Não. O conteúdo é organizado para facilitar a observação e comparação dos grãos mesmo para quem ainda está começando.'],
  ['Vou precisar assistir aulas longas?', 'Não. O foco é consulta rápida e ilustrada. Você pode abrir o material, encontrar o que precisa e consultar as técnicas sempre que surgir uma dúvida.'],
  ['Posso acessar pelo celular?', 'Sim. O material é digital e pode ser consultado pelo celular sempre que você precisar.'],
  ['O material substitui uma classificação oficial?', 'Não. Ele é um material educacional e de consulta visual. Classificações oficiais, decisões comerciais, laudos e situações que exigem confirmação técnica devem seguir os métodos, regulamentos e profissionais adequados.'],
  ['O acesso é imediato?', 'Sim. Após a confirmação do pagamento, o acesso ao material digital é liberado.'],
  ['O Plano Completo inclui certificado?', 'Sim. O Certificado de Conclusão faz parte dos 4 bônus exclusivos do Plano Completo.'],
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
    {[0, 1, 2, 3, 4].map((loop) => <div className="deliverableLoopGroup" key={`${className}-group-${loop}`}>{items.map((src, index) => <figure className="deliverablePreview" key={`${className}-${loop}-${index}`}><img src={src} alt="" loading="eager" decoding="async" fetchPriority={index === 0 && loop === 0 ? 'high' : 'low'} /></figure>)}</div>)}
  </div></div>;
  return <div className="deliverableCarousel" role="group" aria-label="Prévia de páginas internas do material"><div className="carouselGlow" aria-hidden="true"/><div className="deliverableViewport">{renderRow(deliverablePages.slice(0, 5), 'trackForward')}{renderRow(deliverablePages.slice(5), 'trackReverse')}</div></div>;
}

const visualBenefits = [
  { number: '01', title: 'Mais clareza para quem está começando', text: 'Entenda a lógica de cada técnica com referências visuais que deixam o primeiro passo mais simples.', image: '/assets/coffee-mini/benefit-learning.png', alt: 'Grãos de café comparados com uma lupa' },
  { number: '02', title: 'Mais facilidade para diferenciar defeitos parecidos', text: 'Compare sinais semelhantes e reconheça com mais rapidez o detalhe que separa uma condição da outra.', image: '/assets/coffee-mini/benefit-comparison.png', alt: 'Dois grãos de café contrastantes lado a lado' },
  { number: '03', title: 'Mais segurança na hora de avaliar os grãos', text: 'Entenda o que observar, com o que pode confundir e como organizar melhor a sua hipótese visual.', image: '/assets/coffee-mini/benefit-assessment.png', alt: 'Lupa observando um grão de café com rachadura' },
  { number: '04', title: 'Consulta rápida sempre que bater dúvida', text: 'Tenha uma referência organizada por perto, seja no início do aprendizado ou no trabalho com café.', image: '/assets/coffee-mini/benefit-reference.png', alt: 'Guia aberto com grão de café e marcador' },
];

function WhatChangesSection() {
  return <section className="whatChangesSection reveal" aria-labelledby="what-changes-title">
    <div className="whatChangesHeading">
      <p className="whatChangesEyebrow"><span /> NA PRÁTICA <span /></p>
      <h2 id="what-changes-title"><span>O QUE MUDA QUANDO VOCÊ TEM</span><strong>UM GUIA VISUAL PRONTO</strong><span>PARA CONSULTAR</span></h2>
      <p>Principalmente para quem está começando, mas extremamente útil também para quem já trabalha com café e quer mais clareza, segurança e praticidade na identificação dos grãos.</p>
    </div>
    <div className="whatChangesGrid">
      {visualBenefits.map((benefit) => <article className={`whatChangesCard whatChangesCard${benefit.number}`} key={benefit.number}>
        <figure className="whatChangesVisual"><img src={benefit.image} alt={benefit.alt} width="320" height="320" loading="lazy" decoding="async" /></figure>
        <div className="whatChangesCopy"><span>{benefit.number}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
      </article>)}
    </div>
  </section>;
}

const completePlanSummary = [
  { image: '/assets/coffee-mini/benefit-learning.png', alt: 'Grãos de café observados com lupa', title: '+150 Técnicas para Identificar Defeitos em Grãos de Café', description: 'Técnicas ilustradas para reconhecer, comparar e diferenciar alterações encontradas nos grãos diretamente pelo celular.' },
  { image: '/assets/coffee-mini/benefit-comparison.png', alt: 'Dois grãos de café em comparação', title: 'Atlas Visual de Comparações', description: 'Comparações lado a lado para enxergar os detalhes que ajudam a separar defeitos parecidos.' },
  { image: '/assets/coffee-mini/benefit-assessment.png', alt: 'Lupa avaliando um grão de café', title: '+30 Desafios de Identificação', description: 'Casos visuais para testar o olhar, conferir as respostas e entender quais sinais entregam cada defeito.' },
  { image: '/assets/coffee-mini/benefit-reference.png', alt: 'Guia de consulta com grão de café', title: 'Mapas Mentais dos Defeitos do Café', description: 'Revisões rápidas para organizar grupos de defeitos, comparações e sinais em uma leitura visual.' },
  { image: '/assets/coffee-mini/summary-certificate.png', alt: 'Certificado ilustrado com selo de café', title: 'Certificado de Conclusão', description: 'Certificado digital incluído no Plano Completo após concluir o material.' },
];

function CompletePlanSummary() {
  return <section className="completeSummarySection reveal" aria-labelledby="complete-summary-title">
    <div className="completeSummaryPattern" aria-hidden="true" />
    <figure className="gardenersShowcase"><img src={GARDENERS_IMAGE} alt="Prévia visual do material +150 Técnicas para Identificar Defeitos em Grãos de Café" loading="lazy" decoding="async" /></figure>
    <div className="completeSummaryHeading">
      <p className="completeSummaryEyebrow">PLANO COMPLETO</p>
      <h2 id="complete-summary-title">Veja tudo o que você terá <strong>acesso imediato</strong> ao escolher o material completo:</h2>
    </div>
    <div className="completeSummaryList">
      {completePlanSummary.map((item, index) => <article className="completeSummaryCard reveal" style={{ transitionDelay: `${index * 45}ms` }} key={item.title}>
        <figure className="completeSummaryIcon"><img src={item.image} alt={item.alt} width="320" height="320" loading="lazy" decoding="async" /></figure>
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
      <p>Adicione os 4 bônus para comparar melhor os defeitos, praticar sua identificação e revisar o conteúdo sempre que precisar.</p>
      <img src={PRODUCT_IMAGE} alt="Material completo com o guia principal e os quatro bônus" />
      <ul><li>+150 técnicas ilustradas</li><li>Atlas Visual de Comparações</li><li>+30 Desafios de Identificação</li><li>Mapas Mentais dos Defeitos do Café</li><li>Certificado de Conclusão</li><li>Acesso digital imediato</li></ul>
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
        <div className="heroCopy"><p className="heroEyebrow">MATERIAL VISUAL DE CONSULTA RÁPIDA</p><h1><span className="heroHighlight">+150 Técnicas para Identificar</span><span>Defeitos em Grãos de Café</span><span>com Mais Clareza e Segurança</span></h1><p className="lead">Um material visual e direto para quem está começando ou já trabalha com café e quer aprender a reconhecer, comparar e diferenciar defeitos nos grãos de forma muito mais prática.</p></div>
        <div className="heroMedia"><img className="heroImage" src={HERO_IMAGE} alt="Material +150 Técnicas para Identificar Defeitos em Grãos de Café" width="1200" height="1600" loading="eager" fetchPriority="high"/><CTA className="primaryPulse">ACESSAR AS +150 TÉCNICAS</CTA><p className="microcopy">Acesso digital imediato • Pagamento único • Consulte pelo celular</p></div>
      </section>

      <section className="section audienceSection reveal" aria-labelledby="audience-title"><h2 id="audience-title">PARA QUEM É ESTE MATERIAL?</h2><p className="audienceLead">Feito principalmente para facilitar a vida de quem está começando, mas útil também para quem já produz, seleciona ou trabalha diariamente com café.</p><div className="audienceGrid">{audienceCards.map((audience) => <article className={`audienceCard${audience.primary ? ' audienceCardPrimary' : ''}`} key={audience.title}><figure className="audienceVisual"><img src={audience.image} alt={audience.alt} width="320" height="320" loading="lazy" decoding="async" /></figure><div><h3>{audience.title}</h3><p>{audience.text}</p></div></article>)}</div></section>

      <section className="section demoSection reveal"><h2>Olhe o que você vai receber</h2><p className="sectionLead">Páginas ilustradas para você enxergar os defeitos de perto, entender o que observar e comparar diferenças sempre que precisar.</p><DeliverableCarousel/><div className="pillRow"><span>O que observar</span><span>Com o que pode confundir</span><span>Como diferenciar</span></div></section>

      <CompletePlanSummary />

      <div className="summaryCtaWrap reveal"><a className="summaryCtaButton" href="#checkout">Ver Planos</a></div>

      <WhatChangesSection />

      <section className="section bonusSection reveal" id="bonus-section"><p className="eyebrow">BÔNUS DO PLANO COMPLETO</p><h2>Além das +150 técnicas, você também recebe</h2><p className="bonusIntro">Um caminho complementar para diferenciar, praticar, revisar e concluir seu aprendizado sobre os defeitos do café.</p><div className="bonusGrid">{bonuses.map((bonus, index) => <article className="bonusCard" key={bonus.title}><span className="bonusNumber">BÔNUS {String(index + 1).padStart(2, '0')}</span><figure className="bonusVisual"><img src={bonus.image} alt={bonus.title} loading="lazy"/></figure><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonusPrice"><s>{bonus.value}</s><strong>GRÁTIS</strong></div></article>)}</div><div className="bonusTotal"><span className="bonusTotalTag">PRESENTES INCLUÍDOS</span><h3>Somando tudo o que você vai levar</h3><div className="bonusBreakdown">{bonuses.map((bonus) => <div key={bonus.title}><span>{bonus.title}</span><s>{bonus.value}</s></div>)}</div><div className="bonusSum"><span>VALOR TOTAL DOS BÔNUS</span><strong>R$ 87,00</strong></div><p>Mas hoje, tudo sairá por:</p><b className="bonusFreePrice">R$0,00 <small>(GRÁTIS)</small></b></div></section>

      <section className="priceSection" id="checkout"><div className="priceIntro reveal"><p className="eyebrow">DECIDA O SEU PLANO</p><h2>Escolha o <span className="priceTitleHighlight">MELHOR PLANO PARA VOCÊ</span></h2><p className="offerDeadline">Oferta Limitada - Termina em:</p><FlipCountdown targetTime={offerEndsAt} /></div>
        <article className="basicCard reveal"><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Básico</h3><p>Para acessar apenas o material principal.</p><div className="basicPrice">R$ 10,00</div><PlanList items={basicItems} basic/><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>Quero o Plano Básico</button><TrustStrip/></article>
        <article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><h3>Plano Completo</h3><p>Para levar o guia principal com todos os materiais complementares.</p><figure className="productImage"><img src={PRODUCT_IMAGE} alt="Plano Completo com o guia principal e os quatro bônus" loading="lazy"/></figure><p className="priceAnchor">De R$ 97,00 por apenas</p><div className="completePrice">R$ 27,90</div><PlanList items={completeCoreItems}/><div className="completeBonusBox"><div className="completeBonusHeader"><span className="completeGiftIcon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M7 21h34v20H7zM4 14h40v9H4zM24 14v27M13 14c-5-8 7-12 11 0m11 0c5-8-7-12-11 0"/></svg></span><div><span>SEU PACOTE DE PRESENTES</span><p>BÔNUS EXCLUSIVOS</p></div></div><div className="completeBonusOffer"><s>DE R$ 87,00</s></div><PlanList items={completeBonusItems}/></div><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>Quero Ter Acesso às +150 Técnicas e aos Bônus</a><TrustStrip inverse/></article>
      </section>

      <section className="section guarantee reveal"><div className="guaranteeSeal"><strong>7</strong><span>DIAS</span></div><div><h2>Garantia simples de 7 dias</h2><p>Você poderá acessar o material, conhecer o conteúdo e avaliar com calma. Se entender que ele não faz sentido para você, poderá solicitar o reembolso dentro do prazo de garantia.</p></div></section>

      <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta reveal"><p className="eyebrow">TENHA MAIS CLAREZA PARA AVALIAR OS GRÃOS</p><h2>Consulte o defeito, compare os sinais e saiba melhor o que observar no grão</h2><p>Tenha as +150 técnicas sempre disponíveis para estudar, comparar e consultar quando precisar.</p><CTA>QUERO ACESSAR AS +150 TÉCNICAS</CTA></section>
      <footer>Este material possui finalidade educacional e de consulta visual. A identificação por aparência deve ser interpretada dentro do contexto adequado e não substitui classificação oficial, análise laboratorial, laudo técnico ou profissional habilitado quando necessários. Decisões comerciais devem seguir os regulamentos e procedimentos vigentes.</footer>
    </main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)}/>}
  </>;
}
