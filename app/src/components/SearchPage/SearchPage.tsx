import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    LinearProgress,
    ListItemButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { SearchResponse } from '../../../../shared/YouTube';

import SearchIcon from '@mui/icons-material/Search';
import { constants } from '../../constants';
import SearchResult from './SearchResult';

enum SearchState {
    /** The user is actively editing their input, suggestions are being made dynamically. */
    Suggesting,
    /** The user has pressed submit and we are waiting for results. */
    Loading,
    /** Results are being displayed. */
    Results,
}

const SearchPage = () => {
    const [currentSearchState, setCurrentSearchState] = useState(SearchState.Suggesting);

    const [currentSearchTerm, setCurrentSearchTerm] = useState('');

    const [results, setResults] = useState<SearchResponse>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /** When text input changes we should reload suggestions. */
    useEffect(() => {
        if (!currentSearchTerm) {
            setSuggestions([]);
            return;
        }

        const onResultsBack = (e: CustomEvent<CustomEvents['youtubeSearchAutocompleteSuggestions']>) => {
            setSuggestions(e.detail);
            Neutralino.events.off('youtubeSearchAutocompleteSuggestions', onResultsBack);
        };

        setCurrentSearchState(SearchState.Suggesting);

        Neutralino.events.on('youtubeSearchAutocompleteSuggestions', onResultsBack);

        Neutralino.extensions.dispatch(constants.mainExtensionId, 'youtubeSearchQuery', {
            final: false,
            limit: -1,
            queryString: currentSearchTerm,
        });

        return () => {
            Neutralino.events.off('youtubeSearchAutocompleteSuggestions', onResultsBack);
        };
    }, [currentSearchTerm]);

    const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCurrentSearchTerm(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        (e?: React.FormEvent<HTMLFormElement>) => {
            e?.preventDefault();
            if (!currentSearchTerm) return;
            setCurrentSearchState(SearchState.Loading);

            const handleResults = (e: CustomEvent<CustomEvents['youtubeSearchResult']>) => {
                setCurrentSearchState(SearchState.Results);
                setResults(e.detail);
                console.log(e.detail);
                Neutralino.events.off('youtubeSearchResult', handleResults);
            };

            Neutralino.events.on('youtubeSearchResult', handleResults);

            Neutralino.extensions.dispatch(constants.mainExtensionId, 'youtubeSearchQuery', {
                final: true,
                queryString: currentSearchTerm,
                limit: 10,
            });

            return () => {
                Neutralino.events.off('youtubeSearchResult', handleResults);
            };
        },
        [currentSearchTerm],
    );

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Search Songs
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                spellCheck={false}
                sx={{ width: '95%', flexGrow: 1, display: 'flex', flexFlow: 'column nowrap', overflow: 'hidden' }}
                onSubmit={handleSubmit}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    value={currentSearchTerm}
                    onChange={handleSearchInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={() => handleSubmit()}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {currentSearchState === SearchState.Suggesting ? (
                    <Stack>
                        {suggestions.map((e) => (
                            <ListItemButton dense divider key={e}>
                                {e}
                            </ListItemButton>
                        ))}
                    </Stack>
                ) : currentSearchState === SearchState.Loading ? (
                    <LinearProgress />
                ) : (
                    <Grid container sx={{ mt: 1, mb: 3, overflowY: 'auto' }} spacing={1}>
                        {[...results, ...results, ...results].map((e, i) => (
                            <Grid item xs={12} xl={6} key={i}>
                                <SearchResult result={e} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default SearchPage;
