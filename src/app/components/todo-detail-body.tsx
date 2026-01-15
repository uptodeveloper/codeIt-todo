
/**
 * [상세 페이지 바디 컴포넌트]
 * * @description
 * 이미지 업로드와 메모 작성을 담당하는 UI 컴포넌트입니다.
 * * @features
 * 1. **동적 텍스트 영역 (Auto-resize Textarea)**:
 * - `useRef`와 `scrollHeight`를 활용하여 텍스트 양에 따라 높이가 자동으로 늘어나는 UX를 구현했습니다.
 * 2. **이미지 유효성 검사**:
 * - 5MB 용량 제한 및 파일명(영문) 정규식 검사를 클라이언트 단에서 수행합니다.
 * 3. **반응형 레이아웃**:
 * - 모바일 환경에서는 Column(세로), 데스크탑 환경에서는 Row(가로) 방향으로 배치되도록 Flexbox를 설계했습니다.
 */


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
  // Textarea 높이 조절을 위한 Ref 생성
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 내용(memo)이 바뀔 때마다 높이 조절 & 처음 로딩시 실행
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // 내용만큼 늘리기
    }
  }, [memo]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
      {/*  이미지 업로드 영역 */}
      <div
        className={`

          w-full h-77.75 
          

          lg:w-2/5 
          
          relative rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 
          flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors
        `}
        onClick={() => document.getElementById("imgInput")?.click()}
      >
        {imageUrl ? (
          //  이미지가 있을 때 (꽉 찬 이미지 + 우측 하단 수정 버튼)
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
               
                <Image src="/ic/edit.svg" alt="수정" fill />
              </div>
            </div>
          </>
        ) : (
          // 이미지가 없을 때 (가운데 아이콘 + 우측 하단 플러스 버튼)
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

      {/*  메모 영역  */}
      <div
        className="
          
          w-full h-77.75
          
        
          lg:flex-1
          
          relative rounded-3xl overflow-hidden
        "
      >
        {/* 배경 이미지 */}
        <Image
          src="/img/memo.svg"
          alt="메모 배경"
          fill
          className="object-cover" 
        />

        {/*  내용물 (텍스트) */}
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
