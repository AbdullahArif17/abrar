import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main Information' },
    { name: 'details', title: 'Product Details' },
    { name: 'social', title: 'Reviews & Social' },
    { name: 'config', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      group: 'main',
      description: 'The name of the product as it will appear on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'config',
      description: 'Used for the product URL. Click "Generate" after setting the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base Price (Rs.)',
      type: 'number',
      group: 'main',
      description: 'The regular selling price.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discounted Price (Optional)',
      type: 'number',
      group: 'main',
      description: 'Set this only if the product is on sale. Must be lower than Base Price.',
      validation: (Rule) => 
        Rule.custom((discountPrice, context) => {
          const price = (context.parent as any)?.price;
          if (discountPrice && price && discountPrice >= price) {
            return 'Discount price must be less than original price';
          }
          return true;
        }),
    }),
    defineField({
      name: 'description',
      title: 'Marketing Description',
      type: 'text',
      group: 'main',
      rows: 4,
      description: 'A brief, catchy description for the product page.',
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      group: 'main',
      description: 'Add multiple images. The first image will be the primary one shown.',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'Store Category',
      type: 'string',
      group: 'details',
      description: 'e.g., Smart Watches, Earbuds, Accessories.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'config',
      initialValue: false,
      description: 'Toggle on to show this product in the "Featured" section.',
    }),
    defineField({
      name: 'features',
      title: 'Key Bullet Points',
      type: 'array',
      group: 'details',
      description: 'Brief technical specs or selling points.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reviewCount',
      title: 'Total Reviews',
      type: 'number',
      group: 'social',
      description: 'Manual entry for number of customer reviews.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (0-5)',
      type: 'number',
      group: 'social',
      description: 'Average customer rating (e.g., 4.5).',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'productTags',
      title: 'Promotional Labels',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🔥 Best Seller', value: 'bestseller' },
          { title: '✨ New Launch', value: 'new' },
          { title: '⏰ Limited Stock', value: 'limited' },
          { title: '🔥 Hot', value: 'hot' },
        ],
      },
      description: 'Labels to display on the product card (e.g., "Best Seller").',
    }),
  ],
});
