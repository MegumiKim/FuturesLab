import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export default defineType({
  name: 'largeText',
  type: 'object',
  title: 'Large Text',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'text',
      title: 'Text',
      validation: (Rule) => [Rule.required().max(250).error('Text cannot exceed 250 characters)')],
    }),
  ],
  preview: {
    select: {
      title: 'text', // Field name for the title in the preview
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
