import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const locales = ['en', 'vi', 'de', 'hi'];
const baseUrl = 'https://www.aiplusmap.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Main pages for each locale
  const staticRoutes = locales.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${lang}/news`,
      lastModified: new Date(),
    },
  ]);

  // Fetch all articles from Supabase for all languages
  const { data: articles } = await supabase
    .from('ai_news')
    .select('slug, language, updated_at')
    .order('updated_at', { ascending: false });

  const dynamicRoutes = (articles ?? []).map((art) => ({
    url: `${baseUrl}/${art.language}/news/${art.slug}`,
    lastModified: new Date(art.updated_at),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
