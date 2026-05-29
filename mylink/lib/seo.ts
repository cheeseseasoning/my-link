import type { Metadata } from "next";

export const defaultMetadata = (titleSuffix: string = "마이링크"): Metadata => ({
  title: {
    default: titleSuffix,
    template: `%s | ${titleSuffix}`,
  },
  description: "나만의 링크 페이지를 30분만에 만들고 공유해 보세요.",
  openGraph: {
    title: titleSuffix,
    description: "나만의 링크 페이지를 30분만에 만들고 공유해 보세요.",
    url: "https://my-link.example.com",
    siteName: titleSuffix,
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: titleSuffix,
    description: "나만의 링크 페이지를 30분만에 만들고 공유해 보세요.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
});
