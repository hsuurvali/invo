'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Consent = { preferences: boolean; analytics: boolean; marketing: boolean };
const consentKey = 'invo-cookie-consent-v1';
const helpItems = [
  { title: 'Konto ja kasutajad', detail: 'Ligipääs ja ettevõtte seadistamine', href: '/abi/konto' },
  { title: 'Müügiarved ja maksed', detail: 'Arvete loomine ja laekumiste jälgimine', href: '/abi/arved-ja-maksed' },
  { title: 'Ostuarved', detail: 'Tarnijad, dokumendid ja kinnitused', href: '/lahendused/ostuarved' },
  { title: 'E-arved', detail: 'Operaator ja struktureeritud arved', href: '/e-arved' },
  { title: 'Integratsioonid ja API', detail: 'Ühenduste ja arendajate info', href: '/abi/integratsioonid-ja-api' },
];

export function EngagementWidgets() {
  const [cookieOpen, setCookieOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>({ preferences: false, analytics: false, marketing: false });
  const [hasSavedConsent, setHasSavedConsent] = useState(false);
  const [showData, setShowData] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [tab, setTab] = useState<'home' | 'help' | 'messages'>('home');
  const [query, setQuery] = useState('');

  useEffect(() => {
    queueMicrotask(() => {
      try { const saved = localStorage.getItem(consentKey); if (saved) { setConsent(JSON.parse(saved) as Consent); setHasSavedConsent(true); } } catch { /* Storage may be disabled. */ }
    });
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setCookieOpen(false); setHelpOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const saveConsent = (value: Consent) => { setConsent(value); try { localStorage.setItem(consentKey, JSON.stringify(value)); } catch { /* Preference remains active for this page. */ } setHasSavedConsent(true); setCookieOpen(false); };
  const filtered = helpItems.filter(item => `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase()));

  return <>
    <div className="floating-widget cookie-widget">
      {cookieOpen && <section className="cookie-panel" aria-label="Küpsiste sätted"><div className="widget-head"><strong>Küpsiste sätted</strong><button aria-label="Sulge küpsiste sätted" onClick={() => setCookieOpen(false)}>×</button></div><div className="cookie-body"><strong>Teie praegune staatus</strong><p>Vajalikud küpsised on alati lubatud. INVO ei kasuta praegu analüütika ega turunduse küpsiseid.</p><label><input type="checkbox" checked readOnly disabled /> Vajalik</label>{(['preferences','analytics','marketing'] as const).map(key => <label key={key}><input type="checkbox" checked={consent[key]} onChange={e => setConsent({ ...consent, [key]: e.target.checked })} /> {{ preferences: 'Eelistused', analytics: 'Statistika', marketing: 'Turundus' }[key]}</label>)}<button className="text-control" onClick={() => setShowData(!showData)} aria-expanded={showData}>{showData ? 'Peida andmed' : 'Näita andmeid'}⌄</button>{showData && <p className="cookie-detail">Salvestame valiku ainult selle brauseri kohalikku mällu. Kolmandate osapoolte jälgimist pole seadistatud. <Link href="/cookies">Loe küpsiste kohta</Link>.</p>}</div><div className="cookie-actions"><button className="button outline" onClick={() => saveConsent({ preferences: false, analytics: false, marketing: false })}>Loobu nõusolekust</button><button className="button" onClick={() => saveConsent(consent)}>Salvesta valik</button></div></section>}
      <button className="widget-launch" aria-label={hasSavedConsent ? 'Muuda küpsiste valikut' : 'Ava küpsiste sätted'} aria-expanded={cookieOpen} onClick={() => setCookieOpen(!cookieOpen)}><span className="toggle-icon" /></button>
    </div>
    <div className="floating-widget help-widget">
      {helpOpen && <section className="help-panel" aria-label="INVO abi"><div className="widget-head"><span className="widget-mark">i<span>.</span></span><strong>{tab === 'home' ? 'Kuidas saame aidata?' : tab === 'help' ? 'Abi' : 'Sõnumid'}</strong><button aria-label="Sulge abi" onClick={() => setHelpOpen(false)}>×</button></div><div className="help-content">{tab === 'messages' ? <div className="empty-messages"><span className="message-symbol">▣</span><h3>Sõnumeid pole</h3><p>Siin ei ole aktiivset vestlust. Saada meile päring ja vastame e-posti teel.</p><Link className="button" href="/kontakt" onClick={() => setHelpOpen(false)}>Saada päring</Link></div> : <><div className="help-intro">{tab === 'home' && <><span className="eyebrow">INVO ABI</span><h3>Tere! 👋<br />Kuidas saame aidata?</h3></>}<label className="search-label"><span className="sr-only">Otsi abi</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Otsi abi" type="search" /></label></div><div className="help-results">{tab === 'help' && <p className="help-count">{filtered.length} teemat</p>}{filtered.length ? filtered.map(item => <Link key={item.href} href={item.href} onClick={() => setHelpOpen(false)} className="help-result"><strong>{item.title}</strong><small>{item.detail}</small><span aria-hidden="true">→</span></Link>) : <p>Ühtegi vastet ei leitud. <Link href="/kontakt">Kirjuta meile</Link>.</p>}{tab === 'home' && <div className="help-demo"><p>Soovid INVOst rohkem teada?</p><Link className="button" href="/demo" onClick={() => setHelpOpen(false)}>Küsi demo</Link></div>}</div></>}</div><nav className="help-tabs" aria-label="Abi vaated"><button className={tab === 'home' ? 'selected' : ''} onClick={() => setTab('home')}><span>⌂</span>Avaleht</button><button className={tab === 'help' ? 'selected' : ''} onClick={() => setTab('help')}><span>?</span>Abi</button><button className={tab === 'messages' ? 'selected' : ''} onClick={() => setTab('messages')}><span>▤</span>Sõnumid</button></nav></section>}
      <button className="widget-launch" aria-label={helpOpen ? 'Sulge abi' : 'Ava abi'} aria-expanded={helpOpen} onClick={() => setHelpOpen(!helpOpen)}>{helpOpen ? '⌄' : '▤'}</button>
    </div>
  </>;
}

