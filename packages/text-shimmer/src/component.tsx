import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { useAnimationEnvironment } from './hooks/use-animation-environment';
import { TextShimmerParticleEngine } from './particle-engine';
import { type TextShimmerProps } from './typings';

import styles from './index.module.css';

const getState = (active: boolean, canvasVisible: boolean) => {
    if (active) {
        return 'active';
    }

    return canvasVisible ? 'assembling' : 'idle';
};

export const TextShimmer = forwardRef<HTMLSpanElement, TextShimmerProps>((props, forwardedRef) => {
    const {
        active = false,
        animate = true,
        children,
        className,
        color,
        particleCount,
        dataTestId,
        ...restProps
    } = props;

    const rootRef = useRef<HTMLSpanElement | null>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<TextShimmerParticleEngine | undefined>(undefined);
    const wasActiveRef = useRef(active);
    const transitionIdRef = useRef(0);
    const [canvasVisible, setCanvasVisible] = useState(false);
    const { prefersReducedMotion, documentVisible } = useAnimationEnvironment();
    const shouldReduceMotion = prefersReducedMotion || !animate;

    const text = String(children);

    const setRootRef = useCallback(
        (node: HTMLSpanElement | null) => {
            rootRef.current = node;

            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                // eslint-disable-next-line no-param-reassign
                forwardedRef.current = node;
            }
        },
        [forwardedRef],
    );

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const canvas = canvasRef.current;
        const textElement = textRef.current;
        const root = rootRef.current;

        if (!canvas || !textElement || !root || !canvas.getContext('2d')) {
            return undefined;
        }

        const engine = new TextShimmerParticleEngine(canvas, textElement, {
            color,
            particleCount,
            prefersReducedMotion: shouldReduceMotion,
            documentVisible,
        });
        const resizeObserver = new ResizeObserver(() => {
            engine.refresh();
        });
        let disposed = false;

        engineRef.current = engine;
        resizeObserver.observe(root);

        if (document.fonts) {
            document.fonts.ready.then(() => {
                if (!disposed) {
                    engine.refresh();
                }
            });
        }

        return () => {
            disposed = true;
            transitionIdRef.current += 1;
            resizeObserver.disconnect();
            engine.destroy();
            engineRef.current = undefined;
        };
        // Дальнейшие обновления параметров выполняются отдельными эффектами.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        engineRef.current?.refresh({ color, particleCount });
    }, [color, particleCount, text]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        engineRef.current?.setEnvironment({
            prefersReducedMotion: shouldReduceMotion,
            documentVisible,
        });
    }, [documentVisible, shouldReduceMotion]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const engine = engineRef.current;
        const transitionId = transitionIdRef.current + 1;

        transitionIdRef.current = transitionId;

        if (active) {
            setCanvasVisible(engine ? engine.scatter() : false);
        } else if (wasActiveRef.current && engine) {
            engine.assemble().then((completed) => {
                if (completed && transitionIdRef.current === transitionId) {
                    setCanvasVisible(false);
                }
            });
        } else {
            setCanvasVisible(false);
            engine?.clear();
        }

        wasActiveRef.current = active;
    }, [active]);

    return (
        <span
            {...restProps}
            ref={setRootRef}
            className={cn(styles.component, className, {
                [styles.motionDisabled]: shouldReduceMotion,
            })}
            data-test-id={dataTestId}
            data-state={getState(active, canvasVisible)}
            aria-busy={active || canvasVisible || undefined}
        >
            <span
                ref={textRef}
                className={cn(styles.text, {
                    [styles.textHidden]: active && canvasVisible,
                    [styles.textRevealing]: !active && canvasVisible,
                    [styles.textPaused]: !documentVisible,
                })}
            >
                {text}
            </span>
            <canvas
                ref={canvasRef}
                className={cn(styles.canvas, {
                    [styles.canvasVisible]: canvasVisible,
                })}
                aria-hidden='true'
            />
        </span>
    );
});

TextShimmer.displayName = 'TextShimmer';
