"use client";

import { TodoItemProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import TodoItemLayout from "./share/todo-item-layout";

export default function TodoItem({
  id,
  name,
  isCompleted,
  onToggle,
}: TodoItemProps) {
  const isOptimistic = !Number.isInteger(id);
  return (
    <TodoItemLayout
      isCompleted={isCompleted}
      onToggle={() => onToggle(id, !isCompleted)}
      className="h-12.5" // 리스트는 높이 50px 고정
    >
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
    </TodoItemLayout>
  );
}
