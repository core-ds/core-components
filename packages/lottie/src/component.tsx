import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import { createNanoEvents } from 'nanoevents';

import { noop } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { useLottie } from './react-lottie';
import {
    type AnimationDirection,
    LottieDataState,
    type LottieEvents,
    type LottieProps,
    type LottieRef,
} from './types';

import styles from './index.module.css';

export const Lottie = forwardRef<LottieRef, LottieProps>(
    (
        {
            play = true,
            speed = 1,
            startFrame,
            endFrame,
            iterations: iterationsFromProps = 0,
            direction,
            src,
            data,
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
            autoplay: false,
            loop: false,
            path: src,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: scale === 'fit' ? 'xMidYMid meet' : 'xMidYMid slice',
            },
        });
        const playCountRef = useRef(animation?.playCount ?? 0);
        const [dataState, setDataState] = useState(LottieDataState.INITIAL);
        const [events] = useState(() => createNanoEvents<LottieEvents>());

        useImperativeHandle(
            forwardedRef,
            () => ({
                reset,
                subscribe(name, callback) {
                    return events.on(name, callback);
                },
            }),
            [events, reset],
        );

        useEffect(() => {
            playCountRef.current = animation?.playCount ?? 0;
        }, [animation]);

        // set loading state
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
                if (typeof direction === 'number') {
                    animation.setDirection(direction);
                }
                animation.setSpeed(speed);
            }
        }, [animation, direction, iterations, speed]);

        // handle start/end frame
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation && dataState === LottieDataState.OK) {
                const { animationData } = animation;
                const firstFrame = Math.round(animationData!.ip);
                const totalFrames = Math.floor(animationData!.op - animationData!.ip);
                const start =
                    typeof startFrame === 'number' ? Math.max(startFrame, firstFrame) : firstFrame;
                const end =
                    typeof endFrame === 'number' ? Math.min(endFrame, totalFrames) : totalFrames;

                animation.setSegment(start, end);
            }
        }, [animation, dataState, endFrame, startFrame]);

        // handle play
        useLayoutEffect_SAFE_FOR_SSR(() => {
            const playCount = playCountRef.current;

            if (
                animation &&
                dataState === LottieDataState.OK &&
                playCount < iterations &&
                play &&
                animation.isPaused
            ) {
                const { firstFrame } = animation;
                const playFrame =
                    playCount === 0
                        ? Math.max(animation.currentFrame, firstFrame)
                        : animation.currentFrame;

                animation.play();
                events.emit(playFrame === firstFrame ? 'started' : 'resumed');
            }
        }, [animation, dataState, events, iterations, play]);

        // handle pause
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (
                animation &&
                dataState === LottieDataState.OK &&
                playCountRef.current < iterations &&
                !play &&
                !animation.isPaused
            ) {
                animation.pause();
                events.emit('stopped');
            }
        }, [animation, dataState, events, iterations, play]);

        // handle listeners
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                const subscriptions = [
                    animation.addEventListener('complete', () => {
                        playCountRef.current += 1;

                        events.emit('ended');

                        if (playCountRef.current < iterations) {
                            if (direction === 'reverseOnRepeat') {
                                animation.setDirection(
                                    (animation.playDirection * -1) as AnimationDirection,
                                );
                            }
                            animation.goToAndPlay(
                                animation[
                                    animation.playDirection === 1 ? 'firstFrame' : 'totalFrames'
                                ],
                                true,
                            );
                            events.emit('started');
                        }
                    }),
                    animation.addEventListener('DOMLoaded', () => {
                        setDataState(LottieDataState.OK);
                    }),
                    animation.addEventListener('data_failed', () => {
                        setDataState(LottieDataState.ERROR);
                    }),
                    animation.addEventListener('enterFrame', ({ currentTime }) => {
                        events.emit('frame', { currentFrame: currentTime });
                    }),
                ];

                return () => {
                    subscriptions.forEach((unsubscribe) => unsubscribe());
                };
            }

            return noop;
        }, [animation, direction, events, iterations]);

        return (
            <div className={cn(styles.component, className)} style={size}>
                <div
                    ref={containerRef}
                    className={cn(styles.container, {
                        [styles.show]: dataState === LottieDataState.OK,
                    })}
                />
                {(dataState === LottieDataState.LOADING || dataState === LottieDataState.ERROR) && (
                    <div className={styles.placeholder}>{placeholder?.(dataState)}</div>
                )}
            </div>
        );
    },
);
