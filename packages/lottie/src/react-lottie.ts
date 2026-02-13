import { type Ref, useCallback, useRef, useState } from 'react';
import lottie, {
    type AnimationConfigWithData,
    type AnimationConfigWithPath,
    type AnimationEventCallback,
    type AnimationEventName,
    type AnimationEvents,
    type AnimationItem,
} from 'lottie-web/build/player/lottie_light';

import { hasOwnProperty, noop } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

type LottieParams =
    | Partial<AnimationConfigWithPath<'svg'>>
    | Partial<AnimationConfigWithData<'svg'>>;

type UseLottieProps =
    | Omit<AnimationConfigWithPath<'svg'>, 'container' | 'renderer'>
    | Omit<AnimationConfigWithData<'svg'>, 'container' | 'renderer'>;

export interface InternalAnimationItem extends AnimationItem {
    _cbs?: never[] & {
        [P in AnimationEventName]?: Array<AnimationEventCallback<AnimationEvents[P]>>;
    };
}

export function useLottie<T extends Element>(
    props: UseLottieProps,
): [ref: Ref<T>, animation: InternalAnimationItem | null, reset: () => void] {
    const ref = useRef<T>(null);
    const [animation, setAnimation] = useState<InternalAnimationItem | null>(null);
    const [options, setOptions] = useState<LottieParams>(props);
    const path = hasOwnProperty(props, 'path') ? props.path : undefined;
    const animationData: unknown = hasOwnProperty(props, 'animationData')
        ? props.animationData
        : undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect_SAFE_FOR_SSR(() => {
        const container = ref.current ?? undefined;

        if (options.container !== container) {
            setOptions((prevOptions) => ({ ...prevOptions, container }));
        }
    });

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (
            (hasOwnProperty(options, 'animationData') && options.animationData !== animationData) ||
            (hasOwnProperty(options, 'path') && options.path !== path)
        ) {
            setOptions((prevOptions) => ({ ...prevOptions, animationData, path }));
        }
    }, [animationData, options, path]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const { container } = options;

        if (
            container &&
            ((hasOwnProperty(options, 'animationData') && options.animationData) ||
                (hasOwnProperty(options, 'path') && options.path))
        ) {
            const animationItem: InternalAnimationItem = lottie.loadAnimation({
                ...options,
                container,
            });

            setAnimation(animationItem);

            return () => {
                animationItem.destroy();
                // eslint-disable-next-line no-underscore-dangle
                animationItem._cbs = [];
                setAnimation(null);
            };
        }

        return noop;
    }, [options]);

    const reset = useCallback(() => {
        setOptions((prevOptions) => ({ ...prevOptions }));
    }, []);

    return [ref, animation, reset];
}
