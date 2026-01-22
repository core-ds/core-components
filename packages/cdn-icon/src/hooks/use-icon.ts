import { useEffect, useState } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { hasOwnProperty, noop } from '@alfalab/core-components-shared';

import { buildIconUrl } from '../utils';

type Listener = () => void;

export enum LoadingStatus {
    INITIAL,
    SUCCESS,
    FAILURE,
    INVALID,
}

// Кэшируем загруженные иконки, чтобы предотвратить их повторную загрузку при каждом монтировании
let cache: Record<string, string | undefined> = {};
let listeners: Listener[] = [];

const iconsStore = {
    set(url: string, icon: string) {
        cache = { ...cache, [url]: icon };

        listeners.forEach((listener) => {
            listener();
        });
    },
    has(url: string) {
        return hasOwnProperty(cache, url);
    },
    subscribe(listener: Listener) {
        listeners = [...listeners, listener];

        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    },
    getSnapshot() {
        return cache;
    },
};

export function useIcon(
    name: string,
    baseUrl: string,
): [icon: string | undefined, status: LoadingStatus] {
    const icons = useSyncExternalStore(
        iconsStore.subscribe,
        iconsStore.getSnapshot,
        iconsStore.getSnapshot,
    );
    const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.INITIAL);
    const trimName = name.trim();

    useEffect(() => {
        const url = buildIconUrl(trimName, baseUrl);

        if (!url) {
            setLoadingStatus(trimName ? LoadingStatus.INVALID : LoadingStatus.INITIAL);

            return noop;
        }

        if (iconsStore.has(url)) {
            setLoadingStatus(LoadingStatus.SUCCESS);

            return noop;
        }

        setLoadingStatus(LoadingStatus.INITIAL);

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();
        xhr.onload = function onload() {
            const svg = xhr.response;

            if (typeof svg === 'string' && svg.startsWith('<svg')) {
                iconsStore.set(url, svg);
            }
            setLoadingStatus(LoadingStatus.SUCCESS);
        };

        xhr.onerror = function onError() {
            setLoadingStatus(LoadingStatus.FAILURE);
        };

        return () => xhr.abort();
    }, [trimName, baseUrl]);

    const url = buildIconUrl(name, baseUrl);

    return [url ? icons[url] : undefined, loadingStatus];
}
