import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'site-settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        // TODO: Hack for showing static value
        title: 'Site Settings',
      }
    },
  },

  groups: [
    {
      name: 'site',
      title: 'Site',
      default: true,
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
  ],

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'site',
      title: 'Site Title',
      description: 'Title of the site which appears in the browser tab.',
      initialValue: 'Futures Lab',
      validation: (rule) => rule.max(20).error('Site title cannot exceed 20 characters'),
    }),
    defineField({
      name: 'elevatorPitch',
      type: 'string',
      group: 'site',
      title: 'Elevator Pitch',
      description: 'Main heading in the landing page. Max 70 characters.',
      initialValue: 'We help Schibsted prepare for a range of possible futures...',
      validation: (rule) => rule.max(70).error('Elevator pitch cannot exceed 70 characters'),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'site',
      title: 'SEO',
    }),

    //
    // Header
    //
    defineField({
      name: 'navHeader',
      type: 'array',
      group: 'header',
      title: 'Navigation',
      of: [{type: 'navigationItem'}],
    }),

    //
    // Footer
    //
    defineField({
      name: 'copyright',
      type: 'string',
      group: 'footer',
      title: 'Footer Copyright',
      description: 'Copy right text to display in the footer',
    }),
    defineField({
      name: 'navFooter',
      type: 'array',
      group: 'footer',
      title: 'Navigation',
      of: [{type: 'navigationItem'}],
    }),
  ],
})
