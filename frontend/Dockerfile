# ベースイメージとして軽量なNode.jsイメージを使用
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# アプリケーションをビルド（Next.jsの場合）
RUN npm run build

# nginxを使って静的ファイルを提供
FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html

# EXPOSEは不要
# Cloud Runのデフォルトポートを使ってサーバーを起動
CMD ["nginx", "-g", "daemon off;"]
