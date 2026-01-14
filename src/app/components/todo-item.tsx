"use client";

import { TodoItemProps } from "@/types";
import Link from "next/link";

export default function TodoItem({
  id,
  name,
  isCompleted,
  onToggle,
}: TodoItemProps) {
  const isOptimistic = !Number.isInteger(id);
  return (
    <div
      className={`border  flex items-center gap-3
        ${isCompleted ? "bg-violet-100" : "bg-white"}`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        disabled={isOptimistic}
        onChange={(e) => onToggle(id, e.target.checked)}
        className="w-3 h-3 cursor-pointer"
      />
      {isOptimistic ? (
        <div className="flex-1 flex gap-3 items-center text-slate-500 cursor-wait">
          <span>{name}</span>
          <span className="text-xs font-bold text-lime-600 animate-pulse whitespace-nowrap">
            저장 중...
          </span>
        </div>
      ) : (
        // ✅ 3. 진짜 ID일 때만 상세 페이지로 이동 가능
        <Link
          href={`/todo/${id}`}
          className="flex-1 font-bold text-slate-800 hover:text-violet-600 transition"
        >
          {name}
        </Link>
      )}
    </div>
  );
}
