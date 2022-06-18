import FileServer from './FileServer';

describe('FileServer', () => {
    it('Identifies correct Content-Type per extension', () => {
        const mp4_1 = 'Users/Nacho/Music/NachoMusic/Alan Walker - Faded.mp4';
        const mp4_2 = encodeURIComponent(mp4_1);

        expect(FileServer.getContentType(mp4_1)).toBe('video/mp4');
        expect(FileServer.getContentType(mp4_2)).toBe('video/mp4');

        const mp3_1 = 'Users/Nacho/Music/NachoMusic/Alan Walker - Faded.mp3';
        const mp3_2 = encodeURIComponent(mp3_1);

        expect(FileServer.getContentType(mp3_1)).toBe('audio/mpeg');
        expect(FileServer.getContentType(mp3_2)).toBe('audio/mpeg');
    });
});
