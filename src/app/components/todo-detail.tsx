/**
 * [상세 페이지 폼 컨테이너]
 * * @description
 * 할 일의 수정 및 삭제 기능을 담당하는 클라이언트 컴포넌트입니다.
 * * @features
 * 1. **Server Actions 연동**:
 * - `useActionState` 훅을 사용하여 폼 제출 상태(Pending, Success, Error)를 체계적으로 관리합니다.
 * 2. **클라이언트 측 유효성 검사**:
 * - 이미지 업로드 시 파일 크기(5MB) 및 파일명(영문) 정규식 검사를 1차적으로 수행하여 불필요한 서버 요청을 차단했습니다.
 * 3. **안전한 페이지 이동**:
 * - 삭제 완료 후 `router.refresh()`와 `router.push`를 순차적으로 실행하여 데이터 정합성을 맞춘 후 이동합니다.
 */

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
  const isFormValid =
    !!imageUrl && name.trim().length > 0 && memo.trim().length > 0;
  return (
    <form
      action={formAction}
      className="max-w-300 mx-auto flex flex-col gap-6 px-4 md:px-6 lg:px-0 py-6 md:py-10"
    >
      <input name="todoId" type="hidden" value={todoData.id} />

      <input name="isCompleted" type="hidden" value={String(isCompleted)} />

      <input name="imageUrl" type="hidden" value={imageUrl} />

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
        isFormValid={isFormValid}
      />
    </form>
  );
}
