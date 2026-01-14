"use server";

import { revalidatePath } from "next/cache";

export async function createTodoAction(_: any, formData: FormData) {
  const name = formData.get("name")?.toString();

  if (!name) {
    return {
      status: false,
      error: "할 일을 입력해 주세요 ",
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidatePath("/");
    return {
      status: true,
      error: "",
    };
  } catch (err) {
     console.error(err);
    return {
      status: false,
      error: "할 일 추가에 실패했습니다",
    };
  }
}
