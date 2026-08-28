import React, { type FC, Fragment, useRef, useState } from 'react';
import cn from 'classnames';

import { LottieDataState, type LottieProps } from '@alfalab/core-components-lottie/types';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { useLottie } from './react-lottie';

import styles from './index.module.css';

export const Lottie: FC<LottieProps> = ({
    play = true,
    onPlayChange,
    speed = 1,
    startFrame,
    endFrame,
    onFrameChange,
    iterations = 0,
    onIterationChange,
    direction = 1,
    src,
    data,
    placeholder,
    scale = 'fill',
    size,
    className,
    onComplete,
}) => {
    const maxIterations = Math.max(
        Math.max(iterations, 0) === 0 ? Number.POSITIVE_INFINITY : iterations,
        1,
    );
    const preserveAspectRatio = scale === 'fit' ? 'xMidYMid meet' : 'xMidYMid slice';
    const [containerRef, animation, dataState] = useLottie<HTMLDivElement>({
        autoplay: false,
        loop: false,
        path: src,
        animationData: data,
        rendererSettings: { preserveAspectRatio },
    });
    const onPlayChangeRef = useRef(onPlayChange);
    const onFrameChangeRef = useRef(onFrameChange);
    const onIterationChangeRef = useRef(onIterationChange);
    const onCompleteRef = useRef(onComplete);
    const [iteration, setIteration] = useState(0);

    // refs
    useLayoutEffect_SAFE_FOR_SSR(() => {
        onPlayChangeRef.current = onPlayChange;
        onFrameChangeRef.current = onFrameChange;
        onCompleteRef.current = onComplete;
        onIterationChangeRef.current = onIterationChange;
    });

    // reset iterations on animation update
    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (animation) {
            setIteration(0);
        }
    }, [animation]);

    // setup direction, speed and preserveAspectRatio
    useLayoutEffect_SAFE_FOR_SSR(() => {
        const svgElement = animation?.renderer.svgElement;

        animation?.setDirection(direction);
        animation?.setSpeed(speed);
        svgElement?.setAttribute('preserveAspectRatio', preserveAspectRatio);
    }, [animation, direction, preserveAspectRatio, speed]);

    // setup start/end frame
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
        if (iteration < maxIterations) {
            if (animation && dataState === LottieDataState.OK) {
                if (play && animation.isPaused) {
                    const { playDirection, currentFrame, totalFrames } = animation;
                    const isForward = playDirection === 1;

                    if (
                        isForward
                            ? currentFrame >= totalFrames - 1 // see https://github.com/airbnb/lottie-web/blob/bede03d25d232826e0c9dca1733d542d8a7754fb/player/js/animation/AnimationItem.js#L504
                            : currentFrame === 0
                    ) {
                        const nextFrame = Math.max(
                            totalFrames -
                                (isForward ? Math.max(totalFrames, currentFrame) : currentFrame),
                            0,
                        );

                        animation.goToAndPlay(nextFrame, true);
                    } else {
                        animation.play();
                    }
                }

                if (!play && !animation.isPaused) {
                    animation.pause();
                }
            }
        } else {
            setIteration(0);
            onPlayChangeRef.current?.(false);
            onCompleteRef?.current?.();
        }
    }, [animation, dataState, maxIterations, play, iteration]);

    // handle complete
    useLayoutEffect_SAFE_FOR_SSR(
        () =>
            animation?.addEventListener('complete', () => {
                const nextIteration = iteration + 1;

                setIteration(nextIteration);
                onIterationChangeRef.current?.(nextIteration);
            }),
        [animation, iteration],
    );

    // handle listeners
    useLayoutEffect_SAFE_FOR_SSR(
        () =>
            animation?.addEventListener('drawnFrame', ({ currentTime }) => {
                onFrameChangeRef.current?.(currentTime);
            }),
        [animation],
    );

    return (
        <Fragment>
            <div
                ref={containerRef}
                style={size}
                className={cn(styles.container, className, {
                    [styles.show]: dataState === LottieDataState.OK,
                })}
            />
            {(dataState === LottieDataState.LOADING || dataState === LottieDataState.ERROR) &&
                placeholder?.(dataState)}
        </Fragment>
    );
};
