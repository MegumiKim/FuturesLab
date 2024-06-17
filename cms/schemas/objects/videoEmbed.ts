import {defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'
import {EmbedInput} from '../../components/EmbedInput.tsx'

export default defineType({
  name: 'videoEmbed',
  type: 'object',
  title: 'Video Embed',
  icon: PlayIcon,
  components: {
    input: EmbedInput,
  },
  fields: [
    {
      name: 'url',
      type: 'string',
      title: 'URL',
      description: 'Enter the URL of the video',
      validation: (Rule) => Rule.required() && Rule.uri({scheme: ['http', 'https']}),
    },
    {
      name: 'id',
      type: 'string',
      title: 'Identifier',
      description: '',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      // hidden: true
    },
    {
      name: 'provider',
      type: 'string',
      title: 'Provider',
      description: '',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      // hidden: true
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption for the video',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'icon',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
})
