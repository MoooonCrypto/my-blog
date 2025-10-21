import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RETRO DEVELOPER - 個人開発エンジニアのデジタル記録庫",
  description: "80年代PC風デザインの個人開発ブログサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}

        {/* Windows 95風ステータスバー */}
        <div className="status-bar">
          <span>Ready</span>
          <span>BLOG SYSTEM v1.0</span>
          <span>{new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </body>
    </html>
  );
}
