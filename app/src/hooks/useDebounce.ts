import { useEffect, useState } from 'react';

/** Modified from {@link https://usehooks.com/useDebounce/ useHooks.com} */
export default function useDebounce<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delayMs);

        return () => {
            clearTimeout(handler);
        };
    }, [delayMs, value]);

    return debouncedValue;
}
