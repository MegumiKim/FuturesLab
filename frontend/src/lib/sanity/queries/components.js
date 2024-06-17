import groq from 'groq';

export const asset = groq`
asset->{
  _type,
  _updatedAt,
  title,
  altText,
  description,
  url,
  originalFilename,
  mimeType,
  extension,
  size,
  'width': metadata.dimensions.width,
  'height': metadata.dimensions.height,
  'aspectRatio': metadata.dimensions.aspectRatio,
  'blurHash': metadata.blurHash,
  'hasAlpha': coalesce(metadata.hasAlpha, false),
}
`;

export const link = groq`{
  ...,
  internalLink->{
    'slug': slug.current,
    'type': _type
  }
}`;

export const richText = groq`
'type': _type,
'text': text[]{
  ...,
  markDefs[]{
    ...,
    _type == "glossaryLink" => {
      "slug": reference->slug.current,
      "term": reference->term, 
      "definition": {
        "text": reference->definition.text[]{
          ...,
          markDefs[]{
            ...,
            _type == "glossaryLink" => {
              "slug": @.reference->slug,
              "_type": "link",
              "internalLink": "/glossary/#" + @.reference->slug.current
            }
          }
        }}
    }
  }
}
`;

export const videoEmbed = groq`{
  'type': _type,
  id,
  provider,
  caption
}`;

export const seo = groq`seo {
  description,
  "image":image.${asset},
  "focalPoint": image.hotspot,
}`;
