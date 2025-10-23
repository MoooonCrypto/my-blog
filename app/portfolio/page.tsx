import { getPortfolioItems } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'

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
                  <div key={item.slug} style={{ border: '2px outset var(--win95-gray)', padding: '0', background: 'var(--win95-gray)' }}>
                    {/* サムネイル画像 */}
                    {item.thumbnail && (
                      <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden', background: '#000' }}>
                        <Image
                          src={item.thumbnail}
                          alt={item.title || 'Portfolio item'}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    {/* コンテンツ */}
                    <div style={{ padding: '16px' }}>
                      <h3 className="post-title">{item.title || 'Untitled'}</h3>
                      <p className="post-meta" style={{ marginBottom: '8px' }}>{item.date}</p>

                      {/* リンク */}
                      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                        <Link href={`/portfolio/${item.slug}`} className="btn-win95" style={{ flex: 1, textAlign: 'center' }}>
                          詳細を見る
                        </Link>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-win95" style={{ flex: 1, textAlign: 'center' }}>
                            デモを開く ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
