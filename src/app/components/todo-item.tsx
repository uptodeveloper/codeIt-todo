"use client";

import { TodoItemProps } from "@/types";
import Link from "next/link";

export default function TodoItem({
  id,
  name,
  isCompleted,
  onToggle,
}: TodoItemProps) {
  return (
    <div
      className={`border  flex items-center gap-3
        ${isCompleted ? "bg-violet-100" : "bg-white"}`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => onToggle(id, e.target.checked)}
        className="w-3 h-3 cursor-pointer"
      />
      <Link href={`/todo/${id}`} className="flex-1 cursor-pointer">
        <span className={isCompleted ? "line-through text-gray-500" : ""}>
          {name}
        </span>
      </Link>
    </div>
  );
}
