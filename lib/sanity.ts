import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = '2023-01-01'; // or your specific version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for fresh data during development
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries
export const productsQuery = `*[_type == "product"] {
  _id,
  title,
  price,
  description,
  "slug": slug.current,
  "category": category,
  "images": images[].asset->url,
  featured,
  features
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] {
  _id,
  title,
  price,
  description,
  "slug": slug.current,
  "category": category,
  "images": images[].asset->url,
  featured
}[0...3]`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  price,
  description,
  "slug": slug.current,
  "category": category,
  "images": images[].asset->url,
  featured,
  features
}`;

// Fetch Functions
export async function getProducts() {
  return client.fetch(productsQuery);
}

export async function getFeaturedProducts() {
  return client.fetch(featuredProductsQuery);
}

export async function getProduct(slug: string) {
  return client.fetch(productBySlugQuery, { slug });
}
