"use server";

import { revalidatePath } from "next/cache";

export async function updateTodoAction(todoId: number, isCompleted: boolean) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${todoId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted }),
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidatePath("/");
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: "수정이 실패 했습니다",
    };
  }
}

export async function updateTodoDetailAction(id: number, formData: FormData) {
  const name = formData.get("name")?.toString();
  const memo = formData.get("memo")?.toString();
  const isCompleted = formData.get("isCompleted") === "true";
  const image = formData.get("image") as File | null;

  let imageUrl = formData.get("imageUrl")?.toString();

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
    return { status: true, error: "" };
  } catch (err) {
    console.error(err);
    return { status: false, error: "서버 통신 중 오류 발생" };
  }
}
