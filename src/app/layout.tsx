import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/main-header";

export const metadata: Metadata = {
  title: "Do it - 할 일 관리",
  description: "심플하고 강력한 할 일 관리 서비스",
  openGraph: {
    title: "Do it - 할 일 관리",
    description: "오늘 할 일을 놓치지 마세요!",
    images: ["/img/cloud-doit.png"],
  },
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
