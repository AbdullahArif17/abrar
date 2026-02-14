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
  useCdn: false, // Disable CDN to always get fresh data after publishing
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

// Shared projection for product queries
const productProjection = `{
  _id,
  title,
  "name": coalesce(title, name),
  brand,
  sku,
  price,
  discountPrice,
  description,
  longDescription,
  "slug": slug.current,
  "category": coalesce(category->title, category),
  "categorySlug": category->slug.current,
  images,
  videoUrl,
  featured,
  isActive,
  sortOrder,
  features,
  specifications,
  whatsInTheBox,
  warranty,
  weight,
  colors,
  sizes,
  stockQuantity,
  stockStatus,
  reviewCount,
  rating,
  productTags,
  metaTitle,
  metaDescription,
  _createdAt
}`;

// GROQ Queries
export const productsQuery = `*[_type == "product" && isActive != false] | order(sortOrder asc, _createdAt desc) ${productProjection}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true && isActive != false] | order(sortOrder asc, _createdAt desc) ${productProjection}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] ${productProjection}`;

export const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $categorySlug && isActive != false] | order(sortOrder asc, _createdAt desc) ${productProjection}`;

export const categoriesQuery = `*[_type == "category"] | order(sortOrder asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  image,
  sortOrder
}`;

// Fetch Functions
export async function getProducts() {
  try {
    const products = await client.fetch(productsQuery, {}, {
      next: { revalidate: 60 },
    });
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    const products = await client.fetch(featuredProductsQuery, {}, {
      next: { revalidate: 60 },
    });
    return products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getProduct(slug: string) {
  try {
    const product = await client.fetch(productBySlugQuery, { slug }, {
      next: { revalidate: 60 },
    });
    return product;
  } catch (error: any) {
    console.error(`[getProduct] Error: ${error.message}`);
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string) {
  try {
    const products = await client.fetch(productsByCategoryQuery, { categorySlug }, {
      next: { revalidate: 60 },
    });
    return products || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const categories = await client.fetch(categoriesQuery, {}, {
      next: { revalidate: 60 },
    });
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

