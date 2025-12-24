# 펭귄 캐릭터 설정 가이드

## 📝 이미지 파일 추가

펭귄 캐릭터 이미지를 `public` 폴더에 추가해야 합니다:

1. **이미지 파일 준비**
   - 파일명: `penguin-character.png` (또는 `.jpg`, `.webp`)
   - 권장 크기: 최소 192x192px (고해상도 권장)
   - 형식: PNG (투명 배경) 또는 JPG

2. **파일 위치**
   ```
   frontend-next/public/penguin-character.png
   ```

3. **파일 추가 방법**
   ```bash
   # public 폴더에 이미지 파일 복사
   cp /path/to/your/penguin-image.png frontend-next/public/penguin-character.png
   ```

## 🎨 사용 위치

펭귄 캐릭터가 다음 위치에 표시됩니다:

1. **헤더 로고** (`layout.tsx`)
   - 작은 크기 (sm)
   - 선물 없이 표시

2. **홈페이지 히어로 섹션** (`page.tsx`)
   - 작은 크기 (sm): 제목 옆
   - 큰 크기 (lg): 오른쪽 (데스크톱만)

3. **파티 생성 성공 페이지** (`create/success/success-client.tsx`)
   - 중간 크기 (md)
   - 선물과 함께 표시

## 🔧 컴포넌트 사용법

```tsx
import { Penguin } from "@/components/Penguin";

// 기본 사용
<Penguin />

// 크기 지정
<Penguin size="lg" />

// 선물 숨기기
<Penguin showGift={false} />

// 커스텀 클래스
<Penguin className="my-4" />
```

## 📏 크기 옵션

- `sm`: 64px (16x16 Tailwind)
- `md`: 96px (24x24 Tailwind) - 기본값
- `lg`: 128px (32x32 Tailwind)
- `xl`: 192px (48x48 Tailwind)

## 🎁 애니메이션

펭귄 옆에 선물 이모지(🎁)가 bounce 애니메이션으로 표시됩니다.
`showGift={false}`로 숨길 수 있습니다.

## ✅ 확인 사항

- [ ] `public/penguin-character.png` 파일이 존재하는가?
- [ ] 이미지가 올바르게 표시되는가?
- [ ] 모든 페이지에서 캐릭터가 보이는가?
- [ ] 반응형 디자인에서도 잘 보이는가?

