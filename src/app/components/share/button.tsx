/**
 * [공통 버튼 컴포넌트]
 * * @description
 * 프로젝트 전반에서 사용되는 재사용 가능한 버튼 컴포넌트입니다.
 * HTML 기본 버튼 속성을 모두 상속받으며(`...props`), 디자인 변형(variant)과 모양(shape)을 지원합니다.
 * * @props
 * - `variant`: 버튼의 색상 테마 (primary | secondary | danger | success) - 기본값: primary
 * - `shape`: 버튼의 형태 (default: 알약형 | circle: 원형) - 기본값: default
 * - `icon`: 버튼 텍스트 앞에 들어갈 아이콘 이미지 경로 (선택 사항)
 */

"use client";

import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

// 버튼의 디자인 변형(Variant) 정의
type ButtonVariant = "primary" | "secondary" | "danger" | "success";
//  버튼의 모양(Shape) 정의
type ButtonShape = "default" | "circle";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: string;
}

export default function Button({
  variant = "primary",
  shape = "default",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  //  색상 스타일 매핑
  const variantStyles = {
    primary: "bg-violet-600 text-white hover:bg-violet-700 border-slate-900", // 보라색 (추가)
    secondary:
      "bg-slate-200 text-slate-900 border-slate-900 cursor-not-allowed", // 회색 (기본/취소)
    danger: "bg-rose-500 text-white hover:bg-rose-600 border-none", // 빨간색 (삭제)
    success: "bg-lime-300 text-slate-900 hover:bg-lime-400 border-slate-900", // 연두색 (수정완료)
  };

  //  모양 스타일 매핑
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
