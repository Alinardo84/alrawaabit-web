import { defineType, defineField, defineArrayMember } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'meta', title: 'Metadata' },
    { name: 'gallery', title: 'Gallery' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Post Title', type: 'internationalizedArrayString', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug', group: 'settings',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt', title: 'Excerpt', type: 'internationalizedArrayText', group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'A short summary that appears on the blog index page and in search results.',
    }),
    defineField({
          name: 'body', title: 'Article Body', type: 'internationalizedArray', group: 'content',
          description: 'The main content of the blog post.',
        }),
    defineField({ name: 'author', title: 'Author', type: 'reference', group: 'meta', to: [{ type: 'author' }] }),
    defineField({
      name: 'categories', title: 'Categories', type: 'array', group: 'meta',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array', group: 'meta',
      of: [{ type: 'string' }], options: { layout: 'tags' },
    }),
    defineField({
      name: 'featuredImage', title: 'Featured Image', type: 'image', group: 'content',
      options: { hotspot: true }, validation: (Rule) => Rule.required(),
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'gallery', title: 'Image Gallery', type: 'array', group: 'gallery',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] })],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'internationalizedArrayString', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'internationalizedArrayText', group: 'seo' }),
    defineField({ name: 'seoKeywords', title: 'SEO Keywords', type: 'array', of: [{ type: 'string' }], group: 'seo' }),
    defineField({
      name: 'status', title: 'Status', type: 'string', group: 'settings',
      options: { list: ['published', 'draft'] }, initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'featured', title: 'Featured Post', type: 'boolean', group: 'settings', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', group: 'settings', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'readingTime', title: 'Estimated Reading Time (minutes)', type: 'number', group: 'settings' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'featuredImage' },
    prepare(selection: { title?: unknown; subtitle?: string; media?: unknown }) {
      const title = selection.title;
      const publishedAt = selection.subtitle;
      const media = selection.media;
      const titleText = Array.isArray(title) ? title.find((t: { _key: string; value: string }) => t._key === 'ar')?.value || title[0]?.value : (title as unknown);
      const date = publishedAt ? new Date(publishedAt as string).toLocaleDateString() : 'No date';
      return {
        title: (titleText as string) || 'Untitled',
        subtitle: date,
        media: media as never,
      };
    },
  },
});