import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "AI Plus Map | The Intelligence Cartography",
  description: "Latest AI news, market trends, and intelligence guides.",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} className={`${inter.variable} ${bricolage.variable}`}>
      <body className="bg-[#F8FAFC] text-slate-900 font-sans leading-relaxed">
        {children}
      </body>
    </html>
  );
}
