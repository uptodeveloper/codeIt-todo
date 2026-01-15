import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/main-header";

export const metadata: Metadata = {
  title: "Do it; 할 일 관리",
  description: "나눔스퀘어 폰트가 적용된 할 일 관리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={` antialiased bg-slate-100 text-slate-800`}>
        <Header />
        <main
          className="
            w-full mx-auto 
            px-4 md:px-6 
            md:max-w-186 
            xl:max-w-300 
            py-6 md:py-10
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
