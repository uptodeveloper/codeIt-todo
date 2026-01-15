/**
 * [할 일 상세 페이지 (Server Component)]
 * * @description
 * 특정 할 일의 상세 정보를 보여주는 서버 컴포넌트입니다.
 * Next.js의 렌더링 전략을 활용하여 "초기 로딩 속도"와 "데이터 최신성"을 모두 확보했습니다.
 * * @features
 * 1. **generateStaticParams (SSG)**:
 * - 빌드 타임에 DB의 모든 할 일 ID를 미리 조회하여 정적 페이지로 생성합니다.
 * - 이를 통해 사용자 접속 시 DB 조회 없이 즉시 HTML을 반환하여 FCP(First Contentful Paint)를 최적화했습니다.
 * 2. **On-Demand ISR (Incremental Static Regeneration)**:
 * - 데이터 조회 시 `next: { tags: [...] }` 옵션을 사용하여 캐싱 전략을 수립했습니다.
 * - 수정/삭제 발생 시 해당 태그만 무효화하여, 정적 페이지의 장점을 유지하면서도 최신 데이터를 보장합니다.
 */

import TodoDetail from "@/app/components/todo-detail";
import { TodoData } from "@/types";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const todos: TodoData[] = await response.json();

  return todos.map((todo) => ({
    id: todo.id.toString(),
  }));
}

async function getTodo(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
    {
      next: { tags: [`todo-${id}`] }, //
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
