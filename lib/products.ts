export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    discountPrice?: number; // Optional discount/sale price
    image?: any; // Legacy support
    images?: any[]; // Sanity images array
    slug: string;
    category: string;
    // creating a compatibility layer or just redefining it
    id?: string; // keeping for dummy data compatibility if needed
    name?: string; // keeping for compatibility
    features?: string[];
    reviewCount?: number; // Number of customer reviews
    rating?: number; // Average rating out of 5
    productTags?: ('bestseller' | 'new' | 'limited' | 'hot')[]; // Product tags
    _createdAt?: string;
    featured?: boolean;
}

export const products: Product[] = [
  {
    _id: '1',
    id: '1',
    name: 'Chronos Elite',
    title: 'Chronos Elite',
    slug: 'chronos-elite',
    price: 299,
    category: 'smart-watches',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate companion for your active lifestyle. Precision tracking meets elegant design.',
    features: ['Always-on Retina Display', 'ECG App', 'Water Resistant 50m']
  },
  {
    _id: '2',
    id: '2',
    name: 'AeroBuds Pro',
    title: 'AeroBuds Pro',
    slug: 'aerobuds-pro',
    price: 199,
    category: 'earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    description: 'Immersive sound with active noise cancellation. Tune out the world and tune in to your music.',
    features: ['Active Noise Cancellation', '24h Battery Life', 'Wireless Charging']
  },
  {
    _id: '3',
    id: '3',
    name: 'Studio Master',
    title: 'Studio Master',
    slug: 'studio-master',
    price: 349,
    category: 'headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    description: 'Professional grade studio headphones for the audiophile in you.',
    features: ['High-Fidelity Audio', 'Memory Foam Ear Cushions', 'Detachable Cable']
  },
  {
    _id: '4',
    id: '4',
    name: 'Chronos Sport',
    title: 'Chronos Sport',
    slug: 'chronos-sport',
    price: 149,
    category: 'smart-watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight, durable, and ready for any workout.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Sleep Analysis']
  },
  {
    _id: '5',
    id: '5',
    name: 'AeroBuds Lite',
    title: 'AeroBuds Lite',
    slug: 'aerobuds-lite',
    price: 99,
    category: 'earbuds',
    image: 'https://images.unsplash.com/photo-1572569028738-411a29318815?auto=format&fit=crop&q=80&w=800',
    description: 'Premium sound at an accessible price point.',
    features: ['Touch Controls', 'IPX4 Water Resistance', 'Quick Pairing']
  },
  {
    _id: '6',
    id: '6',
    name: 'Sonic Over-Ear',
    title: 'Sonic Over-Ear',
    slug: 'sonic-over-ear',
    price: 249,
    category: 'headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    description: 'Comfortable over-ear headphones with deep bass and crisp highs.',
    features: ['40mm Drivers', '30h Playtime', 'Foldable Design']
  }
];
