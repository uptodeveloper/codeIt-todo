"use client";

import { deleteTodoAction } from "@/actions/delete-todo-action";

import { updateTodoDetailAction } from "@/actions/update-todo-action";

import { TodoData } from "@/types";

import { useRouter } from "next/navigation";

import Image from "next/image";

import { useState, useTransition } from "react";

export default function TodoDetail({ todoData }: { todoData: TodoData }) {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(todoData.name);

  const [isCompleted, setIsCompleted] = useState(todoData.isCompleted);

  const [memo, setMemo] = useState(todoData.memo || "");

  const [imageUrl, setImageUrl] = useState(todoData.imageUrl || "");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

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

    setImageFile(file);
  };

  const handleUpdate = () => {
    startTransition(async () => {
      const formData = new FormData();

      formData.append("name", name);

      formData.append("isCompleted", String(isCompleted));

      formData.append("memo", memo);

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      const result = await updateTodoDetailAction(todoData.id, formData);

      if (result.status) {
        router.push("/");

        router.refresh();
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  };

  const handleDelete = async () => {
    if (!confirm("정말 이 할 일을 삭제하시겠습니까?")) return;

    startTransition(async () => {
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
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* 1. 헤더 영역 (완료 체크 & 제목) */}
      <div
        className={`border-2 rounded-2xl p-4 flex items-center gap-4 ${
          isCompleted ? "bg-slate-100" : "bg-white"
        }`}
      >
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            isCompleted
              ? "bg-slate-800 border-slate-800"
              : "bg-white border-slate-800"
          }`}
        >
          {/* 단순 텍스트 표시로 변경 */}
          {isCompleted && <span className="text-white text-xs">V</span>}
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-transparent text-slate-900 font-bold text-lg focus:outline-none"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-96">
        <div className="flex-1 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex items-center justify-center relative overflow-hidden">
          {imageUrl ? (
            <div
              onClick={() => document.getElementById("imgInput")?.click()}
              className="w-full h-full relative"
            >
              <Image
                src={imageUrl}
                alt="Todo Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                priority
              />
            </div>
          ) : (
            <label
              htmlFor="imgInput"
              className="flex flex-col items-center justify-center w-full h-full text-slate-400"
            >
              <span className="text-sm font-bold">이미지 추가</span>
            </label>
          )}
          <input
            id="imgInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex-1 flex flex-col rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-center font-bold pb-2 text-slate-500">Memo</p>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full flex-1 bg-transparent resize-none focus:outline-none text-slate-800 text-center"
            placeholder="메모를 입력하세요"
          />
        </div>
      </div>

      <div className="flex justify-center md:justify-end gap-4">
        <button
          onClick={handleUpdate}
          disabled={isPending}
          className={`px-10 py-3 rounded-xl font-bold ${
            isPending ? "bg-slate-200" : "bg-slate-800 text-white"
          }`}
        >
          {isPending ? "..." : "수정 완료"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-10 py-3 rounded-xl font-bold bg-rose-500 text-white"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
