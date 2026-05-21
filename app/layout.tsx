import type { Metadata, Viewport } from 'next'
import { Manrope, Figtree } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const figtree = Figtree({ 
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Hosanna Church | Iglesia Hosanna - A Community of Faith, Hope & Love',
  description: 'Welcome to Hosanna Church - a vibrant community of believers dedicated to spreading God\'s love through worship, fellowship, and service. Bienvenidos a Iglesia Hosanna.',
  keywords: ['church', 'iglesia', 'Hosanna', 'faith', 'community', 'worship', 'ministries', 'youth', 'Christian', 'bilingual'],
  authors: [{ name: 'Hosanna Church' }],
  openGraph: {
    title: 'Hosanna Church | Iglesia Hosanna',
    description: 'A vibrant community of believers dedicated to spreading God\'s love. Una comunidad vibrante de creyentes.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1084CD' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${figtree.variable} bg-background`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/symbol.png" type="image/png" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
