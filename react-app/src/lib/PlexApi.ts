import axios from "axios";
import { PlexPayload } from "../../@types/plex-payload";

type MetadataPayload = {
  MediaContainer: {
    Metadata: PlexPayload.Metadata[]
  }
}
export default class PlexApi {
  public token: string;
  public baseUrl: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
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
    const results = await this.api().get<PlexPayload.SearchResultContainer>(
      `/library/search`,
      {
        params: { query },
      }
    );
    return results?.data?.MediaContainer?.SearchResult?.reduce((acc, result) => {
      return result.Metadata ? acc.concat([result.Metadata]) : acc
    }, [] as PlexPayload.Metadata[]);
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
