"use client";

import Image from "next/image";


type PenguinProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showGift?: boolean;
  lookLeft?: boolean; // 시선 방향 (true: 왼쪽, false: 오른쪽)
  variant?: 1 | 2 | 3 | 4 | 5; // 펭귄 이미지 선택 (penguin1~5)
};

const sizeMap = {
  sm: "w-10", // 작은 크기
  md: "w-16", // 중간 크기
  lg: "w-24", // 큰 크기
  xl: "w-64", // 매우 큰 크기 (홈페이지용) - 256px
};

export function Penguin({ size = "md", className = "", showGift = true, lookLeft = false, variant = 1 }: PenguinProps) {
  const imageSrc = `/penguin${variant}.png`;
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 반짝이는 효과 (펭귄 주변) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-70 animate-ping" style={{ top: '15%', left: '25%', animationDelay: '0s' }} />
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-80 animate-ping" style={{ top: '35%', right: '20%', animationDelay: '0.7s' }} />
        <div className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full opacity-75 animate-ping" style={{ bottom: '25%', left: '30%', animationDelay: '1.4s' }} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-ping" style={{ top: '50%', right: '10%', animationDelay: '2.1s' }} />
      </div>
      
      <div className={`relative ${sizeMap[size]} z-10`}>
        <Image
          src={imageSrc}
          alt="마니또 펭귄"
          width={192}
          height={192}
          className={`w-full h-auto object-contain ${
            lookLeft ? "scale-x-[-1]" : ""
          }`}
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.15))",
            opacity: 0.98,
          }}
          priority
          unoptimized
        />
      </div>
      {showGift && (
        <div className="absolute -bottom-2 -right-2 z-20 animate-bounce pointer-events-none">
          <span className="text-2xl drop-shadow-lg filter brightness-110">🎁</span>
        </div>
      )}
    </div>
  );
}

