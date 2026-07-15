import { defineType, defineField, defineArrayMember } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'internationalizedArrayString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'settings',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Service', value: 'service' },
          { title: 'Contact', value: 'contact' },
          { title: 'Legal', value: 'legal' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'custom',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'internationalizedArrayString',
      group: 'content',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'internationalizedArrayString',
      group: 'content',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'internationalizedArrayText',
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'internationalizedArrayString',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'Primary CTA Text',
      type: 'internationalizedArrayString',
      group: 'content',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'Primary CTA Link',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Secondary CTA Text',
      type: 'internationalizedArrayString',
      group: 'content',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'Secondary CTA Link',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Page Body Content',
      type: 'internationalizedArray',
      group: 'content',
      of: [{ type: 'blockContent' }],
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'faqSection',
          title: 'FAQ Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'internationalizedArrayString',
            },
            {
              name: 'items',
              title: 'FAQ Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'question',
                      title: 'Question',
                      type: 'internationalizedArrayString',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'answer',
                      title: 'Answer',
                      type: 'internationalizedArrayText',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        }),
        defineArrayMember({
          name: 'statsSection',
          title: 'Stats Section',
          type: 'object',
          fields: [
            {
              name: 'items',
              title: 'Statistics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'internationalizedArrayString' },
                    { name: 'value', title: 'Value', type: 'string' },
                  ],
                },
              ],
            },
          ],
        }),
        defineArrayMember({
          name: 'ctaSection',
          title: 'CTA Section',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'internationalizedArrayString' },
            { name: 'description', title: 'Description', type: 'internationalizedArrayText' },
            { name: 'buttonText', title: 'Button Text', type: 'internationalizedArrayString' },
            { name: 'buttonLink', title: 'Button Link', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'internationalizedArrayString',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'internationalizedArrayText',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO/OG Image',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: { list: ['published', 'draft'] },
      initialValue: 'published',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pageType', media: 'heroImage' },
    prepare(selection: { title: any; pageType: any; media: any }) {
      const { title, pageType, media } = selection;
      const titleText = Array.isArray(title) ? title.find((t: { _key: string }) => t._key === 'ar')?.value || title[0]?.value : title;
      return { title: titleText || 'Untitled', subtitle: pageType, media };
    },
  },
});