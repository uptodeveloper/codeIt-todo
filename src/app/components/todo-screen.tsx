/**
 * [메인 화면 컨테이너 (Client Component)]
 * * @description
 * 메인 페이지의 낙관적 업데이트(Optimistic Update)를 총괄하는 메인 컴포넌트입니다.
 * * @features
 * 1. **낙관적 업데이트 (Optimistic UI)**:
 * - `useOptimistic` 훅을 도입하여 서버 응답을 기다리지 않고 UI를 즉시 업데이트합니다.
 * 2. **비동기 트랜지션 관리**:
 * - `useTransition`을 활용하여 상태 업데이트의 우선순위를 관리하고, UI 멈춤(Blocking) 현상을 방지했습니다.
 */

"use client";

import { TodoData, OptimisticAction } from "@/types";
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
    (state: TodoData[], action: OptimisticAction) => {
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

      <div className="flex flex-col xl:flex-row gap-4 md:gap-6 xl:gap-10 items-start">
        <TodoList title="TODO" list={todoList} onToggle={handleToggleTodo} />
        <TodoList title="DONE" list={doneList} onToggle={handleToggleTodo} />
      </div>
    </div>
  );
}
