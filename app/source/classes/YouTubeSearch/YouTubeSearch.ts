export class YouTubeSearch {
    public constructor() {
        this.main();
    }

    private async main() {
        const nodeVersion = (
            await Neutralino.os.execCommand(`node ${NL_PATH}/extensions/build/testExtension.js`)
        ).stdOut.replace(/\r|\n/g, '');
        // const nodeVersion = (await Neutralino.os.execCommand('node -v')).stdOut.replace(/\r|\n/g, '');
        console.log(nodeVersion);
    }

    private main2() {
        // This request will be queued and processed when the extension connects.
        Neutralino.extensions
            .dispatch('js.neutralino.sampleextension', 'eventToExtension', 'Hello extension!' as unknown as object)
            .catch(() => {
                console.log("Extension isn't loaded!");
            });

        Neutralino.events.on('windowClose', () => {
            Neutralino.app.exit();
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Neutralino.events.on('eventFromExtension', (evt) => {
            console.log(`INFO: Test extension said: ${evt.detail}`);
        });
    }
}

export default YouTubeSearch;
