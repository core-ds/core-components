import { useCoreConfig } from '@alfalab/core-config';

import { useMatchMedia } from './useMatchMedia';

export function useIsDesktop(breakpoint?: number, defaultValue?: boolean | (() => boolean)) {
    let client: 'desktop' | 'mobile' | undefined;

    if (typeof defaultValue === 'boolean') {
        client = defaultValue ? 'desktop' : 'mobile';
    } else if (typeof defaultValue === 'function') {
        client = defaultValue() ? 'desktop' : 'mobile';
    }

    const config = useCoreConfig({ breakpoint, client });

    const query = `(min-width: ${config.breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query, config.client === 'desktop');

    return isDesktop;
}
