# モバイルでPC表示を確認する実装

## クエリパラメータ方式（推奨）

### 仕組み
```
https://your-site.vercel.app/?desktop=true
↓
Cookie保存
↓
常にPC幅で表示（モバイルでも）
```

### 実装コード

```tsx
// app/layout.tsx
import { cookies } from 'next/headers'
import DesktopViewSwitcher from '@/components/desktop-view-switcher'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const desktopMode = cookieStore.get('desktop-mode')?.value === 'true'

  return (
    <html lang="ja">
      <body className={desktopMode ? 'force-desktop-view' : ''}>
        {children}
        <DesktopViewSwitcher />
      </body>
    </html>
  )
}
```

```tsx
// components/desktop-view-switcher.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DesktopViewSwitcher() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isDesktopMode, setIsDesktopMode] = useState(false)

  useEffect(() => {
    const desktopParam = searchParams.get('desktop')
    const currentMode = document.cookie.includes('desktop-mode=true')

    setIsDesktopMode(currentMode)

    // URLパラメータでモード切り替え
    if (desktopParam === 'true' && !currentMode) {
      document.cookie = 'desktop-mode=true; path=/; max-age=31536000'
      window.location.reload()
    } else if (desktopParam === 'false' && currentMode) {
      document.cookie = 'desktop-mode=false; path=/; max-age=0'
      window.location.reload()
    }
  }, [searchParams])

  const toggleMode = () => {
    const newMode = !isDesktopMode
    document.cookie = `desktop-mode=${newMode}; path=/; max-age=31536000`
    window.location.reload()
  }

  // 開発環境のみ表示（本番では非表示推奨）
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <button
      onClick={toggleMode}
      className="fixed bottom-4 right-4 bg-green-400 text-black px-4 py-2 rounded font-mono text-sm z-50"
      style={{ fontSize: '12px' }}
    >
      {isDesktopMode ? '📱 Mobile' : '🖥️ Desktop'}
    </button>
  )
}
```

```css
/* app/globals.css */
/* PC幅を強制表示 */
.force-desktop-view {
  min-width: 1024px !important;
}

/* スマホでも横スクロール可能に */
@media (max-width: 768px) {
  .force-desktop-view {
    overflow-x: auto;
  }
}
```

### 使い方

**モバイル端末で:**
```
1. https://your-site.vercel.app/?desktop=true にアクセス
2. Cookie保存され、以降ずっとPC表示
3. 戻す時: /?desktop=false
```

**開発中の確認:**
```
1. 右下に表示されるボタンでトグル切り替え
2. リロードで反映
```

---

## より高度な実装: Viewport Meta動的変更

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const desktopMode = request.cookies.get('desktop-mode')?.value === 'true'

  if (desktopMode) {
    // PC幅のviewportに変更
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; style-src 'unsafe-inline'"
    )
  }

  return response
}
```

---

## BrowserStack等の代替サービス（有料）

### BrowserStack
- コスト: $39/月〜
- 機能: 実機でのテスト、スクリーンショット自動取得
- 用途: プロジェクト規模が大きい場合

### LambdaTest
- コスト: $15/月〜
- 機能: クロスブラウザテスト

個人サイトには過剰なので非推奨。

---

## 推奨アプローチ

### 開発中の確認:
1. **PCのChromeデベロッパーツールのレスポンシブモード**
   - 最も簡単で正確

### モバイル実機での確認:
1. **クエリパラメータ方式を実装**（上記コード）
   - `/?desktop=true` でPC表示に切り替え
   - Cookie保存で永続化

2. **Kiwi Browser（Android）またはInspect Browser（iOS）**
   - ブラウザレベルでデバイスエミュレーション

### 本番環境の定期チェック:
1. **リモートデバッグ（USB接続）**
   - 最も正確、パフォーマンス計測も可能

---

## まとめ

| 方法 | 難易度 | 正確性 | コスト |
|------|--------|--------|--------|
| ブラウザのPC版サイト機能 | ★☆☆ | △ | $0 |
| クエリパラメータ実装 | ★★☆ | ◎ | $0 |
| リモートデバッグ | ★★☆ | ◎ | $0 |
| BrowserStack | ★☆☆ | ◎ | $39/月 |

**個人開発なら:**
→ クエリパラメータ方式を実装（30分、コスト$0）

実装が必要なら、上記コードをプロジェクトに追加できます！
