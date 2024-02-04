import { v4 as uuid } from 'uuid';

export interface Poster {
  title?: string,
  thumb?: string,
  url?: string,
  uuid?: string,
}

export function blankPoster() {
  return {
    title: '',
    thumb: '',
    url: '',
    uuid: uuid()
  }
}

export function getPoster(poster?: Poster) {
  return {
    ...blankPoster(),
    ...poster,
  }
}

interface LoadPosterConfig {
  title: string,
  match: RegExp,
  execute: () => Poster[] | Promise<Poster[]>
}

async function executeOnActiveTab<A extends any[]>(callback: (...args: A) => any | Promise<any>, args?: A) {
  const tabs = await chrome?.tabs?.query({ active: true, currentWindow: true });
  const tab = tabs?.[0];
  const tabId = tab?.id;
  if (!tabId) {
    console.warn('Cannot find active tab')
    return;
  }
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: callback,
    args
  });
  return results[0].result
}

async function loadPosterFromImagePage(): Promise<Poster[]> {
  return await executeOnActiveTab(() => {
    const img = document.querySelector('body > img')
    if (img) {
      const src = img.getAttribute('src');
      return [
        {
          url: src,
          thumb: src,
        }
      ]
    }
  }) as Poster[]
}

export default async function loadPostersFromPage() {
  const result = await executeOnActiveTab(async () => {
    const pageConfigs: LoadPosterConfig[] = [
      {
        title: 'The Poster DB Set',
        match: /theposterdb.com\/[set|poster]/,
        execute() {
          function parsePosterDbTitle(title?: string) {
            if (title === undefined) {
              return title
            }
            const RE = /(.*)\s\([\d]+\).[a-z]+/
            const matches = RE.exec(title)
            return matches ? matches[1] : title
          }

          const posters = document.querySelectorAll('.masthead-individual-poster,[data-poster-id]')
          return Array.from(posters).reduce((acc, container) => {
            const download = container.querySelector('a[download]')
            if (!download) {
              return acc
            }
            const url = download.getAttribute('href') ?? undefined
            const title = parsePosterDbTitle(download.getAttribute('download') ?? undefined)
            const thumb = container.parentNode?.querySelector('picture > source')?.getAttribute('srcset') ?? undefined

            if (!url) {
              return acc;
            }
            return acc.concat([{ title, thumb, url }])
          }, [] as Poster[])
        }
      },
      {
        title: 'IMDB List',
        match: /imdb.com\/list\//,
        execute() {
          const posters = document.querySelectorAll('img[data-tconst]')
          return Array.from(posters).reduce((acc, poster) => {
            const url = poster.getAttribute('src') ?? undefined
            const title = poster.getAttribute('alt') ?? undefined
            const thumb = url
            return acc.concat([{ title, thumb, url }])
          }, [] as Poster[])
        }
      },

      {
        title: 'IMDB Page',
        match: /imdb.com\/title\//,
        execute() {
          const posterElement = document.querySelector('.ipc-image')
          const titleElement = document.querySelector('[data-testid="hero__primary-text"]')
          if (!posterElement) {
            return []
          }
          const title = titleElement?.innerHTML ?? undefined
          const url = posterElement.getAttribute('src')
          return [{
            title,
            url,
            thumb: url
          }] as Poster[]
        }
      },

      {
        title: 'Fanart.TV',
        match: /fanart.tv\/movie\//,
        execute() {
          const posters = document.querySelectorAll('[rel="movieposter"]')
          const titleElement = document.querySelector('title')
          const title = titleElement?.innerText.split(' | ')[0]

          return Array.from(posters).map((poster) => {
            const url = poster.getAttribute('href') ?? undefined;
            return {
              title,
              url,
              thumb: url,
            }
          })
        },
      },

      {
        title: 'TMDB',
        match: /themoviedb.org/,
        execute() {
          const posterImgs = document.querySelectorAll('img.poster[src*="/t/p/"]')
          const RE = /(\/t\/p\/)([^/]+)\//
          const { host, protocol } = document.location;
          const fullHost = `${protocol}//${host}`

          return Array.from(posterImgs).map((posterImg) => {
            const originalUrl = posterImg.getAttribute('src') ?? '';
            const url = new URL(originalUrl.replace(RE, '$1original/'), fullHost).toString()
            const title = posterImg.getAttribute('alt') ?? undefined
            return {
              title,
              url,
              thumb: url,
            }
          })
        },
      },

      {
        title: 'Reddit New',
        match: /www.reddit.com/,
        execute() {

          const posts = document.querySelectorAll('shreddit-post')
          const results: Poster[] = [];

          Array.from(posts).forEach((post) => {
            const title = post.getAttribute('post-title') ?? undefined
            const carouselImages = post.querySelectorAll('gallery-carousel li img')
            if (carouselImages) {
              Array.from(carouselImages).forEach((img) => {
                const url = img.getAttribute('src') ?? img.getAttribute('data-lazy-src') ?? undefined
                results.push({
                  title,
                  url,
                  thumb: url,
                })

              })
            }
          })

          return results;
        }
      },

      {
        title: 'Mediux',
        match: /mediux.pro\/sets/,
        execute() {
          const results: Poster[] = [];
          const posters = document.querySelectorAll('img[alt="Show Poster"]')

          const { host, protocol } = document.location;
          const fullHost = `${protocol}//${host}`
          Array.from(posters).forEach((img) => {
            const url = new URL(img.getAttribute('src') ?? '', fullHost).toString()
            results.push({ url })
          })
          return results;
        }
      }
    ];

    const config = pageConfigs.find((config) => window.location.href.match(config.match))
    if (config) {
      return await config.execute()
    }

    return
  }) as Poster[]

  if (result?.length) {
    return result;
  }

  return await loadPosterFromImagePage()
}