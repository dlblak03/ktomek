export async function GET() {
    let date: string = '2024-03-04'
    let body: string = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
        <url>
            <loc>https://ktomek.com/</loc>
            <lastmod>` + date + `</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>

        <url>
            <loc>https://ktomek.com/about-us</loc>
            <lastmod>` + date + `</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>

        <url>
            <loc>https://ktomek.com/services</loc>
            <lastmod>` + date + `</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>

        <url>
            <loc>https://ktomek.com/testimonials</loc>
            <lastmod>` + date + `</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>

        <url>
            <loc>https://ktomek.com/contact-us</loc>
            <lastmod>` + date + `</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>

        <url>
            <loc>https://ktomek.com/auth</loc>
            <lastmod>` + date + `</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>
    </urlset>`
	return new Response(
		body.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}