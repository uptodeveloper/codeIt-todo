import { TodoData } from "@/types";
import Todoscreen from "./components/todo-screen";

async function getTodos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`, {
    cache: "force-cache",
    next: { tags: ["todo-list"] },
  });
  if (!res.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  return res.json();
}

export default async function Home() {
  const allTodos: TodoData[] = await getTodos();
  return (
    <>
      <div>
        <Todoscreen initialTodos={allTodos} />
      </div>
    </>
  );
}
