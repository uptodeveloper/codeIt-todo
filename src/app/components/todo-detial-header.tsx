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
        // ✅ justify-center: 내용물을 가운데로 모음
        className="h-16 w-full overflow-hidden justify-center"
      >
        {/* 📦 [Wrapper Div] 
           - 역할: flex 아이템으로서 '글자 크기만큼만' 너비를 차지함
           - relative: 내부 absolute input의 기준점
        */}
        <div className="relative ">
          {/* 👻 [Ghost Span] (너비 담당)
             - 화면엔 안 보임 (invisible)
             - 하지만 텍스트 내용만큼 공간을 밀어내서 div 너비를 만듦
             - input과 똑같은 폰트 스타일을 줘야 오차가 없음
          */}
          <span className="invisible font-bold text-lg whitespace-pre px-2 block">
            {name || "할 일을 입력해주세요"}
          </span>

          {/* ✍️ [Real Input] (입력 담당)
             - absolute inset-0: 부모 div 크기에 딱 맞게 덮어씌움
             - 따라서 div가 글자만큼 늘어나면, 얘도 같이 늘어남!
          */}
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
