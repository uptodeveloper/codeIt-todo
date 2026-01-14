"use client";

import { TodoItemProps } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function TodoItem({
  id,
  name,
  isCompleted,
  onToggle,
}: TodoItemProps) {
  const isOptimistic = !Number.isInteger(id);
  return (
    <div
      className={`w-full h-12.5 flex items-center gap-4 px-4
        border-2 border-slate-900 rounded-[25px]
        ${isCompleted ? "bg-violet-100" : "bg-white"}`}
    >
      <div
        onClick={() => onToggle(id, !isCompleted)}
        className="cursor-pointer relative flex items-center justify-center shrink-0"
      >
        <div className={`w-8 h-8 relative  `}>
          {/* ✅ 2. Next/Image 사용 (완료 상태일 때만 렌더링) */}
          {isCompleted ? (
            <Image
              src="/ic/checked.svg"
              alt="완료"
              fill
              className="object-contain" // 비율 유지
            />
          ) : (
            <Image
              src="/ic/unchecked.svg"
              alt="미완료"
              fill
              className="object-contain" // 비율 유지
            />
          )}
        </div>
      </div>

      {isOptimistic ? (
        <div className="flex-1 flex gap-3 items-center text-slate-500 cursor-wait">
          <span>{name}</span>
          <span className="text-xs font-bold text-lime-600 animate-pulse whitespace-nowrap">
            저장 중...
          </span>
        </div>
      ) : (
        <Link
          href={`/todo/${id}`}
          className={`flex-1 font-bold transition
            ${
              isCompleted
                ? "text-slate-500 line-through"
                : "text-slate-800 hover:text-violet-600"
            }
          `}
        >
          {name}
        </Link>
      )}
    </div>
  );
}
