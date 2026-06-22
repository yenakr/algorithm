import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "돌봄로봇 교육 및 자가평가 플랫폼",
  description: "이승돌봄 및 배설돌봄 로봇 교육자료를 학습하고, 자가 평가 및 사례 테스트를 통해 나에게 맞는 최적의 돌봄로봇/기기 유형을 확인해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

