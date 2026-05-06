import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function CategoryPage({ params }: { params: { lang: string, slug: string } }) {
  const { lang, slug } = params;

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('lang', lang)
    .single();

  if (!category) {
    notFound();
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('category_id', category.id)
    .eq('lang', lang)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="border-b-2 border-black py-6 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-end">
          <Link href={`/${lang}`} className="font-display text-4xl font-black tracking-tighter leading-none">
            AI PLUS MAP<span className="text-blue-600">.</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-20">
        <header className="mb-20">
          <span className="text-blue-600 text-xs font-black uppercase tracking-widest mb-4 inline-block">Category</span>
          <h1 className="font-display text-7xl font-black tracking-tight uppercase">{category.name}</h1>
          {category.description && <p className="text-slate-500 text-xl mt-6 max-w-2xl italic font-medium">{category.description}</p>}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts?.map((post) => (
            <article key={post.id} className="group border-2 border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Link href={`/${lang}/news/${post.slug}`}>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden border-b-2 border-black">
                  <img src={post.featured_image || `https://picsum.photos/seed/${post.id}/800/500`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={post.title} />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-black leading-tight group-hover:text-blue-600 transition-colors mb-4">{post.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 italic">{post.excerpt}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-slate-50 py-20 mt-20 border-t-2 border-black text-center">
        <a href="https://deerflow.tech" target="_blank" className="text-[10px] font-black text-blue-600 hover:underline tracking-widest uppercase">CREATED BY DEERFLOW</a>
      </footer>
    </div>
  );
}
