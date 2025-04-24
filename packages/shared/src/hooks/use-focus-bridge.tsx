import React, { useRef } from 'react';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

const ref: FocusBridgeRef = {
    current: null,
    counter: 0,
};

export function useFocusBridge(): React.RefObject<HTMLInputElement> {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (ref.counter === 0) {
            const input = createInput();

            document.body.append(input);
            ref.current = input;
        }

        ref.counter += 1;
        inputRef.current = ref.current;

        return () => {
            inputRef.current = null;
            ref.counter -= 1;

            if (ref.counter === 0) {
                ref.current?.remove();
                ref.current = null;
            }
        };
    }, []);

    return inputRef;
}

function createInput() {
    const input = document.createElement('input');
    const styleProps = ['border', 'height', 'margin', 'padding', 'width'];

    styleProps.forEach((prop) => input.style.setProperty(prop, '0', 'important'));
    input.setAttribute('aria-hidden', 'true');
    input.setAttribute('tab-index', '-1');

    return input;
}

interface FocusBridgeRef extends React.MutableRefObject<HTMLInputElement | null> {
    counter: number;
}
