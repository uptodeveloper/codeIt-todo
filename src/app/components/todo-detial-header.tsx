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
    <div
      className={`border-2 rounded-2xl p-4 flex items-center gap-4 ${
        isCompleted ? "bg-slate-100" : "bg-white"
      }`}
    >
      <button
        type="button"
        onClick={toggleCompleted}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
          isCompleted ? "bg-slate-800" : "bg-white"
        }`}
      >
        {isCompleted && <span className="text-white text-xs">V</span>}
      </button>

      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-transparent text-slate-900 font-bold text-lg focus:outline-none"
      />
    </div>
  );
}
