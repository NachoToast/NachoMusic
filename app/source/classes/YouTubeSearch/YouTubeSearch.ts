export class YouTubeSearch {
    public constructor() {
        this.main();
    }

    private async main() {
        const nodeVersion = (await Neutralino.os.execCommand('node -v')).stdOut.replace(/\r|\n/g, '');
        console.log(nodeVersion);
    }
}

export default YouTubeSearch;
