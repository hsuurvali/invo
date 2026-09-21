import type { MetadataRoute } from 'next';
import { allPaths } from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{return [{url:'https://invo.ee/'},...allPaths.map(x=>({url:`https://invo.ee/${x}`}))]}

