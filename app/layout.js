import './globals.css'

export const metadata = {
  title: 'Morning Developer - Daily Insights on Land Development & Real Estate',
  description: 'Your daily source for land development news, real estate investing insights, and industry analysis. Covering capital markets, land acquisition, mixed-use developments, and residential projects.',
  keywords: 'land development, real estate investing, homebuilding, capital markets, land acquisition, mixed-use development, master-planned communities',
  metadataBase: new URL('https://morningdeveloper.com'),
  openGraph: {
    title: 'Morning Developer',
    description: 'Daily insights on land development and real estate investing',
    url: 'https://morningdeveloper.com',
    siteName: 'Morning Developer',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}
