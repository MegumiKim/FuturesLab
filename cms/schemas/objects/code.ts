import {CodeIcon} from '@sanity/icons'

export default {
  name: 'code',
  type: 'object',
  title: 'Code Snippet',
  icon: CodeIcon,
  fields: [
    {
      name: 'language',
      type: 'string',
      title: 'Language',
      description: 'Select the programming language',
    },
    {
      name: 'code',
      type: 'text',
      title: 'Code',
      description: 'Paste your code snippet here',
    },
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
    },
    prepare(selection) {
      const {language, code} = selection
      return {
        title: language,
        subtitle: code,
      }
    },
  },
}
