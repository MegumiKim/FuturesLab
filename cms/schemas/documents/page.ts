// ./schemas/pageType.ts

import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {getContentBlocks} from '../utils/contentBlocks'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  groups: [
    {
      name: 'page',
      title: 'Page',
      default: true,
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'page',
      validation: (Rule) => Rule.required(),
      options: {source: 'title'},
    }),
    defineField({
      name: 'contentTitle',
      type: 'string',
      group: 'page',
      description: 'The title shown on the actual page (optional).',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      title: 'SEO',
    }),
    defineField({
      name: 'contentBlocks',
      type: 'array',
      group: 'content',
      title: 'Content blocks',
      description: 'Add, edit, and reorder content blocks to structure the page',
      of: getContentBlocks(),
    }),
  ],
  icon: DocumentIcon,
})
