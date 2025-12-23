This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Environment

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=#
NEXT_PUBLIC_GOOGLE_CLIENT_ID=#
```

`NEXT_PUBLIC_API_BASE_URL` is required for all API calls. Google Client ID is optional unless OAuth is wired.

## Routes scaffolded

- `/` 홈: 토큰 입력, 주요 플로우 링크
- `/create` 파티 생성
- `/join/[partyId]` 파티 참여
- `/party/[partyId]` 참가자 조회 및 매칭 시작
- `/match-result` 매칭 결과 조회

## API helper

`src/lib/api.ts` wraps `fetch` with base URL + Bearer token (로컬스토리지). `src/lib/auth.ts` stores/clears the token.

## Deploy on Vercel

- `npm run build` for CI
- Set required env vars in Vercel Project Settings
- Output: Next.js App Router default
