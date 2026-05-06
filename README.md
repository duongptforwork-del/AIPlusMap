# AI Plus Map - Next.js Migration (Final Port)

This repository contains the production-ready Next.js port of the **AI Plus Map** Magazine platform, based on the settled v2 "Magazine" design.

## Features
- **Next.js 14 (App Router)**: Optimized for performance and SEO.
- **Dynamic Routing**: Multi-language support via `/[lang]/...` structure.
- **Supabase Integration**: Real-time content fetching with parallel requests for speed.
- **ISR (Incremental Static Regeneration)**: Revalidates content every 1 hour (`revalidate = 3600`).
- **Settled Design**: Restored v2 Magazine aesthetic (Bricolage Grotesque, Slate/Blue/Red palette, Hero Grid).

## Directory Structure
- `src/app/[lang]/page.tsx`: Home page with Hero Grid and Trending Ticker.
- `src/app/[lang]/news/page.tsx`: News archive list.
- `src/app/[lang]/news/[slug]/page.tsx`: Dynamic article detail page.
- `src/middleware.ts`: Centralized i18n logic for language detection and routing.
- `src/utils/supabase/server.ts`: Supabase client for server-side fetching.

## Deployment Steps
1. **Sync to GitHub**: Ensure the `Deerflow-AI-Plus-Map` repository is updated.
2. **Vercel Setup**: Connect the repository to Vercel.
3. **Environment Variables**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. **Deploy**: Vercel will handle the build process, including generating static pages for the first 20 articles.

## Note on Scalability
- The `generateStaticParams` is limited to the top 20 most recent items to prevent build timeouts on Vercel while ensuring fast performance for trending news.
- All other articles are generated on-demand and cached via ISR.

---
Created By Deerflow | [deerflow.tech](https://deerflow.tech)
