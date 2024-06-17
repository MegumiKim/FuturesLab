import {UserIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'glossaryLink',
  type: 'object',
  title: 'Glossary Link',
  icon: UserIcon,
  fields: [
    {
      name: 'reference',
      type: 'reference',
      to: [{type: 'glossary'}],
    },
  ],
  preview: {
    select: {
      title: 'reference.term',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title,
        subtitle: 'Glossary term',
      }
    },
  },
})
