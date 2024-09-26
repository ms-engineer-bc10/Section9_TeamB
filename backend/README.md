# API設計
## エンドポイント一覧
http://localhost:8000/api/users/
http://localhost:8000/api/children/
http://localhost:8000/api/books/
http://localhost:8000/api/story-prompts/
http://localhost:8000/api/telling-records/
http://localhost:8000/api/telling-reminders/

### Users（要確認）
POST /auth/register	-	新規ユーザー登録
POST /auth/login	- ユーザーログイン
GET /api/users/{userId}	- ユーザー情報の取得

### Children
- GET /api/child/ - 登録した子どもの一覧取得
- POST /api/child/ - 子どもの新規登録
- GET /api/child/{id}/ - 特定の子どもの詳細取得
- PUT /api/child/{id}/ - 特定の子どもの情報更新
- DELETE /api/child/{id}/ - 特定の子どもの情報削除

### Books
- GET /api/books/ - 本の一覧取得
- POST /api/books/ - 新しい本の作成
- GET /api/books/{id}/ - 特定の本の詳細取得
- PUT /api/books/{id}/ - 特定の本の更新
- DELETE /api/books/{id}/ - 特定の本の削除

### StoryPrompts
- GET /api/story-prompts/ - ストーリープロンプトの一覧取得
- POST /api/story-prompts/ - 新しいストーリープロンプトの作成
- GET /api/story-prompts/{id}/ - 特定のストーリープロンプトの詳細取得
- PUT /api/story-prompts/{id}/ - 特定のストーリープロンプトの更新
- DELETE /api/story-prompts/{id}/ - 特定のストーリープロンプトの削除

### TellingRecords
- GET /api/telling-records/ - Telling記録の一覧取得
- POST /api/telling-records/ - 新しいTelling記録の作成
- GET /api/telling-records/{id}/ - 特定のTelling記録の詳細取得
- PUT /api/telling-records/{id}/ - 特定のTelling記録の更新
- DELETE /api/telling-records/{id}/ - 特定のTelling記録の削除

### TellingReminder
- GET /api/telling-reminder/ - Telling予定の一覧取得
- POST /api/telling-reminder/ - 新しいTelling予定の作成
- GET /api/telling-reminder/{id}/ - 特定のTelling予定の詳細取得
- PUT /api/telling-reminder/{id}/ - 特定のTelling予定の更新
- DELETE /api/telling-reminder/{id}/ - 特定のTelling予定の削除

## その他
- GET /api/users/{id}/books/ - 特定のユーザーの本の一覧取得
