import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'
export default defineType({
  name: 'quote',
  type: 'object',
  title: 'Quote',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      validation: (Rule) => Rule.required().max(250).error('Quote is max 250 characters)'),
    }),
    defineField({
      name: 'by',
      type: 'string',
      title: 'By',
    }),
  ],
  preview: {
    select: {
      title: 'quote', // Field name for the title in the preview
      subtitle: 'by', // Field name for the subtitle in the preview
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: `By: ${subtitle}`,
      }
    },
  },
})
