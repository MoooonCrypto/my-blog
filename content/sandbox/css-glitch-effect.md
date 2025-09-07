---
title: "CSSだけでグリッチエフェクト"
date: "2024-01-20"
tags: ["CSS", "Animation", "レトロ"]
status: "experimental"
description: "JSなしでレトロなグリッチエフェクトを実装"
---

# CSSだけでグリッチエフェクト

レトロUIに合うグリッチエフェクトをCSSのみで作ってみました。

## デモ

```css
.glitch {
  position: relative;
  animation: glitch 2s infinite;
}

.glitch::before {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  animation: glitch-1 0.5s infinite;
}
```

まだ実験段階ですが、結構いい感じになりました！

---
