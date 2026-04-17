import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '📂',
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., Smart Watches, Earbuds, Headphones, Accessories.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description for the category page header.',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Displayed as the category thumbnail on the storefront.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'showInHero',
      title: 'Show in Hero Section',
      type: 'boolean',
      initialValue: false,
      description: 'If enabled, this category will appear as a circular icon on the homepage hero section.',
    }),
  ],
});

