import { useCoreConfig } from '@balafla/core-components-config';
import { isFn } from '@balafla/core-components-shared';

import { useMatchMedia } from './useMatchMedia';

export function useIsDesktop(breakpoint?: number, defaultValue?: boolean | (() => boolean)) {
    let client: 'desktop' | 'mobile' | undefined;

    if (typeof defaultValue === 'boolean') {
        client = defaultValue ? 'desktop' : 'mobile';
    } else if (isFn(defaultValue)) {
        client = defaultValue() ? 'desktop' : 'mobile';
    }

    const config = useCoreConfig({ breakpoint, client });

    const query = `(min-width: ${config.breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query, config.client === 'desktop');

    return isDesktop;
}
