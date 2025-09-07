// app/blog/page.tsx - ブログ一覧
import { getBlogPosts } from '@/lib/mdx';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4 border-b border-green-400 pb-2">
            &gt; BLOG_POSTS.LOG
          </h1>
          <p className="opacity-80">技術的な学びや個人開発の記録</p>
        </header>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border border-green-400 p-6">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold hover:underline">
                    {post.title}
                  </h2>
                  <time className="text-sm opacity-60">{post.date}</time>
                </div>
                <p className="opacity-80 mb-4">{post.description}</p>
                {post.tags && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs border border-current px-2 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>

        <nav className="mt-12">
          <Link href="/" className="text-green-400 hover:underline">
            &lt; BACK_TO_HOME.EXE
          </Link>
        </nav>
      </div>
    </main>
  );
}