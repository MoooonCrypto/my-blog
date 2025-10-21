# Claude Code プロジェクト設定

このファイルはClaude Codeがこのプロジェクトで作業する際の指針です。

## プロジェクト概要

個人開発者向けのブログサイト。レトロ/ターミナル風UIが特徴。

**技術スタック:**
- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS v4
- MDX (コンテンツ管理)

## 言語設定

**すべての応答は日本語で行うこと**

## 開発時の重要ルール

### 必ず守ること

1. **型安全性**: TypeScriptの型を明示的に定義
2. **コンポーネント設計**: Server Componentsをデフォルトに
3. **デザインシステム**: レトロUIテーマを維持
4. **ファイル命名**: ケバブケース（my-component.tsx）
5. **コミット前**: 必ずlintとビルドを実行

### やってはいけないこと

1. ❌ Google Fontsなど外部フォントの新規追加（環境制限）
2. ❌ `any` 型の多用
3. ❌ Client Componentsの過剰使用
4. ❌ インラインスタイル（Tailwindを使用）
5. ❌ 直接mainブランチへのプッシュ

## 新機能開発フロー

1. claude/で始まるブランチ作成
2. 必要なファイルを実装
3. テスト（ビルド確認）
4. コミット
5. プッシュ
6. PR作成（必要に応じて）

## よくあるタスク

### 新しいブログ記事を追加
```bash
# /blog-post コマンドを使用
# または手動で content/blog/記事名.md を作成
```

### ページ追加
```bash
# app/新ページ名/page.tsx を作成
# 必要に応じて layout.tsx も
```

### 動的ルート追加
```bash
# app/[param]/page.tsx
# generateStaticParams() を実装
```

## トラブルシューティング

### ビルドエラー
```bash
npm run build
# エラーメッセージを確認して修正
```

### 型エラー
```bash
npx tsc --noEmit
# 型定義を lib/types.ts で確認
```

### リント警告
```bash
npm run lint
# 自動修正: npm run lint -- --fix
```

## デザインガイドライン

### カラーパレット
- 背景: `bg-black` (#000000)
- テキスト: `text-green-400` (#22c55e)
- ボーダー: `border-green-400`
- ホバー: `hover:bg-green-400 hover:text-black`

### タイポグラフィ
- フォント: `font-mono` (等幅)
- 見出し: `text-2xl font-bold` ～ `text-4xl font-bold`
- コマンド風プレフィックス: `&gt;`, `$`, `//`

### コンポーネント例
```tsx
<div className="border border-green-400 p-4 hover:bg-green-400 hover:text-black">
  コンテンツ
</div>
```

## 環境変数

現在は不要。将来的に追加する場合は `.env.local` に記載。

## パフォーマンス目標

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s

## SEO要件

- 各ページに適切なmetadata設定
- OGP画像の設定（将来対応）
- sitemap.xml生成（将来対応）

---

**最終更新: 2025-10-20**
