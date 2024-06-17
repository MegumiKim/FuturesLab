<script>
// Image transformation with Sanity :https://www.sanity.io/docs/image-urls
// Sanity Image pipeline https://www.sanity.io/docs/presenting-images

  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '../lib/api/sanity.js';

  export let data;
  export let alt;

  console.log(data);
  

  const builder = imageUrlBuilder(client);

  //Create sanity image url, parameters can be added/adjusted
  function urlFor(source, width) {
    return builder.image(source)
      .auto('format')
      .fit('max')
      .crop('entropy')
      .quality(80)
      .width(width)
      .url();
  }

  const screenSizes = [1920, 1600, 1200, 900, 700, 480];
  const srcSet = screenSizes.map(size => `${urlFor(data, size)} ${size}w`).join(', ');
  const sizes = screenSizes.map(size => `(max-width: ${size}px) ${size-100}px`).join(', ') + `, ${screenSizes[0]}px`;
  
  const imageUrl = urlFor(data, screenSizes[-1]); // Default image URL for src attribute
</script>

<img src={imageUrl}
srcset={srcSet}
sizes={`'${sizes}'`}
loading="lazy"
alt={alt}/>

<!-- project schema -->

import {defineType, defineField} from 'sanity'

//Validations of each field need to be reviewed

export default defineType({
name: 'project',
title: 'Project',
type: 'document',
groups: [
{
name: 'media',
title: 'Media Assets',
},
{
name: 'project',
title: 'Project Info',
},
{
name: 'contents',
title: 'Contents',
},
],
fieldsets: [
{
name: 'media',
title: 'Hero Visual (Thumbnail)',
description:
'Visual element (between 3 and 8 seconds long video) that conveys the core concept or situation from an end-user standpoint - Supercut, showreel, product demo, situation, illustration',
},
],
fields: [
defineField({
name: 'title',
title: 'Title',
type: 'string',
group: 'project',
description:
'A punchy sentence with 3-8 words. Start with \n <project name>: <project type> <context/problem> <solution>',
}),
defineField({
name: 'slug',
title: 'Slug',
type: 'slug',
group: 'project',
description: 'A slug is required to generate a page on the website',
options: {source: 'title'},
validation: (Rule) =>
Rule.required().error(`A slug is required to generate a page on the website`),
}),
defineField({
name: 'subtitle',
title: 'Subtitle',
type: 'text',
group: 'project',
description:
'1 paragraph. 1-3 sentences. Should convey what we have done and what we hoped to achieve (ideally from an end user standpoint)',
validation: (Rule) =>
Rule.required().max(500).error(`Subtitle should be less than 500 characters`),
}),
defineField({
name: 'overview',
title: 'Overview',
type: 'text',
group: 'project',
description:
'2-4 short paragraphs with max 3-4 sentences per paragraph - this section should make the concept (what), context / use-case, and enablers clear.',
validation: (Rule) =>
Rule.required().max(500).error(`Overview should be less than 500 characters`),
}),

    defineField({
      name: 'image',
      type: 'imageWithAlt',
      fieldset: 'media',
      group: 'media',
    }),

    defineField({
      name: 'video',
      type: 'video',
      fieldset: 'media',
      group: 'media',
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Caption for the media asset',
      type: 'string',
      fieldset: 'media',
      group: 'media',
    }),
    defineField({
      name: 'contentBlock',
      title: 'Contents',
      description: 'Dynamic Contents for scenario/demo/recommendation',
      type: 'array',
      group: 'contents',
      of: [
        {
          type: 'content',
        },
      ],
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

      // validation: (Rule) =>
      //   Rule.custom((value, context) => {
      //     const {parent} = context as any
      //     // Alt text only required if an image is set in the parent
      //     if (!parent?.image) {
      //       return true
      //     }

      //     return value ? true : 'Alternative text is helpful for accessibility and SEO'
      //   }),

export async function projectFields() {
return await client.fetch(
groq`\*[_type == "project"]{
\_id,
\_type,
title,
subtitle,
'slug':slug.current,
"date": \_updatedAt,
'thumbnail':{
'image':{'url':image.image.asset->url,
'alt':image.altText,
'dimensions':image.image.asset ->metadata.dimensions},  
 'videoUrl': video.video.asset->url,
},  
 overview,
'contentBlocks':contentBlocks[]{
...,
\_type == 'imageWithAlt' => {
'imageUrl': image.asset->url,
'altText': altText
},
\_type == 'video' => {
'videoUrl': video.asset->url,
'caption': caption

    }}
    	}`

);
}

//gallery old query

```
_type == 'gallery' => {
    'type': _type,
    items[]{
      _type,
      "url": asset->url,
      "dimensions":asset->metadata.dimensions,
      "altText":asset->altText,
      caption
    },
    'display':display
  },
```

````js
function testCreateMediaClassObject(data) {
const {orientation, displaySize} = data;
const classMap = {
'landscape*large': 'cell large-span-14 large-start-2',
'landscape_normal': 'cell large-span-8 large-start-1',
'portrait_large': 'cell large-span-8 large-start-5',
'portrait_normal': 'cell large-span-6 large-start-5',
};
// Construct the key from the input data
const key = `${orientation}*${displaySize}`;
return classMap[key];
}```
````

```svelte
<script>
	export let imageURL;
	export let config = {};

	$: url = new URL(imageURL);
</script>

<Image
	config={`${url.origin}${url.pathname}?${new URLSearchParams(config).toString()}`}
	imageURL="https://example.com/image.jpg"
/>
<script>
```

<!-- GlossaryLink Nested Query -->

`  _type == 'richText' => {
    'type': _type,
    'text': text[]{
      ...,
      markDefs[]{
        ...,
        _type == "glossaryLink" => {
          "slug": reference->slug.current,
          "definition": {
            "text": reference->definition.text[]{
              ...,
              markDefs[]{
                ...,
                _type == "glossaryLink" => {
                  "slug": reference->slug.current,
                  "definition": reference->definition
                }
              }
            }}
        }
      }
    },
  },`

//class object
class MyObject {
#value = 42;

constructor() {
this.value = 42;
}

add(value) {
this.#value += value;
}
}

class MyObject {
private \_value = 42;
public anotherValue = 42;

public add(value) {
this.value += value;
}
}

const obj = new MyObject();
obj.\_value = 42; // Error
obj.anotherValue = 42; // OK

//glossary navigation
style:transform="translateY(-{(navContentHeight - navHeight) \* scrollProgress}px)"

// (window.pageYOffset || document.documentElement.scrollTop) / glossaryContainer.offsetHeight -
// window.innerHeight
