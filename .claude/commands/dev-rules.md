# 開発ルール

このプロジェクトで開発する際の重要なルールです。

## コーディング規約

### TypeScript
- 型は明示的に定義する
- `any` の使用は避ける
- interfaceよりtypeを優先

### React/Next.js
- Server ComponentsとClient Componentsを適切に使い分ける
- "use client"は必要な場合のみ使用
- async/awaitを積極的に活用

### スタイリング
- Tailwind CSSを使用
- レトロ/ターミナル風UIを維持
- カラーパレット: 黒背景(#000000) + 緑文字(#00ff00/#22c55e)

## ファイル構成

```
app/              - ページコンポーネント
  [route]/
    page.tsx      - ページ本体
    layout.tsx    - レイアウト（必要時）
content/          - Markdownコンテンツ
  blog/           - ブログ記事
  portfolio/      - ポートフォリオ
  sandbox/        - 実験的コンテンツ
lib/              - ユーティリティ関数
  mdx.ts          - MDX読み込み
  types.ts        - 型定義
components/       - 再利用可能コンポーネント
```

## コミットメッセージ

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更
refactor: リファクタリング
test: テスト追加・修正
chore: ビルド・設定変更
```

## デプロイ

- mainブランチへのプッシュで自動デプロイ（Vercel）
- PRを作成してレビュー後マージ
- claude/で始まるブランチで開発

## 重要な注意事項

1. **Google Fontsは使用しない**（この環境では接続不可）
2. **外部APIは慎重に**（ネットワーク制限あり）
3. **MDXファイル名 = URLスラッグ**（変更時注意）
4. **必ず日本語で応答する**

## 優先事項

1. ユーザー体験（UX）
2. パフォーマンス
3. コードの可読性
4. SEO最適化
