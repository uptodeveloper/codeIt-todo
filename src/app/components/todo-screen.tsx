"use client";

import { TodoData } from "@/types";
import React, { startTransition, useOptimistic } from "react";
import TodoAddForm from "./todo-add-form";
import TodoList from "./todo-list";
import { checkTodoAction } from "@/actions/check-todo-aciotn";

export default function TodoScreen({
  initialTodos,
}: {
  initialTodos: TodoData[];
}) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    (state, action: { type: string; payload: any }) => {
      switch (action.type) {
        case "ADD":
          return [action.payload, ...state];
        case "TOGGLE":
          return state.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, isCompleted: action.payload.isCompleted }
              : todo
          );
        default:
          return state;
      }
    }
  );

  const handleAddTodo = async (formData: FormData) => {
    const name = formData.get("name")?.toString();
    if (!name) return;

    startTransition(() => {
      setOptimisticTodos({
        type: "ADD",
        payload: {
          id: Math.random(),
          name,
          isCompleted: false,
        },
      });
    });
  };

  const handleToggleTodo = (id: number, isCompleted: boolean) => {
    startTransition(() => {
      setOptimisticTodos({ type: "TOGGLE", payload: { id, isCompleted } });
      checkTodoAction(id, isCompleted);
    });
  };

  const todoList = optimisticTodos.filter((todo) => !todo.isCompleted);
  const doneList = optimisticTodos.filter((todo) => todo.isCompleted);
  return (
    <div className="flex flex-col min-h-screen">
      <TodoAddForm onAddOptimistic={handleAddTodo} />
      {/* ✅ 반응형 그리드 수정 */}
      {/* md:flex-row를 지우고 xl:flex-row로 변경합니다. */}
      {/* Desktop (xl 이상): 가로 배치 (gap-6) */}
      {/* Tablet (md) & Mobile: 세로 배치 (gap-4) */}
      <div className="flex flex-col xl:flex-row gap-4 md:gap-6 xl:gap-10 items-start">
        <TodoList title="TODO" list={todoList} onToggle={handleToggleTodo} />
        <TodoList title="DONE" list={doneList} onToggle={handleToggleTodo} />
      </div>
    </div>
  );
}
