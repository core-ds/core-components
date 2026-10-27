import { useRef, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { useDocumentVisible } from '../animation';
import { ParticleEngine } from '../particle-engine';
import { measureText, type Rect } from '../particle-utils';
import { type SpoilerProps } from '../types';

type Options = {
    mode: NonNullable<SpoilerProps['mode']>;
    revealed: boolean;
    colors: NonNullable<SpoilerProps['colors']>;
};

/** Владеет DOM-рефами и отделяет геометрию/оформление от управления анимацией. */
export const useParticles = ({ mode, revealed, colors }: Options) => {
    const rootRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLElement>(null);
    const anchorRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<ParticleEngine>();
    const [ready, setReady] = useState(false);
    const [inViewport, setInViewport] = useState(true);
    const documentVisible = useDocumentVisible();

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const root = rootRef.current;
        const content = contentRef.current;
        const anchor = anchorRef.current;
        const canvas = canvasRef.current;

        if (!root || !content || !canvas || (mode === 'text' && !anchor)) return undefined;
        let context: CanvasRenderingContext2D | null;

        try {
            context = canvas.getContext('2d');
        } catch {
            return undefined;
        }
        if (!context) return undefined;

        const engine = new ParticleEngine(canvas, context, mode);
        let disposed = false;
        let elementRects: Rect[] = [];

        engineRef.current = engine;
        const configure = () => {
            const style = getComputedStyle(root);

            // У блока все скругления (в том числе разные углы) уже обрезаются overflow: hidden.
            engine.configure(
                mode === 'text' ? parseFloat(style.borderTopLeftRadius) || 0 : 0,
                parseFloat(style.fontSize) || 16,
            );
        };
        const refresh = () => {
            if (disposed) return;
            configure();
            const rects = mode === 'text' && anchor ? measureText(content, anchor) : elementRects;

            engine.layout(rects);
            setReady(rects.length > 0);
        };
        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const resizeObserver = new ResizeObserver(([entry]) => {
            if (mode === 'element') {
                const { width, height } = entry.contentRect;

                elementRects = width > 0 && height > 0 ? [{ x: 0, y: 0, width, height }] : [];
            }
            refresh();
        });

        if (mode === 'element') {
            // CSS задаёт всю геометрию; наблюдаем фактический размер растянутого canvas.
            resizeObserver.observe(canvas);
        } else {
            let resizeTarget = root.parentElement;

            // Typography.Text тоже может быть inline: наблюдаем ближайший измеримый контейнер.
            while (resizeTarget && getComputedStyle(resizeTarget).display === 'inline') {
                resizeTarget = resizeTarget.parentElement;
            }
            if (resizeTarget) resizeObserver.observe(resizeTarget);
        }

        const contentObserver = mode === 'text' ? new MutationObserver(refresh) : undefined;

        contentObserver?.observe(content, {
            childList: true,
            characterData: true,
            subtree: true,
            attributeFilter: ['class', 'style'],
        });
        const styleObserver = new MutationObserver(refresh);

        styleObserver.observe(root, { attributes: true, attributeFilter: ['class', 'style'] });
        const intersectionObserver =
            typeof IntersectionObserver === 'undefined'
                ? undefined
                : new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting));

        intersectionObserver?.observe(root);
        document.fonts?.ready.then(refresh);
        document.fonts?.addEventListener('loadingdone', refresh);
        refresh();

        return () => {
            disposed = true;
            engineRef.current = undefined;
            engine.destroy();
            resizeObserver.disconnect();
            contentObserver?.disconnect();
            styleObserver.disconnect();
            intersectionObserver?.disconnect();
            document.fonts?.removeEventListener('loadingdone', refresh);
        };
    }, [mode]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        engineRef.current?.setPlaying(ready && !revealed && documentVisible && inViewport);
    }, [ready, revealed, documentVisible, inViewport, mode]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const engine = engineRef.current;

        if (engine?.syncColor()) engine.redraw();
    }, [colors]);

    return { rootRef, contentRef, anchorRef, canvasRef, ready };
};
