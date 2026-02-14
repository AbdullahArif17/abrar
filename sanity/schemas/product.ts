import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'main', title: '📦 Basic Info', default: true },
    { name: 'pricing', title: '💰 Pricing & Stock' },
    { name: 'media', title: '🖼️ Media' },
    { name: 'details', title: '📋 Details & Specs' },
    { name: 'variants', title: '🎨 Variants' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'social', title: '⭐ Reviews' },
    { name: 'config', title: '⚙️ Settings' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
      price: 'price',
      media: 'images.0',
    },
    prepare({ title, subtitle, price, media }) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `${subtitle} — Rs. ${price || 0}` : `Rs. ${price || 0}`,
        media,
      };
    },
  },
  fields: [
    // ──────────────── BASIC INFO ────────────────
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      group: 'main',
      description: 'The name of the product (e.g., "Galaxy Watch Ultra").',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      group: 'main',
      description: 'Brand or manufacturer (e.g., Samsung, Apple, JBL).',
    }),
    defineField({
      name: 'sku',
      title: 'SKU / Model Number',
      type: 'string',
      group: 'main',
      description: 'Unique product identifier for inventory tracking.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'main',
      rows: 3,
      description: 'Brief marketing copy shown on the product card and listing.',
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'array',
      group: 'main',
      description: 'Rich-text product description with formatting, images, and links.',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'main',
      description: 'Select from your store categories.',
    }),

    // ──────────────── PRICING & STOCK ────────────────
    defineField({
      name: 'price',
      title: 'Base Price (Rs.)',
      type: 'number',
      group: 'pricing',
      description: 'Original retail price.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'discountPrice',
      title: 'Sale Price (Rs.)',
      type: 'number',
      group: 'pricing',
      description: 'Discounted price. Leave empty if not on sale.',
      validation: (Rule) =>
        Rule.custom((discountPrice, context) => {
          const price = (context.parent as any)?.price;
          if (discountPrice && price && discountPrice >= price) {
            return 'Sale price must be less than base price';
          }
          return true;
        }),
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      group: 'pricing',
      description: 'Number of units available. Set to 0 for out of stock.',
      initialValue: 100,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      group: 'pricing',
      initialValue: 'in_stock',
      options: {
        list: [
          { title: '✅ In Stock', value: 'in_stock' },
          { title: '⚠️ Low Stock', value: 'low_stock' },
          { title: '❌ Out of Stock', value: 'out_of_stock' },
          { title: '📦 Pre-Order', value: 'pre_order' },
        ],
        layout: 'radio',
      },
    }),

    // ──────────────── MEDIA ────────────────
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      group: 'media',
      description: 'Upload multiple images. First image is the main thumbnail.',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error('Add at least one product image.'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Product Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or Vimeo link for a product demo video.',
    }),

    // ──────────────── DETAILS & SPECS ────────────────
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      group: 'details',
      description: 'Bullet points displayed on the product page.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      group: 'details',
      description: 'Technical details in key-value format (e.g., "Battery Life: 48 hours").',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'whatsInTheBox',
      title: "What's in the Box",
      type: 'array',
      group: 'details',
      description: 'List of items included in the package.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty Info',
      type: 'string',
      group: 'details',
      description: 'e.g., "1 Year Official Warranty" or "6 Months Seller Warranty".',
    }),
    defineField({
      name: 'weight',
      title: 'Weight (grams)',
      type: 'number',
      group: 'details',
      description: 'Product weight for shipping calculation.',
    }),

    // ──────────────── VARIANTS ────────────────
    defineField({
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      group: 'variants',
      description: 'List of color options (e.g., Black, Silver, Blue).',
      of: [
        {
          type: 'object',
          name: 'colorOption',
          fields: [
            { name: 'name', title: 'Color Name', type: 'string' },
            { name: 'hex', title: 'Color Code', type: 'string', description: 'e.g., #000000' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'hex' },
          },
        },
      ],
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      group: 'variants',
      description: 'List of size options if applicable (e.g., 40mm, 44mm, S, M, L).',
      of: [{ type: 'string' }],
    }),

    // ──────────────── SEO ────────────────
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'main',
      description: 'Auto-generated from title. Click "Generate".',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Custom title for search engines (defaults to product name).',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'string',
      group: 'seo',
      description: 'Custom description for search engines (max 160 chars).',
      validation: (Rule) => Rule.max(160),
    }),

    // ──────────────── REVIEWS ────────────────
    defineField({
      name: 'reviewCount',
      title: 'Total Reviews',
      type: 'number',
      group: 'social',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (0-5)',
      type: 'number',
      group: 'social',
      description: 'Average customer rating.',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'productTags',
      title: 'Promotional Labels',
      type: 'array',
      group: 'social',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🔥 Best Seller', value: 'bestseller' },
          { title: '✨ New Arrival', value: 'new' },
          { title: '⏰ Limited Stock', value: 'limited' },
          { title: '🔥 Hot Deal', value: 'hot' },
          { title: '💯 Top Rated', value: 'toprated' },
          { title: '🎁 Free Gift', value: 'freegift' },
        ],
      },
    }),

    // ──────────────── SETTINGS ────────────────
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'config',
      initialValue: false,
      description: 'Show in the "Featured" section on the homepage.',
    }),
    defineField({
      name: 'isActive',
      title: 'Published / Active',
      type: 'boolean',
      group: 'config',
      initialValue: true,
      description: 'Set to false to hide this product from the storefront without deleting it.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'config',
      initialValue: 0,
      description: 'Lower numbers appear first. Use to manually control product order.',
    }),
  ],
});
