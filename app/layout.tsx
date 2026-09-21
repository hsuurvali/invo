import type { Metadata } from 'next';
import './globals.css';
import './refresh.css';
import { Header, Footer } from '@/components/site';
import { EngagementWidgets } from '@/components/engagement';
export const metadata: Metadata = { metadataBase: new URL('https://invo.ee'), title: { default: 'INVO — Arveldamine ilma käsitööta', template: '%s | INVO' }, description: 'Arved. Maksed. Automatiseerimine. Ühes kohas.', openGraph: { title: 'INVO', description: 'Arveldamine ilma käsitööta.', url: 'https://invo.ee', locale: 'et_EE', type: 'website' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="et"><body><Header/><main id="main">{children}</main><Footer/><EngagementWidgets/></body></html> }

