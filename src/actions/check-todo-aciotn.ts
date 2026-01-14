"use server";

import { revalidatePath } from "next/cache";

export async function checkTodoAction(todoId: number, isCompleted: boolean) {
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
