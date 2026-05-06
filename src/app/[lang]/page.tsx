import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 3600;

export default async function HomePage({ params: { lang } }: { params: { lang: string } }) {
  const supabase = createClient();

  // Optimized fetching using Promise.all for parallel performance
  const [
    { data: heroPosts },
    { data: recentPosts },
    { data: feedPosts }
  ] = await Promise.all([
    supabase.from('posts').select('*, categories(*)').eq('language', lang).order('created_at', { ascending: false }).limit(1),
    supabase.from('posts').select('*, categories(*)').eq('language', lang).order('created_at', { ascending: false }).range(1, 3),
    supabase.from('posts').select('*, categories(*)').eq('language', lang).order('created_at', { ascending: false }).range(4, 6)
  ]);

  const hero = heroPosts?.[0];
  const sidePosts = recentPosts || [];
  const bottomPosts = feedPosts || [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0F172A] text-white py-2 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span>{new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="hidden md:inline">Trending: OpenAI Sora 2.0 Release</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#3B82F6]">Login</Link>
            <Link href="#" className="hover:text-[#3B82F6]">Subscribe</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href={`/${lang}`} className="flex items-center gap-2 group">
              <div className="bg-[#0F172A] p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.111a2 2 0 011.164-1.815l7-3.5a2 2 0 011.672 0l7 3.5A2 2 0 0121 5.111v10.377a2 2 0 01-1.553 1.944L14 20l-5 5z"></path></svg>
              </div>
              <div>
                <span className="text-3xl font-display font-black tracking-tighter block leading-none">AI PLUS MAP</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">The Intelligence Cartography</span>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              <ul className="flex items-center font-bold text-sm uppercase tracking-tight">
                <li><Link href={`/${lang}`} className="px-4 py-2 text-[#3B82F6]">Home</Link></li>
                <li className="relative group">
                  <Link href={`/${lang}/news`} className="px-4 py-2 hover:text-[#3B82F6] flex items-center gap-1">
                    News <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                  </Link>
                </li>
                <li><Link href="#" className="px-4 py-2 hover:text-[#3B82F6]">Compare</Link></li>
                <li><Link href="#" className="px-4 py-2 hover:text-[#3B82F6]">AI Guide</Link></li>
                <li><Link href="#" className="px-4 py-2 hover:text-[#3B82F6]">Events</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Trending Ticker */}
      <div className="bg-white border-b border-slate-200 overflow-hidden relative group">
        <div className="absolute left-0 top-0 bottom-0 px-4 bg-[#ef4444] text-white font-black text-xs flex items-center z-10 skew-x-[-12deg] -ml-2">
          <span className="skew-x-[12deg] px-2">TRENDING NOW</span>
        </div>
        <div className="flex whitespace-nowrap py-3 pl-32 animate-[scroll_40s_linear_infinite]">
          {sidePosts.map((post) => (
            <Link key={post.id} href={`/${lang}/news/${post.slug}`} className="mx-8 font-bold text-sm hover:text-[#3B82F6]">
              {post.title}
            </Link>
          ))}
          {/* Duplicate for infinite effect */}
          {sidePosts.map((post) => (
            <Link key={`${post.id}-dup`} href={`/${lang}/news/${post.slug}`} className="mx-8 font-bold text-sm hover:text-[#3B82F6]">
              {post.title}
            </Link>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {hero && (
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl group h-[500px]">
              <img src={hero.image_url} alt={hero.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 text-white">
                <span className="inline-block px-3 py-1 bg-[#ef4444] text-[10px] font-black uppercase tracking-widest mb-4">
                  {hero.categories?.title || 'Featured'}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black leading-tight mb-4">
                  <Link href={`/${lang}/news/${hero.slug}`} className="hover:underline">{hero.title}</Link>
                </h2>
                <p className="text-slate-200 text-lg max-w-2xl line-clamp-2">{hero.description}</p>
              </div>
            </div>
          )}

          <aside className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex gap-4 p-4 hover:shadow-lg transition-shadow">
                <img src={post.image_url} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" alt={post.title} />
                <div>
                  <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest">{post.categories?.title}</span>
                  <h3 className="font-bold text-base leading-snug mt-1 hover:text-[#3B82F6] transition-colors">
                    <Link href={`/${lang}/news/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
            
            {/* Newsletter Widget */}
            <div className="bg-[#0F172A] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-display font-black text-xl mb-2">Join 50,000+ AI Experts</h4>
                <p className="text-xs text-slate-400 mb-4">Get the weekly AI Plus Map report in your inbox.</p>
                <div className="space-y-2">
                  <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-sm focus:outline-none" />
                  <button className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-sm transition-colors">Join Free</button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Latest News */}
        <section className="mb-16">
          <div className="flex justify-between items-end border-b-4 border-[#0F172A] pb-2 mb-8">
            <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter">Latest Updates</h2>
            <Link href={`/${lang}/news`} className="text-xs font-bold hover:text-[#3B82F6] flex items-center gap-1 group">
              SEE ALL NEWS 
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bottomPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="aspect-[16/9] overflow-hidden rounded-xl mb-4">
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <span className="text-[10px] font-black text-[#ef4444] uppercase tracking-widest">{post.categories?.title}</span>
                <h3 className="text-xl font-bold mt-2 leading-tight group-hover:text-[#3B82F6] transition-colors">
                  <Link href={`/${lang}/news/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-slate-500 text-sm mt-3 line-clamp-3">{post.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t-8 border-[#ef4444]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white p-1 rounded-lg">
                  <svg className="w-6 h-6 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.111a2 2 0 011.164-1.815l7-3.5a2 2 0 011.672 0l7 3.5A2 2 0 0121 5.111v10.377a2 2 0 01-1.553 1.944L14 20l-5 5z"></path></svg>
                </div>
                <span className="text-2xl font-display font-black tracking-tighter">AI PLUS MAP</span>
              </div>
              <p className="text-slate-400 max-w-md">AI Plus Map là nền tảng tin tức và hướng dẫn chuyên sâu về Trí tuệ nhân tạo.</p>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-500">Navigation</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href={`/${lang}/news`} className="hover:text-[#3B82F6]">Latest News</Link></li>
                <li><Link href="#" className="hover:text-[#3B82F6]">AI Comparisons</Link></li>
                <li><Link href="#" className="hover:text-[#3B82F6]">Usage Guides</Link></li>
              </ul>
            </div>
            <div>
               <div className="flex items-center gap-2">
                  <span className="opacity-50 text-[10px]">Crafted with precision</span>
                  <a href="https://deerflow.tech" target="_blank" className="font-bold text-[10px] text-white hover:text-[#3B82F6] transition-colors">✦ Created By Deerflow</a>
                </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-[10px] text-slate-500 text-center">
            <p>&copy; 2026 AI Plus Map. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
