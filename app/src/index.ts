import ContentManager from './classes/ContentManager';
import ExtensionLogger, { WatchEventLevels } from './classes/ExtensionHelper';
import SettingsHelper from './classes/SettingsHelper';

async function main() {
    Neutralino.init();

    ExtensionLogger.add(
        'js.neutralino.sample.my_nodejs_extension',
        [WatchEventLevels.Errors, WatchEventLevels.Logs],
        'sampleExt',
    );

    await ContentManager.getInstance();
    const s = await SettingsHelper.getInstance();
    console.log(s.defaultSettings);

    ExtensionLogger.addEvent('sampleExt', 'testEvent', ({ detail }) => console.log(detail[0]));

    (window as unknown as { extTest: () => void }).extTest = () => {
        const value = Math.random().toString(36).substring(2);
        console.log(`Calling extension with input: ${value}`);

        Neutralino.extensions.dispatch('js.neutralino.sample.my_nodejs_extension', 'testEvent', value);
    };

    // contentManager.addSong('C:\\Users\\fuzzy\\Music\\NachoMusic\\Alan Walker - Faded.mp4');
    // const v = document.createElement('video');
    // v.controls = true;
    // const s = document.createElement('source');
    // s.type = 'video/mp4';
    // s.src = 'data/Alan Walker - Faded.mp4';
    // v.muted = true;
    // v.appendChild(s);
    // v.oncanplaythrough = () => {
    //     console.log('playing');
    //     v.play();
    //     v.muted = false;
    // };
    // document.body.appendChild(v);
    // v.autoplay = true;
    // v.onload = () => {
    // v.autoplay = true;
    // v.play();
    // };
}

main();
