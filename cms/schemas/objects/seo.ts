import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export default defineType({
  name: 'seo',
  type: 'object',
  title: 'SEO',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Description of the page for search engines. Max 160 characters.',
      rows: 3,
      validation: (rule) =>
        rule.required().max(160).error('Site description cannot exceed 160 characters'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Image for social media sharing. Recommended size: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'description',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title,
        media: media,
      }
    },
  },
})
