import ytsr, { Video } from 'ytsr';
import { SearchResponse } from '../../../shared/YouTube';
import BasicSocket from '../helpers/BasicSocket';

function YouTubeSearcher(socket: BasicSocket) {
    socket.on('youtubeSearchQuery', async ({ queryString, limit }) => {
        try {
            const allResults = await ytsr(queryString, { limit });

            const outputResults: SearchResponse = [];

            for (let i = 0, len = allResults.items.length; i < len; i++) {
                if (allResults.items[i].type === 'video') {
                    const video = allResults.items[i] as Video;
                    if (video.isLive === false && video.isUpcoming === false) {
                        outputResults.push({
                            title: video.title,
                            id: video.id,
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
                }
            }

            socket.send('youtubeSearchResult', outputResults);
        } catch (error) {
            socket.handleError(error instanceof Error ? error : new Error(`Error getting results for ${queryString}`));
        }
    });
}

export default YouTubeSearcher;
