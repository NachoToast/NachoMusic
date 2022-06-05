import ExtensionLogger, { WatchEventLevels } from './classes/ExtensionHelper';

function main() {
    Neutralino.init();

    ExtensionLogger.add(
        'js.neutralino.sample.my_nodejs_extension',
        [WatchEventLevels.Errors, WatchEventLevels.Logs],
        'sampleExt',
    );

    ExtensionLogger.addEvent('js.neutralino.sample.my_nodejs_extension', 'testEvent', ({ detail }) =>
        console.log(detail[0]),
    );

    (window as unknown as { extTest: () => void }).extTest = () => {
        const value = Math.random().toString(36).substring(2);
        console.log(`Calling extension with input: ${value}`);

        Neutralino.extensions.dispatch('js.neutralino.sample.my_nodejs_extension', 'testEvent', value);
    };
}

main();
