import groq from 'groq';
import { asset, richText, videoEmbed } from './components.js';

export const contentBlocks = groq`
contentBlocks[]{
  _type == 'media' =>{
    type == 'image'=>{
      "type":_type,
      'asset':image.${asset},
      "focalPoint": image.hotspot
    },
    type == 'video' =>{
      "type":_type,
      'asset':video.${asset},
    },
    'caption': caption,
    'orientation': orientation,
    'displaySize': displaySize,
  },
  _type == 'videoEmbed' => ${videoEmbed},
  _type == 'richText' => {
    ${richText}
  },
  _type == 'quote' => {
    'type': _type,
    'quote': quote,
    'by': by
  },
  _type == 'largeText' => {
    'type': _type,
    'text': text,
  },
  _type == 'gallery' => {
    'type': _type,
    items[]{
      ${asset},
      caption
    },
    // 'display':display
  },
  _type == 'statistics' => {
    'type': _type,
    items[]
},
  _type == 'numberedParagraphs' => {
    'type': _type,
    title,
    items[]{
      ${richText}
}}
}
`;
