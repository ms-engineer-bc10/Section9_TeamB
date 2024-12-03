# Section9_TeamB

## 技術スタック

### フロントエンド

- Next.js (TypeScript / App Router)
- Tailwind CSS

### バックエンド

- Django (Python)
- Django REST Framework
- Celery
- Redis

### データベース

- PostgreSQL
- Django ORM

### その他

- Firebase（認証機能）
- Stripe（決済機能）
- OpenAI API（外部 API）
- Docker（開発環境）

---

## セットアップ手順

### リポジトリをクローンする

まず、以下のコマンドでリポジトリをクローンします：

```sh
git clone https://github.com/ms-engineer-bc10/Section9_TeamB
cd Section9_TeamB
```

### 仮想環境を作成してアクティベート

プロジェクトの backend ディレクトリに移動し、仮想環境を作成してアクティベートします。

Linux の場合

```sh
cd backend
python -m venv venv
source venv/bin/activate
```

Windows の場合

```sh
cd backend
py -m venv venv
venv\Scripts\activate
```

### 必要なライブラリをインストール

仮想環境がアクティベートされたら、 requirements.txt に記載されているライブラリをインストールします：

```sh
pip install -r requirements.txt
```

### Docker を起動

プロジェクトのルートディレクトリで以下のコマンドを実行して Docker を起動します：

```sh
docker compose up --build
```

### マイグレーションを行う

```sh
docker-compose exec backend python manage.py migrate
```

### 環境変数の設定

`frontend\.env.local.example`、 `backend\.env.example`をもとに`.env.local`、`.env`ファイルを作成し記載。
また、`backend\picturebook\serviceAccountKey.json`を作成して firebase-admin の秘密鍵を記載してください

### アクセス

アプリケーションは以下の URL でアクセスできます：

- フロントエンド: http://localhost:3000/

- バックエンド: http://localhost:8000/
