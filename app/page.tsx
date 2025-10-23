// app/page.tsx - トップページ (Windows 95風)
import { getLatestPosts, getPortfolioItems } from '@/lib/mdx';
import Link from 'next/link';

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const portfolioItems = getPortfolioItems().slice(0, 2);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* ヘッダーウィンドウ */}
      <div className="window">
        <div className="window-title">DEVELOPER.EXE - Personal Blog System v1.0</div>
        <div className="window-content">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className="logo">◊ RETRO DEVELOPER ◊</div>
            <div className="tagline">個人開発エンジニアのデジタル記録庫</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
            <Link href="/" className="btn-win95">
              <span className="ascii-icon folder"></span>Home
            </Link>
            <Link href="/profile" className="btn-win95">
              <span className="ascii-icon file"></span>Profile
            </Link>
            <Link href="/blog" className="btn-win95">
              <span className="ascii-icon floppy"></span>Blog
            </Link>
            <Link href="/portfolio" className="btn-win95">
              <span className="ascii-icon folder"></span>Portfolio
            </Link>
            <Link href="/sandbox" className="btn-win95">
              <span className="ascii-icon file"></span>Sandbox
            </Link>
          </div>
        </div>
      </div>

      {/* メインコンテンツグリッド */}
      <div className="content-grid">
        {/* 記事一覧 */}
        <div className="window">
          <div className="window-title">Recent Posts - BLOG.DAT</div>
          <div className="window-content">
            <div className="content-box">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="post-item">
                      <div className="post-title">► {post.title}</div>
                      <div className="post-meta">{post.date}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>記事がありません</p>
              )}
            </div>

            <div style={{ marginTop: '16px' }}>
              <Link href="/blog" className="btn-win95">すべての記事を見る</Link>
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* プロフィール */}
          <div className="window">
            <div className="window-title">USER.INF</div>
            <div className="window-content">
              <div className="widget">
                <div className="widget-title">SYSTEM INFO</div>
                <p style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  NAME: Developer<br />
                  TYPE: Engineer<br />
                  STATUS: Coding...<span className="cursor">_</span><br />
                  LOCATION: Tokyo, JP<br />
                  INTERESTS: WebDev, GameDev
                </p>
              </div>
            </div>
          </div>

          {/* 最近のプロジェクト */}
          <div className="window">
            <div className="window-title">PROJECTS.DIR</div>
            <div className="window-content">
              <div className="widget">
                <div className="widget-title">RECENT PROJECTS</div>
                <div style={{ fontSize: '12px' }}>
                  {portfolioItems.length > 0 ? (
                    portfolioItems.map((item) => (
                      <div key={item.slug} style={{ marginBottom: '12px' }}>
                        <Link href={`/portfolio/${item.slug}`} style={{ color: 'var(--win95-blue)', textDecoration: 'none' }}>
                          <span className="ascii-icon floppy"></span>{item.title}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>プロジェクトがありません</p>
                  )}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <Link href="/portfolio" className="btn-win95" style={{ minWidth: 'auto', fontSize: '12px' }}>
                    すべて見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sandbox風デモ */}
      <div className="window">
        <div className="window-title">SANDBOX.EXE - Experimental Features</div>
        <div className="window-content">
          <div className="terminal">
            C:\SANDBOX&gt; dir<br />
            Volume in drive C has no label.<br />
            Directory of C:\SANDBOX<br /><br />
            CSS-GLITCH   &nbsp;&nbsp;&nbsp; EXP &nbsp;&nbsp;&nbsp; 1,234 95-01-20  12:34<br />
            WEBGL-DEMO   &nbsp;&nbsp;&nbsp; EXP &nbsp;&nbsp;&nbsp; 5,678 95-01-18  09:15<br />
            ANIMATION    &nbsp;&nbsp;&nbsp; TST &nbsp;&nbsp;&nbsp; 2,345 95-01-15  16:42<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 File(s) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9,257 bytes<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 Dir(s)  &nbsp;&nbsp;&nbsp;1,440,256 bytes free<br />
            <br />
            C:\SANDBOX&gt; <span className="cursor">_</span>
          </div>
        </div>
      </div>
    </main>
  );
}


