import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export const revalidate = 3600;

export default async function NewsArchivePage({ params: { lang } }: { params: { lang: string } }) {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(*)')
    .eq('language', lang)
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <span className="text-2xl font-display font-black tracking-tighter">AI PLUS MAP</span>
          </Link>
          <nav>
            <Link href={`/${lang}`} className="text-sm font-bold hover:text-[#3B82F6] uppercase">Back to Home</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-display font-black mb-2 italic">Latest News Archive</h1>
        <p className="text-slate-500 mb-12">Showing latest {posts?.length || 0} articles</p>

        <div className="space-y-12">
          {posts?.map((post, idx) => (
            <article key={post.id} className={`flex flex-col md:flex-row gap-8 items-start group ${idx > 0 ? 'border-t border-slate-100 pt-12' : ''}`}>
              <div className="w-full md:w-64 aspect-video bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#ef4444] uppercase tracking-widest">{post.categories?.title}</span>
                <h2 className="text-2xl font-bold mt-2 group-hover:text-[#3B82F6] transition-colors">
                  <Link href={`/${lang}/news/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-500 mt-4 line-clamp-2">{post.description}</p>
                <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-slate-400">
                  <span>{new Date(post.created_at).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>5 MIN READ</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-slate-50 py-12 mt-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <a href="https://deerflow.tech" target="_blank" className="text-xs font-bold opacity-50 hover:opacity-100">Created By Deerflow</a>
        </div>
      </footer>
    </div>
  );
}
