/**
 * [할 일 추가 폼 컴포넌트]
 * * @description
 * 새로운 할 일을 입력받고 추가하는 폼 컴포넌트입니다.
 * 낙관적 업데이트(Optimistic Update)를 시작(Trigger)하는 핵심 역할을 수행합니다.
 * * @features
 * 1. **낙관적 업데이트 연동**:
 * - 폼 제출 시 서버 응답을 기다리지 않고 `onAddOptimistic`을 즉시 호출하여 화면에 먼저 할 일을 추가합니다.
 * 2. **Server Actions 상태 관리**:
 * - `useActionState` 훅을 사용하여 서버 로직의 진행 상태(Pending)와 결과(Error)를 핸들링합니다.
 * 3. **입력 제어 및 UX**:
 * - 사용자가 텍스트를 입력했는지 실시간으로 감지하여 버튼의 활성/비활성 상태(색상 변경)를 제어합니다.
 */

"use client";

import { createTodoAction } from "@/actions/create-todo-action";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Button from "./share/button";

export default function TodoAddForm({
  onAddOptimistic,
}: {
  onAddOptimistic: (formData: FormData) => void;
}) {
  const [state, formAction, isPending] = useActionState(createTodoAction, null);

  // 입력값 상태 관리 (버튼 색상 변경을 위해 필요)
  const [value, setValue] = useState("");

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    if (value.trim().length === 0) return;
    onAddOptimistic(formData);
    setValue("");
    formAction(formData);
  };

  // 버튼 활성화 여부 확인 (입력값이 있어야 함)
  const isButtonActive = value.trim().length > 0;
  return (
    <section className="mb-6 md:mb-10">
      {" "}
      {/* 간격도 반응형으로 */}
      <form action={handleSubmit} className="flex gap-2 md:gap-4">
        <input
          disabled={isPending}
          required
          name="name"
          onChange={(e) => setValue(e.target.value)}
          placeholder="할 일을 입력해주세요"
          className="flex-1 p-4 pl-6 rounded-4xl border-2 border-slate-900 bg-slate-100 
                     focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-inner
                     placeholder-slate-500 text-slate-900 font-bold
                     shadow-[4px_4px_0px_0px_#0f172a] transition-all"
        />
        {/* 공통 Button 컴포넌트 사용 */}
        <Button
          type="submit"
          disabled={isPending}
          variant={isButtonActive ? "primary" : "secondary"}
          className="w-14 h-14 md:w-42 md:h-14 p-0 md:px-6 rounded-4xl"
        >
          {isPending ? (
            "..."
          ) : (
            <>
              {/* 모바일: + 아이콘만 표시 */}
              <div className="block md:hidden relative w-6 h-6">
                <Image
                  src="/ic/plus.svg"
                  alt="추가"
                  fill
                  className={`object-contain ${
                    !isButtonActive ? "brightness-0" : ""
                  }`}
                />
              </div>

              {/* hidden md:flex 로 변경하여 md 이상에서만 flex 레이아웃 활성화 */}
              <div className="hidden md:flex items-center gap-2 justify-center w-full h-full">
                {/*  태블릿 이상: 텍스트 표시 */}
                <div className="relative w-4 h-4 md:w-5 md:h-5">
                  <Image
                    src="/ic/plus.svg"
                    alt="추가"
                    fill
                    className={`object-contain ${
                      !isButtonActive ? "brightness-0" : ""
                    }`}
                  />
                </div>
                <span className="whitespace-nowrap">추가하기</span>
              </div>
            </>
          )}
        </Button>
      </form>
    </section>
  );
}
