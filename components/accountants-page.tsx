import Link from 'next/link';
import { PartnerForm } from './partner-form';

const benefits = [
  { number: '01', title: 'Mitme kliendi töövoog', text: 'Koonda ettevõtete arved ja tähtajad selgelt eraldi vaadetesse. Organisatsioonide õigused valmivad koos kontosüsteemiga.' },
  { number: '02', title: 'Vähem korduvat sisestamist', text: 'Korduvate arvete, lepingute ja dokumentide sidumine aitab vähendada käsitsi tehtavaid samme.' },
  { number: '03', title: 'Parem üleandmine', text: 'Arve olek, muudatused ja maksed peaksid olema jälgitavad, et koostöö ettevõttega oleks sujuv.' },
];

export function AccountantsPage() {
  return <>
    <section className="accountants-hero"><div className="accountants-hero-shade"/><div className="shell accountants-hero-inner"><div className="eyebrow">INVO / RAAMATUPIDAJATELE</div><h1>Rohkem selgust sinu klientide arvelduses.</h1><p>Raamatupidaja töö vajab korrastatud dokumente, nähtavaid tähtaegu ja selget koostööd ettevõttega. INVO arendab nende töövoogude jaoks ühist kohta.</p><Link href="#partnerlus" className="button">Räägime koostööst</Link><div className="accountants-hero-points"><div><strong>Ülevaade mitmest ettevõttest</strong><span>Kliendid ja arved hoitakse organisatsioonide kaupa lahus.</span></div><div><strong>Vähem käsitsi tööd</strong><span>Korduvad tegevused ning aruanded kavandatakse töövoo osana.</span></div></div></div></section>
    <section className="section accountants-benefits"><div className="shell"><div className="section-head"><div className="eyebrow">RAAMATUPIDAJA TÖÖLAUD</div><h2>Üks koht, kus on lihtsam järge pidada.</h2><p>Need on INVO arendusplaani suunad. Funktsioonid avanevad pärast turvalise konto- ja andmekihi valmimist.</p></div><div className="grid">{benefits.map(benefit => <article className="card" key={benefit.number}><div className="num">{benefit.number}</div><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div></div></section>
    <section className="section alt"><div className="shell split"><div><div className="eyebrow">KOOSTÖÖ</div><h2>Arved, kinnitused ja ülevaated ühises rütmis.</h2><p className="copy">Ettevõtja saab keskenduda oma tööle, raamatupidaja näeb aga arvelduse jaoks vajalikku infot. Ülesanded ja ligipääsud kujundatakse rollipõhiselt, et igaüks näeks oma tööks vajalikku.</p><Link href="/lahendused/muegiarved" className="button">Vaata müügiarveid</Link></div><div className="accountants-summary"><div className="accountants-summary-head"><span>INVO / KLIENDID</span><span>NÄIDISVAADE</span></div><div><strong>Põhja Stuudio OÜ</strong><span>Arved ja laekumised</span></div><div><strong>Roheline Kodu OÜ</strong><span>Korduv arveldus</span></div><div><strong>Ranniku Teenused OÜ</strong><span>Ostuarvete ülevaade</span></div></div></div></section>
    <section className="accountants-partner" id="partnerlus"><div className="shell"><div className="eyebrow">RAAMATUPIDAJATE KOOSTÖÖ</div><h2>Liitu INVO partnerluse vestlusega.</h2><p className="accountants-partner-lead">Räägi, milliseid kliente teenindad ja mida arvelduse töövoos vajad. Võtame ühendust e-posti teel; partnerprogramm ei ole veel avatud.</p><PartnerForm/></div></section>
  </>;
}

