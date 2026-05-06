import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import GlobalSearch from '@/components/search/GlobalSearch';

const CATEGORIES = [
  { name: 'AI Market Trends', slug: 'ai-market-trends' },
  { name: 'AI Startups & Funding', slug: 'ai-startups-funding' },
  { name: 'Generative AI', slug: 'generative-ai' },
  { name: 'AI Enterprise', slug: 'ai-enterprise' }
];

export default function Navbar({ lang }: { lang: string }) {
  return (
    <header className="bg-white border-b-2 border-black py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-black p-2 group-hover:rotate-6 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.111a2 2 0 011.164-1.815l7-3.5a2 2 0 011.672 0l7 3.5A2 2 0 0121 5.111v10.377a2 2 0 01-1.553 1.944L14 20l-5 5z"></path>
              </svg>
            </div>
            <div>
              <span className="text-3xl font-display font-black tracking-tighter block leading-none">AI PLUS MAP</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">The Intelligence Cartography</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-1 font-black text-sm uppercase italic">
                <li><Link href={`/${lang}`} className="px-3 py-2 hover:bg-black hover:text-white transition-colors">Home</Link></li>
                <li className="relative group">
                  <Link href={`/${lang}/news`} className="px-3 py-2 flex items-center gap-1 hover:bg-black hover:text-white transition-colors">
                    News <ChevronDown size={14} />
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden group-hover:block z-50">
                    {CATEGORIES.map((cat) => (
                      <Link 
                        key={cat.slug} 
                        href={`/${lang}/category/${cat.slug}`}
                        className="block px-4 py-3 border-b border-black last:border-0 hover:bg-[#ef4444] hover:text-white transition-colors text-[12px]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </li>
                <li><Link href={`/${lang}/compare`} className="px-3 py-2 hover:bg-black hover:text-white transition-colors">Compare</Link></li>
                <li><Link href={`/${lang}/guide`} className="px-3 py-2 hover:bg-black hover:text-white transition-colors">AI Guide</Link></li>
                <li><Link href={`/${lang}/events`} className="px-3 py-2 hover:bg-black hover:text-white transition-colors">Events</Link></li>
              </ul>
            </nav>
            <GlobalSearch lang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}
