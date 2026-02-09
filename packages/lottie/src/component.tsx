import React, {
    type CSSProperties,
    forwardRef,
    type ReactNode,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import { type AnimationDirection } from 'lottie-web';

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
    placeholder?: (
        dataState: Extract<LottieDataState, LottieDataState.LOADING | LottieDataState.ERROR>,
    ) => ReactNode;
    scale: 'fit' | 'fill';
    size?: Pick<
        CSSProperties,
        'width' | 'height' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight'
    >;
    className?: string;
}

interface LottieData {
    playCount: number;
    playFromFrame?: number;
    cancelPauseOnLoopFinish?: () => void;
    pauseOnLoopComplete?: boolean;
}

function initController(playCount = 0): LottieData {
    return { playCount };
}

const initialController = initController(0);

enum LottieDataState {
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
            restartOnPlay = false,
            startFrame = 0,
            endFrame,
            iterations: iterationsFromProps = 2_147_483_647,
            reverseOnRepeat = false,
            direction = 1,
            pauseBehavior = 'immediately',
            onComplete,
            animation: animationData,
            placeholder,
            scale = 'fill',
            size,
            className,
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
        const [dataState, setDataState] = useState(LottieDataState.INITIAL);
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
                setDataState(animation.isLoaded ? LottieDataState.OK : LottieDataState.LOADING);

                const subscriptions = [
                    animation.addEventListener('DOMLoaded', () => {
                        setDataState(LottieDataState.OK);
                    }),
                    animation.addEventListener('data_failed', () => {
                        setDataState(LottieDataState.ERROR);
                    }),
                ];

                return () => {
                    subscriptions.forEach((unsubscribe) => unsubscribe());
                };
            }

            setDataState(LottieDataState.INITIAL);

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
            if (
                animation &&
                controllerRef.current.playCount < iterations &&
                play &&
                animation.isPaused
            ) {
                const { pauseOnLoopComplete } = controllerRef.current;

                if (pauseOnLoopComplete) {
                    controllerRef.current.pauseOnLoopComplete = false;

                    if (reverseOnRepeat) {
                        animation.triggerEvent('reverseOnRepeat', undefined);

                        return;
                    }
                }

                animation.play(restartOnPlay);
            }
        }, [animation, iterations, play, restartOnPlay, reverseOnRepeat]);

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
                } else if (pauseBehavior === 'onIterationFinish') {
                    controllerRef.current.pauseOnLoopComplete = true;
                }
            }
        }, [animation, iterations, pause, pauseBehavior]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                return animation.addEventListener('loopComplete', () => {
                    controllerRef.current.playCount += 1;

                    if (controllerRef.current.pauseOnLoopComplete) {
                        animation.stop();
                    } else if (controllerRef.current.playCount < iterations) {
                        if (reverseOnRepeat) {
                            animation.triggerEvent('reverseOnRepeat', undefined);
                        }
                    } else {
                        animation.stop();
                        handleCompleteRef.current?.();
                    }
                });
            }

            return noop;
        }, [animation, iterations, reverseOnRepeat]);

        // reverseOnRepeat
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (animation) {
                return animation.addEventListener('reverseOnRepeat', () => {
                    animation.setDirection((animation.playDirection * -1) as AnimationDirection);
                    animation.play(true);
                });
            }

            return noop;
        }, [animation]);

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
