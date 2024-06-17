import {TextIcon} from '@sanity/icons';
import React from 'react';
import link from './link'
import glossaryLink from './glossaryLink'

const HighlightDecorator = props => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

export default {
  name: 'richText',
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
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            annotations: [link, glossaryLink],
            decorators: [
              //removed decorations
              {
                title: 'Highlight',
                value: 'highlight',
                icon: () => 'H',
                component: HighlightDecorator
              }
            ],
          },
        },
      ],
    },
  ],
}
