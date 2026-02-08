import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Original Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discount Price (Sale Price)',
      type: 'number',
      description: 'Optional: Set a discount price to show a sale. Must be less than original price.',
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
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      description: 'Number of customer reviews',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Average rating out of 5',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'productTags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🔥 Best Seller', value: 'bestseller' },
          { title: '✨ New Launch', value: 'new' },
          { title: '⏰ Limited Stock', value: 'limited' },
          { title: '🔥 Hot', value: 'hot' },
        ],
      },
      description: 'Tags to highlight the product',
    }),
  ],
});
