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
    <div
      className="
        w-full flex gap-4 mt-6
        justify-center       /* 모바일/태블릿: 중앙 정렬 */
        lg:justify-end       /* 데스크탑: 우측 정렬 (메모장 아래) */
      "
    >
      <Button
        type="submit"
        variant={isFormValid ? "success" : "secondary"} // ✅ 연두색 스타일 적용
        disabled={isPending || !isFormValid}
        icon={isPending ? undefined : "/ic/check.svg"} // ✅ 체크 아이콘 추가 (로딩 중엔 숨김)
        // ✅ 시안 규격 적용 (168px x 56px)
        // 모바일에서는 누르기 편하게 w-full이나 조금 넓게 잡을 수도 있지만,
        // 시안의 비율을 유지하려면 w-[168px]가 정확합니다.
        className="
          w-full sm:w-42 h-14 
          text-lg rounded-3xl
        "
      >
        {isPending ? "저장 중..." : "수정 완료"}
      </Button>

      <Button
        type="button"
        variant="danger" // ✅ 빨간색 스타일 적용
        onClick={onDelete}
        disabled={isDeletePending}
        icon="/ic/x.svg" // ✅ X 아이콘 추가 (이미지가 있다면)
        // ✅ 시안 규격 적용 (168px x 56px)
        className="
         w-full sm:w-42 h-14 
          text-lg rounded-3xl text-white
        "
      >
        {isDeletePending ? "삭제 중..." : "삭제하기"}
      </Button>
    </div>
  );
}
