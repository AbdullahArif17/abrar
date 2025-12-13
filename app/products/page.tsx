import { getProducts } from '@/lib/sanity';
import { Product } from '@/lib/products';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return <ProductsClient products={products} />;
}
