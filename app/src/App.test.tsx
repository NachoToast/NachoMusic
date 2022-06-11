import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Playlists/i);
    const linkElement2 = screen.getByText(/Songs/i);
    const linkElement3 = screen.getByText(/Search/i);
    const linkElement4 = screen.getByText(/Settings/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement3).toBeInTheDocument();
    expect(linkElement4).toBeInTheDocument();
});
