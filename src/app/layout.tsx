import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Spotlight } from "@/components/Spotlight";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Christober — Frontend Engineer",
  description: profile.summary,
  authors: [{ name: profile.name, url: profile.linkedin }],
  keywords: [
    "Christober",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Chennai",
  ],
  openGraph: {
    title: "Christober — Frontend Engineer",
    description: profile.summary,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "TN",
    addressCountry: "IN",
  },
  url: profile.linkedin,
  worksFor: {
    "@type": "Organization",
    name: profile.company,
  },
  alumniOf: "Pondicherry University",
  knowsAbout: ["React", "Next.js", "TypeScript", "WebSockets", "Web performance"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Spotlight />
        <div className="page">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
