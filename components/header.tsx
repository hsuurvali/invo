'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const groups = [
  { label: 'Lahendused', href: '/lahendused', items: [['Müügiarved', '/lahendused/muegiarved'], ['Ostuarved', '/lahendused/ostuarved'], ['E-arved', '/lahendused/e-arved'], ['Korduv arveldus', '/lahendused/korduv-arveldus'], ['Kinnisvarahaldus', '/lahendused/kinnisvarahaldus']] },
  { label: 'Hinnad', href: '/hinnad' },
  { label: 'Blogi', href: '/blogi' },
  { label: 'Meist', href: '/meist', items: [['INVOst', '/meist'], ['Turvalisus', '/turvalisus'], ['Kontakt', '/kontakt']] },
  { label: 'Tugi ja juhendid', href: '/abi', items: [['Abikeskus', '/abi'], ['Juhendid', '/juhendid'], ['Arendajatele', '/arendajatele']] },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="header"><div className="shell topbar">
    <Link href="/" className="logo" aria-label="INVO avaleht" onClick={() => setOpen(false)}>IN<span>V</span>O<span>.</span></Link>
    <nav className="desktop-nav" aria-label="Peamenüü">{groups.map(group => group.items ? <div className="nav-group" key={group.label}><Link href={group.href} className={pathname === group.href ? 'active' : ''}>{group.label}</Link><div className="nav-dropdown">{group.items.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div></div> : <Link key={group.href} href={group.href}>{group.label}</Link>)}</nav>
    <div className="header-actions"><span className="locale" aria-label="Lehe keel: eesti">🇪🇪 ET</span><Link href="/login" className="button outline">Logi sisse</Link><Link href="/kontakt" className="button">Saada päring</Link><Link href="/demo" className="button outline">Broneeri demo</Link></div>
    <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Sulge' : 'Menüü'}</button>
  </div>{open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobiilimenüü">{groups.map(group => <div key={group.label}><Link href={group.href} onClick={() => setOpen(false)}>{group.label}</Link>{group.items?.map(([label, href]) => <Link className="sub-link" key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div>)}<Link href="/login" onClick={() => setOpen(false)}>Logi sisse</Link><Link href="/kontakt" onClick={() => setOpen(false)}>Saada päring</Link><Link href="/demo" onClick={() => setOpen(false)}>Broneeri demo</Link></nav>}</header>;
}

