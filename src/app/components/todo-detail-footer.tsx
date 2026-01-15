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
        justify-center      
        lg:justify-end       
      "
    >
      <Button
        type="submit"
        variant={isFormValid ? "success" : "secondary"}
        disabled={isPending || !isFormValid}
        icon={isPending ? undefined : "/ic/check.svg"}
        className="
          w-full sm:w-42 h-14 
          text-lg rounded-3xl
        "
      >
        {isPending ? "저장 중..." : "수정 완료"}
      </Button>

      <Button
        type="button"
        variant="danger"
        onClick={onDelete}
        disabled={isDeletePending}
        icon="/ic/exit.svg"
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
