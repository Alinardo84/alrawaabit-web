import { defineType, defineField, defineArrayMember } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'details', title: 'Project Details' },
    { name: 'gallery', title: 'Gallery' },
    { name: 'testimonial', title: 'Testimonial' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Client/Project Name', type: 'internationalizedArrayString', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug', group: 'settings',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'client', title: 'Client Name (English)', type: 'string', group: 'content' }),
    defineField({
      name: 'category', title: 'Category', type: 'reference', group: 'content',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags', title: 'Service Tags', type: 'array', group: 'content',
      of: [{ type: 'string' }],
      options: { list: ['Web', 'Web Design', 'SEO', 'AEO', 'GEO', 'Marketing', 'Branding'] },
    }),
    defineField({
      name: 'excerpt', title: 'Short Description', type: 'internationalizedArrayText', group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage', title: 'Featured Image', type: 'image', group: 'content',
      options: { hotspot: true }, validation: (Rule) => Rule.required(),
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({ name: 'challenge', title: 'The Challenge', type: 'internationalizedArrayBlockContent', group: 'details' }),
        defineField({ name: 'solution', title: 'The Solution', type: 'internationalizedArrayBlockContent', group: 'details' }),
    defineField({
      name: 'results', title: 'Results / Metrics', type: 'array', group: 'details',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'metric', title: 'Metric Name', type: 'internationalizedArrayString', validation: (Rule) => Rule.required() },
            { name: 'value', title: 'Value/Number', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'value', subtitle: 'metric' } },
        }),
      ],
    }),
    defineField({ name: 'services', title: 'Services Provided', type: 'array', group: 'details', of: [{ type: 'string' }] }),
    defineField({
      name: 'gallery', title: 'Project Gallery', type: 'array', group: 'gallery',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] })],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'testimonialQuote', title: 'Testimonial', type: 'internationalizedArrayText', group: 'testimonial' }),
    defineField({ name: 'testimonialAuthor', title: 'Author Name', type: 'string', group: 'testimonial' }),
    defineField({ name: 'testimonialRole', title: 'Author Role/Title', type: 'string', group: 'testimonial' }),
    defineField({ name: 'testimonialImage', title: 'Author Photo', type: 'image', group: 'testimonial', options: { hotspot: true } }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'internationalizedArrayString', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'internationalizedArrayText', group: 'seo' }),
    defineField({
      name: 'status', title: 'Status', type: 'string', group: 'settings',
      options: { list: ['published', 'draft'] },
      initialValue: 'draft', validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'settings', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'featured', title: 'Featured (show on homepage)', type: 'boolean', group: 'settings', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', group: 'settings', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'featuredImage' },
    prepare(selection: { title?: unknown; subtitle?: string; media?: unknown }) {
      const title = selection.title;
      const client = selection.subtitle;
      const media = selection.media;
      const titleText = Array.isArray(title) ? title.find((t: { _key: string; value: string }) => t._key === 'ar')?.value || title[0]?.value : (title as unknown);
      return {
        title: (titleText as string) || 'Untitled',
        subtitle: client,
        media: media as never,
      };
    },
  },
});