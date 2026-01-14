import React from "react";

export default function TodoDetailFooter({
  isPending,
  isDeletePending,
  onDelete,
}: {
  isPending: boolean;
  isDeletePending: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="submit"
        disabled={isPending}
        className="px-10 py-3 rounded-xl font-bold bg-lime-300 hover:bg-lime-400"
      >
        {isPending ? "저장 중..." : "수정 완료"}
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeletePending}
        className="px-10 py-3 rounded-xl font-bold bg-rose-500 text-white"
      >
        삭제하기
      </button>
    </div>
  );
}
