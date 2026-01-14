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
          id: Math.random(), // 이 부분을 어떻게 해야하나
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
    <div className="flex flex-col gap-10">
      <TodoAddForm onAddOptimistic={handleAddTodo} />

      {/* 리스트는 이제 단순히 보여주는 역할만 함 */}
      <div className="flex flex-col md:flex-row gap-10">
        <TodoList title="TODO" list={todoList} onToggle={handleToggleTodo} />
        <TodoList title="DONE" list={doneList} onToggle={handleToggleTodo} />
      </div>
    </div>
  );
}
