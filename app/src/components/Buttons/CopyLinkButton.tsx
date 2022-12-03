import { Button, Tooltip, TooltipProps, Typography } from '@mui/material';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

export interface CopyLinkButtonProps {
    value: string;
    tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
    initialTooltip: string;
    children: ReactNode;
}

const CopyLinkButton = (props: CopyLinkButtonProps) => {
    const { value, tooltipProps, initialTooltip, children } = props;

    const [hasCopied, setHasCopied] = useState(false);

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            Neutralino.clipboard.writeText(value);
            setHasCopied(true);
        },
        [value],
    );

    useEffect(() => {
        if (!hasCopied) return;

        const reset = setTimeout(() => setHasCopied(false), 1000);

        return () => {
            clearTimeout(reset);
        };
    }, [hasCopied]);

    return (
        <Tooltip {...tooltipProps} title={<Typography>{hasCopied ? 'Copied!' : initialTooltip}</Typography>}>
            <Button onClick={handleClick} color={hasCopied ? 'success' : 'primary'}>
                {children}
            </Button>
        </Tooltip>
    );
};

export default CopyLinkButton;
