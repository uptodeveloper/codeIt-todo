"use client";

import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

// ✅ 버튼의 디자인 변형(Variant) 정의
type ButtonVariant = "primary" | "secondary" | "danger" | "success";
// ✅ 버튼의 모양(Shape) 정의
type ButtonShape = "default" | "circle";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: string; // 아이콘 경로 (선택)
}

export default function Button({
  variant = "primary",
  shape = "default",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  // 1️⃣ 색상 스타일 매핑
  const variantStyles = {
    primary: "bg-violet-600 text-white hover:bg-violet-700 border-slate-900", // 보라색 (추가)
    secondary:
      "bg-slate-200 text-slate-900 border-slate-900 cursor-not-allowed", // 회색 (기본/취소)
    danger: "bg-rose-500 text-white hover:bg-rose-600 border-none", // 빨간색 (삭제) - 테두리 없음? 시안 확인 필요
    success: "bg-lime-300 text-slate-900 hover:bg-lime-400 border-slate-900", // 연두색 (수정완료)
  };

  // 2️⃣ 모양 스타일 매핑
  const shapeStyles = {
    default: "w-full md:w-auto px-6 h-12.5 rounded-[24px] gap-2", // 알약 모양
    circle: "w-14 h-14 rounded-full p-0 flex-shrink-0", // 동그라미 (모바일 추가 버튼 등)
  };
  return (
    <button
      className={`
        flex items-center justify-center font-bold border-2 shadow-[4px_4px_0px_0px_#0f172a]
        transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50
        ${variantStyles[variant]}
        ${shapeStyles[shape]}
        ${className}
      `}
      {...props}
    >
      {/* 아이콘이 있으면 렌더링 */}
      {icon && (
        <div className="relative w-4 h-4 mr-1">
          <Image src={icon} alt="icon" fill className="object-contain" />
        </div>
      )}
      {children}
    </button>
  );
}
