export default function Loading() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto animate-pulse">
      {/* 헤더 스켈레톤 */}
      <div className="h-16 bg-slate-200 rounded-2xl w-full" />

      {/* 본문 스켈레톤 */}
      <div className="flex flex-col md:flex-row gap-6 h-96">
        <div className="flex-1 bg-slate-200 rounded-2xl" />
        <div className="flex-1 bg-slate-200 rounded-2xl" />
      </div>

      {/* 버튼 스켈레톤 */}
      <div className="flex justify-end gap-4">
        <div className="w-32 h-12 bg-slate-200 rounded-xl" />
        <div className="w-32 h-12 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}
