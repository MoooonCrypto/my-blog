import { getPortfolioItems } from '@/lib/mdx'
import Link from 'next/link'

export default function PortfolioPage() {
  const portfolioItems = getPortfolioItems() || []

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="window">
        <div className="window-title">PORTFOLIO.EXE - Project Gallery</div>
        <div className="window-content">
          <div className="content-box">
            {portfolioItems.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {portfolioItems.map((item) => (
                  <Link key={item.slug} href={`/portfolio/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ border: '2px outset var(--win95-gray)', padding: '16px', cursor: 'pointer', background: 'var(--win95-gray)' }}>
                      <h3 className="post-title">{item.title || 'Untitled'}</h3>
                      <p className="post-description">{item.description || ''}</p>
                      {item.tech && item.tech.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          {item.tech.map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>ポートフォリオアイテムがありません</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
