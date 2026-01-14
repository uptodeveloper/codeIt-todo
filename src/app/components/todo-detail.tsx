"use client";

import { TodoData } from "@/types";

export default function TodoDetail({ todoData }: { todoData: TodoData }) {
  console.log(todoData);

  return <div>TodoDetail</div>;
}
