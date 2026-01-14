import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-16 border-b border-slate-200 bg-slate-100">
      <div
        className="
        h-full flex items-center
        w-full mx-auto
        px-4 md:px-6           /* 모바일/태블릿 여백 */
        md:max-w-186       /* 태블릿 최대 너비 (layout.tsx와 동일) */
        xl:max-w-300      /* 데스크탑 최대 너비 (layout.tsx와 동일) */
      "
      >
        <Link href="/" className="cursor-pointer">
          {/* 1. 모바일용 로고 (md 이상에서는 숨김) */}
          <div className="block md:hidden">
            <Image
              src="/img/favicon.svg" // ⚠️ 모바일용 심볼(보라색 구름) 이미지 경로 확인 필요
              alt="Do it"
              width={71} // 시안 기준 적절한 크기 설정
              height={40}
              priority
            />
          </div>
          {/* 2. 태블릿/PC용 로고 (md 부터 보임) */}
          <div className="hidden md:block">
            <Image
              src="/img/cloud-doit.svg"
              alt="Do it"
              width={151} // Figma에서 확인한 너비값 입력
              height={40} // Figma에서 확인한 높이값 입력
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
