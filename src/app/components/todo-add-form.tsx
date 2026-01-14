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
    onAddOptimistic(formData);

    ref.current?.reset();

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
