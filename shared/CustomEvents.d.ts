import { DownloadRequest, DownloadResponse, SearchRequest, SearchResponse } from './YouTube';

/** Custom events for communicating between app and extensions. */
export interface CustomEvents {
    // general
    extensionError: { id: string; message: string; stack: string; name: string };
    extensionLog: { id: string; message: unknown };

    // youtube search
    youtubeSearchQuery: SearchRequest;
    youtubeSearchResult: SearchResponse;

    // file server
    fileServerInfo: number;

    // youtube download
    youtubeDownloadStart: DownloadRequest;
    youtubeDownloadDone: DownloadResponse;
    youtubeDownloadProgress: { done: number; total: number; chunk: number; url: string };
}
