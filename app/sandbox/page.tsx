import { getSandboxItems } from '@/lib/mdx'
import Link from 'next/link'

export default function SandboxPage() {
  const sandboxItems = getSandboxItems() || []

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="window">
        <div className="window-title">SANDBOX.DIR - Experimental Projects</div>
        <div className="window-content">
          <div className="content-box">
            {sandboxItems.length > 0 ? (
              sandboxItems.map((item) => (
                <Link key={item.slug} href={`/sandbox/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="post-item">
                    <div className="post-title">► {item.title}</div>
                    <div className="post-meta">{item.date} - Status: {item.status}</div>
                    <div className="post-description">{item.description}</div>
                    {item.tags && item.tags.length > 0 && (
                      <div style={{ marginTop: '8px' }}>
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p>Sandboxアイテムがありません</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
