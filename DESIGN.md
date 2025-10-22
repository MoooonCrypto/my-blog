# ブログ・ポートフォリオサイト 設計書（シンプル版）

## プロジェクト概要

個人開発者向けのブログ兼ポートフォリオサイト。MDXファイルベースのコンテンツ管理で、ファイルを直接編集してGit pushするだけで自動デプロイされるシンプルな構成。

**コンセプト:**
- レトロ/Windows 95風のUIデザイン
- 技術スタック: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- コンテンツ管理: MDXファイル（Git管理）
- デプロイ: Vercel自動デプロイ

---

## システム全体図

```
┌─────────────────────────────────────────────────────────────┐
│                  ローカル開発環境                              │
│  - VSCode等でMDXファイルを編集                                 │
│  - public/images/ に画像を配置                                │
│  - npm run dev でローカルプレビュー                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
                      git add .
                      git commit
                      git push
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

**新規作成手順:**
```bash
# 1. ファイル作成
touch content/blog/my-new-post.md

# 2. 内容を編集
vim content/blog/my-new-post.md

# 3. ローカルで確認
npm run dev

# 4. コミット＆プッシュ
git add content/blog/my-new-post.md
git commit -m "Add: 新規ブログ記事「タイトル」"
git push
```

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

**新規作成手順:**
```bash
# 1. ファイルと画像を準備
touch content/portfolio/my-project.md
# 画像を public/images/portfolio/my-project.png に配置

# 2. 内容を編集
vim content/portfolio/my-project.md

# 3. ローカルで確認
npm run dev

# 4. コミット＆プッシュ
git add content/portfolio/my-project.md public/images/portfolio/my-project.png
git commit -m "Add: ポートフォリオ「プロジェクト名」"
git push
```

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

**新規作成手順:**
```bash
# 1. ファイルと画像を準備
touch content/sandbox/my-experiment.md
# 画像を public/images/sandbox/my-experiment.png に配置

# 2. 内容を編集
vim content/sandbox/my-experiment.md

# 3. ローカルで確認
npm run dev

# 4. コミット＆プッシュ
git add content/sandbox/my-experiment.md public/images/sandbox/my-experiment.png
git commit -m "Add: サンドボックス「実験名」"
git push
```

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

**更新手順:**
```bash
# 1. ファイルを編集
vim content/profile.md

# 2. ローカルで確認
npm run dev

# 3. コミット＆プッシュ
git add content/profile.md
git commit -m "Update: プロフィール情報を更新"
git push
```

---

## 画像管理

### 保存場所

```
/public/images/
  ├── blog/
  │   ├── nextjs-15-migration.png
  │   └── first-post.jpg
  ├── portfolio/
  │   ├── todo-app.jpg
  │   └── ecommerce-site.webp
  └── sandbox/
      ├── css-glitch.png
      └── webgl-demo.gif
```

### ファイル命名規則

**推奨フォーマット:**
```
{slug}.{ext}
```

**例:**
- `todo-app.png`
- `nextjs-15-migration.jpg`
- `css-glitch-effect.webp`

### 画像最適化（手動）

**推奨ツール:**
1. **TinyPNG** (https://tinypng.com/)
   - PNG/JPEGの圧縮

2. **Squoosh** (https://squoosh.app/)
   - ブラウザベースの画像最適化
   - WebP変換

3. **ImageOptim** (Mac)
   - ローカルアプリで一括最適化

**推奨サイズ:**
- 横幅: 最大1200px
- ファイルサイズ: 200KB以下推奨

**対応フォーマット:**
- ✅ PNG
- ✅ JPEG/JPG
- ✅ WebP（推奨）
- ✅ GIF
- ✅ SVG

### Next.js Image コンポーネントの活用

画像は自動的に最適化されます：

```tsx
import Image from 'next/image'

<Image
  src="/images/portfolio/todo-app.png"
  alt="Todo管理アプリ"
  width={800}
  height={600}
/>
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
```

---

## フロントエンド実装詳細

### ディレクトリ構造

```
app/
├── layout.tsx                   # ルートレイアウト
├── page.tsx                     # トップページ
├── blog/
│   ├── page.tsx                 # ブログ一覧
│   └── [slug]/
│       └── page.tsx             # ブログ記事詳細
├── portfolio/
│   ├── page.tsx                 # ポートフォリオ一覧
│   └── [slug]/
│       └── page.tsx             # ポートフォリオ詳細
├── sandbox/
│   ├── page.tsx                 # サンドボックス一覧
│   └── [slug]/
│       └── page.tsx             # サンドボックス詳細
└── profile/
    └── page.tsx                 # プロフィール

components/
├── Header.tsx                   # ヘッダー
├── Footer.tsx                   # フッター
└── MarkdownRenderer.tsx         # Markdownレンダラー

lib/
├── mdx.ts                       # MDX読み込み関数
└── types.ts                     # 型定義

content/
├── blog/*.md
├── portfolio/*.md
├── sandbox/*.md
└── profile.md

public/
└── images/
    ├── blog/
    ├── portfolio/
    └── sandbox/
```

---

## 技術スタック

### フロントエンド
- **フレームワーク:** Next.js 15 (App Router)
- **言語:** TypeScript 5
- **スタイリング:** Tailwind CSS v4
- **MDX処理:** `@next/mdx`, `gray-matter`

### インフラ
- **ホスティング:** Vercel
- **Git管理:** GitHub
- **CI/CD:** Vercel自動デプロイ

### 開発ツール
- **エディタ:** VSCode推奨
- **Linter:** ESLint
- **型チェック:** TypeScript Compiler

---

## 実装フェーズ

### Phase 1: 型定義更新（30分）
- [ ] `lib/types.ts` を更新
  - [ ] `PortfolioMetadata` から `tech`, `github` 削除、`url`, `thumbnail`, `description` 追加
  - [ ] `SandboxMetadata` から `status`, `tags` 削除、`url`, `thumbnail`, `description` 追加

### Phase 2: MDX読み込み関数の更新（30分）
- [ ] `lib/mdx.ts` を更新
  - [ ] Portfolio/Sandbox の型に合わせて修正

### Phase 3: ポートフォリオページ実装（1-2時間）
- [ ] `app/portfolio/page.tsx` - 一覧ページ
  - [ ] サムネイル画像表示
  - [ ] URL、description表示
- [ ] `app/portfolio/[slug]/page.tsx` - 詳細ページ
  - [ ] 画像表示
  - [ ] 外部リンクボタン

### Phase 4: サンドボックスページ実装（1-2時間）
- [ ] `app/sandbox/page.tsx` - 一覧ページ
  - [ ] サムネイル画像表示
  - [ ] URL、description表示
- [ ] `app/sandbox/[slug]/page.tsx` - 詳細ページ
  - [ ] 画像表示
  - [ ] 外部リンクボタン

### Phase 5: 既存コンテンツの移行（1時間）
- [ ] `content/portfolio/*.md` のフロントマター更新
  - [ ] `tech` → 削除
  - [ ] `github` or `demo` → `url` に統一
  - [ ] `thumbnail` 追加
  - [ ] `description` 追加
- [ ] `content/sandbox/*.md` のフロントマター更新
  - [ ] `status`, `tags` → 削除
  - [ ] `url`, `thumbnail`, `description` 追加

### Phase 6: 画像の配置（30分）
- [ ] サンプル画像を `public/images/` に配置
  - [ ] portfolio/
  - [ ] sandbox/

### Phase 7: ビルドテスト（30分）
- [ ] ローカルビルド確認
  ```bash
  npm run build
  npm run start
  ```
- [ ] 型エラーチェック
  ```bash
  npx tsc --noEmit
  ```
- [ ] Lint確認
  ```bash
  npm run lint
  ```

### Phase 8: デプロイ（30分）
- [ ] Gitコミット＆プッシュ
- [ ] Vercel自動デプロイ確認
- [ ] 本番環境での動作確認

**総実装時間見積もり: 5-8時間**

---

## 開発ワークフロー

### 新規ブログ記事を追加する場合

```bash
# 1. ブランチ作成（任意）
git checkout -b add/new-blog-post

# 2. 記事ファイル作成
touch content/blog/my-new-post.md

# 3. 内容を編集（VSCode等）
code content/blog/my-new-post.md

# 4. ローカルで確認
npm run dev
# http://localhost:3000/blog/my-new-post を確認

# 5. コミット
git add content/blog/my-new-post.md
git commit -m "Add: 新規ブログ記事「タイトル」"

# 6. プッシュ
git push origin add/new-blog-post
# または直接 main へ: git push origin main

# 7. Vercelで自動デプロイ（数分待つ）
```

### 画像付きポートフォリオを追加する場合

```bash
# 1. 画像を最適化（TinyPNG等）
# original.png → todo-app.png (200KB以下)

# 2. 画像を配置
cp ~/Downloads/todo-app.png public/images/portfolio/

# 3. MDXファイル作成
touch content/portfolio/todo-app.md

# 4. 内容を編集
cat << 'EOF' > content/portfolio/todo-app.md
---
title: "Todo管理アプリ"
url: "https://todo-app-demo.vercel.app"
thumbnail: "/images/portfolio/todo-app.png"
date: "2024-01-20"
description: "タスクを効率的に管理できるWebアプリケーション"
---

# Todo管理アプリ

シンプルで使いやすいタスク管理アプリです...
EOF

# 5. ローカルで確認
npm run dev

# 6. コミット＆プッシュ
git add content/portfolio/todo-app.md public/images/portfolio/todo-app.png
git commit -m "Add: ポートフォリオ「Todo管理アプリ」"
git push
```

### 既存記事を更新する場合

```bash
# 1. ファイルを編集
vim content/blog/existing-post.md

# 2. ローカルで確認
npm run dev

# 3. コミット＆プッシュ
git add content/blog/existing-post.md
git commit -m "Update: ブログ記事「タイトル」を更新"
git push
```

---

## コミットメッセージ規則

**フォーマット:**
```
[Type]: [Content Type]「[Title]」

例:
Add: Blog「Next.js 15への移行」
Update: Portfolio「Todo管理アプリ」
Delete: Sandbox「古い実験」
Update: Profile
Fix: Blog「記事タイトル」のタイポ修正
```

**Type一覧:**
- `Add` - 新規追加
- `Update` - 更新
- `Delete` - 削除
- `Fix` - 修正

---

## パフォーマンス最適化

### 画像
- [ ] 手動で最適化（TinyPNG、Squoosh）
- [ ] 推奨サイズ: 横幅1200px以下、200KB以下
- [ ] WebP形式推奨
- [ ] Next.js Image コンポーネント使用

### ビルド
- [ ] SSG: 全ページを静的生成
- [ ] Turbopack使用（Next.js 15）
- [ ] 不要な依存関係を削減

### SEO
- [ ] 各ページに適切なmetadata設定
- [ ] OGP画像の設定（将来対応）
- [ ] sitemap.xml生成（将来対応）

---

## トラブルシューティング

### ビルドエラー

**型エラー:**
```bash
# 型チェック
npx tsc --noEmit

# エラー内容を確認して lib/types.ts または MDXファイルを修正
```

**MDX読み込みエラー:**
```bash
# frontmatter の YAML構文をチェック
# - インデントは2スペース
# - 配列は ["item1", "item2"] 形式
# - 文字列にコロンが含まれる場合はクォートで囲む
```

**画像が表示されない:**
```bash
# パスを確認
# ✅ 正: /images/portfolio/todo-app.png
# ❌ 誤: images/portfolio/todo-app.png
# ❌ 誤: /public/images/portfolio/todo-app.png

# ファイルが存在するか確認
ls public/images/portfolio/
```

### ローカル開発

**変更が反映されない:**
```bash
# 開発サーバーを再起動
Ctrl+C
npm run dev
```

**ポート3000が使用中:**
```bash
# 別のポートで起動
PORT=3001 npm run dev
```

---

## 今後の拡張案

### 短期（3ヶ月以内）
- [ ] 記事の下書き機能（frontmatter に `draft: true`）
- [ ] タグページ・カテゴリページ
- [ ] RSS フィード生成
- [ ] サイトマップ自動生成

### 中期（6ヶ月以内）
- [ ] 全文検索機能
- [ ] OGP画像自動生成
- [ ] アクセス解析連携（Google Analytics）
- [ ] コメント機能（Giscus等）

### 長期（1年以内）
- [ ] Newsletter機能
- [ ] 多言語対応（i18n）
- [ ] ダークモード対応

---

## まとめ

本設計書は、MDXベースのシンプルなブログ・ポートフォリオサイトの仕様を定義しています。

**主要な特徴:**
- ✅ 管理画面不要: ファイルを直接編集
- ✅ コスト: $0（Vercel無料枠）
- ✅ 運用: Git push で自動デプロイ
- ✅ シンプル: 実装時間 5-8時間
- ✅ 保守性: 複雑な依存関係なし

**ワークフロー:**
1. ローカルでMDXファイルを編集
2. `npm run dev` でプレビュー確認
3. Git commit & push
4. Vercel自動デプロイ
5. 本番環境に反映（数分）

**次のステップ:**
1. Phase 1: 型定義更新
2. Phase 2-4: ページ実装
3. Phase 5-6: コンテンツ移行
4. Phase 7-8: ビルド＆デプロイ

実装を開始しますか？
