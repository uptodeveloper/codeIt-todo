/**
 * [상세 페이지 헤더 컴포넌트]
 * * @description
 * 할 일의 제목을 수정하고 완료 상태를 토글하는 컴포넌트입니다.
 * * @features
 * 1. **제목 입력창 너비 자동 조절**:
 * - Input 태그는 텍스트 길이에 따라 너비가 변하지 않는 한계가 있습니다.
 * - 이를 해결하기 위해 입력된 텍스트와 동일한 내용을 가진 **숨겨진 span 태그**를 두어 너비를 감지하게 하고,
 * - Input이 그 너비를 따라가도록 구현하여 자연스러운 밑줄 UI를 완성했습니다.
 */

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
        className="h-16 w-full overflow-hidden justify-center"
      >
        <div className="relative ">
          <span className="invisible font-bold text-lg whitespace-pre px-2 block">
            {name || "할 일을 입력해주세요"}
          </span>

          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`
              absolute inset-0 w-full h-full
              bg-transparent font-bold text-lg text-center focus:outline-none cursor-pointer border-b-2 underline-offset-4
             
            `}
          />
        </div>
      </TodoItemLayout>
    </div>
  );
}
