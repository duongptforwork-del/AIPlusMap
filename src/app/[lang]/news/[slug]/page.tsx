import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: posts } = await supabase.from('posts').select('slug').limit(20);
  return posts?.map((post) => ({ slug: post.slug })) || [];
}

export default async function NewsDetailPage({ params: { lang, slug } }: { params: { lang: string; slug: string } }) {
  const supabase = createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*, categories(*)')
    .eq('slug', slug)
    .single();

  if (!post) return notFound();

  return (
    <div className="min-h-screen flex flex-col">
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

            <nav>
              <ul className="flex items-center font-bold text-sm uppercase tracking-tight">
                <li><Link href={`/${lang}`} className="px-4 py-2 hover:text-[#3B82F6]">Home</Link></li>
                <li><Link href={`/${lang}/news`} className="px-4 py-2 text-[#3B82F6]">News</Link></li>
                <li><Link href="#" className="px-4 py-2 hover:text-[#3B82F6]">Compare</Link></li>
                <li><Link href="#" className="px-4 py-2 hover:text-[#3B82F6]">AI Guide</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-20 flex-grow">
        <article>
          <header className="mb-12">
            <span className="text-xs font-black text-[#ef4444] uppercase tracking-[0.2em] mb-6 inline-block">
              {post.categories?.title || 'Intelligence'}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] mb-8 tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 py-8 border-y border-slate-200">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                <span className="font-bold text-slate-400">DF</span>
              </div>
              <div>
                <p className="text-sm font-black">AI Plus Map Editor</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {new Date(post.created_at).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })} • 8 MIN READ
                </p>
              </div>
            </div>
          </header>

          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-xl font-medium leading-relaxed mb-8 italic text-slate-600 border-l-4 border-[#3B82F6] pl-6">
              {post.description}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </main>

      <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t-8 border-[#ef4444]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <p>&copy; 2026 AI Plus Map. All rights reserved.</p>
            <a href="https://deerflow.tech" target="_blank" className="font-bold text-white hover:text-[#3B82F6] transition-colors">✦ Created By Deerflow</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
