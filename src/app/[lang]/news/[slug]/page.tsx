import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, lang')
    .eq('is_published', true);

  if (!posts) return [];

  return posts.map((post) => ({
    lang: post.lang,
    slug: post.slug,
  }));
}

export default async function NewsDetail({ params }: { params: { lang: string, slug: string } }) {
  const { lang, slug } = params;

  const { data: post } = await supabase
    .from('posts')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('lang', lang)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
       <nav className="border-b-2 border-black py-6 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-end">
          <Link href={`/${lang}`} className="font-display text-4xl font-black tracking-tighter leading-none">
            AI PLUS MAP<span className="text-blue-600">.</span>
          </Link>
          <div className="flex space-x-10 font-bold text-xs uppercase tracking-widest pb-1">
            <Link href={`/${lang}`} className="hover:text-blue-600 transition-colors">Back Home</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 py-20">
        <header className="mb-16">
          <Link href={`/${lang}/category/${(post.categories as any)?.slug}`} className="text-blue-600 text-xs font-black uppercase tracking-widest mb-6 inline-block">
            {(post.categories as any)?.name}
          </Link>
          <h1 className="font-display text-6xl font-black leading-[1.1] tracking-tight mb-10">
            {post.title}
          </h1>
          <div className="flex items-center space-x-6 text-sm font-bold uppercase tracking-widest text-slate-400 border-y-2 border-slate-100 py-6">
            <span className="text-black">By {post.author_name}</span>
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </header>

        {post.featured_image && (
          <div className="mb-16 rounded-3xl overflow-hidden border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <img src={post.featured_image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-20">
          <article className="prose prose-slate prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight
            prose-p:leading-relaxed prose-p:text-slate-600
            prose-strong:text-black prose-strong:font-black
            prose-img:rounded-2xl prose-img:border-2 prose-img:border-black">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <aside className="space-y-12">
            <div className="sticky top-32">
              <h4 className="font-display text-xs font-black uppercase tracking-widest mb-6">Share this story</h4>
              <div className="flex flex-col space-y-4">
                <button className="border-2 border-black p-3 font-black text-xs uppercase hover:bg-black hover:text-white transition-colors">Twitter / X</button>
                <button className="border-2 border-black p-3 font-black text-xs uppercase hover:bg-black hover:text-white transition-colors">LinkedIn</button>
                <button className="border-2 border-black p-3 font-black text-xs uppercase hover:bg-black hover:text-white transition-colors">Copy Link</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-slate-50 py-20 mt-20 border-t-2 border-black text-center">
        <a href="https://deerflow.tech" target="_blank" className="text-[10px] font-black text-blue-600 hover:underline tracking-widest uppercase">CREATED BY DEERFLOW</a>
      </footer>
    </div>
  );
}
