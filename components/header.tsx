'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type MenuItem = { label: string; href: string };
type MenuCategory = { label: string; href: string; icon: string; items?: MenuItem[] };

const categories: MenuCategory[] = [
  { label: 'Arvelahendused', href: '/lahendused', icon: '▤', items: [
    { label: 'Müügiarved', href: '/lahendused/muegiarved' }, { label: 'Ostuarved', href: '/lahendused/ostuarved' }, { label: 'E-arved', href: '/lahendused/e-arved' }, { label: 'Arhiiv', href: '/lahendused/arhiiv' },
  ] },
  { label: 'Arvelduse automatiseerimine', href: '/automatiseerimine', icon: '↗', items: [
    { label: 'Korduv arveldus', href: '/lahendused/korduv-arveldus' }, { label: 'Arvete kinnitamine', href: '/lahendused/arvete-kinnitamine' }, { label: 'Kuluaruanded', href: '/lahendused/kuluaruanded' }, { label: 'Lepingupõhine arveldus', href: '/lahendused/kinnisvarahaldus' },
  ] },
  { label: 'Lisateenused', href: '/integratsioonid', icon: '◇', items: [
    { label: 'Integratsioonid', href: '/integratsioonid' }, { label: 'Korteriühistud', href: '/lahendused/korteriuhistud' }, { label: 'Kinnisvarahaldus', href: '/lahendused/kinnisvarahaldus' }, { label: 'Abi ja juhendid', href: '/abi' },
  ] },
  { label: 'Raamatupidajatele', href: '/lahendused/raamatupidajatele', icon: '♧' },
];

const secondary = [
  { label: 'Hinnad', href: '/hinnad' }, { label: 'Blogi', href: '/blogi' }, { label: 'Meist', href: '/meist' }, { label: 'Tugi ja juhendid', href: '/abi' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [active, setActive] = useState<number | null>(0);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMegaOpen(false); setMobileOpen(false); } };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const closeMenus = () => { setMegaOpen(false); setMobileOpen(false); };
  const selected = active === null ? null : categories[active];
  return <header className="header"><div className="shell topbar">
    <Link href="/" className="logo" aria-label="INVO avaleht" onClick={closeMenus}>IN<span>V</span>O<span>.</span></Link>
    <nav className="desktop-nav" aria-label="Peamenüü"><div className="mega-anchor" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
      <button className={`mega-trigger${megaOpen || pathname.startsWith('/lahendused') ? ' active' : ''}`} aria-expanded={megaOpen} aria-controls="solutions-menu" onClick={() => setMegaOpen(true)}>Lahendused <span aria-hidden="true">⌄</span></button>
      {megaOpen && <div id="solutions-menu" className="mega-menu"><div className="mega-categories"><Link href="/lahendused" className="mega-heading" onClick={closeMenus}>Lahendused</Link>{categories.map((category, index) => category.items ? <button key={category.label} className={`mega-category${active === index ? ' selected' : ''}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index}><span className="mega-icon" aria-hidden="true">{category.icon}</span><span>{category.label}</span><span className="mega-arrow" aria-hidden="true">{active === index ? '‹' : '›'}</span></button> : <Link key={category.label} className="mega-category" href={category.href} onMouseEnter={() => setActive(null)} onFocus={() => setActive(null)} onClick={closeMenus}><span className="mega-icon" aria-hidden="true">{category.icon}</span><span>{category.label}</span></Link>)}</div><div className="mega-details">{selected && <><Link href={selected.href} className="mega-heading" onClick={closeMenus}>{selected.label}</Link>{selected.items?.map(item => <Link key={item.href} href={item.href} className="mega-detail-link" onClick={closeMenus}><span className="mega-detail-icon" aria-hidden="true">↗</span>{item.label}</Link>)}</>}</div></div>}
    </div>{secondary.map(item => <Link key={item.href} href={item.href} onClick={closeMenus}>{item.label}</Link>)}</nav>
    <div className="header-actions"><span className="locale" aria-label="Lehe keel: eesti">🇪🇪 ET</span><Link href="/login" className="button outline">Logi sisse</Link><Link href="/kontakt" className="button">Saada päring</Link><Link href="/demo" className="button outline">Broneeri demo</Link></div>
    <button className="menu-toggle" aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? 'Sulge' : 'Menüü'}</button>
  </div>{mobileOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobiilimenüü"><div className="mobile-menu-section"><Link href="/lahendused" onClick={closeMenus}>Lahendused</Link>{categories.map(category => <div key={category.label} className="mobile-category"><Link href={category.href} onClick={closeMenus}>{category.label}</Link>{category.items?.map(item => <Link className="sub-link" key={item.href} href={item.href} onClick={closeMenus}>{item.label}</Link>)}</div>)}</div>{secondary.map(item => <Link key={item.href} href={item.href} onClick={closeMenus}>{item.label}</Link>)}<Link href="/login" onClick={closeMenus}>Logi sisse</Link><Link href="/kontakt" onClick={closeMenus}>Saada päring</Link><Link href="/demo" onClick={closeMenus}>Broneeri demo</Link></nav>}</header>;
}

