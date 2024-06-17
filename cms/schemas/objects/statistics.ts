import {NumberIcon} from '@sanity/icons'

export default {
  name: 'statistics',
  type: 'object',
  title: 'Statistics',
  icon: NumberIcon,
  fields: [
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      validation: (Rule) => Rule.min(2).required().error('Minimum 2 statistics required'),
      description: 'Creates minimum 2 statistic.',
      of: [
        {
          name: 'stat',
          type: 'object',
          title: 'Stat',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) =>
                Rule.max(30).required().error('Title has to be max 30 characters'),
              description: 'Title of the statistic, e.g. "Budget" or "Participants" etc.',
            },
            {
              name: 'number',
              type: 'number',
              title: 'Number',
              validation: (Rule) => Rule.required().error('number is required'),
              description: 'Main number to display, e.g. 1000, 0.1, -1',
            },
            {
              name: 'unit',
              type: 'string',
              title: 'Unit',
              validation: (Rule) =>
                Rule.max(10).required().error('Unit has to be max 10 characters'),
              description: '%, NOK, km/hr People, Weeks etc.',
            },
            {
              name: 'details',
              type: 'string',
              title: 'Details',
              validation: (Rule) =>
                Rule.max(50).required().error('Details has to be max 50 characters'),
              description: 'Max 1 line of short description',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      return {
        title: `Statistics block of ${items.length} items`,
        media: NumberIcon,
      }
    },
  },
}
