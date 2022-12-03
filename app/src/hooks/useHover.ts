import React, { useEffect, useRef, useState } from 'react';

/** Modified from {@link https://usehooks.com/useHover/ useHooks.com} */
export default function useHover(): [React.RefObject<HTMLDivElement>, boolean] {
    const [isHovered, setIsHovered] = useState(false);

    const hoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = hoverRef.current;

        if (node) {
            const onMouseEnter = () => setIsHovered(true);
            const onMouseLeave = () => setIsHovered(false);

            hoverRef.current.addEventListener('mouseenter', onMouseEnter);
            hoverRef.current.addEventListener('mouseleave', onMouseLeave);

            return () => {
                node.removeEventListener('mouseenter', onMouseEnter);
                node.removeEventListener('mouseleave', onMouseLeave);
            };
        }

        return;
    }, [hoverRef]);

    return [hoverRef, isHovered];
}
