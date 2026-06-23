/* eslint-disable complexity */
import { useEffect, useRef } from 'react';

import { isSafari, isWebView, noop, useRefAsState } from '@alfalab/core-components-shared';

export interface Coords {
    startX: number | null;
    startY: number | null;
    currentX: number | null;
    currentY: number | null;
    previousX: number | null;
    previousY: number | null;
}

export type CoordsCallback = (coords: Coords) => void;
export type SwipeCallback = (coords: Coords, data: SwipeData) => void;

export interface SwipeData {
    pointerId: number | null;
    touchId: number | null;
    isTouched: boolean;
    isMoved: boolean;
    isScrolling?: boolean;
    startMoving?: boolean;
    startTime: number | null;
}

interface SwipeListeners {
    onStartSwipe?: SwipeCallback;
    onSwiping?: SwipeCallback;
    onStopSwipe?: SwipeCallback;
}

interface Listeners {
    onStartSwipe?: (coords: Coords) => void;
    onSwiping?: (coords: Coords) => void;
    onStopSwipe?: (coords: Coords) => void;
}

interface XY {
    x: number;
    y: number;
}

function isPointerEvent(event: Event): event is PointerEvent {
    return /^pointer(down|move|up|cancel|out|leave)$/.test(event.type);
}

function isTouchEvent(event: Event): event is TouchEvent {
    return /^touch(start|move|end|cancel)$/.test(event.type);
}

function isOutOfRect(
    { clientX, clientY }: { clientX: number; clientY: number },
    { left, right, top, bottom }: DOMRect,
    { x, y }: XY,
) {
    return clientX < left + x || clientX > right - x || clientY < top + y || clientY > bottom - y;
}

export function useSwipe<T extends Element>(
    direction: 'x' | 'y',
    listeners: SwipeListeners,
    options: {
        touchAngle?: number;
        threshold?: number;
        edgeThreshold?: Partial<XY>;
        touchMoveStopPropagation?: boolean;
        captureEvent?: boolean;
    } = {},
): [ref: React.Ref<T>, getStyle: () => React.CSSProperties] {
    const [ref, node] = useRefAsState<T>(null);
    const lastListeners = useRef(listeners);
    const {
        threshold = 5,
        touchAngle = 45,
        edgeThreshold,
        touchMoveStopPropagation = false,
        captureEvent = false,
    } = options;
    const xEdgeThreshold = edgeThreshold?.x ?? 10;
    const yEdgeThreshold = edgeThreshold?.y ?? 0;

    useEffect(() => {
        lastListeners.current = listeners;
    }, [listeners]);

    useEffect(() => {
        if (node) {
            const params = {
                threshold,
                touchAngle,
                edgeThreshold: { x: xEdgeThreshold, y: yEdgeThreshold },
            };

            const data: SwipeData = {
                pointerId: null,
                touchId: null,
                isTouched: false,
                isMoved: false,
                startTime: null,
            };

            const coords: Coords = {
                startX: null,
                startY: null,
                currentX: null,
                currentY: null,
                previousX: null,
                previousY: null,
            };

            const document = node.ownerDocument;

            const swipeStart = (e: Event) => {
                const event = e as PointerEvent | TouchEvent;
                const domRect = node.getBoundingClientRect();

                if (isPointerEvent(event)) {
                    if (
                        (data.pointerId !== null && data.pointerId !== event.pointerId) ||
                        isOutOfRect(event, domRect, params.edgeThreshold) ||
                        event.button > 0
                    ) {
                        return;
                    }

                    data.pointerId = event.pointerId;
                } else if (isTouchEvent(event)) {
                    if (event.targetTouches.length === 1) {
                        const [targetTouch] = event.targetTouches;

                        if (isOutOfRect(targetTouch, domRect, params.edgeThreshold)) {
                            return;
                        }

                        data.touchId = targetTouch.identifier;

                        return;
                    }

                    return;
                }

                if (data.isTouched && data.isMoved) {
                    return;
                }

                Object.assign(coords, {
                    startX: event.pageX,
                    startY: event.pageY,
                    currentX: event.pageX,
                    currentY: event.pageY,
                    previousX: null,
                    previousY: null,
                });

                Object.assign(data, {
                    isTouched: true,
                    isMoved: false,
                    isScrolling: undefined,
                    startMoving: undefined,
                    startTime: Date.now(),
                });

                event.preventDefault();

                lastListeners.current.onStartSwipe?.(coords, data);
            };

            const swipe = (event: PointerEvent | TouchEvent) => {
                let targetTouch: PointerEvent | Touch | undefined;

                if (isPointerEvent(event)) {
                    if (
                        event.pointerId !== data.pointerId ||
                        // return from pointer if we use touch
                        data.touchId !== null
                    ) {
                        return;
                    }
                    targetTouch = event;
                } else if (isTouchEvent(event)) {
                    targetTouch = Array.from(event.changedTouches).find(
                        (t) => t.identifier === data.touchId,
                    );
                }

                if (!targetTouch) {
                    return;
                }

                Object.assign(coords, {
                    previousX: coords.currentX,
                    previousY: coords.currentY,
                    currentX: targetTouch.pageX,
                    currentY: targetTouch.pageY,
                });

                const deltaX = coords.currentX! - coords.startX!;
                const deltaY = coords.currentY! - coords.startY!;

                if (Math.sqrt(deltaX ** 2 + deltaY ** 2) < params.threshold) {
                    return;
                }

                if (data.isScrolling === undefined) {
                    if (
                        (direction === 'x' && coords.currentY === coords.startY) ||
                        (direction === 'y' && coords.currentX === coords.startX)
                    ) {
                        data.isScrolling = false;
                    } else if (deltaX * deltaX + deltaY * deltaY >= 25) {
                        const angle =
                            (Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * 180) / Math.PI;

                        data.isScrolling =
                            direction === 'x'
                                ? angle > params.touchAngle
                                : 90 - angle > params.touchAngle;
                    }
                }

                if (data.startMoving === undefined) {
                    if (coords.currentX !== coords.startX || coords.currentY !== coords.startY) {
                        data.startMoving = true;
                    }
                }
                if (data.isScrolling) {
                    data.isTouched = false;

                    return;
                }
                if (!data.startMoving) {
                    return;
                }

                if (!data.isMoved) {
                    data.isMoved = true;
                }

                if (event.cancelable) {
                    event.preventDefault();
                }

                if (touchMoveStopPropagation) {
                    event.stopPropagation();
                }

                lastListeners.current.onSwiping?.(coords, data);
            };

            const swipeStop = (event: Event) => {
                let targetTouch: PointerEvent | Touch | undefined;

                if (isPointerEvent(event)) {
                    if (
                        data.touchId !== null || // return from pointer if we use touch
                        event.pointerId !== data.pointerId
                    ) {
                        return;
                    }
                    targetTouch = event;
                } else if (isTouchEvent(event)) {
                    targetTouch = Array.from(event.changedTouches).find(
                        (t) => t.identifier === data.touchId,
                    );
                }

                if (!targetTouch) {
                    return;
                }

                if (
                    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
                        event.type,
                    )
                ) {
                    const proceed =
                        ['pointercancel', 'contextmenu'].includes(event.type) &&
                        (isSafari() || isWebView());

                    if (!proceed) {
                        return;
                    }
                }

                lastListeners.current.onStopSwipe?.(coords, data);

                Object.assign(data, {
                    pointerId: null,
                    touchId: null,
                    isTouched: false,
                    isMoved: false,
                });
            };

            node.addEventListener('touchstart', swipeStart, { passive: false });
            node.addEventListener('pointerdown', swipeStart, { passive: false });
            document.addEventListener('touchmove', swipe, {
                passive: false,
                capture: captureEvent,
            });
            document.addEventListener('pointermove', swipe, {
                passive: false,
                capture: captureEvent,
            });
            document.addEventListener('touchend', swipeStop, { passive: true });
            document.addEventListener('pointerup', swipeStop, { passive: true });
            document.addEventListener('pointercancel', swipeStop, { passive: true });
            document.addEventListener('touchcancel', swipeStop, { passive: true });
            document.addEventListener('pointerout', swipeStop, { passive: true });
            document.addEventListener('pointerleave', swipeStop, { passive: true });
            document.addEventListener('contextmenu', swipeStop, { passive: true });

            return () => {
                node.removeEventListener('touchstart', swipeStart);
                node.removeEventListener('pointerdown', swipeStart);
                document.removeEventListener('touchmove', swipe, { capture: captureEvent });
                document.removeEventListener('pointermove', swipe, { capture: captureEvent });
                document.removeEventListener('touchend', swipeStop);
                document.removeEventListener('pointerup', swipeStop);
                document.removeEventListener('pointercancel', swipeStop);
                document.removeEventListener('touchcancel', swipeStop);
                document.removeEventListener('pointerout', swipeStop);
                document.removeEventListener('pointerleave', swipeStop);
                document.removeEventListener('contextmenu', swipeStop);
            };
        }

        return noop;
    }, [
        captureEvent,
        direction,
        node,
        threshold,
        touchAngle,
        touchMoveStopPropagation,
        xEdgeThreshold,
        yEdgeThreshold,
    ]);

    const getStyle = (): React.CSSProperties => ({
        touchAction: { x: 'pan-y', y: 'pan-x' }[direction],
    });

    return [ref, getStyle];
}

export function useMouseWheel<T extends Element>(
    direction: 'x' | 'y',
    listeners: Listeners,
    options: {
        angle?: number;
    } = {},
): [ref: React.Ref<T>] {
    const [ref, node] = useRefAsState<T>(null);
    const lastListeners = useRef(listeners);
    const scrollAngle = options.angle ?? 45;

    useEffect(() => {
        lastListeners.current = listeners;
    }, [listeners]);

    useEffect(() => {
        if (node) {
            let timer: number | undefined;
            let wheelActive: boolean | undefined;
            let isScrolling: boolean | undefined;

            const coords: Coords = {
                startX: null,
                startY: null,
                currentX: null,
                currentY: null,
                previousX: null,
                previousY: null,
            };

            const onWheel = (event: WheelEvent) => {
                const { deltaX, deltaY } = event;
                const a = direction === 'x' ? deltaX : deltaY;
                const b = direction === 'x' ? deltaY : deltaX;

                if (Math.abs(a) >= Math.abs(b)) {
                    event.preventDefault();
                }

                Object.assign(coords, {
                    previousX: coords.currentX,
                    previousY: coords.currentY,
                });

                coords.currentX! -= deltaX;
                coords.currentY! -= deltaY;

                if (isScrolling === undefined) {
                    if (
                        (direction === 'x' && coords.currentY === coords.startY) ||
                        (direction === 'y' && coords.currentX === coords.startX)
                    ) {
                        isScrolling = false;
                    } else {
                        const angle =
                            (Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * 180) / Math.PI;

                        isScrolling =
                            direction === 'x' ? angle > scrollAngle : 90 - angle > scrollAngle;
                    }
                }

                if (!isScrolling) {
                    lastListeners.current.onSwiping?.(coords);
                }
            };

            const wheelStart = (event: WheelEvent) => {
                Object.assign(coords, {
                    startX: event.pageX,
                    startY: event.pageY,
                    currentX: event.pageX,
                    currentY: event.pageY,
                    previousX: null,
                    previousY: null,
                });

                isScrolling = undefined;

                lastListeners.current.onStartSwipe?.(coords);
            };

            const wheelEnd = () => {
                wheelActive = false;
                lastListeners.current.onStopSwipe?.(coords);
            };

            const listener = (e: Event) => {
                const event = e as WheelEvent;

                // non-zooming wheel events only
                if (!event.ctrlKey) {
                    if (!wheelActive) {
                        wheelStart(event);
                        wheelActive = true;
                    }
                    onWheel(event);
                    clearTimeout(timer);
                    timer = window.setTimeout(() => {
                        wheelEnd();
                    }, 50);
                }
            };

            node.addEventListener('wheel', listener, { passive: false });

            return () => {
                node.removeEventListener('wheel', listener);
            };
        }

        return noop;
    }, [direction, node, options.angle, scrollAngle]);

    return [ref];
}
