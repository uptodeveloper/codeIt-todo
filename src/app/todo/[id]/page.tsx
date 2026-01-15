import TodoDetail from "@/app/components/todo-detail";
import { TodoData } from "@/types";

async function getTodo(itemId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${itemId}`,
    {
      next: { tags: [`todo-${itemId}`] }, //
    }
  );

  if (!res.ok) {
    throw new Error("데이터를 불러올 수 없습니다.");
  }

  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todoData: TodoData = await getTodo(id);

  return <TodoDetail todoData={todoData} />;
}
