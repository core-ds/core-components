import { type Ref, useState } from 'react';
import lottie, {
    type AnimationConfigWithData,
    type AnimationConfigWithPath,
} from 'lottie-web/build/player/lottie_light';

import { hasOwnProperty, noop, useRefAsState } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { type LottieAnimationItem, LottieDataState } from './types';

type LottieParams =
    | Partial<AnimationConfigWithPath<'svg'>>
    | Partial<AnimationConfigWithData<'svg'>>;

type UseLottieProps =
    | Omit<AnimationConfigWithPath<'svg'>, 'container' | 'renderer'>
    | Omit<AnimationConfigWithData<'svg'>, 'container' | 'renderer'>;

function checkOptions(
    options: LottieParams,
): options is AnimationConfigWithPath<'svg'> | AnimationConfigWithData<'svg'> {
    return (
        options.container &&
        ((hasOwnProperty(options, 'animationData') && options.animationData) ||
            (hasOwnProperty(options, 'path') && options.path))
    );
}

export function useLottie<T extends Element>(
    props: UseLottieProps,
): [ref: Ref<T>, animation: LottieAnimationItem | null, dataState: LottieDataState] {
    const [elementRef, element] = useRefAsState<T>(null);
    const [animation, setAnimation] = useState<LottieAnimationItem | null>(null);
    const [options, setOptions] = useState<LottieParams>(props);
    const [dataState, setDataState] = useState(LottieDataState.INITIAL);
    const path = hasOwnProperty(props, 'path') ? props.path : undefined;
    const animationData: unknown = hasOwnProperty(props, 'animationData')
        ? props.animationData
        : undefined;
    const container = element ?? undefined;

    // getDerivedStateFromProps
    if (
        (hasOwnProperty(options, 'animationData') && options.animationData !== animationData) ||
        (hasOwnProperty(options, 'path') && options.path !== path) ||
        options.container !== container
    ) {
        setOptions({ ...props, container });
    }

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (checkOptions(options)) {
            const animationItem: LottieAnimationItem = lottie.loadAnimation(options);

            setAnimation(animationItem);
            setDataState(animationItem.isLoaded ? LottieDataState.OK : LottieDataState.LOADING);

            return () => {
                animationItem.destroy();
                // eslint-disable-next-line no-underscore-dangle
                animationItem._cbs = [];
                setDataState(LottieDataState.INITIAL);
                setAnimation(null);
            };
        }

        return noop;
    }, [options]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const subscriptions = [
            animation?.addEventListener('DOMLoaded', () => {
                setDataState(LottieDataState.OK);
            }),
            animation?.addEventListener('data_failed', () => {
                setDataState(LottieDataState.ERROR);
            }),
        ];

        return () => {
            subscriptions.forEach((unsubscribe) => unsubscribe?.());
        };
    }, [animation]);

    return [elementRef, animation, dataState];
}
