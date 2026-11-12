import { useRef, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { DEFAULT_TRANSITION_MS, FONT, MILLISECONDS_PER_SECOND, POINTER } from '../constants';
import { ParticleEngine } from '../particle-engine';
import { measureText, type Rect } from '../particle-utils';
import { type SpoilerProps } from '../types';

type Options = {
    mode: NonNullable<SpoilerProps['mode']>;
    open: boolean;
    colors: NonNullable<SpoilerProps['colors']>;
    expandOnHover: boolean;
    repelParticlesOnHover: boolean;
};

const getDuration = (style: CSSStyleDeclaration) => {
    const value = style.getPropertyValue('--spoiler-transition-duration').trim();
    const duration = parseFloat(value);

    return Number.isFinite(duration)
        ? duration * (value.endsWith('ms') ? 1 : MILLISECONDS_PER_SECOND)
        : DEFAULT_TRANSITION_MS;
};

/** Обновляет геометрию по DOM, состояние — по пропсам, движение — по видимости и reduced motion. */
export const useParticles = ({
    mode,
    open,
    colors,
    expandOnHover,
    repelParticlesOnHover,
}: Options) => {
    const rootRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLElement>(null);
    const anchorRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<ParticleEngine>();
    const [ready, setReady] = useState(false);
    const trackPointer = expandOnHover || repelParticlesOnHover;

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const root = rootRef.current;
        const content = contentRef.current;
        const anchor = anchorRef.current;
        const canvas = canvasRef.current;
        const document = root?.ownerDocument;
        const view = document?.defaultView;

        if (!root || !content || !canvas || !document || !view || (mode === 'text' && !anchor))
            return undefined;
        let context: CanvasRenderingContext2D | null;

        try {
            context = canvas.getContext('2d');
        } catch {
            return undefined;
        }
        if (!context) return undefined;

        const engine = new ParticleEngine(canvas, context, mode);
        const reducedMotion = view.matchMedia?.('(prefers-reduced-motion: reduce)');
        let disposed = false;
        let inViewport = true;
        let elementRects: Rect[] = [];

        engineRef.current = engine;
        engine.setOpen(open);
        const updatePlaying = () => engine.setPlaying(inViewport && !reducedMotion?.matches);
        const refresh = () => {
            if (disposed) return;
            const style = view.getComputedStyle(root);

            engine.configure(
                mode === 'text' ? parseFloat(style.borderTopLeftRadius) || 0 : 0,
                parseFloat(style.fontSize) || FONT.base,
                getDuration(style),
            );
            const rects = mode === 'text' && anchor ? measureText(content, anchor) : elementRects;

            engine.layout(rects);
            setReady(rects.length > 0);
        };
        let container = root.parentElement;

        while (container && view.getComputedStyle(container).display === 'inline') {
            container = container.parentElement;
        }
        const ResizeObserver = view.ResizeObserver || ResizeObserverPolyfill;
        const resizeObserver = new ResizeObserver(([entry]) => {
            if (mode === 'element') {
                // Canvas включает прозрачный запас для расширения; исходная маска — без него.
                const width = Math.max(0, entry.contentRect.width - POINTER.expansion * 2);
                const height = Math.max(0, entry.contentRect.height - POINTER.expansion * 2);

                elementRects = width > 0 && height > 0 ? [{ x: 0, y: 0, width, height }] : [];
            }
            refresh();
        });

        resizeObserver.observe(mode === 'element' ? canvas : container || root);
        const observer = new view.MutationObserver((records) => {
            const affectsLayout = records.some((record) => {
                const target =
                    record.target.nodeType === view.Node.ELEMENT_NODE
                        ? (record.target as Element)
                        : record.target.parentElement;

                // Записи Canvas и соседних Spoiler не должны запускать цикл повторных замеров.
                return !target?.closest('[data-spoiler-canvas], [data-spoiler-anchor]');
            });

            if (affectsLayout) refresh();
        });

        observer.observe(mode === 'text' ? container || root : root, {
            childList: true,
            characterData: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
        });
        const intersectionObserver = view.IntersectionObserver
            ? new view.IntersectionObserver(([entry]) => {
                  inViewport = entry.isIntersecting;
                  updatePlaying();
              })
            : undefined;

        intersectionObserver?.observe(root);
        if (reducedMotion?.addEventListener)
            reducedMotion.addEventListener('change', updatePlaying);
        else reducedMotion?.addListener(updatePlaying);
        document.fonts?.ready.then(refresh);
        document.fonts?.addEventListener('loadingdone', refresh);
        refresh();
        updatePlaying();

        return () => {
            disposed = true;
            engineRef.current = undefined;
            engine.destroy();
            resizeObserver.disconnect();
            observer.disconnect();
            intersectionObserver?.disconnect();
            if (reducedMotion?.removeEventListener)
                reducedMotion.removeEventListener('change', updatePlaying);
            else reducedMotion?.removeListener(updatePlaying);
            document.fonts?.removeEventListener('loadingdone', refresh);
        };
        // Начальное open задаётся при создании; последующие переключения не пересоздают движок.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        engineRef.current?.setOpen(open);
    }, [open, mode]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const engine = engineRef.current;

        if (engine?.syncColor()) engine.redraw();
    }, [colors]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        engineRef.current?.setInteraction(expandOnHover, repelParticlesOnHover);
    }, [expandOnHover, repelParticlesOnHover, mode]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const root = rootRef.current;
        const engine = engineRef.current;
        const document = root?.ownerDocument;
        const view = document?.defaultView;

        if (!trackPointer || !root || !engine || !document || !view) return undefined;
        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType === 'mouse') engine.setPointer(event.clientX, event.clientY);
        };
        const clearPointer = () => engine.clearPointer();

        root.addEventListener('pointermove', handlePointerMove);
        root.addEventListener('pointerleave', clearPointer);
        root.addEventListener('pointercancel', clearPointer);
        view.addEventListener('blur', clearPointer);
        document.addEventListener('scroll', clearPointer, true);

        return () => {
            // Отключение hover возвращает точки, не пересоздавая облако и его фоновую анимацию.
            clearPointer();
            root.removeEventListener('pointermove', handlePointerMove);
            root.removeEventListener('pointerleave', clearPointer);
            root.removeEventListener('pointercancel', clearPointer);
            view.removeEventListener('blur', clearPointer);
            document.removeEventListener('scroll', clearPointer, true);
        };
    }, [trackPointer, mode]);

    return { rootRef, contentRef, anchorRef, canvasRef, ready };
};
