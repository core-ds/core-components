import { useEffect, useState } from 'react';

import { fnUtils } from '@alfalab/core-components-shared';

export function useVirtualKeyboard() {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.visualViewport) {
            return fnUtils.noop;
        }

        const handleResize = () => {
            const windowHeight = window.innerHeight;
            const viewportHeight = window.visualViewport.height;
            const keyboardOpen = viewportHeight < windowHeight;

            setOpen(keyboardOpen);
            setHeight(keyboardOpen ? windowHeight - viewportHeight : 0);
        };

        window.visualViewport.addEventListener('resize', handleResize);

        return () => {
            window.visualViewport.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        keyboardIsOpen: open,
        keyboardHeight: height,
    };
}
