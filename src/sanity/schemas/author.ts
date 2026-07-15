import { defineType, defineField, defineArrayMember } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile' },
    { name: 'social', title: 'Social Links' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', group: 'profile', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug', group: 'profile',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', group: 'profile' }),
    defineField({
      name: 'bio', title: 'Bio', type: 'internationalizedArrayText', group: 'profile',
      description: 'Short biography shown on author profile and post pages.',
    }),
    defineField({
      name: 'photo', title: 'Profile Photo', type: 'image', group: 'profile',
      options: { hotspot: true }, validation: (Rule) => Rule.required(),
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'socialLinks', title: 'Social Media Links', type: 'array', group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'platform', title: 'Platform', type: 'string',
              options: { list: ['LinkedIn', 'Twitter/X', 'Instagram', 'Facebook', 'GitHub', 'Website'] },
              validation: (Rule) => Rule.required(),
            },
            { name: 'url', title: 'Profile URL', type: 'url', validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});