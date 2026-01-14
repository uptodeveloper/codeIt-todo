import Image from "next/image";

export default function TodoDetailBody({
  memo,
  setMemo,
  imageUrl,
  handleImageChange,
}: {
  memo: string;
  setMemo: (v: string) => void;
  imageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-96">
      <div className="flex-1 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <div
            onClick={() => document.getElementById("imgInput")?.click()}
            className="w-full h-full relative cursor-pointer"
          >
            <Image
              src={imageUrl}
              alt="Todo"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            />
          </div>
        ) : (
          <label htmlFor="imgInput" className="cursor-pointer">
            이미지 추가
          </label>
        )}

        {/* name="image" 추가 -> 파일 선택 시 FormData 자동 수집 */}
        <input
          id="imgInput"
          name="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex-1 flex flex-col rounded-2xl border bg-white p-4">
        <p className="text-center font-bold pb-2 text-slate-500">Memo</p>
        {/* name="memo" 추가 */}
        <textarea
          name="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full flex-1 bg-transparent resize-none text-center focus:outline-none"
          placeholder="메모를 입력하세요"
        />
      </div>
    </div>
  );
}
