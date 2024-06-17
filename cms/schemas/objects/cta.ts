import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'
export default defineType({
  name: 'cta',
  type: 'object',
  title: 'Button with Link',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'url',
    }),
  ],
})
