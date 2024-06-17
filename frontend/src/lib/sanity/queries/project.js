import groq from 'groq';
import { asset, seo } from './components.js';
import { contentBlocks } from './contentBlocks.js';

//Query for project fields
export const projectFields = groq`
  _id,
  _type,
  _updatedAt,
  "slug": slug.current,
  title,
  subtitle,
  "image": image.${asset},
  "focalPoint": image.hotspot,
  "video": video.${asset},
   date
`;

export const projectQueryBySlug = groq`
*[_type == "project" && slug.current == $slug]{
  ${projectFields},
  "contentBlocks": ${contentBlocks},
  ${seo}
}[0]
`;

// Pagination
const limit = 10; // Number of items per page
const page = 1; // Current page number (1-indexed)
const offset = (page - 1) * limit; // Offset for current page

// Query for fetching projects with pagination
export const projectQuery = groq`
*[_type == "project" && date < now()]| order(date desc)[${offset}...${offset + limit}] {
  ${projectFields}
}
`;
