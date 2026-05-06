'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function NewPost() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    is_published: true
  });

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').eq('lang', lang);
      if (data) setCategories(data);
    }
    fetchCategories();
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('posts').insert([
      { ...formData, lang }
    ]);

    if (error) {
      alert('Error creating post: ' + error.message);
    } else {
      router.push(`/${lang}/admin`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href={`/${lang}/admin`} className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 inline-block hover:text-black">← Back to List</Link>
        <h1 className="font-display text-5xl font-black tracking-tight mb-12">CREATE STORY</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Title</label>
              <input 
                required
                className="w-full border-2 border-black p-4 rounded-xl focus:bg-blue-50 outline-none font-bold"
                type="text" 
                placeholder="Story Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Slug (URL)</label>
              <input 
                required
                className="w-full border-2 border-black p-4 rounded-xl focus:bg-blue-50 outline-none font-bold text-slate-500"
                type="text" 
                placeholder="story-url-slug"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Category</label>
              <select 
                className="w-full border-2 border-black p-4 rounded-xl focus:bg-blue-50 outline-none font-bold appearance-none"
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Featured Image URL</label>
              <input 
                className="w-full border-2 border-black p-4 rounded-xl focus:bg-blue-50 outline-none font-bold"
                type="text" 
                placeholder="https://..."
                value={formData.featured_image}
                onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest">Excerpt</label>
            <textarea 
              rows={2}
              className="w-full border-2 border-black p-4 rounded-xl focus:bg-blue-50 outline-none font-medium italic"
              placeholder="Short summary..."
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest">Content (HTML)</label>
            <textarea 
              required
              rows={10}
              className="w-full border-2 border-black p-4 rounded-xl focus:bg-blue-50 outline-none font-mono text-sm"
              placeholder="<p>Story content goes here...</p>"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all disabled:bg-slate-400"
          >
            {loading ? 'Publishing...' : 'Publish Story'}
          </button>
        </form>
      </div>
    </div>
  );
}
