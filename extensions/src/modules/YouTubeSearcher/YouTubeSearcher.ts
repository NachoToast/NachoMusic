import axios from 'axios';
import ytsr from 'ytsr';
import { SearchResponse } from '../../../../shared/YouTube';
import BasicSocket from '../../base/BasicSocket';

export default function YouTubeSearcher(socket: BasicSocket): void {
    socket.events.on('youtubeSearchQuery', async ({ final, queryString, limit }) => {
        if (!final) {
            // only want autocomplete suggestions
            const { data } = await axios.get('https://suggestqueries-clients6.youtube.com/complete/search', {
                headers: {
                    'Accept-Encoding': 'application/json',
                },
                params: {
                    client: 'firefox',
                    q: queryString,
                    ds: 'yt',
                    hl: 'en',
                },
            });

            socket.send('youtubeSearchAutocompleteSuggestions', data[1]);
            return;
        }

        // want full video results
        try {
            const allResults = await ytsr(queryString, { limit });

            const outputResults: SearchResponse = [];

            for (const video of allResults.items) {
                if (video.type !== 'video') continue;
                if (video.isLive || video.isUpcoming) continue;

                outputResults.push({
                    id: video.id,
                    title: video.title,
                    url: video.url,
                    bestThumbnail: video.bestThumbnail,
                    badges: video.badges,
                    author: video.author,
                    description: video.description,
                    views: video.views,
                    duration: video.duration,
                    uploadedAt: video.uploadedAt,
                });
            }

            socket.send('youtubeSearchResult', outputResults);
        } catch (error) {
            if (error instanceof Error) socket.handleError(error);
            else socket.handleError(new Error(`Error getting results for ${queryString}`));
        }
    });
}
