class ExtensionTest {
    private _extId = 'js.neutralino.sample.my_nodejs_extension';
    private _input = document.getElementById('input')! as HTMLInputElement;

    public constructor() {
        console.log('Initializing extension test');

        Neutralino.events.on('extensionReady', ({ detail }) => {
            console.log(`Extension ready: ${detail}`);
        });

        Neutralino.events.on('extClientConnect', ({ detail }) => {
            console.log(`Extension connected: ${detail}`);
        });

        Neutralino.events.on('spawnedProcess', (proc) => {
            console.log(proc.detail.action, proc.detail.data, proc.detail.id);
        });

        Neutralino.events.on('testEvent', (payload) => {
            console.log(`Response: ${payload.detail}`);
        });
    }

    public async call() {
        console.log('call');
        this._input.disabled = true;
        this._input.value ||= Math.random().toString(36).substring(2);
        console.log(`Calling extension with input: ${this._input.value}`);

        await Neutralino.extensions.dispatch(this._extId, 'testEvent', this._input.value);

        this._input.value = '';
        this._input.disabled = false;
    }
}

export default ExtensionTest;
