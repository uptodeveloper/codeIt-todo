"use client";

import { TodoData } from "@/types";
import React, { startTransition, useOptimistic } from "react";
import TodoItem from "./todo-item";
import Image from "next/image";

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
      <h2 className={`font-bold text-xl mb-5 `}>
        <Image
          // ✅ 조건에 따라 다른 이미지 보여주기
          src={title === "TODO" ? "/img/todo.svg" : "/img/done.svg"}
          alt="Empty"
          className="object-contain" // 이미지 비율 망가지지 않게
          priority // (선택) 로딩 우선순위 높임
          width={title === "TO DO" ? 101 : 97}
          height={36}
        />
      </h2>

      <div className="flex flex-col gap-3 w-full">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative w-60 h-60 mb-4">
              <Image
                // ✅ 조건에 따라 다른 이미지 보여주기
                src={
                  title === "TODO"
                    ? "/img/empty-todo.svg"
                    : "/img/empty-Done.svg"
                }
                alt="Empty"
                fill
                className="object-contain" // 이미지 비율 망가지지 않게
                priority // (선택) 로딩 우선순위 높임
              />
            </div>
            <p className="text-slate-400 font-bold whitespace">
              {title === "TODO" ? (
                <>
                  할 일이 없어요.
                  <br />
                  TODO를 새롭게 추가해주세요!
                </>
              ) : (
                <>
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </>
              )}
            </p>
          </div>
        ) : (
          list.map((todo) => (
            <TodoItem key={todo.id} {...todo} onToggle={onToggle} />
          ))
        )}
      </div>
    </div>
  );
}
