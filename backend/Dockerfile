FROM python:3.10

# 環境変数の設定
ENV PYTHONIOENCODING=utf-8
ENV LANG=C.UTF-8

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Firebaseのサービスアカウントキーをコピー
COPY picturebook/serviceAccountKey.json /app/serviceAccountKey.json

ENV DJANGO_SETTINGS_MODULE=picturebook.settings

# ReportLab の日本語フォントサポートのためのフォントのインストール
RUN apt-get update && apt-get install -y fonts-ipafont fonts-ipaexfont
RUN fc-cache -f -v

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]