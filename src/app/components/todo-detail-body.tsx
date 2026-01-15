"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
  // ✅ 1. Textarea 높이 조절을 위한 Ref 생성
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ✅ 2. 내용(memo)이 바뀔 때마다 높이 조절 & 처음 로딩시 실행
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // 내용만큼 늘리기
    }
  }, [memo]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
      {/* 🖼️ 이미지 업로드 영역 */}
      <div
        className={`
          // ✅ 높이 고정: 시안대로 311px (모바일~데스크탑 모두)
          w-full h-77.75 
          
          // 데스크탑에서 이미지 영역 너비 비율 설정 (약 40%)
          lg:w-2/5 
          
          relative rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 
          flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors
        `}
        onClick={() => document.getElementById("imgInput")?.click()}
      >
        {imageUrl ? (
          // ✅ 1. 이미지가 있을 때 (꽉 찬 이미지 + 우측 하단 수정 버튼)
          <>
            <Image
              src={imageUrl}
              alt="Todo Image"
              fill
              className="object-cover"
              priority
            />
            {/* 우측 하단 수정 버튼 (진한색) */}
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-900/50 flex items-center justify-center z-10">
              <div className="relative w-6 h-6">
                {/* edit.svg가 없다면 plus.svg를 쓰고 rotate 등을 줘도 됩니다 */}
                <Image src="/ic/edit.svg" alt="수정" fill />
              </div>
            </div>
          </>
        ) : (
          // ✅ 2. 이미지가 없을 때 (가운데 아이콘 + 우측 하단 플러스 버튼)
          <>
            {/* 가운데 회색 이미지 아이콘 */}
            <div className="relative w-16 h-16 opacity-100">
              <Image src="/ic/img.svg" alt="이미지 없음" fill />
            </div>

            {/* 우측 하단 플러스 버튼 (연한색) */}
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
              <div className="relative w-6 h-6">
                <Image
                  src="/ic/img-plus.svg"
                  alt="추가"
                  fill
                  className="brightness-0  opacity-50"
                />
              </div>
            </div>
          </>
        )}

        {/* 숨겨진 input */}
        <input
          id="imgInput"
          name="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* 📝 2. 메모 영역 (memo.svg 배경 적용) */}
      <div
        className="
          // ✅ 높이 고정: 시안대로 311px
          w-full h-77.75
          
          // 데스크탑에서 남은 공간 다 차지 (약 60%)
          lg:flex-1
          
          relative rounded-3xl overflow-hidden
        "
      >
        {/* ✅ 배경 이미지 (memo.svg) */}
        <Image
          src="/img/memo.svg"
          alt="메모 배경"
          fill
          className="object-cover" // 비율 유지하며 꽉 채움
        />

        {/* ✅ 내용물 (텍스트) */}
        <div className="relative z-10 flex flex-col w-full h-full p-6 text-center">
          <p className="font-bold text-amber-800 text-sm mb-4">Memo</p>

          <div className="flex-1 min-h-0 overflow-y-auto w-full px-6 pb-6 flex flex-col">
            <div className="min-h-full flex flex-col justify-center">
              <textarea
                ref={textareaRef}
                name="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full bg-transparent resize-none focus:outline-none 
                           text-slate-800 text-center leading-8 block "
                placeholder="메모를 입력하세요"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
