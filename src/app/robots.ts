import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://chinatravelexpert.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/en/',
          '/zh/',
          '/tours/',
          '/destinations/',
          '/blog/',
          '/docs/',
          '/pricing/',
          '/features/',
          '/custom-trip/',
          '/showcase/',
          '/forum/',
        ],
        disallow: [
          '/admin/',
          '/auth/',
          '/api/',
          '/checkout/',
          '/dashboard/',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/api/docs/search',
        crawlDelay: 1,
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}