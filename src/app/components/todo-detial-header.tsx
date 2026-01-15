import TodoItemLayout from "./share/todo-item-layout";

export default function TodoDetailHeader({
  name,
  setName,
  isCompleted,
  toggleCompleted,
}: {
  name: string;
  setName: (v: string) => void;
  isCompleted: boolean;
  toggleCompleted: () => void;
}) {
  return (
    <div className="mb-4">
      <TodoItemLayout
        isCompleted={isCompleted}
        onToggle={toggleCompleted}
        className="h-16" // ✅ 디테일 페이지는 조금 더 크게 (64px)
      >
        {/* 내용 */}
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-transparent text-slate-900 font-bold text-lg focus:outline-none"
        />
      </TodoItemLayout>
    </div>
  );
}
