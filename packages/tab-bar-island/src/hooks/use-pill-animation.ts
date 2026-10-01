import { type PointerEvent, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { spring } from 'motion';

import {
    clamp,
    composeDeform,
    EDGE_OVERFLOW,
    ICON_POP,
    LIFT_SCALE,
    LIFT_SPRING,
    PANEL_PULSE,
    PILL_SPRING,
    playKeyframes,
    REDUCED_MOTION_FADE,
} from '@alfalab/core-components-tab-bar-island/physics';
import { type TabBarIslandItem } from '@alfalab/core-components-tab-bar-island/types';

const SAMPLE_MS = 1000 / 60;
const MAX_SAMPLES = 600;

type Pose = {
    x: number;
    velocity: number;
    lift: number;
    liftVelocity: number;
    scaleX: number;
    scaleY: number;
    landingPeak: number;
    hasLanded: boolean;
};

const restingPose = (x: number, lift = 0): Pose => ({
    x,
    velocity: 0,
    lift,
    liftVelocity: 0,
    scaleX: 1,
    scaleY: 1,
    landingPeak: 0,
    hasLanded: false,
});

type Run = { animations: Animation[]; poses: Pose[] };
type Capsule = {
    tracker: HTMLElement;
    parts: HTMLElement[];
    background: string;
    willChange: string;
};
type Params = {
    activeKeyIndex: number;
    items: TabBarIslandItem[];
    gap: number;
    iconClassName: string;
};

/** Заранее рассчитываем кадры пружин, чтобы проигрывание не зависело от кадровых вызовов JavaScript. */
function sampleSpring(from: Pose, targetX: number, targetLift: number): Pose[] {
    const x = spring({ keyframes: [from.x, targetX], velocity: from.velocity, ...PILL_SPRING });
    const lift = spring({
        keyframes: [from.lift, targetLift],
        velocity: from.liftVelocity,
        ...LIFT_SPRING,
    });
    const poses = [from];
    let previous = from;

    for (let i = 1; i <= MAX_SAMPLES; i += 1) {
        const nextX = x.next(i * SAMPLE_MS);
        const nextLift = lift.next(i * SAMPLE_MS);

        if (nextX.done && nextLift.done) {
            poses.push(restingPose(targetX, targetLift));
            break;
        }
        const position = nextX.done ? targetX : nextX.value;
        const lifted = nextLift.done ? targetLift : nextLift.value;
        const velocity = nextX.done ? 0 : ((position - previous.x) * 1000) / SAMPLE_MS;
        const deform = composeDeform(
            velocity,
            Math.abs(targetX - position),
            previous.landingPeak,
            previous.hasLanded,
        );

        previous = {
            x: position,
            velocity,
            lift: lifted,
            liftVelocity: nextLift.done ? 0 : ((lifted - previous.lift) * 1000) / SAMPLE_MS,
            ...deform,
        };
        poses.push(previous);
        if (i === MAX_SAMPLES) {
            poses.push(restingPose(targetX, targetLift));
        }
    }

    return poses;
}

/** При прерывании восстанавливаем промежуточное состояние по текущему времени анимации браузера. */
function readPose(run: Run): Pose {
    const progress = Number(run.animations[0].currentTime ?? 0) / SAMPLE_MS;
    const index = Math.min(Math.floor(Math.max(0, progress)), run.poses.length - 1);
    const a = run.poses[index];
    const b = run.poses[Math.min(index + 1, run.poses.length - 1)];
    const t = clamp(progress - index, 0, 1);
    const mix = (key: Exclude<keyof Pose, 'hasLanded'>) => a[key] + (b[key] - a[key]) * t;

    return {
        x: mix('x'),
        velocity: mix('velocity'),
        lift: mix('lift'),
        liftVelocity: mix('liftVelocity'),
        scaleX: mix('scaleX'),
        scaleY: mix('scaleY'),
        landingPeak: mix('landingPeak'),
        hasLanded: a.hasLanded,
    };
}

export function usePillAnimation({ activeKeyIndex, items, gap, iconClassName }: Params) {
    const listRef = useRef<HTMLDivElement>(null);
    const underlayRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);
    const capsuleRef = useRef<Capsule | null>(null);
    const runRef = useRef<Run | null>(null);
    const poseRef = useRef(restingPose(0));
    const state = useRef({
        width: 0,
        height: 0,
        trackWidth: 1,
        targetX: 0,
        targetLift: 0,
        reduceMotion: false,
        mounted: false,
        pressed: false,
        activeIndex: activeKeyIndex,
    });

    const stop = useCallback(() => {
        const run = runRef.current;

        if (!run) {
            return;
        }
        poseRef.current = readPose(run);
        runRef.current = null;
        run.animations.forEach((animation) => {
            Object.assign(animation, { onfinish: null });
            animation.cancel();
        });
    }, []);

    const removeCapsule = useCallback(() => {
        const capsule = capsuleRef.current;

        if (!capsule) {
            return;
        }
        capsule.parts.forEach((part) => part.remove());
        capsule.tracker.style.background = capsule.background;
        capsule.tracker.style.willChange = capsule.willChange;
        capsuleRef.current = null;
    }, []);

    const measure = useCallback(() => {
        const wrapper = wrapperRef.current;
        const frame = frameRef.current;
        const tracker = trackerRef.current;

        if (!wrapper || !frame || !tracker) {
            return false;
        }
        const last = wrapper.lastElementChild as HTMLElement | null;

        state.current.width = frame.offsetWidth;
        state.current.height = frame.offsetHeight;
        state.current.trackWidth = Math.max(1, last?.offsetLeft ?? 0);
        if (!state.current.width || !state.current.height) {
            return false;
        }

        if (capsuleRef.current?.tracker !== tracker) {
            removeCapsule();
            const parts = ['left', 'middle', 'right'].map((name) => {
                const part = document.createElement('span');

                part.dataset.pillPart = name;
                part.setAttribute('aria-hidden', 'true');
                Object.assign(part.style, {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    pointerEvents: 'none',
                    transformOrigin: '0 0',
                    willChange: 'transform',
                });
                tracker.appendChild(part);

                return part;
            });

            capsuleRef.current = {
                tracker,
                parts,
                background: tracker.style.background,
                willChange: tracker.style.willChange,
            };
            tracker.style.background = 'none';
            tracker.style.willChange = 'auto';
        }
        const { height } = state.current;

        const borderRadii = [`${height}px 0 0 ${height}px`, '0', `0 ${height}px ${height}px 0`];

        capsuleRef.current.parts.forEach((part, index) => {
            Object.assign(part.style, {
                width: `${index === 1 ? 1 : height / 2}px`,
                height: `${height}px`,
                borderRadius: borderRadii[index],
            });
        });

        return true;
    }, [removeCapsule]);

    const targetXFor = useCallback(
        (index: number) =>
            (wrapperRef.current?.children[index] as HTMLElement | undefined)?.offsetLeft ?? 0,
        [],
    );

    const transforms = useCallback((pose: Pose) => {
        const { width, height, trackWidth } = state.current;
        const x = clamp(pose.x, -EDGE_OVERFLOW, trackWidth + EDGE_OVERFLOW);
        const shapeHeight = height * pose.scaleY;
        const shapeWidth = Math.max(shapeHeight, width * pose.scaleX);
        const left = clamp(x / trackWidth, 0, 1) * (width - shapeWidth);
        const top = (height - shapeHeight) / 2;
        const diameter = shapeHeight / height;

        return [
            `translateX(${x}px) scale(${1 + pose.lift * (LIFT_SCALE - 1)})`,
            `translate(${left}px, ${top}px) scale(${diameter})`,
            `translate(${left + shapeHeight / 2}px, ${top}px) scale(${Math.max(0, shapeWidth - shapeHeight)}, ${diameter})`,
            `translate(${left + shapeWidth - shapeHeight / 2}px, ${top}px) scale(${diameter})`,
        ];
    }, []);

    const animateToTarget = useCallback(() => {
        const frame = frameRef.current;
        const capsule = capsuleRef.current;

        if (!frame || !capsule) {
            return;
        }
        const { targetX, targetLift, reduceMotion } = state.current;
        const elements = [frame, ...capsule.parts];
        const finalPose = restingPose(targetX, targetLift);
        const finalTransforms = transforms(finalPose);

        // Заранее задаём стили покоя, которые применятся после завершения или отмены анимаций.
        elements.forEach((element, index) => {
            Object.assign(element.style, { transform: finalTransforms[index] });
        });
        if (reduceMotion || typeof frame.animate !== 'function') {
            poseRef.current = finalPose;

            return;
        }
        const poses = sampleSpring(poseRef.current, targetX, targetLift);
        const frames = poses.map(transforms);
        const duration = (poses.length - 1) * SAMPLE_MS;
        const animations = elements.map((element, index) =>
            element.animate(
                frames.map((values) => ({ transform: values[index] })),
                { duration, easing: 'linear', fill: 'both' },
            ),
        );
        const run = { animations, poses };

        runRef.current = run;
        animations[0].onfinish = () => {
            if (runRef.current !== run) {
                return;
            }
            poseRef.current = finalPose;
            runRef.current = null;
            animations.forEach((animation) => {
                Object.assign(animation, { onfinish: null });
                animation.cancel();
            });
        };
    }, [transforms]);

    const snap = useCallback(() => {
        stop();
        if (state.current.activeIndex < 0 || !measure()) {
            return;
        }
        state.current.targetX = targetXFor(state.current.activeIndex);
        state.current.targetLift = 0;
        state.current.pressed = false;
        poseRef.current = restingPose(state.current.targetX);
        const elements = [frameRef.current!, ...capsuleRef.current!.parts];

        transforms(poseRef.current).forEach((value, i) => {
            elements[i].style.transform = value;
        });
    }, [measure, stop, targetXFor, transforms]);

    useLayoutEffect(() => {
        state.current.activeIndex = activeKeyIndex;
        stop();
        if (activeKeyIndex < 0) {
            state.current.mounted = false;
            removeCapsule();

            return;
        }
        state.current.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!state.current.mounted) {
            state.current.mounted = true;
            snap();

            return;
        }
        if (!measure()) {
            return;
        }
        state.current.targetX = targetXFor(activeKeyIndex);
        state.current.targetLift = 0;
        state.current.pressed = false;
        poseRef.current = { ...poseRef.current, landingPeak: 0, hasLanded: false };
        animateToTarget();
        if (state.current.reduceMotion) {
            if (frameRef.current) {
                playKeyframes(frameRef.current, REDUCED_MOTION_FADE, 1);
            }
        } else {
            const icon = wrapperRef.current?.children[activeKeyIndex]?.querySelector<HTMLElement>(
                `.${iconClassName}`,
            );

            if (icon) {
                playKeyframes(icon, ICON_POP, 1);
            }
        }
    }, [
        activeKeyIndex,
        iconClassName,
        animateToTarget,
        measure,
        removeCapsule,
        snap,
        stop,
        targetXFor,
    ]);

    useLayoutEffect(() => {
        snap();
    }, [gap, items.length, snap]);

    useEffect(() => {
        const list = listRef.current;

        if (!list || typeof ResizeObserver === 'undefined') {
            return undefined;
        }
        let width = list.offsetWidth;
        let height = list.offsetHeight;
        const observer = new ResizeObserver(() => {
            // Первый вызов наблюдателя не должен отменять анимацию, запущенную в этом кадре.
            const nextWidth = list.offsetWidth;
            const nextHeight = list.offsetHeight;

            if (nextWidth !== width || nextHeight !== height) {
                width = nextWidth;
                height = nextHeight;
                snap();
            }
        });

        observer.observe(list);

        return () => observer.disconnect();
    }, [snap]);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            state.current.reduceMotion = query.matches;
            snap();
        };

        query.addEventListener('change', update);

        return () => query.removeEventListener('change', update);
    }, [snap]);

    useEffect(
        () => () => {
            stop();
            removeCapsule();
            state.current.mounted = false;
        },
        [removeCapsule, stop],
    );

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        const wrapper = wrapperRef.current;

        if (state.current.reduceMotion || !wrapper) {
            return;
        }
        const index = Array.prototype.findIndex.call(wrapper.children, (tab: Element) =>
            tab.contains(event.target as Node),
        );

        if (index < 0 || items[index]?.disabled) {
            return;
        }
        [underlayRef.current, wrapperRef.current, trackRef.current].forEach((element) => {
            if (element) {
                playKeyframes(element, PANEL_PULSE, 1);
            }
        });
        if (index !== state.current.activeIndex) {
            return;
        }
        stop();
        state.current.pressed = true;
        state.current.targetLift = 1;
        if (measure()) {
            animateToTarget();
        }
    };

    const handlePointerUp = () => {
        if (state.current.reduceMotion || !state.current.pressed) {
            return;
        }
        stop();
        state.current.pressed = false;
        state.current.targetLift = 0;
        animateToTarget();
    };

    return {
        listRef,
        underlayRef,
        wrapperRef,
        trackRef,
        frameRef,
        trackerRef,
        handlePointerDown,
        handlePointerUp,
    };
}
