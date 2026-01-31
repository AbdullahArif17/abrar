/**
 * Script to automatically seed products into Sanity
 * 
 * To run this script:
 * 1. Install tsx: npm install -D tsx
 * 2. Set SANITY_API_TOKEN in your .env file (get it from https://sanity.io/manage)
 * 3. Run: npm run seed
 * OR
 * Run directly: npx tsx scripts/seed-products.ts
 * 
 * Note: You need a Sanity API token with write permissions
 * Get it from: https://sanity.io/manage → Your Project → API → Tokens → Add API token
 */

import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET');
}

if (!token) {
  throw new Error('Missing SANITY_API_TOKEN. Get it from https://sanity.io/manage');
}

// Create authenticated client for writing
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-01-01',
  useCdn: false,
  token, // Required for write operations
});

const products = [
  {
    _type: 'product',
    title: 'Chronos Elite',
    slug: {
      _type: 'slug',
      current: 'chronos-elite'
    },
    price: 29900, // Price in PKR (299 * 100)
    description: 'The ultimate companion for your active lifestyle. Precision tracking meets elegant design.',
    category: 'smart-watches',
    featured: true,
    features: ['Always-on Retina Display', 'ECG App', 'Water Resistant 50m']
  },
  {
    _type: 'product',
    title: 'AeroBuds Pro',
    slug: {
      _type: 'slug',
      current: 'aerobuds-pro'
    },
    price: 19900,
    description: 'Immersive sound with active noise cancellation. Tune out the world and tune in to your music.',
    category: 'earbuds',
    featured: true,
    features: ['Active Noise Cancellation', '24h Battery Life', 'Wireless Charging']
  },
  {
    _type: 'product',
    title: 'Studio Master',
    slug: {
      _type: 'slug',
      current: 'studio-master'
    },
    price: 34900,
    description: 'Professional grade studio headphones for the audiophile in you.',
    category: 'headphones',
    featured: true,
    features: ['High-Fidelity Audio', 'Memory Foam Ear Cushions', 'Detachable Cable']
  },
  {
    _type: 'product',
    title: 'Chronos Sport',
    slug: {
      _type: 'slug',
      current: 'chronos-sport'
    },
    price: 14900,
    description: 'Lightweight, durable, and ready for any workout.',
    category: 'smart-watches',
    featured: false,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Sleep Analysis']
  },
  {
    _type: 'product',
    title: 'AeroBuds Lite',
    slug: {
      _type: 'slug',
      current: 'aerobuds-lite'
    },
    price: 9900,
    description: 'Premium sound at an accessible price point.',
    category: 'earbuds',
    featured: false,
    features: ['Touch Controls', 'IPX4 Water Resistance', 'Quick Pairing']
  },
  {
    _type: 'product',
    title: 'Sonic Over-Ear',
    slug: {
      _type: 'slug',
      current: 'sonic-over-ear'
    },
    price: 24900,
    description: 'Comfortable over-ear headphones with deep bass and crisp highs.',
    category: 'headphones',
    featured: false,
    features: ['40mm Drivers', '30h Playtime', 'Foldable Design']
  }
];

async function seedProducts() {
  console.log('🌱 Starting to seed products...\n');

  try {
    for (const product of products) {
      // Check if product already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: product.slug.current }
      );

      if (existing) {
        console.log(`⏭️  Skipping "${product.title}" - already exists`);
        continue;
      }

      // Create the product
      const created = await client.create(product);
      console.log(`✅ Created: ${product.title} (ID: ${created._id})`);
    }

    console.log('\n✨ Seeding completed!');
    console.log('\n📝 Note: You need to upload images manually in Sanity Studio at /studio');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
