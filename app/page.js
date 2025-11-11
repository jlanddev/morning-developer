'use client'

import Link from 'next/link'
import { articles, categories } from './data/articles'
import { useState, useEffect } from 'react'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory)

  const categoryNames = ['All', ...Object.keys(categories)]

  // Auto-rotate featured articles every 5 seconds
  useEffect(() => {
    const topStories = filteredArticles.slice(0, 4)
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % topStories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [filteredArticles])

  const topStories = filteredArticles.slice(0, 4)
  const featured = topStories[featuredIndex] || filteredArticles[0]
  const remaining = filteredArticles.slice(4)

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
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight tabular-nums newspaper-masthead">
              MORNING DEVELOPER
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">The Definitive Source for Land Development Intelligence</p>
          </div>

          {/* Category Navigation */}
          <nav className="mt-6 border-t border-gray-300 pt-4">
            <div className="flex gap-6 overflow-x-auto">
              {categoryNames.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap text-sm font-bold uppercase tracking-wider pb-2 border-b-4 transition-all ${
                    selectedCategory === category
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Story */}
        {featured && (
          <Link href={`/articles/${featured.slug}`} className="block mb-12">
            <div className="border-4 border-black">
              <div className="grid md:grid-cols-2">
                {featured.image && (
                  <div className="h-80 md:h-auto overflow-hidden bg-gray-100">
                    <img
                      key={featured.id}
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8 bg-white flex flex-col justify-center transition-opacity duration-500" key={`content-${featured.id}`}>
                  <div className="flex gap-2 mb-3">
                    <div className="text-xs font-bold uppercase tracking-widest text-red-600">
                      {featured.category}
                    </div>
                    {featured.series && (
                      <>
                        <div className="text-xs text-gray-400">•</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-black">
                          {featured.series}
                        </div>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                    {featured.summary}
                  </p>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider tabular-nums">
                    {new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {featured.source}
                  </div>
                </div>
              </div>
            </div>

            {/* Rotation indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {topStories.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    setFeaturedIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === featuredIndex
                      ? 'w-8 bg-red-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View story ${index + 1}`}
                />
              ))}
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {remaining.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="border-b-2 border-gray-200 pb-6"
            >
              <div className="flex gap-2 mb-2">
                <div className="text-xs font-bold uppercase tracking-widest text-red-600">
                  {article.category}
                </div>
                {article.series && (
                  <>
                    <div className="text-xs text-gray-400">•</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-black">
                      {article.series}
                    </div>
                  </>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-black mb-3 leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                {article.summary}
              </p>
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wider tabular-nums">
                {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {article.source}
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        )}
      </main>

      {/* Newsletter */}
      <div className="bg-black text-white py-12 sm:py-16 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tabular-nums">
            SUBSCRIBE TO THE DAILY BRIEF
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto tabular-nums">
            Institutional-grade intelligence on capital markets, land acquisitions, and major developments. Delivered at 6 AM EST.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 font-mono">Free. No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-black font-bold mb-4 uppercase tracking-wider text-sm">Markets</h4>
              <ul className="space-y-2 text-sm">
                {Object.keys(categories).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => { setSelectedCategory(cat); window.scrollTo(0, 0); }}
                      className="text-gray-600"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-4 uppercase tracking-wider text-sm">About</h4>
              <p className="text-sm text-gray-600">
                Real-time analysis of institutional capital flows, major acquisitions, and transformative development projects across North America.
              </p>
            </div>
            <div>
              <h4 className="text-black font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
              <p className="text-sm text-gray-600">
                For press inquiries, partnerships, or editorial submissions.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider tabular-nums">
              &copy; {new Date().getFullYear()} Morning Developer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
