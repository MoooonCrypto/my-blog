import { getBlogPost, getBlogPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="window">
        <div className="window-title">ARTICLE.TXT - Blog Entry</div>
        <div className="window-content">
          <div className="content-box markdown">
            <Link href="/blog" className="btn-win95" style={{ marginBottom: '16px' }}>
              ◄ Back to List
            </Link>

            <h1 style={{
              color: 'var(--win95-blue)',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '8px',
              marginTop: '16px'
            }}>
              {post.title}
            </h1>

            <div className="post-meta" style={{ marginBottom: '16px', borderBottom: '1px solid var(--win95-gray)', paddingBottom: '8px' }}>
              {post.date}
            </div>

            <div>{post.content}</div>
          </div>
        </div>
      </div>
    </main>
  )
}