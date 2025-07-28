import type { Metadata } from "next";
import "./globals.css";
import { cafe24Font } from "./assets/fonts/fonts";

export const metadata: Metadata = {
  title: "김태수 ❤️ 박지영 결혼식 초대장",
  description: "2025년 11월 22일, 태수와 지영의 아름다운 결혼식에 초대합니다.",
  keywords: [
    "결혼식",
    "청첩장",
    "김태수",
    "박지영",
    "웨딩 초대장",
    "온라인 청첩장",
  ],
  authors: [{ name: "taesoo & jiyoung" }],
  creator: "taesoo & jiyoung",
  generator: "Next.js",
  applicationName: "Wedding Invitation",
  metadataBase: new URL("https://wedding.2duckchun.com"), // 배포 도메인

  openGraph: {
    title: "김태수 ❤️ 박지영 결혼식 초대장",
    description:
      "2025년 11월 22일, 태수와 지영의 아름다운 결혼식에 초대합니다.",
    url: "https://wedding.2duckchun.com",
    siteName: "태수 ❤️ 지영 결혼식",
    images: [
      {
        url: "/images/wedding/welcome-view-1.jpg", // public 폴더 기준 또는 절대 URL
        width: 1200,
        height: 630,
        alt: "김태수 박지영 웨딩 이미지",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },

  twitter: {
    card: "summary_large_image",
    title: "김태수 ❤️ 박지영 결혼식 초대장",
    description:
      "2025년 11월 22일, 태수와 지영의 아름다운 결혼식에 초대합니다.",
    images: ["/images/wedding/welcome-view-1.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${cafe24Font.variable} font-gowundodum antialiased min-h-screen bg-gradient-to-r from-rose-100 via-rose-50 to-rose-200`}
      >
        {children}
      </body>
    </html>
  );
}
