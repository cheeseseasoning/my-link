import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://my-link-chi-teal.vercel.app'),
  title: {
    default: '마이링크',
    template: '%s | 마이링크',
  },
  description: '나만의 링크 페이지를 30분만에 만들고 공유해 보세요.',
  openGraph: {
    title: '마이링크',
    description: '나만의 링크 페이지를 30분만에 만들고 공유해 보세요.',
    url: 'https://my-link.example.com',
    siteName: '마이링크',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og/default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '마이링크',
    description: '나만의 링크 페이지를 30분만에 만들고 공유해 보세요.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
