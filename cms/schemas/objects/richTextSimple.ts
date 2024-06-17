import {TextIcon} from '@sanity/icons'
import link from './link'
import glossaryLink from './glossaryLink'

export default {
  name: 'richTextSimple',
  type: 'object',
  title: 'Rich Text',
  icon: TextIcon,
  fields: [
    {
      name: 'text',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [
            //removed lists
          ],
          styles: [
            //removed styles
          ],
          marks: {
            annotations: [glossaryLink, link],
            decorators: [
              //removed decorations
            ],
          },
        },
      ],
    },
  ],
}
