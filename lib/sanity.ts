import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
} 


export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const apiVersion = '2023-01-01'; // or your specific version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for better performance
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to get image URL from product
export function getProductImageUrl(product: { images?: any[]; image?: any }): string {
  if (product.images && product.images.length > 0 && product.images[0]) {
    return urlFor(product.images[0]).url();
  }
  if (product.image) {
    if (typeof product.image === 'string') {
      return product.image;
    }
    return urlFor(product.image).url();
  }
  return '/placeholder.jpg';
}

// GROQ Queries
export const productsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  name,
  price,
  discountPrice,
  description,
  "slug": slug.current,
  "category": category,
  "images": images,
  featured,
  features,
  reviewCount,
  rating,
  productTags,
  _createdAt
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  name,
  price,
  discountPrice,
  description,
  "slug": slug.current,
  "category": category,
  "images": images,
  featured,
  features,
  reviewCount,
  rating,
  productTags,
  _createdAt
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  name,
  price,
  discountPrice,
  description,
  "slug": slug.current,
  "category": category,
  "images": images,
  featured,
  features,
  reviewCount,
  rating,
  productTags,
  _createdAt
}`;

// Fetch Functions
export async function getProducts() {
  try {
    const products = await client.fetch(productsQuery);
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    const products = await client.fetch(featuredProductsQuery);
    return products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getProduct(slug: string) {
  try {
    const product = await client.fetch(productBySlugQuery, { slug });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
