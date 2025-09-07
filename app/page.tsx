// app/page.tsx - トップページ
import { getLatestPosts, getPortfolioItems } from '@/lib/mdx';
import Link from 'next/link';

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const portfolioItems = getPortfolioItems().slice(0, 2);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="border border-green-400 p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4 glitch-effect">
              &gt; DEVELOPER.EXE
            </h1>
            <p className="text-xl mb-4">
              個人開発エンジニアのデジタル空間へようこそ
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="border border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition-colors">
                ABOUT.TXT
              </Link>
              <Link href="/portfolio" className="border border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition-colors">
                PORTFOLIO.DIR
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-green-400 pb-2">
            &gt; RECENT_POSTS.LOG
          </h2>
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block border border-green-400 p-4 hover:bg-green-400 hover:text-black transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <span className="text-sm">{post.date}</span>
                </div>
                <p className="text-sm opacity-80">{post.description}</p>
                {post.tags && (
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs border border-current px-2 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/blog" className="text-green-400 hover:underline">
              &gt; ALL_POSTS.EXE
            </Link>
          </div>
        </section>

        {/* Featured Portfolio */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-green-400 pb-2">
            &gt; FEATURED_WORKS.BIN
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolioItems.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="block border border-green-400 p-4 hover:bg-green-400 hover:text-black transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tech.map((tech) => (
                    <span key={tech} className="text-xs border border-current px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/portfolio" className="text-green-400 hover:underline">
              &gt; ALL_PROJECTS.DIR
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}


