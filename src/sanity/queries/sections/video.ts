import { groq } from 'next-sanity'

export type VideoSectionQueryResult = {
  source: 'internal' | 'external' | null
  desktop_video: {
    url: string | null
  }
  desktop_video_external_url: string | null
  desktop_cover: {
    url: string | null
  }
  mobile_video: {
    url: string | null
  }
  mobile_video_external_url: string | null
  mobile_cover: {
    url: string | null
  }
}

export const VideoSection = groq`
  _type == "video-section" => {
    source,
    desktop_video {
      "url": asset->url
    },
    desktop_video_external_url,
    desktop_cover {
      "url": asset->url
    },
    mobile_video {
      "url": asset->url
    },
    mobile_video_external_url,
    mobile_cover {
      "url": asset->url
    }
  }
`
