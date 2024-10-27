/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com", "hebbkx1anhila5yf.public.blob.vercel-storage.com"], // ImgurとVercelのBlobストレージからの画像を許可
  },
  eslint: {
    ignoreDuringBuilds: true, // ビルド時にESLintエラーを無視
  },
};

export default nextConfig;
