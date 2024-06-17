import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Rename field from href to externalLink',
  documentTypes: ['project', 'page', 'glossary'],
  migrate: {
    object(node, path, context) {
      if(node._type === 'link') {
        return [
          at('externalLink', setIfMissing(node['href'])),
          at('href', unset())
        ]
      }
    },
  }
})
