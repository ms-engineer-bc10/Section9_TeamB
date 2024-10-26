FROM python:3.10

# 環境変数の設定
ENV PYTHONIOENCODING=utf-8
ENV LANG=C.UTF-8
ENV DJANGO_SETTINGS_MODULE=picturebook.settings

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# ReportLabの日本語フォントサポートのためのフォントのインストール
RUN apt-get update && apt-get install -y fonts-ipafont fonts-ipaexfont && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
RUN fc-cache -f -v

# Firebaseのサービスアカウントキーのコピーを削除 (IAMで管理)

# Cloud Runはデフォルトでポート8080を使用するため、そのポートでDjangoを実行
# サーバー起動前にマイグレーションを実行するため、カスタムエントリーポイントを使用
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8080"]
