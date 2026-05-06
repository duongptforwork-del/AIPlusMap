import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .eq('lang', lang)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <Link href={`/${lang}`} className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2 inline-block">← Back to Magazine</Link>
            <h1 className="font-display text-5xl font-black tracking-tight">ADMIN CONTROL</h1>
          </div>
          <Link 
            href={`/${lang}/admin/new`} 
            className="bg-black text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] transition-all"
          >
            Create New Story
          </Link>
        </header>

        <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white border-b-2 border-black">
                <th className="p-6 font-black text-[10px] uppercase tracking-widest">Status</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest">Title</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest">Category</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest">Date</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post) => (
                <tr key={post.id} className="border-b-2 border-black hover:bg-blue-50 transition-colors">
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-black ${post.is_published ? 'bg-green-400' : 'bg-yellow-400'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-6 font-display font-black text-lg">{post.title}</td>
                  <td className="p-6 text-xs font-bold uppercase text-slate-500">{(post.categories as any)?.name || '-'}</td>
                  <td className="p-6 text-xs font-bold text-slate-400">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end space-x-3">
                      <button className="p-2 border-2 border-black rounded hover:bg-black hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                      <button className="p-2 border-2 border-black rounded hover:bg-red-500 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!posts || posts.length === 0) && (
            <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest">
              No stories found. Start by creating one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
