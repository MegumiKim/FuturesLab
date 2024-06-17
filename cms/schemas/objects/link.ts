import {LinkIcon} from '@sanity/icons'

export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: LinkIcon,
  fields: [{
    title: 'Internal Link',
    name: 'internalLink',
    description: 'Select pages for navigation',
    type: 'reference',
    to: [{ type: 'page' }, { type: 'project' }],
    options: {
      disableNew: true,
    },
  }, {
    name: 'externalLink',
    title: 'External URL',
    description: 'Use fully qualified URLS for external link',
    type: 'url',
    validation: Rule => Rule.uri({
      scheme: ['http', 'https', 'mailto', 'tel']
    })
  }],
}
