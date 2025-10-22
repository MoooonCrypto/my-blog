# ブログ・ポートフォリオサイト 設計書

## プロジェクト概要

個人開発者向けのブログ兼ポートフォリオサイト。MDXファイルベースのコンテンツ管理に、ブラウザから操作可能な管理画面を追加し、GitHub API経由で自動コミット・デプロイを実現する。

**コンセプト:**
- レトロ/Windows 95風のUIデザイン
- 技術スタック: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- コンテンツ管理: MDXファイル（Git管理）
- 管理画面: ブラウザベース + GitHub API連携

---

## システム全体図

```
┌─────────────────────────────────────────────────────────────┐
│                     ユーザー操作                              │
│  管理画面 (ブラウザ)                                          │
│   ├─ 記事作成/編集                                            │
│   ├─ ポートフォリオ追加/編集                                   │
│   ├─ サンドボックス追加/編集                                   │
│   ├─ プロフィール編集                                          │
│   └─ 画像アップロード                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   GitHub API (Octokit)                       │
│  - ファイル作成/更新 (content/*.md, public/images/*)         │
│  - 自動コミット & プッシュ                                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                GitHub Repository (Git管理)                   │
│  ├─ content/                                                 │
│  │   ├─ blog/*.md           (ブログ記事)                      │
│  │   ├─ portfolio/*.md      (ポートフォリオ)                  │
│  │   ├─ sandbox/*.md        (サンドボックス)                  │
│  │   └─ profile.md          (プロフィール)                    │
│  └─ public/images/                                           │
│      ├─ blog/*.{png,jpg,webp}                                │
│      ├─ portfolio/*.{png,jpg,webp}                           │
│      └─ sandbox/*.{png,jpg,webp}                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Vercel (自動デプロイ)                        │
│  - Git Push検知                                              │
│  - ビルド実行 (next build)                                    │
│  - 本番環境デプロイ                                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              フロントエンド (Next.js App Router)              │
│  - SSG: ビルド時にMDXファイルを読み込み                        │
│  - 記事ページ、ポートフォリオページ、サンドボックスページ       │
└─────────────────────────────────────────────────────────────┘
```

---

## コンテンツデータ構造

### 1. ブログ記事 (`content/blog/*.md`)

```yaml
---
title: "記事タイトル"
date: "2024-01-20"
category: "tech"
tags: ["React", "Next.js", "TypeScript"]
description: "記事の説明文（SEO用、最大200文字）"
---

# 本文（Markdown）

ここに記事の内容を書く...
```

**フィールド定義:**

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `title` | string | ✅ | 記事タイトル |
| `date` | string | ✅ | 公開日 (YYYY-MM-DD) |
| `category` | string | ❌ | カテゴリ (例: tech, life, dev) |
| `tags` | string[] | ❌ | タグ配列 |
| `description` | string | ❌ | 概要（最大200文字） |

**ファイル命名規則:**
- スラッグ形式: `nextjs-15-migration.md`
- 日本語不可、小文字、ハイフン区切り

---

### 2. ポートフォリオ (`content/portfolio/*.md`)

```yaml
---
title: "プロジェクト名"
url: "https://demo-site.vercel.app"
thumbnail: "/images/portfolio/project-name.png"
date: "2024-01-15"
description: "プロジェクトの説明文（最大100文字）"
---

# 本文（Markdown）

プロジェクトの詳細説明...
```

**フィールド定義:**

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `title` | string | ✅ | プロジェクト名 |
| `url` | string | ✅ | デモURL or GitHubリポジトリURL |
| `thumbnail` | string | ✅ | サムネイル画像パス |
| `date` | string | ✅ | 作成日 (YYYY-MM-DD) |
| `description` | string | ✅ | 概要（最大100文字） |

**変更点（現行仕様からの削除項目）:**
- ❌ `tech` (技術スタック配列) → 削除
- ❌ `github` (GitHubリポジトリURL) → `url` に統合

---

### 3. サンドボックス (`content/sandbox/*.md`)

```yaml
---
title: "実験タイトル"
url: "https://codepen.io/yourname/pen/xxxxx"
thumbnail: "/images/sandbox/experiment-name.png"
date: "2024-01-18"
description: "実験内容の説明（最大100文字）"
---

# 本文（Markdown）

実験の詳細...
```

**フィールド定義:**

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `title` | string | ✅ | 実験タイトル |
| `url` | string | ✅ | デモURL (CodePen, JSFiddle等) |
| `thumbnail` | string | ✅ | サムネイル画像パス |
| `date` | string | ✅ | 作成日 (YYYY-MM-DD) |
| `description` | string | ✅ | 概要（最大100文字） |

**変更点（現行仕様からの削除項目）:**
- ❌ `status` (experimental/complete/deprecated) → 削除
- ❌ `tags` (タグ配列) → 削除

---

### 4. プロフィール (`content/profile.md`)

```markdown
---
name: "Developer Name"
role: "Full Stack Engineer"
location: "Tokyo, Japan"
---

# 自己紹介

ここにMarkdown形式で自由に書く...

## スキル

- JavaScript/TypeScript
- React/Next.js

## 経歴

...
```

**編集方式:**
- Markdown全体を大きなテキストエリアで編集
- Frontmatter + 本文をまとめて管理

---

## 画像管理仕様

### 保存場所

```
/public/images/
  ├── blog/
  │   ├── nextjs-15-migration-20240120-abc123.webp
  │   └── first-post-20240115-def456.png
  ├── portfolio/
  │   ├── todo-app-20240110-ghi789.jpg
  │   └── ecommerce-site-20240105-jkl012.webp
  └── sandbox/
      ├── css-glitch-20240118-mno345.png
      └── webgl-demo-20240112-pqr678.gif
```

### ファイル名自動生成規則

**フォーマット:**
```
{slug}-{YYYYMMDD}-{random6}.{ext}
```

**例:**
- 入力: `todo-app.png`
- 出力: `todo-app-20240120-a1b2c3.png`

**生成ロジック:**
```typescript
function generateImageFileName(originalName: string, slug: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase()
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
  const random = Math.random().toString(36).substring(2, 8)
  return `${slug}-${date}-${random}.${ext}`
}
```

### 画像最適化仕様

**処理内容:**
1. **リサイズ:** 横幅が1200pxを超える場合、1200pxにリサイズ
2. **フォーマット変換:**
   - PNG/JPEGはそのまま保存（必要に応じてWebP変換も検討）
   - GIF/WebPはそのまま保存
3. **圧縮:** 品質80%で圧縮

**対応フォーマット:**
- ✅ PNG
- ✅ JPEG/JPG
- ✅ WebP
- ✅ GIF
- ✅ SVG (ベクター画像はそのまま)

**ライブラリ候補:**
- `sharp` (サーバーサイド画像処理)
- `browser-image-compression` (ブラウザ側で事前圧縮)

**実装方針:**
ブラウザ側で事前圧縮 → Base64エンコード → GitHub API経由でアップロード

---

## 管理画面設計

### URL構成

```
/admin/login              - ログインページ
/admin                    - ダッシュボード（リダイレクト → /admin/dashboard）
/admin/dashboard          - ダッシュボード（概要表示）

/admin/blog               - ブログ記事一覧
/admin/blog/new           - 新規記事作成
/admin/blog/[slug]/edit   - 記事編集

/admin/portfolio          - ポートフォリオ一覧
/admin/portfolio/new      - 新規追加
/admin/portfolio/[slug]/edit - 編集

/admin/sandbox            - サンドボックス一覧
/admin/sandbox/new        - 新規追加
/admin/sandbox/[slug]/edit - 編集

/admin/profile            - プロフィール編集

/admin/logout             - ログアウト
```

### ダッシュボード (`/admin/dashboard`)

**表示内容:**

1. **コンテンツ統計**
   ```
   ┌─────────────────────────────────────┐
   │  📊 コンテンツ概要                   │
   ├─────────────────────────────────────┤
   │  ブログ記事:        12件             │
   │  ポートフォリオ:     5件             │
   │  サンドボックス:     8件             │
   └─────────────────────────────────────┘
   ```

2. **最近の更新**
   ```
   ┌─────────────────────────────────────┐
   │  🕒 最近の更新                       │
   ├─────────────────────────────────────┤
   │  2024-01-20  ブログ   Next.js 15... │
   │  2024-01-18  Sandbox  CSS Glitch... │
   │  2024-01-15  Portfolio Todo App...  │
   └─────────────────────────────────────┘
   ```

3. **クイックアクション**
   ```
   [新規ブログ記事]  [新規ポートフォリオ]  [新規サンドボックス]
   ```

4. **システム情報**
   ```
   最終コミット: 2024-01-20 15:30
   ブランチ: main
   環境: Production
   ```

### 共通UIコンポーネント

**1. ナビゲーション (サイドバー)**
```
┌──────────────────┐
│  ADMIN CONSOLE   │
├──────────────────┤
│  📊 Dashboard    │
│  📝 Blog         │
│  💼 Portfolio    │
│  🧪 Sandbox      │
│  👤 Profile      │
│  🚪 Logout       │
└──────────────────┘
```

**2. 一覧ページ共通レイアウト**
```
┌─────────────────────────────────────────────────────────┐
│  Blog 記事一覧                           [+ 新規作成]    │
├─────────────────────────────────────────────────────────┤
│  検索: [              ]  カテゴリ: [All ▼]              │
├─────────────────────────────────────────────────────────┤
│  ✏️ Next.js 15への移行     2024-01-20    [編集] [削除] │
│  ✏️ はじめてのブログ      2024-01-15    [編集] [削除] │
│  ✏️ TypeScript Tips       2024-01-10    [編集] [削除] │
└─────────────────────────────────────────────────────────┘
```

**3. フォーム共通レイアウト**
```
┌─────────────────────────────────────────────────────────┐
│  新規ブログ記事作成                                       │
├─────────────────────────────────────────────────────────┤
│  タイトル *                                              │
│  [                                                     ] │
│                                                          │
│  公開日 *                                                │
│  [2024-01-20  ]                                          │
│                                                          │
│  カテゴリ                                                │
│  [tech ▼]                                               │
│                                                          │
│  タグ                                                    │
│  [React] [×]  [Next.js] [×]  [+ 追加]                   │
│                                                          │
│  説明文                                                  │
│  [                                                     ] │
│  (0/200)                                                 │
│                                                          │
│  本文 *                                                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ # はじめに                                      │   │
│  │                                                 │   │
│  │ ここに本文を書く...                              │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  [プレビュー]              [下書き保存] [公開する]        │
└─────────────────────────────────────────────────────────┘
```

### 画像アップロードUI

```
┌─────────────────────────────────────────────────────────┐
│  サムネイル画像 *                                         │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐                                           │
│  │          │  ファイルを選択                            │
│  │  [+]     │  または                                    │
│  │          │  ドラッグ&ドロップ                          │
│  └──────────┘                                           │
│                                                          │
│  プレビュー:                                             │
│  ┌────────────────────────────────────┐                 │
│  │                                    │                 │
│  │    [画像プレビュー表示]             │                 │
│  │                                    │                 │
│  └────────────────────────────────────┘                 │
│  todo-app-20240120-a1b2c3.png (245KB → 120KB)          │
│  自動最適化済み ✓                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 認証システム設計

### 方式: Simple Password認証

**仕組み:**
1. 環境変数に管理者パスワードを保存
2. ログイン時にサーバーサイドで検証
3. JWT トークンを HttpOnly Cookie に保存
4. Middleware で `/admin/*` へのアクセスを保護

### 環境変数

```bash
# .env.local (ローカル開発)
ADMIN_PASSWORD=your-secure-password-here
JWT_SECRET=random-string-at-least-32-characters-long
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=MoooonCrypto
GITHUB_REPO=my-blog
```

### ログインフロー

```
1. ユーザーが /admin/login でパスワード入力
2. POST /api/auth/login にパスワード送信 (HTTPS暗号化)
3. サーバーサイドで環境変数と照合
4. 一致 → JWT生成 → HttpOnly Cookie保存
5. /admin/dashboard にリダイレクト
```

### セッション管理

**JWT ペイロード:**
```json
{
  "admin": true,
  "iat": 1705747200,
  "exp": 1706352000
}
```

**Cookie設定:**
```typescript
{
  name: 'admin-token',
  value: 'eyJhbGciOiJIUzI1Ni...',
  httpOnly: true,      // JavaScriptからアクセス不可
  secure: true,        // HTTPS通信のみ
  sameSite: 'strict',  // CSRF対策
  maxAge: 60 * 60 * 24 * 7  // 7日間
}
```

### Middleware による保護

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')?.value

    if (!token || !verifyJWT(token)) {
      return NextResponse.redirect('/admin/login')
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
```

### セキュリティ対策

1. **レート制限**
   - 1分間に5回までログイン試行可能
   - 超過時は429エラー

2. **強力なパスワード**
   ```bash
   # 生成例
   openssl rand -base64 32
   ```

3. **環境変数の保護**
   - `.env.local` を `.gitignore` に追加
   - Vercel環境変数で本番設定

4. **HTTPS通信**
   - Vercelで自動対応

---

## GitHub API連携設計

### GitHub Personal Access Token (PAT)

**権限設定:**
- Repository: `Contents` (Read/Write)
- Repository: `Metadata` (Read only)

**トークン生成手順:**
1. GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Token name: `my-blog-admin`
3. Repository access: `Only select repositories` → `my-blog`
4. Permissions:
   - Contents: Read and write
   - Metadata: Read-only
5. Expiration: 1年

### API操作フロー

#### 1. ファイル作成/更新

```typescript
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

// 新規作成
await octokit.repos.createOrUpdateFileContents({
  owner: 'MoooonCrypto',
  repo: 'my-blog',
  path: 'content/blog/new-post.md',
  message: 'Add: 新規ブログ記事「Next.js 15への移行」',
  content: Buffer.from(markdownContent).toString('base64'),
  branch: 'main'
})

// 更新（既存ファイルのSHA取得が必要）
const { data } = await octokit.repos.getContent({
  owner: 'MoooonCrypto',
  repo: 'my-blog',
  path: 'content/blog/existing-post.md',
  ref: 'main'
})

await octokit.repos.createOrUpdateFileContents({
  owner: 'MoooonCrypto',
  repo: 'my-blog',
  path: 'content/blog/existing-post.md',
  message: 'Update: ブログ記事を更新',
  content: Buffer.from(updatedContent).toString('base64'),
  sha: data.sha,  // 既存ファイルのSHA
  branch: 'main'
})
```

#### 2. 画像アップロード

```typescript
// ブラウザ側で画像圧縮
import imageCompression from 'browser-image-compression'

const compressedFile = await imageCompression(originalFile, {
  maxSizeMB: 1,
  maxWidthOrHeight: 1200,
  useWebWorker: true
})

// Base64変換
const base64 = await fileToBase64(compressedFile)

// GitHub APIでアップロード
await octokit.repos.createOrUpdateFileContents({
  owner: 'MoooonCrypto',
  repo: 'my-blog',
  path: `public/images/portfolio/${fileName}`,
  message: 'Add: ポートフォリオ画像',
  content: base64.split(',')[1],  // data:image/png;base64, を除去
  branch: 'main'
})
```

#### 3. ファイル削除

```typescript
// 削除前にSHA取得
const { data } = await octokit.repos.getContent({
  owner: 'MoooonCrypto',
  repo: 'my-blog',
  path: 'content/blog/old-post.md',
  ref: 'main'
})

// 削除実行
await octokit.repos.deleteFile({
  owner: 'MoooonCrypto',
  repo: 'my-blog',
  path: 'content/blog/old-post.md',
  message: 'Delete: 古いブログ記事を削除',
  sha: data.sha,
  branch: 'main'
})
```

### コミットメッセージ規則

**フォーマット:**
```
[Type]: [Content Type] [Title]

例:
Add: Blog「Next.js 15への移行」
Update: Portfolio「Todo管理アプリ」
Delete: Sandbox「古い実験」
Update: Profile
Add: Image portfolio/todo-app-20240120-abc123.png
```

**Type一覧:**
- `Add` - 新規追加
- `Update` - 更新
- `Delete` - 削除

### エラーハンドリング

```typescript
try {
  await saveToGitHub(content)
} catch (error) {
  if (error.status === 409) {
    // コンフリクト: 古いSHAを使用している
    return { error: 'ファイルが更新されています。再読み込みしてください。' }
  } else if (error.status === 422) {
    // バリデーションエラー
    return { error: 'ファイル内容が不正です。' }
  } else if (error.status === 403) {
    // 権限エラー
    return { error: 'GitHub APIの権限が不足しています。' }
  } else {
    // その他のエラー
    return { error: '保存に失敗しました。もう一度お試しください。' }
  }
}
```

---

## APIルート設計

### 認証API

#### `POST /api/auth/login`

**リクエスト:**
```json
{
  "password": "user-input-password"
}
```

**レスポンス (成功):**
```json
{
  "success": true
}
```
※ JWT は HttpOnly Cookie に自動設定

**レスポンス (失敗):**
```json
{
  "error": "Invalid password"
}
```

---

#### `POST /api/auth/logout`

**レスポンス:**
```json
{
  "success": true
}
```
※ Cookie削除

---

### コンテンツAPI

#### `GET /api/admin/blog`

**レスポンス:**
```json
{
  "posts": [
    {
      "slug": "nextjs-15-migration",
      "title": "Next.js 15への移行",
      "date": "2024-01-20",
      "category": "tech",
      "tags": ["React", "Next.js"],
      "description": "..."
    }
  ]
}
```

---

#### `GET /api/admin/blog/[slug]`

**レスポンス:**
```json
{
  "slug": "nextjs-15-migration",
  "title": "Next.js 15への移行",
  "date": "2024-01-20",
  "category": "tech",
  "tags": ["React", "Next.js"],
  "description": "...",
  "content": "# 本文\n\n...",
  "sha": "a1b2c3d4e5f6..."  // 更新時に必要
}
```

---

#### `POST /api/admin/blog`

**リクエスト:**
```json
{
  "slug": "new-post",
  "title": "新規記事",
  "date": "2024-01-20",
  "category": "tech",
  "tags": ["React"],
  "description": "説明文",
  "content": "# 本文\n\n..."
}
```

**レスポンス:**
```json
{
  "success": true,
  "slug": "new-post"
}
```

---

#### `PUT /api/admin/blog/[slug]`

**リクエスト:**
```json
{
  "title": "更新されたタイトル",
  "date": "2024-01-20",
  "category": "tech",
  "tags": ["React", "TypeScript"],
  "description": "更新された説明文",
  "content": "# 更新された本文\n\n...",
  "sha": "a1b2c3d4e5f6..."
}
```

**レスポンス:**
```json
{
  "success": true
}
```

---

#### `DELETE /api/admin/blog/[slug]`

**レスポンス:**
```json
{
  "success": true
}
```

---

#### `POST /api/admin/upload`

**リクエスト (multipart/form-data):**
```
file: [画像ファイル]
type: "blog" | "portfolio" | "sandbox"
slug: "記事スラッグ"
```

**レスポンス:**
```json
{
  "success": true,
  "path": "/images/portfolio/todo-app-20240120-abc123.png",
  "url": "https://my-blog.vercel.app/images/portfolio/todo-app-20240120-abc123.png"
}
```

---

### API認証

すべての `/api/admin/*` ルートは、以下のミドルウェアで保護:

```typescript
// lib/auth.ts
export async function requireAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value

  if (!token) {
    throw new Error('Unauthorized')
  }

  const payload = await verifyJWT(token)

  if (!payload.admin) {
    throw new Error('Unauthorized')
  }

  return payload
}
```

**使用例:**
```typescript
// app/api/admin/blog/route.ts
export async function GET(request: NextRequest) {
  await requireAuth(request)  // 認証チェック

  const posts = await getBlogPosts()
  return NextResponse.json({ posts })
}
```

---

## フロントエンド実装詳細

### ディレクトリ構造

```
app/
├── (public)/                    # 公開ページ
│   ├── layout.tsx
│   ├── page.tsx                 # トップページ
│   ├── blog/
│   │   ├── page.tsx             # ブログ一覧
│   │   └── [slug]/
│   │       └── page.tsx         # ブログ記事詳細
│   ├── portfolio/
│   │   ├── page.tsx             # ポートフォリオ一覧
│   │   └── [slug]/
│   │       └── page.tsx         # ポートフォリオ詳細
│   ├── sandbox/
│   │   ├── page.tsx             # サンドボックス一覧
│   │   └── [slug]/
│   │       └── page.tsx         # サンドボックス詳細
│   └── profile/
│       └── page.tsx             # プロフィール
│
├── admin/                       # 管理画面（認証必須）
│   ├── layout.tsx               # 管理画面レイアウト
│   ├── login/
│   │   └── page.tsx             # ログインページ
│   ├── dashboard/
│   │   └── page.tsx             # ダッシュボード
│   ├── blog/
│   │   ├── page.tsx             # 記事一覧
│   │   ├── new/
│   │   │   └── page.tsx         # 新規作成
│   │   └── [slug]/
│   │       └── edit/
│   │           └── page.tsx     # 編集
│   ├── portfolio/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [slug]/
│   │       └── edit/
│   │           └── page.tsx
│   ├── sandbox/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [slug]/
│   │       └── edit/
│   │           └── page.tsx
│   └── profile/
│       └── page.tsx             # プロフィール編集
│
├── api/                         # APIルート
│   ├── auth/
│   │   ├── login/
│   │   │   └── route.ts
│   │   └── logout/
│   │       └── route.ts
│   └── admin/
│       ├── blog/
│       │   ├── route.ts         # GET, POST
│       │   └── [slug]/
│       │       └── route.ts     # GET, PUT, DELETE
│       ├── portfolio/
│       │   ├── route.ts
│       │   └── [slug]/
│       │       └── route.ts
│       ├── sandbox/
│       │   ├── route.ts
│       │   └── [slug]/
│       │       └── route.ts
│       ├── profile/
│       │   └── route.ts
│       └── upload/
│           └── route.ts         # 画像アップロード
│
├── components/                  # 共通コンポーネント
│   ├── admin/
│   │   ├── AdminLayout.tsx      # 管理画面レイアウト
│   │   ├── AdminNav.tsx         # サイドバーナビゲーション
│   │   ├── MarkdownEditor.tsx   # Markdownエディタ
│   │   ├── ImageUploader.tsx    # 画像アップロード
│   │   ├── ContentList.tsx      # コンテンツ一覧
│   │   └── Dashboard/
│   │       ├── StatsCard.tsx
│   │       ├── RecentUpdates.tsx
│   │       └── QuickActions.tsx
│   └── public/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── MarkdownRenderer.tsx
│
├── lib/
│   ├── mdx.ts                   # MDX読み込み関数
│   ├── types.ts                 # 型定義
│   ├── auth.ts                  # 認証ヘルパー
│   ├── github.ts                # GitHub API操作
│   └── image-utils.ts           # 画像処理ユーティリティ
│
└── middleware.ts                # 認証Middleware
```

---

## 型定義

```typescript
// lib/types.ts

// ブログ記事
export interface PostMetadata {
  title: string
  date: string
  category?: string
  tags?: string[]
  description?: string
  slug: string
}

export interface Post extends PostMetadata {
  content: string
}

// ポートフォリオ（更新版）
export interface PortfolioMetadata {
  title: string
  url: string                    // デモURL or GitHubリポジトリURL
  thumbnail: string              // サムネイル画像パス
  date: string
  description: string            // 最大100文字
  slug: string
}

export interface Portfolio extends PortfolioMetadata {
  content: string
}

// サンドボックス（更新版）
export interface SandboxMetadata {
  title: string
  url: string                    // デモURL
  thumbnail: string              // サムネイル画像パス
  date: string
  description: string            // 最大100文字
  slug: string
}

export interface SandboxItem extends SandboxMetadata {
  content: string
}

// プロフィール
export interface Profile {
  name?: string
  role?: string
  location?: string
  content: string                // Markdown本文
}

// GitHub API レスポンス
export interface GitHubFileResponse {
  sha: string
  content: string
  encoding: string
}

// 画像アップロードレスポンス
export interface ImageUploadResult {
  success: boolean
  path?: string
  url?: string
  error?: string
}

// API レスポンス
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}
```

---

## 技術スタック

### フロントエンド
- **フレームワーク:** Next.js 15 (App Router)
- **言語:** TypeScript 5
- **スタイリング:** Tailwind CSS v4
- **MDX処理:** `@next/mdx`, `gray-matter`
- **フォーム管理:** React Hook Form (検討中)
- **画像圧縮:** `browser-image-compression`

### バックエンド
- **API:** Next.js API Routes
- **認証:** JWT (`jose` ライブラリ)
- **GitHub連携:** `@octokit/rest`
- **画像処理:** `sharp` (サーバーサイド)

### インフラ
- **ホスティング:** Vercel
- **Git管理:** GitHub
- **CI/CD:** Vercel自動デプロイ

### 開発ツール
- **Linter:** ESLint
- **フォーマッタ:** Prettier (設定済みの場合)
- **型チェック:** TypeScript Compiler

---

## 実装フェーズ

### Phase 1: 認証基盤（2-3時間）
- [ ] 環境変数設定
- [ ] JWT認証実装
- [ ] `/api/auth/login` 作成
- [ ] `/api/auth/logout` 作成
- [ ] Middleware設定
- [ ] ログインページUI

### Phase 2: GitHub API連携（3-4時間）
- [ ] Octokit セットアップ
- [ ] `lib/github.ts` 実装
  - [ ] ファイル取得
  - [ ] ファイル作成/更新
  - [ ] ファイル削除
- [ ] エラーハンドリング
- [ ] レート制限対策

### Phase 3: 型定義更新（1時間）
- [ ] `lib/types.ts` 更新
  - [ ] `Portfolio` から `tech`, `github` 削除
  - [ ] `Sandbox` から `status`, `tags` 削除
  - [ ] `url`, `thumbnail`, `description` 追加

### Phase 4: ダッシュボード（2-3時間）
- [ ] `/admin/dashboard` ページ作成
- [ ] コンテンツ統計表示
- [ ] 最近の更新一覧
- [ ] クイックアクションボタン

### Phase 5: ブログ管理画面（5-6時間）
- [ ] `/api/admin/blog` API実装
- [ ] `/admin/blog` 一覧ページ
- [ ] `/admin/blog/new` 作成ページ
- [ ] `/admin/blog/[slug]/edit` 編集ページ
- [ ] Markdownエディタコンポーネント
- [ ] プレビュー機能

### Phase 6: ポートフォリオ管理画面（4-5時間）
- [ ] `/api/admin/portfolio` API実装
- [ ] 一覧・作成・編集ページ
- [ ] 画像アップロード機能
- [ ] サムネイルプレビュー

### Phase 7: サンドボックス管理画面（4-5時間）
- [ ] `/api/admin/sandbox` API実装
- [ ] 一覧・作成・編集ページ
- [ ] 画像アップロード機能

### Phase 8: プロフィール管理画面（2時間）
- [ ] `/api/admin/profile` API実装
- [ ] `/admin/profile` 編集ページ
- [ ] Markdown全体編集UI

### Phase 9: 画像処理（3-4時間）
- [ ] `/api/admin/upload` 実装
- [ ] ブラウザ側圧縮処理
- [ ] ファイル名自動生成
- [ ] 画像最適化（リサイズ、圧縮）
- [ ] ImageUploader コンポーネント

### Phase 10: UI改善・テスト（3-4時間）
- [ ] レスポンシブデザイン調整
- [ ] ローディング状態表示
- [ ] エラーメッセージ表示
- [ ] バリデーション強化
- [ ] E2Eテスト（手動）

### Phase 11: セキュリティ強化（2時間）
- [ ] レート制限実装
- [ ] CSRFトークン検討
- [ ] XSS対策確認
- [ ] 環境変数チェック

### Phase 12: ドキュメント・デプロイ（1-2時間）
- [ ] README更新
- [ ] 管理画面マニュアル作成
- [ ] Vercel環境変数設定
- [ ] 本番デプロイ

**総実装時間見積もり: 32-42時間**

---

## セキュリティチェックリスト

### 認証
- [ ] パスワードはサーバーサイドでのみ検証
- [ ] クライアントコードにパスワードが含まれていない
- [ ] JWT は HttpOnly Cookie に保存
- [ ] HTTPS通信のみ許可
- [ ] セッション有効期限設定（7日間）

### GitHub API
- [ ] トークンは環境変数に保存
- [ ] トークン権限を最小化（Contents: Read/Write のみ）
- [ ] `.env.local` が `.gitignore` に含まれている
- [ ] Vercel環境変数に本番トークン設定

### XSS対策
- [ ] ユーザー入力をサニタイズ
- [ ] Markdownレンダリング時にHTMLエスケープ
- [ ] `dangerouslySetInnerHTML` を使用しない

### CSRF対策
- [ ] Cookie に `sameSite: 'strict'` 設定
- [ ] 重要な操作は確認ダイアログ表示

### レート制限
- [ ] ログイン試行: 1分間に5回まで
- [ ] GitHub API: 5000リクエスト/時間（GitHub制限）

### 入力バリデーション
- [ ] フロントエンド: クライアントサイド検証
- [ ] バックエンド: サーバーサイド検証（必須）
- [ ] 文字数制限チェック
- [ ] ファイルサイズ制限（画像: 5MB以下）
- [ ] ファイル拡張子チェック

---

## パフォーマンス最適化

### 画像
- [ ] 自動リサイズ（max 1200px）
- [ ] 自動圧縮（品質80%）
- [ ] WebP形式の活用検討
- [ ] Next.js Image コンポーネント使用

### ビルド
- [ ] SSG: 全ページを静的生成
- [ ] ISR: 検討不要（MDXファイルベース）
- [ ] Turbopack使用（Next.js 15）

### API
- [ ] GitHub API レート制限を監視
- [ ] 不要なファイル取得を避ける
- [ ] キャッシュ戦略（必要に応じて）

---

## 今後の拡張案

### 短期（3ヶ月以内）
- [ ] 画像の一括管理ページ
- [ ] 記事の下書き機能（frontmatter に `draft: true`）
- [ ] タグ・カテゴリの自動補完
- [ ] Markdownエディタの改善（プレビュー同期スクロール）

### 中期（6ヶ月以内）
- [ ] アクセス解析連携（Google Analytics）
- [ ] OGP画像自動生成
- [ ] RSS フィード生成
- [ ] サイトマップ自動生成
- [ ] 全文検索機能（Algolia等）

### 長期（1年以内）
- [ ] 複数ユーザー対応（役割管理）
- [ ] コメント機能（Giscus等）
- [ ] Newsletter機能
- [ ] 多言語対応（i18n）

---

## トラブルシューティング

### GitHub API エラー

**409 Conflict:**
- 原因: 古いSHAを使用してファイル更新を試みた
- 対処: 最新のSHAを再取得して再試行

**422 Validation Failed:**
- 原因: ファイル内容が不正、またはBase64エンコードエラー
- 対処: エンコード処理を確認

**403 Forbidden:**
- 原因: トークンの権限不足、またはレート制限超過
- 対処: トークン権限を確認、レート制限をチェック

### 認証エラー

**ログインできない:**
- 環境変数 `ADMIN_PASSWORD` が正しく設定されているか確認
- Vercel環境変数が本番環境に反映されているか確認

**セッションが切れる:**
- Cookie設定を確認（`httpOnly`, `secure`, `sameSite`）
- JWT有効期限を確認

### 画像アップロードエラー

**ファイルサイズが大きすぎる:**
- クライアント側圧縮が動作しているか確認
- 圧縮設定（maxSizeMB）を調整

**アップロードが遅い:**
- 画像を事前圧縮
- GitHub API のレート制限を確認

---

## まとめ

本設計書は、MDXベースのブログ・ポートフォリオサイトに管理画面を追加し、GitHub API経由で自動デプロイする仕組みを定義しています。

**主要な特徴:**
- ✅ コスト: $0（GitHubトークン、Vercel無料枠）
- ✅ セキュリティ: Simple Password認証 + JWT + HttpOnly Cookie
- ✅ 運用: ブラウザから記事・画像を管理、自動Git コミット
- ✅ パフォーマンス: SSG、画像自動最適化
- ✅ 拡張性: 段階的な機能追加が可能

**次のステップ:**
1. 環境変数準備（GitHub Token取得）
2. Phase 1から順次実装
3. ローカル環境でテスト
4. Vercel本番デプロイ

実装開始の準備ができたら、具体的なコード生成をサポートします！
