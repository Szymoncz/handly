const fs = require("fs");

const BASE_URL = "https://szymoncz.github.io/handly";

const routes = [
    "/",
    "/o-nas/",
    "/uslugi/",
    "/kontakt/",
    "/regulamin/",
    "/polityka-prywatnosci/"
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => {
    return ` <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    </url>`;
})
    .join("\n")}
    </urlset>`;

    fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("✅ Wygenerowano sitemap.xml w katalogu public/");