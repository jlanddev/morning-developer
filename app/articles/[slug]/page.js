import Link from 'next/link'
import { articles } from '../../data/articles'

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params
  const article = articles.find((a) => a.slug === resolvedParams.slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="bg-black text-white py-2 px-4 text-xs font-mono uppercase tracking-wider tabular-nums">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:block">Live Market Data</div>
            <div className="hidden md:block">Real-Time Development Intelligence</div>
            <div className="text-xs sm:text-xs">{new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>

        {/* Header */}
        <header className="border-b-4 border-black bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" className="inline-flex items-center text-black hover:text-red-600 text-sm font-bold uppercase tracking-wider transition-colors">
              ← Back to Morning Developer
            </Link>
          </div>
        </header>

        {/* 404 Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-4 border-black">
            <div className="bg-red-600 px-8 py-12 text-center border-b-4 border-black">
              <div className="text-8xl font-black text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>404</div>
              <div className="text-3xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Article Not Found</div>
            </div>

            <div className="bg-white p-8 md:p-12">
              <div className="space-y-8">
                <div className="border-l-4 border-red-600 pl-6">
                  <h2 className="text-2xl font-black text-black mb-3 uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                    Story Unavailable
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    The article you're looking for may have been removed, never existed, or the URL may be incorrect.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-300 p-6">
                  <h3 className="font-black text-black mb-4 uppercase tracking-wider text-sm">
                    Recommended Actions:
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-600 font-black mr-3 text-lg">•</span>
                      <span>Verify the URL for any errors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 font-black mr-3 text-lg">•</span>
                      <span>Browse our latest development stories and market intelligence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 font-black mr-3 text-lg">•</span>
                      <span>Return to the main feed</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href="/"
                    className="inline-block bg-black hover:bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-wider transition-colors"
                  >
                    Return to Feed
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-black border-t-4 border-black px-8 py-4 text-center">
              <p className="text-white text-xs font-mono uppercase tracking-wider">
                Morning Developer — Professional Intelligence for Land Development
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 text-xs font-mono uppercase tracking-wider tabular-nums">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">Live Market Data</div>
          <div className="hidden md:block">Real-Time Development Intelligence</div>
          <div className="text-xs sm:text-xs">{new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-black hover:text-red-600 text-sm font-bold uppercase tracking-wider transition-colors">
            ← Back to Feed
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <article>
          {article.image && (
            <div className="w-full h-48 sm:h-64 md:h-96 overflow-hidden bg-gray-100 border-4 border-black mb-6 sm:mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="border-4 border-black bg-white p-4 sm:p-8 md:p-12">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white bg-red-600">
                {article.category}
              </span>
              {article.series && (
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-black border-2 border-black">
                  {article.series}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black mb-4 leading-tight" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-8 pb-8 border-b-2 border-gray-300 font-mono uppercase tracking-wider tabular-nums">
              <time>
                {new Date(article.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>Source: {article.source}</span>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed font-bold border-l-4 border-red-600 pl-4 sm:pl-6 py-2 bg-gray-50" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>
                {article.summary}
              </p>

              <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <Link
                href="/"
                className="inline-flex items-center text-black hover:text-red-600 font-bold uppercase tracking-wider transition-colors group text-sm"
              >
                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Stories
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-500 font-mono uppercase tracking-wider tabular-nums">
            &copy; {new Date().getFullYear()} Morning Developer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
