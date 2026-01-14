"use server";

import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";
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
  // 성공 여부를 판단하기 위한 변수
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

    // 3. 따온 URL(imageUrl)을 포함해서 정보 수정 요청 (PATCH)
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

    revalidatePath("/");

    isSuccess = true;
  } catch (err) {
    console.error(err);
    // 에러가 나면 여기서 바로 리턴해서 끝냅니다.
    return { status: false, error: "서버 통신 중 오류 발생" };
  }

  if (isSuccess) {
    redirect("/");
  }

  return { status: true, error: "" };
}
