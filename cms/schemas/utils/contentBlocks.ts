// This file contains the content blocks that are used in the CMS

// A helper function to filter out the content blocks that are not required
export function getContentBlocks(exclude: string[] = []) {
  return contentBlocks.filter((block) => !exclude.includes(block.name))
}

export const contentBlocks = [
  {
    name: 'richText',
    type: 'richText',
  },
  {
    name: 'quote',
    type: 'quote',
  },
  {
    name: 'largeText',
    type: 'largeText',
  },
  {name: 'numberedParagraphs', type: 'numberedParagraphs'},
  {
    name: 'gallery',
    type: 'gallery',
  },
  {
    name: 'media',
    type: 'media',
  },
  {
    name: 'statistics',
    type: 'statistics',
  },
  {
    name: 'code',
    type: 'code',
  },
  {
    name: 'videoEmbed',
    type: 'videoEmbed',
  },
]
