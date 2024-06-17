import { set, unset } from 'sanity'
import { useEffect } from 'react';

export function EmbedInput({...props}) {

  useEffect(() => {
    const url = props.value.url || '';
    props.onChange([
      unset(['id']),
      unset(['provider'])
    ]);

    if(!url) {
      return;
    }

    const data = parseVideoUrl(url);

    if(!data) {
      return;
    }

    props.onChange([
      set(data.id, ['id']),
      set(data.provider, ['provider'])
    ]);
  }, [props.value.url]);

  return (
    <div>{props.renderDefault(props)}</div>
  )
}

// https://gist.github.com/prashantsani/bde3a86eb9c2dfa171855dfb2de99730
export function parseVideoUrl(url: string) {
  const regex =
    /(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  const match = url.match(regex);

  if (!match) {
    return null;
  }

  const domain = match[3]
  const id = match[6]

  let provider: string | undefined

  if (domain.includes('youtu')) {
    provider = 'youtube'
  } else if (domain.includes('vimeo')) {
    provider = 'vimeo'
  }

  return {provider, id};
}
