class SpotifyHelper {
    private readonly _clientID: string = 'e19495e28ae44420a420c4a24b0c2a57';
    private readonly _redirectURI: string = `http://localhost:5000/spotify/auth`;
    // private _spotify: AxiosInstance = axios.create({ baseURL: '' });

    public async login() {
        const state = 'fakeState';
        const scope = 'user-read-private user-read-email';

        const queryString = new URLSearchParams();
        queryString.set('response_type', 'code');
        queryString.set('client_id', this._clientID);
        queryString.set('scope', scope);
        queryString.set('redirect_uri', this._redirectURI);
        queryString.set('state', state);

        Neutralino.os.open('https://accounts.spotify.com/authorize?' + queryString.toString());
    }
}

export default new SpotifyHelper();
