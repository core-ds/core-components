/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign, no-underscore-dangle */
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

const { is } = Object;

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
): [ref: Ref<T>, animation: AnimationItemAdapter | null, reset: () => void] {
    const ref = useRef<T>(null);
    const [animation, setAnimation] = useState<AnimationItemAdapter | null>(null);
    const [options, setOptions] = useState<LottieParams>(props);
    const path = hasOwnProperty(props, 'path') ? props.path : undefined;
    const animationData: unknown = hasOwnProperty(props, 'animationData')
        ? props.animationData
        : undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect_SAFE_FOR_SSR(() => {
        const container = ref.current ?? undefined;

        if (!is(options.container, container)) {
            setOptions((prevOptions) => ({ ...prevOptions, container }));
        }
    });

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (
            (hasOwnProperty(options, 'animationData') &&
                !is(options.animationData, animationData)) ||
            (hasOwnProperty(options, 'path') && !is(options.path, path))
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

export interface AnimationItemAdapter
    extends Pick<AnimationItem, 'destroy' | 'setDirection' | 'setSpeed'> {
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

function adaptAnimationItem(animation: InternalAnimationItem): AnimationItemAdapter {
    return {
        // @ts-expect-error
        addEventListener: animation.addEventListener.bind(animation),
        // @ts-expect-error
        removeEventListener: animation.removeEventListener.bind(animation),
        // @ts-expect-error
        triggerEvent: animation.triggerEvent.bind(animation),
        setDirection: animation.setDirection.bind(animation),
        setSpeed: animation.setSpeed.bind(animation),
        get playDirection() {
            return animation.playDirection as AnimationDirection;
        },
        get playCount() {
            return animation.playCount;
        },
        get isLoaded() {
            return animation.isLoaded;
        },
        get isPaused() {
            return animation.isPaused;
        },
        destroy() {
            animation.destroy();
            // monkey patch
            animation._cbs = [];
        },
        pause() {
            animation.pause();
        },
        play(restart = false) {
            if (restart) {
                animation.goToAndPlay(
                    animation[animation.playDirection === 1 ? 'firstFrame' : 'totalFrames'],
                    true,
                );
            } else {
                animation.play();
            }
        },
        stop() {
            animation.goToAndPlay(
                animation[animation.playDirection === 1 ? 'totalFrames' : 'firstFrame'],
                true,
            );
            animation.pause();
        },
    };
}
