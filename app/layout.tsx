import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'
import { SiteConfigurationProvider } from '@/components/site-configuration-provider'
import {
  getSiteConfigurationPayload,
  normalizeSiteLocale,
  resolveSiteDomain,
} from '@/lib/site-configuration'
import './globals.css'

const isVercelProduction =
  process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'

const DEFAULT_TITLE = 'Hosanna Church | Iglesia Hosanna - A Community of Faith, Hope & Love'
const DEFAULT_DESCRIPTION = 'Welcome to Hosanna Church - a vibrant community of believers dedicated to spreading God\'s love through worship, fellowship, and service. Bienvenidos a Iglesia Hosanna.'
const DEFAULT_OG_TITLE = 'Hosanna Church | Iglesia Hosanna'
const DEFAULT_OG_DESCRIPTION = 'A vibrant community of believers dedicated to spreading God\'s love. Una comunidad vibrante de creyentes.'
const DEFAULT_AUTHOR = 'Hosanna Church'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = normalizeSiteLocale(cookieStore.get('church-language')?.value || process.env.NEXT_PUBLIC_CMS_LOCALE)
  const payload = await getSiteConfigurationPayload({ locale, preview: false })
  const siteConfiguration = payload?.siteConfiguration
  const seo = siteConfiguration?.defaultSeoMetadata
  const siteDomain = resolveSiteDomain()
  const title = seo?.pageTitle || DEFAULT_TITLE
  const description = seo?.description || DEFAULT_DESCRIPTION
  const openGraphTitle = seo?.socialTitle || DEFAULT_OG_TITLE
  const openGraphDescription = seo?.socialDescription || DEFAULT_OG_DESCRIPTION
  const robotsEnabled = !seo?.hideFromSearchEngines

  return {
    metadataBase: new URL(siteDomain),
    title,
    description,
    keywords: ['church', 'iglesia', 'Hosanna', 'faith', 'community', 'worship', 'ministries', 'youth', 'Christian', 'bilingual'],
    authors: [{ name: siteConfiguration?.organizationName || DEFAULT_AUTHOR }],
    robots: {
      index: robotsEnabled,
      follow: robotsEnabled,
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      type: 'website',
      images: seo?.socialImage?.url
        ? [{
            url: seo.socialImage.url,
            width: seo.socialImage.width || undefined,
            height: seo.socialImage.height || undefined,
            alt: seo.socialImage.description || seo.socialImage.title || (siteConfiguration?.organizationName || DEFAULT_AUTHOR),
          }]
        : undefined,
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1084CD' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = normalizeSiteLocale(cookieStore.get('church-language')?.value || process.env.NEXT_PUBLIC_CMS_LOCALE)
  const payload = await getSiteConfigurationPayload({ locale, preview: false })
  const siteConfiguration = payload?.siteConfiguration || null

  return (
    <html
      lang={locale === 'es' ? 'es' : 'en'}
      className="bg-background"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/images/symbol.png" type="image/png" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SiteConfigurationProvider value={siteConfiguration}>
              {children}
            </SiteConfigurationProvider>
          </LanguageProvider>
        </ThemeProvider>
        {isVercelProduction && <Analytics />}
      </body>
    </html>
  )
}
