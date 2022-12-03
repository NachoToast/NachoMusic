import React, { ReactNode } from 'react';

export interface ExternalLinkProps {
    href: string;
    target?: React.HTMLAttributeAnchorTarget;
    children: ReactNode;
}

const ExternalLink = (props: ExternalLinkProps) => {
    const { href, target, children } = props;

    return (
        <a
            href={href}
            rel="noreferrer"
            target={target ?? '_blank'}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            onClick={(e) => {
                e.preventDefault();
                Neutralino.os.open(href);
            }}
        >
            {children}
        </a>
    );
};

export default ExternalLink;
