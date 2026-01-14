"use client";

import { createTodoAction } from "@/actions/create-todo-action";
import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";

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
        <button
          disabled={isPending || !isButtonActive}
          type="submit"
          className={`shrink-0 bg-slate-200 text-slate-900 border-2 border-slate-900 
                     rounded-4xl hover:bg-slate-300 font-bold 
                     shadow-[4px_4px_0px_0px_#0f172a] active:shadow-none active:translate-x-1 active:translate-y-1 
                     transition-all 
                     flex items-center justify-center
                     /* ✅ 모바일: 정사각형 버튼 (아이콘만) */
                     w-14 h-14 
                     /* ✅ 태블릿 이상: 직사각형 버튼 (텍스트 포함) */
                     md:w-42 md:h-14
                     ${
                       isButtonActive
                         ? "bg-violet-600 text-white hover:bg-violet-700" // 활성: 보라색
                         : "bg-slate-200 text-slate-900 cursor-not-allowed" // 비활성: 회색
                     }
          `}
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
        </button>
      </form>
    </section>
  );
}
