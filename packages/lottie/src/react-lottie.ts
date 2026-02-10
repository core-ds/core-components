/* eslint-disable @typescript-eslint/ban-ts-comment, no-param-reassign, no-underscore-dangle */
import { type Ref, useCallback, useRef, useState } from 'react';
import lottie, {
    type AnimationConfigWithData,
    type AnimationConfigWithPath,
    type AnimationDirection,
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

interface InternalAnimationItem extends AnimationItem {
    _cbs?: unknown[];
}

export function useLottie<T extends Element>(
    props: UseLottieProps,
): [ref: Ref<T>, animation: Animation | null, reset: () => void] {
    const ref = useRef<T>(null);
    const [animation, setAnimation] = useState<Animation | null>(null);
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
            const animationItem = adaptAnimationItem(
                lottie.loadAnimation({ ...options, container }),
            );

            setAnimation(animationItem);

            return () => {
                animationItem.destroy();
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

type AnimationAdapterEventName = AnimationEventName | 'reverseOnRepeat';

interface AnimationAdapterEvents extends AnimationEvents {
    reverseOnRepeat: undefined;
}

export interface Animation extends Pick<AnimationItem, 'destroy' | 'setDirection' | 'setSpeed'> {
    stop(): void;
    play(restart?: boolean): void;
    pause(): void;
    readonly playCount: number;
    readonly isLoaded: boolean;
    readonly isPaused: boolean;
    readonly playDirection: AnimationDirection;
    triggerEvent<T extends AnimationAdapterEventName>(
        name: T,
        args: AnimationAdapterEvents[T],
    ): void;
    addEventListener<T extends AnimationAdapterEventName>(
        name: T,
        callback: AnimationEventCallback<AnimationAdapterEvents[T]>,
    ): () => void;
    removeEventListener<T extends AnimationAdapterEventName>(
        name: T,
        callback?: AnimationEventCallback<AnimationAdapterEvents[T]>,
    ): void;
}

function adaptAnimationItem(animationItem: InternalAnimationItem): Animation {
    return {
        // @ts-expect-error
        addEventListener: animationItem.addEventListener.bind(animationItem),
        // @ts-expect-error
        removeEventListener: animationItem.removeEventListener.bind(animationItem),
        // @ts-expect-error
        triggerEvent: animationItem.triggerEvent.bind(animationItem),
        setDirection: animationItem.setDirection.bind(animationItem),
        setSpeed: animationItem.setSpeed.bind(animationItem),
        get playDirection() {
            return animationItem.playDirection as AnimationDirection;
        },
        get playCount() {
            return animationItem.playCount;
        },
        get isLoaded() {
            return animationItem.isLoaded;
        },
        get isPaused() {
            return animationItem.isPaused;
        },
        destroy() {
            animationItem.destroy();
            // monkey patch
            animationItem._cbs = [];
        },
        pause() {
            animationItem.pause();
        },
        play(restart = false) {
            if (restart) {
                animationItem.goToAndPlay(
                    animationItem[animationItem.playDirection === 1 ? 'firstFrame' : 'totalFrames'],
                    true,
                );
            } else {
                animationItem.play();
            }
        },
        stop() {
            animationItem.goToAndPlay(
                animationItem[animationItem.playDirection === 1 ? 'totalFrames' : 'firstFrame'],
                true,
            );
            animationItem.pause();
        },
    };
}
