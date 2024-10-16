/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'], // ImgurとVercelのBlobストレージからの画像を許可
  },
};

export default nextConfig;
