import ExtensionTest from './classes/ExtensionTest';

function main() {
    Neutralino.init();

    console.log('hello world');

    (window as unknown as { extTest: ExtensionTest }).extTest = new ExtensionTest();
}

main();
