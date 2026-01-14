"use client";

import { deleteTodoAction } from "@/actions/delete-todo-action";
import { TodoData } from "@/types";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useState, useTransition } from "react";
import { editTodoAction } from "@/actions/edit-todo-action";
import TodoDetailHeader from "./todo-detial-header";
import TodoDetailBody from "./todo-detail-body";
import TodoDetailFooter from "./todo-detail-footer";

export default function TodoDetail({ todoData }: { todoData: TodoData }) {
  const [state, formAction, isPending] = useActionState(editTodoAction, null);

  const [name, setName] = useState(todoData.name);

  const [isCompleted, setIsCompleted] = useState(todoData.isCompleted);

  const [memo, setMemo] = useState(todoData.memo || "");

  const [imageUrl, setImageUrl] = useState(todoData.imageUrl || "");

  const router = useRouter();

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");

      return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImageUrl(previewUrl);
  };

  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm("정말 이 할 일을 삭제하시겠습니까?")) return;

    startDeleteTransition(async () => {
      const result = await deleteTodoAction(todoData.id);

      if (result.status) {
        router.push("/");

        router.refresh();
      } else {
        alert("삭제에 실패했습니다.");
      }
    });
  };

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-5xl mx-auto">
      <input name="todoId" value={todoData.id} hidden readOnly />

      <input name="isCompleted" value={String(isCompleted)} hidden readOnly />

      <input name="imageUrl" value={imageUrl} hidden readOnly />

      {/* 헤더 영역 */}
      <TodoDetailHeader
        name={name}
        setName={setName}
        isCompleted={isCompleted}
        toggleCompleted={() => setIsCompleted(!isCompleted)}
      />
      {/* 바디 영역 */}
      <TodoDetailBody
        memo={memo}
        setMemo={setMemo}
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
      />

      {/* 푸터 영역 */}
      <TodoDetailFooter
        isPending={isPending}
        isDeletePending={isDeletePending}
        onDelete={handleDelete}
      />
    </form>
  );
}
