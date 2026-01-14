"use client";

import { createTodoAction } from "@/actions/create-todo-action";
import { useActionState, useEffect, useRef } from "react";

export default function TodoAddForm({
  onAddOptimistic,
}: {
  onAddOptimistic: (formData: FormData) => void;
}) {
  const [state, formAction, isPending] = useActionState(createTodoAction, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    // (A) 낙관적 업데이트 실행 (부모에게 알림 -> 화면 즉시 추가)
    onAddOptimistic(formData);

    // (B) 폼 비우기 (엔터 치자마자 글자가 사라져야 진짜 빨라 보임)
    ref.current?.reset();

    // (C) 진짜 서버 액션 실행 (useActionState의 트리거)
    formAction(formData);
  };

  return (
    <section>
      <form action={handleSubmit}>
        <input
          disabled={isPending}
          required
          name="name"
          placeholder="할 일을 입력해주세요"
        />
        <button disabled={isPending} type="submit">
          {isPending ? "..." : "작성하기"}
        </button>
      </form>
    </section>
  );
}
