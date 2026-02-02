import React, { forwardRef, type ReactNode, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import { type AnimationDirection, type AnimationItem } from 'lottie-web';

import { noop } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { useLottie } from './react-lottie';

import styles from './index.module.css';

interface LottieRef {
    reset(): void;
}

export interface LottieProps {
    play?: boolean;
    speed?: number;
    restartOnPlay?: boolean;
    startFrame?: number;
    endFrame?: number;
    iterations?: number;
    reverseOnRepeat?: boolean;
    direction?: AnimationDirection;
    pauseBehavior?: 'immediately' | 'onIterationFinish';
    onComplete?: () => void;
    animation: { path: string; data?: never } | { path?: never; data: unknown };
    loadingFallback?: ReactNode;
    scale: 'fit' | 'fill';
}

interface LottieData {
    playCount: number;
    playFromFrame?: number;
    cancelPauseOnLoopFinish?: () => void;
}

function initController(playCount = 0): LottieData {
    return { playCount };
}

const initialController = initController(0);

function playFromStart(animation: AnimationItem) {
    animation.goToAndPlay(
        animation[animation.playDirection === 1 ? 'firstFrame' : 'totalFrames'],
        true,
    );
}

function pauseOnEnd(animation: AnimationItem) {
    animation.goToAndPlay(
        animation[animation.playDirection === 1 ? 'totalFrames' : 'firstFrame'],
        true,
    );
    animation.pause();
}

export const Lottie = forwardRef<LottieRef, LottieProps>(
    (
        {
            play = true,
            speed = 1,
            restartOnPlay = false,
            startFrame = 0,
            endFrame,
            iterations: iterationsFromProps = 2_147_483_647,
            reverseOnRepeat = false,
            direction = 1,
            pauseBehavior = 'immediately',
            onComplete,
            animation: animationData,
            loadingFallback,
            scale = 'fill',
        },
        forwardedRef,
    ) => {
        const [containerRef, animation, reset] = useLottie<HTMLDivElement>({
            initialSegment: typeof endFrame === 'number' ? [startFrame, endFrame] : undefined,
            autoplay: play,
            path: animationData.path,
            animationData: animationData.data,
            rendererSettings: {
                preserveAspectRatio: scale === 'fit' ? 'xMidYMid meet' : 'xMidYMid slice',
            },
        });
        const [loading, setLoading] = useState(true);
        const controllerRef = useRef(initialController);
        const handleCompleteRef = useRef(onComplete);
        const iterations = Math.max(1, iterationsFromProps);
        const pause = !play;

        useImperativeHandle(forwardedRef, () => ({ reset }), [reset]);
        useImperativeHandle(handleCompleteRef, () => onComplete, [onComplete]);
        useImperativeHandle(controllerRef, () => initController(animation?.playCount), [animation]);

        // handle loading
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                setLoading(true);

                return animation.addEventListener('DOMLoaded', () => {
                    setLoading(false);
                });
            }

            return noop;
        }, [animation]);

        // handle direction and speed
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation && controllerRef.current.playCount < iterations) {
                animation.setDirection(direction);
                animation.setSpeed(speed);
            }
        }, [animation, direction, iterations, speed]);

        // handle play
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation && controllerRef.current.playCount < iterations && play) {
                controllerRef.current.cancelPauseOnLoopFinish?.();
                if (animation.isPaused) {
                    if (restartOnPlay) {
                        playFromStart(animation);
                    } else {
                        const { playFromFrame } = controllerRef.current;

                        if (typeof playFromFrame === 'number') {
                            delete controllerRef.current.playFromFrame;
                            animation.goToAndPlay(playFromFrame, true);
                        } else {
                            animation.play();
                        }
                    }
                }
            }
        }, [animation, iterations, play, restartOnPlay]);

        // handle pause
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (
                animation &&
                controllerRef.current.playCount < iterations &&
                pause &&
                !animation.isPaused
            ) {
                if (pauseBehavior === 'immediately') {
                    animation.pause();
                } else if (
                    pauseBehavior === 'onIterationFinish' &&
                    !controllerRef.current.cancelPauseOnLoopFinish
                ) {
                    controllerRef.current.cancelPauseOnLoopFinish = animation.addEventListener(
                        'loopComplete',
                        () => {
                            controllerRef.current.playFromFrame = animation.currentFrame;
                            pauseOnEnd(animation);
                            controllerRef.current.cancelPauseOnLoopFinish?.();
                            delete controllerRef.current.cancelPauseOnLoopFinish;
                        },
                    );
                }
            }
        }, [animation, iterations, pause, pauseBehavior, reverseOnRepeat]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                return animation.addEventListener('loopComplete', () => {
                    controllerRef.current.playCount += 1;

                    if (controllerRef.current.playCount < iterations) {
                        if (reverseOnRepeat) {
                            animation.setDirection(
                                (animation.playDirection * -1) as AnimationDirection,
                            );
                            playFromStart(animation);
                        }
                    } else {
                        pauseOnEnd(animation);
                        handleCompleteRef.current?.();
                    }
                });
            }

            return noop;
        }, [animation, iterations, reverseOnRepeat]);

        return (
            <div
                className={styles.component}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <div
                    ref={containerRef}
                    className={cn(styles.container, { [styles.hide]: loading })}
                />
                {loading && <div className={styles.loadingFallback}>{loadingFallback}</div>}
            </div>
        );
    },
);
