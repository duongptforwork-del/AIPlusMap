# AI Plus Map - Migration to Next.js + Supabase

Chào Sếp, here is the complete migration blueprint for **AI Plus Map**.

## 1. Project Structure (Next.js App Router)
```text
/src
  /app
    /[lang]
      /admin         # Admin Dashboard
      /news
        /[slug]      # Dynamic Article Page
      /events
        /[slug]      # Dynamic Event Page
      /page.tsx      # Dynamic Home
    /layout.tsx      # Root layout with Fonts & Metadata
  /components        # UI Components (Sidebar, Nav, Footer)
  /lib
    /supabase.ts     # Supabase Client
```

## 2. Typography & Styling (Tailwind Config)
Add this to your `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
      },
    },
  },
}
```

## 3. Metadata Requirement
In your `layout.tsx`:
```tsx
export const metadata = {
  authors: [{ name: 'Jessica' }],
  title: 'AI Plus Map - The World of AI Intelligence',
};
```

## 4. Key Files Provided
1. **`schema.sql`**: Run this in your Supabase SQL Editor to create the dynamic structure.
2. **`AdminDashboard.tsx`**: Copy this to `src/app/[lang]/admin/page.tsx`. It handles post/event management.
3. **`page.tsx`**: The main frontend. It uses the **1.2fr:0.8fr** grid and **500px height** for the hero.
4. **`middleware.ts`**: Ensures everything lives under the `/en/` (or other lang) subdirectory.

## 5. Migration Logic
- **Static Content**: All hardcoded text in the sidebar (Perplexity, Nvidia, Apple Intelligence) should be moved to the `posts` table in Supabase with a specific `featured` flag.
- **Links**: In the old HTML, links were `index.html`. In Next.js, use `<Link href={`/${lang}/news/${slug}`}>`.

Created By Deerflow ✦ [https://deerflow.tech](https://deerflow.tech)
