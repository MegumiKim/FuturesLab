import {defineType, defineField} from 'sanity'
import {getContentBlocks} from '../utils/contentBlocks.js'

//Validations of each field need to be reviewed

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  groups: [
    {
      name: 'project',
      title: 'Project',
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
  fieldsets: [
    // Fieldset for thumbnail
    {
      name: 'thumbnail',
      title: 'Thumbnail',
    },
  ],
  fields: [
    //
    // Project fields
    //
    defineField({
      name: 'title',
      type: 'string',
      group: 'project',
      title: 'Title',
      description:
        'Punchy. 1 sentence. 3-8 words. Starts with the: <project name>: <project type> <context/problem> <solution>',
      validation: (Rule) => [
        Rule.required().max(80).error('A title is required (max 80 characters)'),
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'project',
      title: 'Slug',
      options: {source: 'title'},
      validation: (Rule) =>
        Rule.required().error(`A slug is required to generate a page on the website`),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      group: 'project',
      title: 'Subtitle',
      description:
        '1 paragraph. 1-3 sentences. Should convey what we have done and what we hoped to achieve (ideally from an end user standpoint)',
      rows: 5,
      validation: (Rule) => [
        Rule.required().max(400).error('A subtitle is required (max 400 characters)'),
      ],
    }),
    defineField({
      name: 'date',
      type: 'date',
      group: 'project',
      title: 'Published Date',
      validation: (Rule) => Rule.required().error('Date is required'),
    }),
    defineField({
      name: 'video',
      type: 'file',
      group: 'project',
      fieldset: 'thumbnail',
      description:
        'Visual element (video) that conveys the core concept or situation from an end-user standpoint. Supercut, showreel, product demo, situation, illustration.',
      options: {
        accept: 'video/mp4',
      },

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
    }),
    defineField({
      name: 'image',
      type: 'imageObject',
      group: 'project',
      fieldset: 'thumbnail',
      description:
        'The image will work as a fallback for video if no video is uploaded. Its a visual element that conveys the core concept or situation from an end-user standpoint. Make sure to add Alt text for accessibility.',
      validation: (Rule) => [Rule.required().error('A image required')],
    }),

    //
    // Content fields
    //

    // Common content blocks
    defineField({
      name: 'contentBlocks',
      type: 'array',
      group: 'content',
      title: 'Content blocks',
      description: 'Overview/Demo/Scenario/Breakdown',
      of: getContentBlocks(),
    }),

    //
    // SEO fields
    //
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      title: 'SEO',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
})
