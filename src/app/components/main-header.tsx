import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200">
      <div className="max-w-screen-3xl  px-5 h-16 flex items-center">
        <Link
          href="/"
          className="font-bold text-2xl text-violet-600 hover:text-violet-800 transition-colors cursor-pointer"
        >
          Do it!
        </Link>
      </div>
    </header>
  );
}
