# MDX + 管理画面実装プラン

## パターンA: GitHub API連携（推奨）

### アーキテクチャ
```
/admin/login → 認証
/admin/posts → 記事一覧
/admin/posts/new → 新規作成
/admin/posts/[slug]/edit → 編集
```

### 技術スタック

#### 認証オプション

**1. Clerk（最も簡単）**
- コスト: $25/月（MAU 10,000まで）または無料枠（MAU 10,000、機能制限あり）
- 実装時間: 1-2時間
- 特徴: ドロップインUIコンポーネント、ソーシャルログイン対応

```tsx
// app/admin/layout.tsx
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'

export default function AdminLayout({ children }) {
  return (
    <ClerkProvider>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkProvider>
  )
}
```

**2. Auth.js (NextAuth) （無料）**
- コスト: $0
- 実装時間: 3-5時間
- 特徴: 完全カスタマイズ可能、学習曲線あり

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 環境変数でハードコードされた管理者情報と照合
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", email: credentials.email, role: "admin" }
        }
        return null
      }
    })
  ],
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

**3. Simple Password Protection（最安）**
- コスト: $0
- 実装時間: 30分
- 特徴: 環境変数でパスワード管理、セッションのみ

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin-session')

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
}
```

#### GitHub API連携

**必要なもの:**
- GitHub Personal Access Token（無料）
- Octokit ライブラリ

```typescript
// lib/github.ts
import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN // Fine-grained token with Contents: Read/Write
})

export async function savePost(slug: string, content: string) {
  const path = `content/blog/${slug}.md`

  // 既存ファイルのSHA取得（更新時に必要）
  let sha: string | undefined
  try {
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path,
      ref: 'main'
    })
    if ('sha' in data) sha = data.sha
  } catch (error) {
    // ファイルが存在しない場合は新規作成
  }

  // ファイル作成/更新
  await octokit.repos.createOrUpdateFileContents({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    path,
    message: `Update: ${slug}`,
    content: Buffer.from(content).toString('base64'),
    sha, // 更新時のみ
    branch: 'main'
  })
}
```

**管理画面例:**

```tsx
// app/admin/posts/new/page.tsx
'use client'

import { useState } from 'react'

export default function NewPostPage() {
  const [frontmatter, setFrontmatter] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'tech',
    tags: [],
    description: ''
  })
  const [content, setContent] = useState('')

  async function handleSubmit() {
    const slug = frontmatter.title.toLowerCase().replace(/\s+/g, '-')
    const markdown = `---
title: "${frontmatter.title}"
date: "${frontmatter.date}"
category: "${frontmatter.category}"
tags: ${JSON.stringify(frontmatter.tags)}
description: "${frontmatter.description}"
---

${content}
`

    await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content: markdown })
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">新規記事作成</h1>

      <input
        type="text"
        placeholder="タイトル"
        value={frontmatter.title}
        onChange={(e) => setFrontmatter({ ...frontmatter, title: e.target.value })}
        className="w-full p-2 border mb-4"
      />

      <textarea
        placeholder="本文（Markdown）"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-96 p-2 border font-mono"
      />

      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-400 text-black">
        保存してデプロイ
      </button>
    </div>
  )
}
```

```tsx
// app/api/admin/posts/route.ts
import { savePost } from '@/lib/github'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug, content } = await req.json()
  await savePost(slug, content)

  return Response.json({ success: true })
}
```

---

## パターンB: データベース保存 + MDX出力

### アーキテクチャ
```
管理画面で編集
↓
Supabase/Neonに保存
↓
ビルド時にDBから取得してMDX生成
```

**メリット:** リアルタイム更新、下書き機能
**デメリット:** 複雑、コスト増

---

## コスト比較表

| 構成 | 月額コスト | 初期実装時間 | 難易度 |
|------|-----------|-------------|--------|
| **Simple Password + GitHub API** | $0 | 4-6時間 | ★☆☆ |
| **Auth.js + GitHub API** | $0 | 8-12時間 | ★★☆ |
| **Clerk + GitHub API** | $25または無料枠 | 4-6時間 | ★☆☆ |
| **Clerk + Supabase** | $33 ($25 + $8〜) | 20-30時間 | ★★★ |

---

## 推奨構成（個人サイト向け）

### 🥇 第1選択: Simple Password + GitHub API

**理由:**
- コスト: $0
- あなた専用なので高度な認証不要
- GitHub経由なのでバージョン管理される
- Vercel自動デプロイと相性抜群

**環境変数:**
```env
# .env.local
ADMIN_PASSWORD=your-secure-password
GITHUB_TOKEN=ghp_xxxx
GITHUB_OWNER=MoooonCrypto
GITHUB_REPO=my-blog
```

**必要な依存関係:**
```bash
npm install @octokit/rest iron-session
```

---

## セキュリティ注意点

1. **必ずHTTPS通信** （Vercelなら自動）
2. **強力なパスワード** （16文字以上、記号含む）
3. **GitHub Token権限を最小化** （Contents: Read/Writeのみ）
4. **環境変数を.gitignoreに追加**
5. **Rate Limit対策** （GitHub API: 5000req/hour）

---

## 実装手順（Phase by Phase）

### Phase 1: 認証のみ（2時間）
1. `/admin/login` ページ作成
2. Middleware設定
3. セッション管理

### Phase 2: 記事一覧（2時間）
1. GitHub API統合
2. `/admin/posts` で既存記事表示

### Phase 3: 編集機能（3時間）
1. `/admin/posts/new` 新規作成
2. `/admin/posts/[slug]/edit` 編集
3. プレビュー機能

### Phase 4: UX改善（オプション）
1. Markdownエディタライブラリ導入
2. 画像アップロード対応
3. 下書き保存機能

---

## 代替案: Tina CMS（ハイブリッド）

**特殊な選択肢として:**
- Tina CMS: Git-backed CMS
- コスト: 無料〜$29/月
- 特徴: MDXファイルを直接編集、GitHubにcommit

```bash
npm install tinacms
```

これは「管理画面」と「ファイルベース」の良いとこ取りですが、学習コストがあります。

---

## 総括

**個人ブログなら:**
→ Simple Password + GitHub API（$0、実装6時間）

**複数人運用なら:**
→ Clerk + GitHub API（$25/月、実装6時間）

**本格的なメディアサイトなら:**
→ Headless CMS（microCMS等）を検討

実装を始める場合は、具体的なコード生成もサポートできます！
