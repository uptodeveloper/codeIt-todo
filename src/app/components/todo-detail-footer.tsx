import React from "react";
import Button from "./share/button";

export default function TodoDetailFooter({
  isPending,
  isDeletePending,
  onDelete,
  isFormValid,
}: {
  isPending: boolean;
  isDeletePending: boolean;
  onDelete: () => void;
  isFormValid: boolean;
}) {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="submit"
        variant={isFormValid ? "success" : "secondary"} // ✅ 연두색 스타일 적용
        disabled={isPending || !isFormValid}
        icon={isPending ? undefined : "/ic/check.svg"} // ✅ 체크 아이콘 추가 (로딩 중엔 숨김)
        className="w-full md:w-auto" // 모바일 꽉 채우기 등 필요시 추가
      >
        {isPending ? "저장 중..." : "수정 완료"}
      </Button>

      <Button
        type="button"
        variant="danger" // ✅ 빨간색 스타일 적용
        onClick={onDelete}
        disabled={isDeletePending}
        icon="/ic/x.svg" // ✅ X 아이콘 추가 (이미지가 있다면)
        className="w-full md:w-auto text-white"
      >
        {isDeletePending ? "삭제 중..." : "삭제하기"}
      </Button>
    </div>
  );
}
