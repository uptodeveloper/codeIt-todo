import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-16 border-b border-slate-200 bg-slate-100">
      <div
        className="
        h-full flex items-center
        w-full mx-auto
        px-4 md:px-6           
        md:max-w-186       
        xl:max-w-300      
      "
      >
        <Link href="/" className="cursor-pointer">
          {/* 1. 모바일용 로고 (md 이상에서는 숨김) */}
          <div className="block md:hidden">
            <Image
              src="/img/favicon.svg"
              alt="Do it"
              width={71}
              height={40}
              priority
            />
          </div>
          {/* 2. 태블릿/PC용 로고 (md 부터 보임) */}
          <div className="hidden md:block">
            <Image
              src="/img/cloud-doit.svg"
              alt="Do it"
              width={151}
              height={40}
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
