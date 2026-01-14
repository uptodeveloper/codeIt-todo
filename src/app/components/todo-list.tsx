"use client";

import { TodoData } from "@/types";
import React, { startTransition, useOptimistic } from "react";
import TodoItem from "./todo-item";

export default function TodoList({
  title,
  list,
  onToggle,
}: {
  title: string;
  list: TodoData[];
  onToggle: (id: number, isCompleted: boolean) => void;
}) {
  return (
    <div className="flex-1 w-full">
      <h2
        className={`font-bold text-xl mb-5 ${
          title === "DONE" ? "text-violet-600" : "text-slate-800"
        }`}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-3 w-full">
        {list.length === 0 ? (
          <p className="text-gray-400 text-center py-10 border rounded-xl border-dashed">
            {title === "TO DO"
              ? "할 일이 없습니다 "
              : "아직 완료한 일이 없어요"}
          </p>
        ) : (
          list.map((todo) => (
            <TodoItem key={todo.id} {...todo} onToggle={onToggle} />
          ))
        )}
      </div>
    </div>
  );
}
