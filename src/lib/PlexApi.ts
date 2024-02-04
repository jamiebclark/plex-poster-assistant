import axios from "axios";
import { PlexPayload } from "../../@types/plex-payload";

type MetadataPayload = {
  MediaContainer: {
    Metadata: PlexPayload.Metadata[]
  }
}

function trimTrailingSlash(input: string) {
  return input.replace(/\/$/, '')
}

export default class PlexApi {
  public token: string;
  public baseUrl: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = trimTrailingSlash(baseUrl);
    this.token = token;
  }

  protected api() {
    return axios.create({
      baseURL: this.baseUrl,
      params: {
        "X-Plex-Token": this.token,
      },
    });
  }

  public async getLibraries() {
    const results = await this.api().get<PlexPayload.MediaContainer>(
      `/library/sections`
    );
    return results.data.MediaContainer.Directory.filter((library) =>
      ["movie", "show"].includes(library.type)
    );
  }

  public async getQuery(query: string) {
    const results = await Promise.all([
      this.getLibraryItemsQuery(query),
      this.getCollectionsQuery(query)
    ])
    return results.reduce((acc, result) => acc.concat(result), [])
  }
  public async getLibraryItemsQuery(query: string) {
    const results = await this.api().get<PlexPayload.SearchResultContainer>(
      `/library/search`,
      {
        params: { query },
      }
    );

    const output: PlexPayload.Metadata[] = []

    const searchResults = results?.data?.MediaContainer?.SearchResult
    for (let result of searchResults) {
      if (result.Metadata) {
        output.push(result.Metadata)
        if (result.Metadata.childCount) {
          const children = await this.getLibraryChildItems(result.Metadata.key)
          children.forEach((child) => {
            output.push(child)
          })
        }
      }
    }
    return output;
  }

  public async getLibraryChildItems(parentKey: string): Promise<PlexPayload.Metadata[]> {
    const results = await this.api().get<PlexPayload.LibraryItemChildrenContainer>(parentKey);
    const metadata = results?.data?.MediaContainer?.Metadata as PlexPayload.Metadata[]
    return metadata.map((child) => {
      if (child.parentTitle) {
        return {
          ...child,
          title: `${child.parentTitle}: ${child.title}`
        }
      }
      return child
    })
  }

  /**
   * Queries all libraries for collections
   * @param query The query text
   * @returns An array of metadata
   */
  public async getCollectionsQuery(query: string) {
    const libraries = await this.getLibraries()
    const results = await Promise.all(libraries.map(async ({ key }) => this.getLibraryCollectionsQuery(key, query)))
    return results.reduce((acc, result) => acc.concat(result), [])
  }

  /**
   * Queries a specific library for collections
   * @param collectionId The Collection ID
   * @param query The query text
   * @returns An array of metadata
   */
  public async getLibraryCollectionsQuery(libraryId: string, query: string) {
    const results = await this.api().get<MetadataPayload>(`/library/sections/${libraryId}/all`, {
      params: {
        title: query,
        type: 18
      }
    })
    return results?.data?.MediaContainer?.Metadata ?? []
  }

  public getThumbSrc(metadata: PlexPayload.Metadata) {
    return this.baseUrl + metadata?.thumb + "?X-Plex-Token=" + this.token
  }

  public async setPoster(itemKey: string, posterUrl: string) {
    const endpoint = `/library/metadata/${itemKey}/posters`;
    await this.api().post(endpoint, {}, {
      params: {
        url: posterUrl
      }
    })
    const updated = await this.api().get<MetadataPayload>(endpoint)
    return updated?.data?.MediaContainer?.Metadata?.find(({ selected }) => selected === true)
  }

  public async getMetadata(itemKey: string) {
    const result = await this.api().get<MetadataPayload>(`/library/metadata/${itemKey}`)
    return result?.data?.MediaContainer?.Metadata?.[0];
  }


}
