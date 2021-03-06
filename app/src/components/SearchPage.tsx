import {
    IconButton,
    InputAdornment,
    LinearProgress,
    ListItemButton,
    Stack,
    TextField,
    Box,
    Container,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useEffect, useState } from 'react';
import getSearchSuggestions from '../helpers/getSearchSuggestions';
import { CustomEvents } from '../../../shared/messages';
import SearchResult from './SearchResult';
import { MAIN_EXTENSION } from '../typings/Main';
import { SearchResponse } from '../../../shared/YouTube';
import SpotifyHelper from '../classes/SpotifyHelper';

enum SearchState {
    /** The user is actively editing their input, suggestions are being made dynamically. */
    Suggesting,
    /** The user has pressed submit and we are waiting for results. */
    Loading,
    /** Results are being displayed. */
    Results,
}

const SearchPage = () => {
    const [currentState, setCurrentState] = useState<SearchState>(SearchState.Suggesting);

    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
    const [results, setResults] = useState<SearchResponse>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /** Handles updates to the search term. */
    const handleChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentState(SearchState.Suggesting);
        setCurrentSearchTerm(value);
        if (value) {
            getSearchSuggestions(value).then(setSuggestions);
        } else {
            setSuggestions([]);
        }
    }, []);

    const handleSubmit = useCallback(
        (e?: React.FormEvent<HTMLFormElement>) => {
            e?.preventDefault();
            if (!currentSearchTerm) return;
            setCurrentState(SearchState.Loading);
            Neutralino.extensions.dispatch(MAIN_EXTENSION, 'youtubeSearchQuery', {
                queryString: currentSearchTerm,
                limit: 10,
            });
        },
        [currentSearchTerm],
    );

    const handleSuggestionSelect = useCallback(
        (suggestion: string) => {
            return () => {
                setCurrentSearchTerm(suggestion);
                handleSubmit();
            };
        },
        [handleSubmit],
    );

    /** Result handling. */
    useEffect(() => {
        const handleRes: CustomEvents['youtubeSearchResult']['appHandler'] = ({ detail }) => {
            if (currentState === SearchState.Suggesting) return;
            setCurrentState(SearchState.Results);
            setResults(detail[0]);
        };

        Neutralino.events.on('youtubeSearchResult', handleRes);

        return () => {
            Neutralino.events.off('youtubeSearchResult', handleRes);
        };
    }, [currentState]);

    return (
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                spellCheck={false}
                sx={{ pt: 5, width: '80%' }}
                onSubmit={handleSubmit}
            >
                <Button onClick={() => SpotifyHelper.login()}>login to spotify</Button>
                <TextField
                    id="searchInput"
                    variant="outlined"
                    label="Search YouTube"
                    fullWidth
                    value={currentSearchTerm}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleSubmit()} edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {currentState === SearchState.Suggesting ? (
                    <Stack>
                        {suggestions.map((e, i) => (
                            <ListItemButton dense key={i} divider onClick={handleSuggestionSelect(e)}>
                                {e}
                            </ListItemButton>
                        ))}
                    </Stack>
                ) : currentState === SearchState.Loading ? (
                    <LinearProgress />
                ) : (
                    <Stack spacing={1} sx={{ mt: 1 }}>
                        {results.map((e, i) => (
                            <SearchResult result={e} key={i} />
                        ))}
                    </Stack>
                )}
            </Box>
        </Container>
    );
};

export default SearchPage;
