/**
 * [할 일 아이템 레이아웃 컴포넌트]
 * * @description
 * 목록의 아이템(Item)과 상세 페이지 헤더(Header)에서 공통으로 사용되는 레이아웃 래퍼(Wrapper)입니다.
 * * @features
 * 1. **UI 일관성 유지 **:
 * - 체크박스 위치, 둥근 테두리, 완료 시 배경색 변경(보라색) 등의 공통 디자인 로직을 한곳에서 관리합니다.
 * 2. **합성 패턴 **:
 * - `children` props를 활용하여, 내부에 들어갈 컨텐츠가 '단순 텍스트'이든 '입력 필드'이든 상관없이 유연하게 감쌀 수 있습니다.
 */

"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface TodoItemLayoutProps {
  isCompleted: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
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
      {/*  체크박스 영역 (공통) */}
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

      {/* 컨텐츠 영역 (변하는 부분) */}
      {children}
    </div>
  );
}
