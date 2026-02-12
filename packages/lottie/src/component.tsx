import React, {
    type CSSProperties,
    forwardRef,
    type ReactNode,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import {
    type AnimationDirection,
    type AnimationEventCallback,
    type AnimationEventName,
    type AnimationEvents,
} from 'lottie-web/build/player/lottie_light';

import { noop } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { type AnimationItemListenersMap, useLottie } from './react-lottie';

import styles from './index.module.css';

interface LottieRef {
    reset(): void;
    subscribe<T extends Extract<AnimationEventName, 'enterFrame'>>(
        name: T,
        callback: AnimationEventCallback<AnimationEvents[T]>,
    ): () => void;
}

export interface LottieProps {
    play?: boolean;
    speed?: number;
    initialFrame?: number;
    startFrame?: number;
    endFrame?: number;
    iterations?: number;
    reverseOnRepeat?: boolean;
    direction?: AnimationDirection;
    animation: { path: string; data?: never } | { path?: never; data: unknown };
    placeholder?: (dataState: LottieDataState.LOADING | LottieDataState.ERROR) => ReactNode;
    scale: 'fit' | 'fill';
    size?: Pick<
        CSSProperties,
        'width' | 'height' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight'
    >;
    className?: string;
}

const addListener =
    <T, U extends keyof T>(name: U, callback: AnimationEventCallback<T[U]>) =>
    (listeners: AnimationItemListenersMap<T>): AnimationItemListenersMap<T> => ({
        ...listeners,
        [name]: [...(listeners[name] ?? []), callback],
    });

const removeListener =
    <T, U extends keyof T>(name: U, callback: AnimationEventCallback<T[U]>) =>
    (listeners: AnimationItemListenersMap<T>): AnimationItemListenersMap<T> => ({
        ...listeners,
        [name]: listeners[name]?.filter((c) => c !== callback),
    });

export enum LottieDataState {
    OK,
    ERROR,
    LOADING,
    INITIAL,
}

export const Lottie = forwardRef<LottieRef, LottieProps>(
    (
        {
            play = true,
            speed = 1,
            startFrame = 0,
            initialFrame: initialFrameFromProps = startFrame,
            endFrame,
            iterations: iterationsFromProps = 0,
            reverseOnRepeat = false,
            direction = 1,
            animation: animationData,
            placeholder,
            scale = 'fill',
            size,
            className,
        },
        forwardedRef,
    ) => {
        const iterations = Math.max(
            Math.max(iterationsFromProps, 0) === 0 ? Number.POSITIVE_INFINITY : iterationsFromProps,
            1,
        );
        const [containerRef, animation, reset] = useLottie<HTMLDivElement>({
            initialSegment: typeof endFrame === 'number' ? [startFrame, endFrame] : undefined,
            autoplay: false,
            loop: false,
            path: animationData.path,
            animationData: animationData.data,
            rendererSettings: {
                preserveAspectRatio: scale === 'fit' ? 'xMidYMid meet' : 'xMidYMid slice',
            },
        });
        const playCountRef = useRef(animation?.playCount ?? 0);
        const [dataState, setDataState] = useState(LottieDataState.INITIAL);
        const [listeners, setListeners] = useState<AnimationItemListenersMap<AnimationEvents>>(
            () => ({
                DOMLoaded: [
                    () => {
                        setDataState(LottieDataState.OK);
                    },
                ],
                data_failed: [
                    () => {
                        setDataState(LottieDataState.ERROR);
                    },
                ],
            }),
        );
        let initialFrame = Math.max(startFrame, initialFrameFromProps);

        initialFrame =
            typeof endFrame === 'number' ? Math.min(endFrame, initialFrame) : initialFrame;

        useImperativeHandle(
            forwardedRef,
            () => ({
                reset,
                subscribe(name, callback) {
                    if (name === 'enterFrame') {
                        setListeners(addListener(name, callback));

                        return () => {
                            setListeners(removeListener(name, callback));
                        };
                    }

                    return noop;
                },
            }),
            [reset],
        );
        useImperativeHandle(playCountRef, () => animation?.playCount ?? 0, [animation]);

        // handle listeners
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                const subscriptions = Object.entries(listeners).flatMap((entry) => {
                    const [name, callbacks = []] = entry as [
                        name: AnimationEventName,
                        callbacks:
                            | Array<AnimationEventCallback<AnimationEvents[AnimationEventName]>>
                            | undefined,
                    ];

                    return callbacks.map((callback) => animation.addEventListener(name, callback));
                });

                return () => {
                    subscriptions.forEach((unsubscribe) => unsubscribe());
                };
            }

            return noop;
        }, [animation, listeners]);

        // handle loading
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                setDataState(animation.isLoaded ? LottieDataState.OK : LottieDataState.LOADING);
            } else {
                setDataState(LottieDataState.INITIAL);
            }
        }, [animation]);

        // handle direction and speed
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation && playCountRef.current < iterations) {
                animation.setDirection(direction);
                animation.setSpeed(speed);
            }
        }, [animation, direction, iterations, speed]);

        // handle play
        useLayoutEffect_SAFE_FOR_SSR(() => {
            const playCount = playCountRef.current;

            if (animation && playCount < iterations && play && animation.isPaused) {
                if (playCount === 0) {
                    const playFrame = Math.max(animation.currentFrame, initialFrame);

                    animation.goToAndPlay(playFrame, true);
                } else {
                    animation.play();
                }
            }
        }, [animation, initialFrame, iterations, play]);

        // handle pause
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation && playCountRef.current < iterations && !play && !animation.isPaused) {
                animation.pause();
            }
        }, [animation, iterations, play]);

        // handle iterations
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                return animation.addEventListener('complete', () => {
                    playCountRef.current += 1;

                    if (playCountRef.current < iterations) {
                        if (reverseOnRepeat) {
                            animation.setDirection(
                                (animation.playDirection * -1) as AnimationDirection,
                            );
                        }
                        animation.goToAndPlay(
                            animation[animation.playDirection === 1 ? 'firstFrame' : 'totalFrames'],
                            true,
                        );
                    }
                });
            }

            return noop;
        }, [animation, iterations, reverseOnRepeat]);

        return (
            <div className={cn(styles.component, className)} style={size}>
                <div
                    ref={containerRef}
                    className={cn(styles.container, {
                        [styles.show]: dataState === LottieDataState.OK,
                    })}
                />
                {dataState === LottieDataState.LOADING ||
                    (dataState === LottieDataState.ERROR && (
                        <div className={styles.placeholder}>{placeholder?.(dataState)}</div>
                    ))}
            </div>
        );
    },
);
