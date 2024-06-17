import {UserIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'glossary',
  type: 'document',
  title: 'Glossary',
  icon: UserIcon,
  fields: [
    {
      name: 'term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'term',
        maxLength: 96,
      },
    },
    {
      name: 'definition',
      type: 'richTextSimple',
      validation: (Rule) => Rule.required(),
    },
  ],
})
