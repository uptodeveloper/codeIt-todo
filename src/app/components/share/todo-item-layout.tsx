"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface TodoItemLayoutProps {
  isCompleted: boolean;
  onToggle: () => void;
  children: ReactNode; // ✅ 여기가 핵심! (Link가 올 수도, Input이 올 수도 있음)
  className?: string; // 추가 스타일링 확장성
}

export default function TodoItemLayout({
  isCompleted,
  onToggle,
  children,
  className = "",
}: TodoItemLayoutProps) {
  return (
    <div
      className={`
        w-full flex items-center gap-4 px-4 
        border-2 border-slate-900 rounded-[25px] 
        transition-colors duration-200
        ${isCompleted ? "bg-violet-100" : "bg-white"}
        ${className}
      `}
    >
      {/* ✅ 체크박스 영역 (공통) */}
      <div
        onClick={onToggle}
        className="cursor-pointer flex items-center justify-center shrink-0"
      >
        <div className="relative w-8 h-8">
          <Image
            src={isCompleted ? "/ic/checked.svg" : "/ic/unchecked.svg"}
            alt={isCompleted ? "완료" : "미완료"}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ✅ 컨텐츠 영역 (변하는 부분) */}
      {children}
    </div>
  );
}
