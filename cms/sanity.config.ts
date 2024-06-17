import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {singletonPlugin, singletonStructure} from './plugins/singleton.ts'

//
// Schemas
//
import docProject from './schemas/documents/project.ts'
import docPage from './schemas/documents/page.ts'
import objVideo from './schemas/objects/video.ts'
import objLink from './schemas/objects/link.ts'
import objGallery from './schemas/objects/gallery.ts'
import objCta from './schemas/objects/cta.ts'
import objImage from './schemas/objects/image.ts'
import objQuote from './schemas/objects/quote.ts'
import objRichText from './schemas/objects/richText.tsx'
import objMedia from './schemas/objects/media.ts'
import objStatistics from './schemas/objects/statistics.ts'
import objCode from './schemas/objects/code.ts'
import objGlossaryLink from './schemas/objects/glossaryLink.ts'
import docGlossaries from './schemas/documents/glossary.ts'
import objRichTextSimple from './schemas/objects/richTextSimple.ts'
import docSettingsSite from './schemas/settings/site-settings.ts'
import objNavigationItem from './schemas/objects/navigationItem.ts'
import objLargeText from './schemas/objects/largeText.ts'
import objNumberedParagrahs from './schemas/objects/numberedParagrahs.ts'
import objSeo from './schemas/objects/seo.ts'
import objVideoEmbed from './schemas/objects/videoEmbed.ts'

export default defineConfig({
  name: 'default',
  title: 'website',

  projectId: 'r9xfdek3',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: singletonStructure(docSettingsSite),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin({type: docSettingsSite.name}),
    visionTool(),
    media(),
  ],

  schema: {
    types: [
      //
      // Objects
      //
      objImage,
      objVideo,
      objLink,
      objGallery,
      objCta,
      objQuote,
      objRichText,
      objRichTextSimple,
      objMedia,
      objStatistics,
      objCode,
      objGlossaryLink,
      objNavigationItem,
      objLargeText,
      objNumberedParagrahs,
      objSeo,
      objVideoEmbed,
      //
      // Documents
      //
      docProject,
      docPage,
      docGlossaries,
      //
      // Settings
      //
      docSettingsSite,
    ],
  },
})
