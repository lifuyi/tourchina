import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://chinatravelexpert.com';
  
  const staticUrls = [
    { url: baseUrl, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/zh`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/tours`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/zh/tours`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/destinations`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/zh/destinations`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/destinations/beijing`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/destinations/shanghai`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/destinations/xian`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/destinations/guilin`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/blog`, priority: '0.8', changefreq: 'daily' },
    { url: `${baseUrl}/zh/blog`, priority: '0.8', changefreq: 'daily' },
    { url: `${baseUrl}/docs`, priority: '0.7', changefreq: 'weekly' },
    { url: `${baseUrl}/pricing`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/custom-trip`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/features`, priority: '0.6', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}