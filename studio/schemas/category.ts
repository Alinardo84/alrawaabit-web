import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Category Name', type: 'internationalizedArrayString', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Category Description', type: 'internationalizedArrayText' }),
    defineField({
      name: 'color', title: 'Color (for UI tags)', type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'orange' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Gray', value: 'gray' },
        ],
      },
      initialValue: 'orange',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
    prepare(selection: { title: any; description: any }) {
      const { title, description } = selection;
      const titleText = Array.isArray(title) ? title.find((t: { _key: string }) => t._key === 'ar')?.value || title[0]?.value : title;
      const descText = Array.isArray(description) ? description.find((d: { _key: string }) => d._key === 'ar')?.value || '' : description;
      return { title: titleText || 'Untitled', subtitle: descText };
    },
  },
});