import { createRef } from 'react';

let refs: Array<RefEntry<HTMLInputElement>> = [];
let listeners: Listener[] = [];

function notify() {
    listeners.forEach((listener) => listener());
}

function add(env: typeof window, id: string) {
    const isEnvEqual = (entry: RefEntry<HTMLInputElement>) => entry.env === env;

    refs = refs.some(isEnvEqual)
        ? refs.map((entry) => {
              const { ref, ids } = entry;

              return isEnvEqual(entry) ? { env, ref, ids: [...ids, id] } : entry;
          })
        : [...refs, { env, ref: createRef<HTMLInputElement>(), ids: [id] }];

    notify();
}

function remove(env: typeof window, id: string) {
    refs = refs
        .map((entry) => {
            const { ref, ids } = entry;

            return entry.env === env ? { env, ref, ids: ids.filter((i) => i !== id) } : entry;
        })
        .filter(({ ids }) => ids.length > 0);

    notify();
}

export function init(env: typeof window, id: string) {
    add(env, id);

    return () => {
        remove(env, id);
    };
}

export function getSnapshot(): Array<RefEntry<HTMLInputElement>> {
    return refs;
}

export function subscribe(listener: Listener) {
    listeners = [...listeners, listener];

    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
}

interface RefEntry<T> {
    env: typeof window;
    ref: React.RefObject<T>;
    ids: string[];
}

type Listener = () => void;
