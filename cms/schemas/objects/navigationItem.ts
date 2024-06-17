import {LinkIcon} from '@sanity/icons'

export default {
  name: 'navigationItem',
  type: 'object',
  title: 'Navigation Item',
  icon: LinkIcon,
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    },
    {
      name: 'uri',
      type: 'link',
      title: 'Destination',
      validation: (rule) => rule.required(),
    },
  ],
}
