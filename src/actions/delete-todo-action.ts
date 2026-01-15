"use server";

import { revalidatePath } from "next/cache";

export async function deleteTodoAction(todoId: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${todoId}`,
      {
        method: "DELETE",
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
    console.log(err);
    return {
      status: false,
      error: "삭제 중 오류가 발생 했습니다",
    };
  }
}
