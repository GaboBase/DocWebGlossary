const https = require('https');
const fs = require('fs');
const path = require('path');

https.get('https://mouseinteractivo.com/terminologia-produccion-video/', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'source_raw.html'), html, 'utf8');
    console.log('Saved source_raw.html. Size:', html.length);

    // Extract all images with context
    const imgRegex = /<img[^>]+>/g;
    let match;
    const images = [];

    while ((match = imgRegex.exec(html)) !== null) {
      const tag = match[0];
      const srcMatch = tag.match(/src=["']([^"']+)["']/);
      const altMatch = tag.match(/alt=["']([^"']+)["']/);
      const widthMatch = tag.match(/width=["']([^"']+)["']/);
      const heightMatch = tag.match(/height=["']([^"']+)["']/);
      
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      const width = widthMatch ? widthMatch[1] : '';
      const height = heightMatch ? heightMatch[1] : '';

      // Skip logos, tracking pixels, avatars
      if (src.includes('logo-') || src.includes('gravatar') || !src.includes('wp-content')) {
        continue;
      }

      // Find nearby term heading or context
      const preContext = html.substring(Math.max(0, match.index - 500), match.index);
      const postContext = html.substring(match.index, Math.min(html.length, match.index + 500));
      
      // Look for id= or term heading nearby
      const headingMatch = preContext.match(/<h3[^>]*id=["']([^"']+)["'][^>]*>|<h3[^>]*>(?:<a[^>]*>)?([^<]+)/i);

      images.push({
        src,
        alt,
        width,
        height,
        nearbyHeading: headingMatch ? (headingMatch[1] || headingMatch[2]) : 'unknown'
      });
    }

    console.log(`Found ${images.length} content images/diagrams.`);
    images.forEach((img, i) => {
      console.log(`${i+1}. [${img.nearbyHeading}]`);
      console.log(`   src: ${img.src}`);
      console.log(`   alt: ${img.alt}`);
      console.log(`   dim: ${img.width}x${img.height}`);
    });

    fs.writeFileSync(
      path.join(__dirname, 'diagrams.json'),
      JSON.stringify(images, null, 2),
      'utf8'
    );
  });
}).on('error', (err) => {
  console.error('Error fetching source HTML:', err);
});
