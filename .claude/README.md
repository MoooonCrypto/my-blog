# .claude/ ディレクトリについて

このディレクトリには、Claude Codeがこのプロジェクトで作業する際の設定が含まれています。

## 📁 ファイル構成

```
.claude/
├── CLAUDE.md           # プロジェクト全体のルールと設定
├── hooks.json          # イベントベースの自動実行設定
├── README.md           # このファイル
└── commands/           # カスタムスラッシュコマンド
    ├── blog-post.md    # /blog-post - 新規ブログ記事作成
    └── dev-rules.md    # /dev-rules - 開発ルール参照
```

## 🎯 使い方

### カスタムコマンドの実行

Claude Codeで以下のように入力：

```
/blog-post
```

→ 新しいブログ記事を作成するフローが開始されます

```
/dev-rules
```

→ 開発ルールが表示されます

### 新しいコマンドの追加

1. `commands/` に新しい `.md` ファイルを作成
2. ファイル名がコマンド名になる（例：`deploy.md` → `/deploy`）
3. Markdownで指示内容を記述

**例：**

```markdown
<!-- commands/deploy.md -->
# Deploy to Vercel

以下の手順でVercelにデプロイ：

1. ビルドエラーがないか確認
2. mainブランチにマージ
3. Vercelが自動デプロイ
```

## 🔧 Hooks

`hooks.json` で設定可能なイベント：

- `user_prompt_submit` - プロンプト送信時
- `before_tool_use` - ツール使用前
- `after_tool_use` - ツール使用後

**使用例：**

```json
{
  "hooks": {
    "user_prompt_submit": {
      "enabled": true,
      "command": "git status"
    }
  }
}
```

→ 毎回プロンプト送信時にgit statusが実行される

## 📝 CLAUDE.md

プロジェクト全体の「憲法」となるファイル。

- コーディング規約
- 開発フロー
- デザインガイドライン
- やってはいけないこと

などを記述。Claude Codeはこれを参照して作業します。

## 💡 ベストプラクティス

1. **明確で具体的に**：曖昧な指示ではなく、具体的なステップを記載
2. **例を含める**：コード例や実行例を示す
3. **理由を説明**：なぜそのルールがあるのか説明
4. **定期的に更新**：プロジェクトの成長に合わせて更新

## 🚀 このプロジェクトでの活用

- レトロUIのデザインシステムを維持
- TypeScriptの型安全性を確保
- Next.js App Routerのベストプラクティスに従う
- 日本語でのコミュニケーション

## 📚 参考

Claude Code公式ドキュメント：
https://docs.claude.com/claude-code

---

**Happy Coding with Claude! 🤖✨**
