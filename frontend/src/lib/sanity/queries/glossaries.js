import groq from 'groq';

export const glossariesQuery = groq`*[_type == "glossary"]| order(term asc) {
  term,
  "slug": slug.current,
  "definition": {
    "text": definition.text[]{
      ...,
      markDefs[]{
        ...,
        _type == "glossaryLink" => {
          "slug": @.reference->slug,
          "_type": "link",
          "internalLink": "glossary/#" + @.reference->slug.current
        }
      }
    }}
  }`;

// {term, "slug": slug.current, definition}';
