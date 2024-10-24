import { useCoreConfig } from '@alfalab/core-config';
import { useMatchMedia } from './useMatchMedia';

export function useIsDesktop(breakpoint?: number, defaultValue?: boolean | (() => boolean)) {
    let ssrView;

    if (typeof defaultValue === 'boolean') {
        ssrView = defaultValue ? 'desktop' : 'mobile';
    } else if (typeof defaultValue === 'function') {
        ssrView = defaultValue() ? 'desktop' : 'mobile';
    }

    const config = useCoreConfig({ breakpoint, ssrView });

    const query = `(min-width: ${config.breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query, config.ssrView === 'desktop');

    return isDesktop;
}
