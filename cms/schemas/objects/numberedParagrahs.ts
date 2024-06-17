import {defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'numberedParagraphs',
  type: 'object',
  title: 'Numbered Paragraphs',
  icon: ThListIcon,
  fields: [
    {name: 'title', type: 'string', title: 'Title', description: 'Title of the section.'},
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      description: 'Creates minimum 2 paragraphs.',
      validation: (Rule) => Rule.min(2).required().error('Minimum 2 paragraphs required'),
      of: [
        {
          name: 'richTextSimple',
          type: 'richTextSimple',
          title: 'Text',
          validation: (Rule) => Rule.required().error('Text is required'),
          description: 'Text of the paragraph.',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
