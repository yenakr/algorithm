import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "돌봄로봇 알고리즘",
  description: "대상자의 상태와 돌봄 환경을 바탕으로 상황에 맞는 배설돌봄, 식사돌봄, 이승돌봄 로봇 유형을 판단하는 알고리즘을 학습합니다."
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
        <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden min-w-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


