export namespace PlexPayload {
  export interface MediaContainer {
    MediaContainer: {
      Directory: Directory[];
      title: string;
      size: number;
      allowSync: boolean;
    };
  }

  export interface SearchResultContainer {
    MediaContainer: {
      SearchResult: SearchResult[];
      size: number;
    };
  }

  export interface SearchResult {
    Metadata?: Metadata;
    Directory?: DirectoryTag;
    score: number;
  }

  export interface DirectoryTag {
    count: number,
    filter: string,
    key: string,
    librarySectionID: number;
    librarySectionKey: string,
    librarySectionTitle: string,
    librarySectionType: number,
    tag: string,
    tagType: number,
    type: 'tag',
  }

  interface BaseMetadata {
    addedAt: number;
    updatedAt: number,
    lastViewedAt?: number,
    childCount: number;
    guid: string;
    index: number;
    key: string;
    librarySectionTitle: string;
    ratingKey: string;
    title: string;
    type: string;
    thumb: string;
    selected?: boolean
  }

  export interface MovieMetadata extends BaseMetadata {
    type: "movie";
    year: number;
    art: string;
    audienceRating: number;
    audienceRatingImage: string;
    contentRating: string;
    duration: number;
    originallyAvailableAt: string;
    primaryExtraKey: string;
    rating: number;
    ratingImage: string;
    studio: string;
    tagline: string;
  }

  export interface MusicArtistMetadata extends BaseMetadata {
    type: "artist";
  }

  export interface AlbumMetadata extends BaseMetadata {
    type: 'album'
    art: string
    loudnessAnalysisVersion: string,
    musicAnalysisVersion: string,
    originallyAvailableAt: string,
    parentGuid: string
    parentKey: string,
    parentRatingKey: string,
    parentThumb: string,
    parentTitle: string,
    rating: number,
    studio: string,
    updatedAt: number,
    year: number,
  }

  export interface TrackMetadata extends BaseMetadata {
    type: 'track'
    duration: number
    grandparentGuid: string
    grandparentKey: string
    grandparentRatingKey: string,
    grandparentThumb: string,
    grandparentTitle: string,
    musicAnalysisVersion: string,
    parentGuid: string,
    parentIndex: number,
    parentKey: string,
    parentRatingKey: string,
    parentStudio: string,
    parentThumb: string,
    parentTitle: string,
    parentYear: number,
    ratingCount: number,
  }

  export type Metadata = MovieMetadata | MusicArtistMetadata | AlbumMetadata | TrackMetadata;

  export interface Directory {
    title: string;
    type: "movie" | "show";
    updatedAt: number;
    uuid: string;
    key: string;
  }
}