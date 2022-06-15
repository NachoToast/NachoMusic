import FileServer from './FileServer';

describe('FileServer', () => {
    it("Identifies '.mp4' extension", () => {
        const mp4A = 'Users/Nacho/Music/NachoMusic/Alan Walker - Faded.mp4';
        const mp4B = encodeURIComponent(mp4A);

        const mp4C = 'home/Nacho/NachoMusic/Alan Walker - Faded.mp4';

        expect(FileServer.getContentType(mp4A)).toBe('video/mp4');
        expect(FileServer.getContentType(mp4B)).toBe('video/mp4');
        expect(FileServer.getContentType(mp4C)).toBe('video/mp4');

        const notMp4A = 'Users/Nacho/Music/NachoMusic/Alan Walker - Faded.mp3';
        const notMp4B = encodeURIComponent(notMp4A);

        const notMp4C = 'home/Nacho/NachoMusic/Alan Walker - Faded.wav';

        expect(FileServer.getContentType(notMp4A)).not.toBe('video/mp4');
        expect(FileServer.getContentType(notMp4B)).not.toBe('video/mp4');
        expect(FileServer.getContentType(notMp4C)).not.toBe('video/mp4');
    });
});
