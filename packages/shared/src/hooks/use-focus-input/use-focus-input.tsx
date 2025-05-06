import React, { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useId, useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { isNonNullable, noop } from '../../fnUtils';
import { isClient } from '../../isClient';

import { getSnapshot, init, subscribe } from './store';

export function useFocusInput(
    environment = isClient() ? window : undefined,
): [focus: () => void, render: React.ReactNode] {
    const id = useId();
    const refEntries = useSyncExternalStore(subscribe, getSnapshot);
    const refEntry = useMemo(
        () => refEntries.find((item) => item.env === environment),
        [environment, refEntries],
    );
    const focus = useCallback(() => refEntry?.ref.current?.focus(), [refEntry?.ref]);
    const render: React.ReactNode =
        refEntry?.ids[0] === id &&
        createPortal(
            <input
                ref={refEntry.ref}
                tabIndex={-1}
                aria-hidden={true}
                style={{ border: 0, height: 0, margin: 0, padding: 0, width: 0 }}
            />,
            refEntry.env.document.body,
        );

    useLayoutEffect_SAFE_FOR_SSR(
        () => (isNonNullable(environment) ? init(environment, id) : noop),
        [environment, id],
    );

    return [focus, render];
}
