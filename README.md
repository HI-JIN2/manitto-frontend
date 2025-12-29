# 마니또 파티 (Manitto Party)

친구, 동료와 함께하는 비밀친구 추첨 서비스입니다. 로그인 없이도 바로 시작할 수 있는 게스트 모드를 지원합니다.

## 🎁 주요 기능

- **게스트 모드**: 회원가입 없이 바로 파티 생성 및 참여
- **초대 링크 공유**: 초대코드로 간편하게 파티 참여
- **이메일 일괄 입력**: 팀원 이메일을 미리 알고 있다면 한 번에 입력
- **자동 매칭**: 참여자들이 모두 모이면 자동으로 마니또 매칭
- **이메일 전송**: 매칭결과를 이메일로 결과 발송

## 🛠️ 기술 스택

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

### 린트

```bash
npm run lint
```

## ⚙️ 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# 필수: 백엔드 API 베이스 URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# 선택: Google OAuth (현재 미사용)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

**프로덕션 배포 시:**
- Vercel 프로젝트 설정에서 환경 변수를 추가하세요.
- `NEXT_PUBLIC_API_BASE_URL`은 배포된 백엔드 URL로 설정하세요.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 홈 페이지
│   ├── layout.tsx         # 루트 레이아웃 (헤더, 푸터, 눈 효과)
│   ├── create/            # 파티 생성
│   │   ├── page.tsx
│   │   └── success/       # 파티 생성 성공 페이지
│   ├── join/              # 파티 참여
│   │   ├── page.tsx       # 초대코드 입력
│   │   └── [inviteCode]/  # 초대코드로 참여
│   ├── party/             # 파티 상태 관리
│   │   ├── [partyId]/     # 파티 ID로 상태 보기
│   │   └── invite/        # 초대코드로 상태 보기
│   ├── auth/              # 인증 (현재 미사용)
│   ├── privacy/           # 개인정보처리방침
│   └── terms/             # 이용약관
├── components/            # 재사용 가능한 컴포넌트
│   ├── Penguin.tsx       # 페니 캐릭터 컴포넌트
│   ├── Snow.tsx          # 눈 내리는 효과
│   └── ErrorDialog.tsx   # 에러 다이얼로그
└── lib/                   # 유틸리티 함수
    ├── api.ts            # API 호출 래퍼
    └── auth.ts           # 인증 토큰 관리
```

## 🎨 주요 라우트

| 경로 | 설명 |
|------|------|
| `/` | 홈 페이지 (서비스 소개, 통계, 주요 링크) |
| `/create` | 파티 생성 (게스트 모드) |
| `/create/success` | 파티 생성 성공 페이지 |
| `/join` | 초대코드 입력 페이지 |
| `/join/[inviteCode]` | 초대코드로 파티 참여 |
| `/party/[partyId]` | 파티 상태 보기 (파티 ID) |
| `/party/invite` | 초대코드 입력 페이지 |
| `/party/invite/[inviteCode]` | 파티 상태 보기 (초대코드) |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |

## 🐧 페니 (Penny) 캐릭터

마니또 파티의 주인장인 페니 캐릭터가 서비스 전반에 걸쳐 사용됩니다.

- **컴포넌트**: `src/components/Penguin.tsx`
- **이미지**: `public/penguin1.png` ~ `penguin5.png`
- **로고**: `public/logo_penguin.png`

페니는 조용하지만 따뜻한 톤으로 사용자와 소통합니다.

## 🔧 주요 기능 설명

### 게스트 모드

- 로그인 없이 파티 생성 및 참여 가능
- 이름과 이메일만으로 참여
- 초대 링크를 통해 간편하게 공유

### 초대 링크 공유

- 파티 생성 시 초대코드와 링크 자동 생성
- 카카오톡 단톡방 등으로 쉽게 공유 가능
- 링크만 클릭하면 바로 참여 페이지로 이동

### 이메일 일괄 입력

- 파티 생성 시 팀원 이름과 이메일을 한 번에 입력 가능
- `이름,이메일` 형식으로 한 줄에 한 명씩 입력
- 입력한 팀원들은 자동으로 파티에 참여

### 매칭 시스템

- 참여자가 모두 모이면 매칭 실행 가능
- 매칭 완료 시 모든 참여자에게 이메일 발송
- 매칭 결과는 이메일로만 확인 가능 (보안)

## 🚢 배포 (Vercel)

### 자동 배포

1. GitHub 저장소에 연결
2. Vercel 프로젝트 설정에서 환경 변수 추가
3. `main` 브랜치에 푸시하면 자동 배포

### 수동 배포

```bash
npm run build
# Vercel CLI 사용
vercel --prod
```

### 환경 변수 (Vercel)

- `NEXT_PUBLIC_API_BASE_URL`: 백엔드 API URL (필수)

## 📝 개발 가이드

### API 호출

`src/lib/api.ts`의 `apiFetch` 함수를 사용하세요:

```typescript
import { apiFetch } from "@/lib/api";

const data = await apiFetch<ResponseType>("/endpoint", {
  method: "POST",
  body: { ... },
});
```

### 인증 토큰 관리

`src/lib/auth.ts`를 사용하여 토큰을 관리합니다:

```typescript
import { setToken, getToken, clearToken } from "@/lib/auth";

setToken(token);
const token = getToken();
clearToken();
```

### 페니 캐릭터 사용

```typescript
import { Penguin } from "@/components/Penguin";

<Penguin 
  size="xl"        // sm | md | lg | xl
  variant={3}      // 1~5 (penguin1.png ~ penguin5.png)
  lookLeft={true}  // 시선 방향
  showGift={false} // 선물 아이콘 표시 여부
/>
```

## 🎨 스타일링

- **Tailwind CSS 4** 사용
- 다크 테마 기반 디자인
- 반응형 디자인 지원 (모바일/데스크톱)
- 눈 내리는 효과 (`Snow` 컴포넌트)

## 📄 라이선스

© 2025 마니또 파티. All rights reserved.
