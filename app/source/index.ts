import ExtensionTest from './classes/ExtensionTest';

function main() {
    Neutralino.init();

    (window as unknown as { extTest: ExtensionTest }).extTest = new ExtensionTest();
}

main();
