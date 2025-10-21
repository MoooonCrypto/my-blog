# Claude開発ルール - 個人開発ブログサイト

このプロジェクトは**Next.js + TypeScript**を使用した個人開発者向けのブログサイトです。

## 🚨 絶対禁止事項

### GitHubへのPush
- **勝手にGitHubにpushすることを絶対に禁止**
- コミットは作成して良いが、pushは必ずユーザーの明示的な許可を得ること
- `git push` コマンドは実行前に必ず確認を取る

### パッケージ管理
- **安全と確認できるパッケージライブラリのみ使用**
- 新規パッケージのインストール前に必ずユーザーに確認
- 公式・メジャーなパッケージを優先
- セキュリティ脆弱性のあるパッケージは使用しない

## 📋 プロジェクト概要

**種類**: 個人開発者向けブログサイト
**UI/UX**: レトロ/ターミナル風デザイン
**コンテンツ管理**: ファイルベース（MDX）

## 🛠 技術スタック

### フレームワーク・ライブラリ
- **Next.js 15.5.2** (App Router + Turbopack)
- **React 19.1.0**
- **TypeScript 5.x**

### スタイリング
- **Tailwind CSS v4**
- レトロ/ターミナル風UI
- モノスペースフォント優先

### コンテンツ管理
- **MDX 3.1.1** - Markdown + React components
- **gray-matter 4.0.3** - Front matter解析

## 💻 開発ルール

### TypeScript
- **型は明示的に定義** - `any`型の使用は避ける
- **strictモード有効** - tsconfig.jsonの設定を維持
- **interfaceよりtype優先** - 既存コードとの一貫性
- **戻り値の型も明示** - 関数の戻り値は必ず型指定

```typescript
// ✅ Good
type Post = {
  title: string;
  date: string;
};

function getPost(slug: string): Post | null {
  // ...
}

// ❌ Bad
function getPost(slug: any): any {
  // ...
}
```

### Next.js App Router
- **Server Componentsをデフォルト** - `"use client"`は必要最小限
- **async/await活用** - データフェッチはasync Server Components
- **generateStaticParams実装** - 動的ルートは必ず実装
- **metadata設定** - 各ページに適切なSEO設定

```typescript
// ✅ Server Component (デフォルト)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ⚠️ Client Component (必要な場合のみ)
'use client';
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState(...)}>Click</button>;
}
```

### コンポーネント設計
- **再利用可能なコンポーネントはcomponents/に配置**
- **ページ固有のコンポーネントはapp/[route]/内に配置**
- **1ファイル1コンポーネント原則**
- **Props型は明示的に定義**

### スタイリング
- **Tailwind CSSのみ使用** - インラインスタイル・CSS Modulesは避ける
- **レトロUIテーマ維持** - デザインシステムに従う
- **ダークテーマ優先** - 黒背景・緑文字のターミナル風

```tsx
// ✅ Good - Tailwind使用
<div className="border border-green-400 p-4 hover:bg-green-400 hover:text-black">
  Content
</div>

// ❌ Bad - インラインスタイル
<div style={{ border: '1px solid green', padding: '1rem' }}>
  Content
</div>
```

## 📁 ファイル構成ルール

```
my-blog/
├── app/                    # Next.js App Router
│   ├── [route]/
│   │   ├── page.tsx       # ページコンポーネント
│   │   └── layout.tsx     # レイアウト（必要時）
│   ├── layout.tsx         # ルートレイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # 再利用可能コンポーネント
├── content/               # MDXコンテンツ
│   ├── blog/             # ブログ記事 (.md)
│   ├── portfolio/        # ポートフォリオ (.md)
│   └── sandbox/          # 実験的コンテンツ (.md)
├── lib/                   # ユーティリティ関数
│   ├── mdx.ts            # MDX読み込み関数
│   └── types.ts          # 型定義
└── public/                # 静的ファイル
```

### 命名規則
- **ファイル名**: ケバブケース（`my-component.tsx`）
- **コンポーネント名**: PascalCase（`MyComponent`）
- **関数名**: camelCase（`getLatestPosts`）
- **型名**: PascalCase（`PostMetadata`）
- **定数**: UPPER_SNAKE_CASE（`MAX_POSTS`）

## 🎨 デザインシステム

### カラーパレット
```css
背景: bg-black (#000000)
テキスト: text-green-400 (#22c55e)
ボーダー: border-green-400
ホバー: hover:bg-green-400 hover:text-black
アクセント: text-green-500
```

### タイポグラフィ
- **フォント**: `font-mono` (等幅フォント)
- **見出し**: `text-2xl` ～ `text-4xl` + `font-bold`
- **本文**: `text-base` ～ `text-lg`
- **コマンド風プレフィックス**: `>`, `$`, `//`

### コンポーネントパターン
```tsx
// カード型コンテンツ
<div className="border border-green-400 p-4 hover:bg-green-400 hover:text-black transition-colors">
  <h3 className="text-lg font-semibold mb-2">Title</h3>
  <p className="text-sm opacity-80">Description</p>
</div>

// セクション見出し
<h2 className="text-2xl font-bold mb-6 border-b border-green-400 pb-2">
  &gt; SECTION_NAME.LOG
</h2>
```

## 🔧 開発フロー

### 1. ブランチ戦略
- **mainブランチへの直接push禁止**
- **claude/で始まるfeatureブランチで開発**
- **PR作成してレビュー後マージ**

### 2. コミットメッセージ
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更（機能変更なし）
refactor: リファクタリング
perf: パフォーマンス改善
test: テスト追加・修正
chore: ビルド・設定変更
```

### 3. 開発サイクル
```bash
1. コード編集
2. npm run lint      # Lint確認
3. npm run build     # ビルド確認
4. git add .
5. git commit -m "..."
6. ⚠️ git pushは実行前に必ず確認を取る
```

## 📦 パッケージ管理ルール

### インストール前の確認事項
1. **公式・メジャーなパッケージか**
2. **npm週間ダウンロード数が十分か**（目安：10万以上）
3. **最終更新日が1年以内か**
4. **セキュリティ脆弱性がないか**
5. **ライセンスが適切か**（MIT, Apache等）

### 推奨パッケージリスト
```json
{
  "許可済み": [
    "next",
    "react",
    "react-dom",
    "typescript",
    "tailwindcss",
    "@mdx-js/loader",
    "@mdx-js/react",
    "@next/mdx",
    "gray-matter"
  ],
  "要確認": [
    "その他のパッケージは都度ユーザーに確認"
  ]
}
```

### インストール手順
```bash
# ⚠️ 必ずユーザーに確認してから実行
npm install <package-name>

# セキュリティチェック
npm audit

# 不要な依存関係の削除
npm prune
```

## 🚫 禁止事項まとめ

### 絶対にやってはいけないこと
1. ❌ **勝手にGitHubにpush**
2. ❌ **未確認のパッケージインストール**
3. ❌ **any型の多用**
4. ❌ **Client Componentsの過剰使用**
5. ❌ **インラインスタイルの使用**
6. ❌ **Google Fontsなど外部フォントの新規追加**（環境制限）
7. ❌ **mainブランチへの直接push**
8. ❌ **console.logのコミット**（デバッグ後削除）

### 必ず確認が必要なこと
- 🔔 新規パッケージのインストール
- 🔔 git push実行
- 🔔 環境変数の追加
- 🔔 設定ファイルの変更
- 🔔 大規模なリファクタリング

## 🧪 テスト・品質管理

### ビルド確認
```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# 型チェック
npx tsc --noEmit
```

### Lint・フォーマット
```bash
# Lint実行
npm run lint

# 自動修正
npm run lint -- --fix
```

## 📊 パフォーマンス目標

- **Lighthouse Score**: 90以上
- **First Contentful Paint**: 1.5秒未満
- **Time to Interactive**: 3.0秒未満
- **バンドルサイズ**: 200KB未満（gzip）

## 🔍 SEO要件

- **各ページにmetadata設定必須**
- **OGP画像の設定**（将来対応）
- **sitemap.xml生成**（将来対応）
- **robots.txt設定**

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}
```

## 🐛 トラブルシューティング

### ビルドエラー
```bash
npm run build
# エラーメッセージを確認して該当箇所を修正
```

### 型エラー
```bash
npx tsc --noEmit
# lib/types.ts で型定義を確認
```

### MDXエラー
```bash
# content/ 内のfront matterを確認
# 必須フィールドが揃っているか確認
```

## 📝 コードレビューチェックリスト

開発完了時に以下を確認：

- [ ] TypeScriptの型エラーがない
- [ ] Lint警告がない
- [ ] ビルドが成功する
- [ ] 不要なconsole.logがない
- [ ] コミットメッセージが適切
- [ ] デザインシステムに従っている
- [ ] Server/Client Componentsの使い分けが適切
- [ ] 新規パッケージは承認済み
- [ ] **pushは実行していない**（または明示的に許可を得た）

## 🎯 優先順位

1. **ユーザー体験（UX）**
2. **セキュリティ**
3. **パフォーマンス**
4. **コードの可読性**
5. **保守性**

---

**最終更新**: 2025-10-21
**バージョン**: 1.0.0
