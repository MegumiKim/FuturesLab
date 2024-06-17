import groq from 'groq';
import { contentBlocks } from './contentBlocks';
import { seo } from './components';

//Query for project fields
export const pageFields = groq`
  _id,
  _type,
  title,
  "slug": slug.current
`;

export const pageQueryBySlug = groq`
*[_type == "page" && slug.current == $slug]{
  ${pageFields},
  contentTitle,
  ${seo},
  "contentBlocks": ${contentBlocks}
}[0]
`;

// Query for fetching projects with pagination
export const pageQuery = groq`
*[_type == "page"] {
  ${pageFields}
}
`;
