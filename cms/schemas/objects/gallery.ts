//code snippet: https://www.sanity.io/schemas/image-gallery-dea386ba

import {ImagesIcon} from '@sanity/icons'

export default {
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  icon: ImagesIcon,
  fields: [
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          name: 'video',
          type: 'video',
          title: 'Video',
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    // {
    //   name: 'display',
    //   type: 'string',
    //   title: 'Display as',
    //   description: 'How do you want to display the images?',
    //   options: {
    //     list: [
    //       {title: 'Gallery', value: 'gallery'},
    //       {title: 'Carousel', value: 'carousel'},
    //     ],
    //     layout: 'radio', // <-- defaults to 'dropdown'
    //   },
    // },
  ],
  preview: {
    select: {
      images: 'items',
      image: 'items[0]',
    },
    prepare(selection) {
      const {images, image} = selection

      return {
        title: `Gallery block of ${Object.keys(images).length} items`,
        media: image,
      }
    },
  },
}
