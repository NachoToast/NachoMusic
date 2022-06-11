import axios from 'axios';

async function getSearchSuggestions(searchTerm: string): Promise<string[]> {
    const { data } = await axios.get('https://suggestqueries-clients6.youtube.com/complete/search', {
        params: {
            client: 'firefox',
            q: searchTerm,
            ds: 'yt',
            hl: 'en',
        },
    });

    return data[1];
}

export default getSearchSuggestions;
