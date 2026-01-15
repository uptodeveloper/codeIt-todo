import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // ✅ 이미지 업로드 용량 제한을 5MB로 늘립니다.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
