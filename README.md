# Do it 할 일 관리 서비스

디자인 시안 준수하여 개발한 Next-app-router 버전 TodoList 입니다.

서버 액션(Server Actions)과 낙관적 업데이트(Optimistic UI)를 활용해
빠르고 편안한 경험을 제공합니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: React Hooks (useOptimistic, useActionState)
- **Deployment**: Vercel

## ✨ 핵심 기능 & 구현 디테일

## 렌더링 최적화

렌더링 최적화 및 캐시 전략 (Architecture)

- **On-Demand ISR 적용**: `generateStaticParams`로 상세 페이지를 정적(Static)으로 미리 생성하여, 동적 라우팅임에도 **SSG 수준의 빠른 초기 로딩 속도(FCP/TTI 최적화)**를 보장합니다.
- **Next.js Caching 활용**:
  - **Request Memoization & Data Cache**: 동일한 API 요청을 중복 호출하지 않고 캐싱된 데이터를 재사용하여 서버 부하를 줄였습니다.
  - **Full Route Cache**: 정적 페이지 빌드를 통해 HTML/RSC Payload를 캐싱하여 렌더링 성능을 극대화했습니다.
- **정밀한 데이터 갱신**: `revalidateTag`를 활용하여, 데이터 수정 시 관련된 특정 페이지의 캐시만 선택적으로 무효화(Purge)하여 최신성을 유지합니다.

## 반응형 디자인(UI/UX)

- Mobile / Tablet / Desktop 각 해상도에 최적화된 레이아웃 제공

## 🚀 실행 방법 (Getting Started)

1. **프로젝트 클론 및 패키지 설치**
   ```bash
   git clone [레포지토리 주소]
   npm install
   ```
