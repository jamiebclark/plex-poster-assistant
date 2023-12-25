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