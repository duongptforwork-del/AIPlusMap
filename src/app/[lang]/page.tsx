import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate every hour

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang = 'en' } = params;

  // Fetch Hero Post
  const { data: heroPost } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('lang', lang)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Fetch Sub-Hero Posts (Next 2)
  const { data: subHeroPosts } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('lang', lang)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(1, 2);

  // Fetch Feed Posts
  const { data: feedPosts } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('lang', lang)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(3, 8);

  // Fetch Categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('lang', lang)
    .limit(6);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <nav className="border-b-2 border-black py-6 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-end">
          <div>
            <Link href={`/${lang}`} className="font-display text-4xl font-black tracking-tighter leading-none">
              AI PLUS MAP<span className="text-blue-600">.</span>
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-1">Intelligence Mapping Magazine</p>
          </div>
          
          <div className="flex space-x-10 font-bold text-xs uppercase tracking-widest pb-1">
            <Link href={`/${lang}/category/news`} className="hover:text-blue-600 transition-colors">News</Link>
            <Link href={`/${lang}/category/analysis`} className="hover:text-blue-600 transition-colors">Analysis</Link>
            <Link href={`/${lang}/category/guides`} className="hover:text-blue-600 transition-colors">Guides</Link>
            <Link href={`/${lang}/admin`} className="px-3 py-1 bg-black text-white rounded hover:bg-blue-600 transition-colors">Admin</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        {/* HERO SECTION */}
        <section className="h-[500px] w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-1 border-2 border-black rounded-3xl overflow-hidden mb-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-slate-100">
          {heroPost ? (
            <Link href={`/${lang}/news/${heroPost.slug}`} className="relative group overflow-hidden bg-slate-900 border-r-2 border-black">
              <img 
                src={heroPost.featured_image || "https://images.unsplash.com/photo-1677442136019-21780ecad995"} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                alt={heroPost.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-4 inline-block">Featured</span>
                <h2 className="font-display text-5xl font-black text-white leading-tight max-w-xl group-hover:underline decoration-blue-600 underline-offset-8">
                  {heroPost.title}
                </h2>
                <div className="flex items-center space-x-3 mt-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 border border-white/20"></div>
                  <span className="text-white/70 text-xs font-bold uppercase tracking-widest">By {heroPost.author_name}</span>
                </div>
              </div>
            </Link>
          ) : <div className="bg-slate-200 border-r-2 border-black"></div>}

          <div className="bg-white flex flex-col">
            {subHeroPosts?.map((post, idx) => (
              <Link key={post.id} href={`/${lang}/news/${post.slug}`} className={`flex-1 p-8 group hover:bg-slate-50 transition-colors ${idx === 0 ? 'border-b-2 border-black' : ''}`}>
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2 inline-block">{(post.categories as any)?.name || 'News'}</span>
                <h3 className="font-display text-2xl font-black leading-tight group-hover:text-blue-600">{post.title}</h3>
                <p className="text-slate-500 text-sm mt-3 line-clamp-2 italic font-medium">{post.excerpt}</p>
              </Link>
            ))}
            {!subHeroPosts?.length && <div className="flex-1"></div>}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16">
          <section className="space-y-16">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.4em] border-b-2 border-black pb-2 mb-10 flex justify-between items-center">
              Latest Stories
              <span className="w-20 h-0.5 bg-black"></span>
            </h4>
            
            {feedPosts?.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <Link href={`/${lang}/news/${post.slug}`}>
                  <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                    <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <img src={post.featured_image || `https://picsum.photos/seed/${post.id}/500/500`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={post.title} />
                    </div>
                    <div>
                      <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2 inline-block">{(post.categories as any)?.name}</span>
                      <h3 className="font-display text-3xl font-black leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-sm line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 space-x-4">
                        <span>{post.author_name}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>

          <aside className="space-y-16">
            <div className="bg-black text-white p-10 rounded-3xl shadow-[12px_12px_0px_0px_rgba(37,99,235,1)]">
              <h3 className="font-display text-3xl font-black mb-6 leading-none">JOIN THE<br/>NEWSLETTER</h3>
              <p className="text-slate-400 text-sm mb-8 font-medium">Curated AI news delivered to your inbox every Wednesday. No noise, just map.</p>
              <div className="space-y-4">
                <input type="email" placeholder="YOUR EMAIL" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                <button className="w-full bg-blue-600 text-white font-black py-3 rounded-lg hover:bg-blue-700 transition-colors text-xs uppercase tracking-widest">Subscribe</button>
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs font-black uppercase tracking-[0.4em] mb-8 flex items-center">
                <span className="mr-4">Top Categories</span>
                <span className="flex-1 h-px bg-slate-200"></span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {categories?.map((cat) => (
                  <Link key={cat.id} href={`/${lang}/category/${cat.slug}`} className="border-2 border-black p-4 rounded-xl font-display font-black text-sm uppercase tracking-tighter hover:bg-black hover:text-white transition-all text-center">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-slate-50 py-20 mt-20 border-t-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="font-display text-4xl font-black tracking-tighter mb-8 text-black">AI PLUS MAP</div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-black uppercase tracking-widest text-slate-500 mb-12">
            <Link href={`/${lang}/about`} className="hover:text-black">About</Link>
            <Link href={`/${lang}/privacy`} className="hover:text-black">Privacy</Link>
            <Link href={`/${lang}/contact`} className="hover:text-black">Contact</Link>
            <Link href={`/${lang}/advertise`} className="hover:text-black">Advertise</Link>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">© 2026 AI PLUS MAP — ALL RIGHTS RESERVED</p>
          <a href="https://deerflow.tech" target="_blank" className="inline-block text-[10px] font-black text-blue-600 hover:underline">CREATED BY DEERFLOW</a>
        </div>
      </footer>
    </div>
  );
}
