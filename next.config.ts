import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // 프로덕션에서 백엔드 URL이 HTTP인 경우 프록시 사용
    if (backendUrl && backendUrl.startsWith("http://")) {
      const backendHost = new URL(backendUrl).origin;
      
      return [
        {
          source: "/api/:path*",
          destination: `${backendHost}/api/:path*`,
        },
      ];
    }
    
    return [];
  },
};

export default nextConfig;
