/**
 * [할 일 수정 Server Action]
 * * @description
 * 클라이언트 폼 데이터를 받아 DB를 업데이트하고, 관련된 캐시를 갱신하는 비동기 함수입니다.
 * * @features
 * 1. **데이터 무결성 검증**:
 * - FormData로 넘어온 값들의 타입 안전성을 확인하고, 필수 값 누락을 방어합니다.
 * 2. **정밀한 캐시 무효화 (On-Demand ISR)**:
 * - 업데이트 성공 시 `revalidateTag('todo-{id}')`를 호출하여, 전체 페이지가 아닌
 * '수정된 해당 아이템'의 정적 페이지 캐시만 콕 집어 갱신합니다.
 * - 이를 통해 서버 부하를 최소화하면서도 데이터의 최신성을 보장합니다.
 */

"use server";

import { ActionState } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function editTodoAction(
  prevState: ActionState,
  formData: FormData
) {
  const id = formData.get("todoId")?.toString();
  const name = formData.get("name")?.toString();
  const memo = formData.get("memo")?.toString();
  const isCompleted = formData.get("isCompleted") === "true";
  const image = formData.get("image") as File | null;

  let imageUrl = formData.get("imageUrl")?.toString();

  if (!id || !name) {
    return {
      status: false,
      error: "제목은 필수 입력 사항입니다.",
    };
  }

  let isSuccess = false;

  try {
    if (image && image.size > 0) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/images/upload`,
        {
          method: "POST",
          body: imageFormData,
        }
      );

      if (uploadRes.ok) {
        const data = await uploadRes.json();
        imageUrl = data.url;
      } else {
        console.error("이미지 업로드 실패");
      }
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          memo,
          isCompleted,
          imageUrl,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("수정에 실패했습니다.");
    }

    revalidateTag(`todo-${id}`);
    revalidateTag("todo-list");

    isSuccess = true;
  } catch (err) {
    console.error(err);

    return { status: false, error: "서버 통신 중 오류 발생" };
  }

  if (isSuccess) {
    redirect("/");
  }

  return { status: true, error: "" };
}
