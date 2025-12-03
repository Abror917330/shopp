

function filenameToName(filename) {
  // Remove extension, decode URI parts, replace underscores/dashes and extra spaces
  const base = filename.replace(/\.[^/.]+$/, '');
  return decodeURIComponent(base)
    .replace(/[-_]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function makeSlug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function deterministicPrice(seed) {
  // Create a pseudo-random but deterministic price based on a string seed
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
  h = Math.abs(h);
  // Price between 9.99 and 999.99
  const p = 10 + (h % 990) + (h % 100) / 100;
  return Number(p.toFixed(2));
}

// Import all images under src/assets (Electronics, Fashion, Siport, etc.)
const modules = import.meta.globEager('../assets/**/*.{png,jpg,jpeg,webp,gif,svg}');

const products = Object.entries(modules).map(([path, mod], index) => {
  // path example: '../assets/Electronics/iphone 17 pro max.jpg'
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  const folder = parts.length >= 3 ? parts[parts.length - 2] : 'general';
  const name = filenameToName(filename);
  const slug = makeSlug(name || `item-${index}`) || `item-${index}`;
  const price = deterministicPrice(path);
  const category = (() => {
    const f = folder.toLowerCase();
    if (f.includes('electro') || f.includes('electronics')) return 'Electronics';
    if (f.includes('fashion') || f.includes('clothes') || f.includes('shoes')) return 'Fashion';
    if (f.includes('siport') || f.includes('sport') || f.includes('sporty')) return 'Sport';
    return folder;
  })();

  return {
    id: `${slug}-${index}`,
    name: name,
    slug: slug,
    price,
    image: mod.default || mod,
    category,
    description: `Auto-generated product for "${name}". Please edit to add real description.`,
    rating: Math.round((index % 5 + 1) * 10) / 10,
    stock: 10 + (index % 50),
  };
});

// Export a default array of products
export default products;

// Also named export for convenience
export { products };
