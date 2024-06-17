import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'video',
  type: 'file',
  title: 'Video',
  icon: PlayIcon,
  description: 'Upload a video (MP4)',
  options: {
    accept: 'video/mp4',
  },
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Caption for video',
    }),
  ],

  preview: {
    select: {
      media: 'video',
    },
    prepare({media}) {
      return {
        media,
      }
    },
  },
})
