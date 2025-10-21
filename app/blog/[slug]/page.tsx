import { getBlogPost, getBlogPosts } from '../../lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container">
      <div className="window">
        <div className="window-title">ARTICLE.TXT - Blog Entry</div>
        <div className="window-content">
          <div style={{ background: '#ffffff', border: '2px inset #c0c0c0', padding: '20px' }}>
            <Link href="/blog" style={{
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              padding: '4px 12px',
              fontFamily: 'inherit',
              fontSize: '12px',
              cursor: 'pointer',
              marginBottom: '16px',
              display: 'inline-block',
              textDecoration: 'none',
              color: '#000'
            }}>
              ◄ Back to List
            </Link>
            
            <h1 style={{
              color: '#000080',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {post.title}
            </h1>
            
            <div style={{
              color: '#666',
              fontSize: '12px',
              marginBottom: '16px',
              borderBottom: '1px solid #c0c0c0',
              paddingBottom: '8px'
            }}>
              {post.date} - カテゴリ: {post.category}
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  )