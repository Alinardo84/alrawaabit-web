import { defineType, defineField, defineArrayMember } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'social', title: 'Social Links' },
    { name: 'nav', title: 'Navigation Menu' },
  ],
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', group: 'branding', initialValue: 'AlRawaabit', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'logo', title: 'Logo', type: 'image', group: 'branding',
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', group: 'contact', initialValue: '+2 0111 1 306090' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', group: 'contact', initialValue: 'info@alrawaabit.com' }),
    defineField({ name: 'address', title: 'Address', type: 'internationalizedArrayText', group: 'contact' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (with country code)', type: 'string', group: 'contact', initialValue: '201111306090' }),
    defineField({ name: 'workingHours', title: 'Working Hours', type: 'internationalizedArrayString', group: 'contact' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url', group: 'social', initialValue: 'https://www.facebook.com/RawaabitDigitalMarketing' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'social', initialValue: 'https://www.instagram.com/rawaabitdigitalmarketing/' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url', group: 'social', initialValue: 'https://www.linkedin.com/company/rawaabit-digital-marketing/' }),
    defineField({
      name: 'navMenu', title: 'Navigation Menu', type: 'array', group: 'nav',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            { name: 'label', title: 'Label', type: 'internationalizedArrayString', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link URL', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'children', title: 'Sub-menu Items', type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'internationalizedArrayString' },
                    { name: 'href', title: 'Link URL', type: 'string' },
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'siteName' } },
});