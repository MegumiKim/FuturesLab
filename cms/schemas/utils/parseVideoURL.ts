// https://gist.github.com/prashantsani/bde3a86eb9c2dfa171855dfb2de99730

export default function parseVideo(url: string) {
  const regex =
    /(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  const match = url.match(regex)

  if (!match) {
    return null
  }

  const domain = match[3]
  const videoId = match[6]

  let type: string | undefined

  if (domain.includes('youtu')) {
    type = 'youtube'
  } else if (domain.includes('vimeo')) {
    type = 'vimeo'
  }

  return JSON.stringify({type, id: videoId})
}
