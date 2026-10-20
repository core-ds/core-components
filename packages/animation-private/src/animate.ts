import {
    type AnyResolvedKeyframe,
    applyPxDefaults,
    buildTransform,
    calcGeneratorDuration,
    clamp,
    getComputedStyle,
    type KeyframeGenerator,
    maxGeneratorDuration,
    type MotionValue,
    motionValue,
    NativeAnimation,
    readTransformValue,
    setStyle,
    spring,
    type SpringOptions,
    type StyleKeyframesDefinition,
    time,
    transformProps,
} from 'motion';

import { sampleGenerator } from './sample-generator';

type ValueName = Extract<keyof StyleKeyframesDefinition, string>;

export type AnimationTarget = { [K in ValueName]?: number };

export type AnimationTransition = SpringOptions;

export interface AnimationControls {
    finished: Promise<void>;
    stop: () => void;
}

type Owner = ReturnType<typeof createOwner>;

interface Channel {
    value: MotionValue<number>;
    generator: KeyframeGenerator<number>;
    duration: number;
    startTime: number;
    owner: Owner;
}

interface ElementState {
    values: Map<ValueName, MotionValue<number>>;
    channels: Map<ValueName, Channel>;
    animations: Map<string, NativeAnimation<AnyResolvedKeyframe>>;
}

const sampleDelta = 10;

const states = new WeakMap<HTMLElement, ElementState>();

function createOwner(count: number) {
    let pending = count;
    let stopped = false;
    let resolve: (() => void) | undefined;
    const finished = new Promise<void>((onResolve) => {
        resolve = onResolve;
    });
    const settle = () => {
        if (!pending && !stopped) {
            resolve?.();
        }
    };

    settle();

    return {
        finished,
        complete: () => {
            pending -= 1;
            settle();
        },
        stop: () => {
            stopped = true;
        },
    };
}

const getTrack = (name: ValueName) => (transformProps.has(name) ? 'transform' : name);

const getState = (element: HTMLElement) => {
    const state = states.get(element) ?? {
        values: new Map(),
        channels: new Map(),
        animations: new Map(),
    };

    states.set(element, state);

    return state;
};

const readValue = (element: HTMLElement, name: ValueName) =>
    transformProps.has(name)
        ? readTransformValue(element, name)
        : parseFloat(getComputedStyle(element, name)) || 0;

const getValue = (element: HTMLElement, state: ElementState, name: ValueName) => {
    const value = state.values.get(name) ?? motionValue(readValue(element, name));

    state.values.set(name, value);

    return value;
};

const getLatestValues = (state: ElementState) =>
    Object.fromEntries(Array.from(state.values, ([name, value]) => [name, value.get()]));

const buildKeyframe = (track: string, latest: Record<string, number>) => {
    if (track === 'transform') {
        return buildTransform(latest, {});
    }

    const keyframes: AnyResolvedKeyframe[] = [latest[track]];

    applyPxDefaults(keyframes, track);

    return keyframes[0];
};

const complete = (state: ElementState, name: ValueName, channel: Channel) => {
    channel.value.jump(channel.generator.next(channel.duration).value);
    state.channels.delete(name);
    channel.owner.complete();
};

const release = (state: ElementState, name: ValueName, channel: Channel, now: number) => {
    if (now - channel.startTime >= channel.duration) {
        complete(state, name, channel);

        return;
    }

    const sampleTime = Math.max(sampleDelta, now - channel.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    const current = channel.generator.next(sampleTime).value;

    channel.value.setWithVelocity(
        channel.generator.next(Math.max(0, sampleTime - delta)).value,
        current,
        delta,
    );
    channel.owner.stop();
    state.channels.delete(name);
};

const render = (element: HTMLElement, state: ElementState, track: string, now: number) => {
    state.channels.forEach((channel, name) => {
        if (getTrack(name) === track && now - channel.startTime >= channel.duration) {
            complete(state, name, channel);
        }
    });

    const previous = state.animations.get(track);
    const channels = Array.from(state.channels).filter(([name]) => getTrack(name) === track);
    const latest = getLatestValues(state);

    state.animations.delete(track);

    if (!channels.length) {
        setStyle(element, track, buildKeyframe(track, latest));
        previous?.cancel();

        return;
    }

    const duration = Math.max(
        ...channels.map(([, channel]) => channel.duration - (now - channel.startTime)),
    );

    const samples = channels.map(([name, { generator, startTime }]) => {
        const offset = now - startTime;
        const { values } = sampleGenerator({
            calculatedDuration: duration,
            next: (t) => generator.next(offset + t),
        });

        return { name, values };
    });

    const keyframes = samples[0].values.map((_, index) => {
        samples.forEach(({ name, values }) => {
            latest[name] = values[index];
        });

        return buildKeyframe(track, latest);
    });

    const animation = new NativeAnimation<AnyResolvedKeyframe>({
        element,
        name: track,
        keyframes,
        duration,
        ease: 'linear',
        onComplete: () => {
            state.animations.delete(track);
            state.channels.forEach((channel, name) => {
                if (getTrack(name) === track) {
                    complete(state, name, channel);
                }
            });
        },
    });

    animation.startTime = now;
    state.animations.set(track, animation);
    previous?.cancel();
};

const renderTracks = (
    element: HTMLElement,
    state: ElementState,
    names: ValueName[],
    now: number,
) => {
    new Set(names.map(getTrack)).forEach((track) => render(element, state, track, now));
};

export function animate(
    element: HTMLElement,
    target: AnimationTarget,
    options: AnimationTransition = {},
): AnimationControls {
    const now = time.now();
    const state = getState(element);
    const entries = Object.entries(target) as Array<[ValueName, number]>;
    const owner = createOwner(entries.length);

    entries.forEach(([name, to]) => {
        const running = state.channels.get(name);

        if (running) {
            release(state, name, running, now);
        }

        const value = getValue(element, state, name);
        const generator: KeyframeGenerator<number> = spring({
            velocity: value.getVelocity(),
            ...options,
            keyframes: [value.get(), to],
        });

        state.channels.set(name, {
            value,
            generator,
            duration: Math.min(
                generator.calculatedDuration ?? calcGeneratorDuration(generator),
                maxGeneratorDuration,
            ),
            startTime: now,
            owner,
        });
    });

    renderTracks(
        element,
        state,
        entries.map(([name]) => name),
        now,
    );

    return {
        finished: owner.finished,
        stop: () => {
            const stopTime = time.now();
            const owned = Array.from(state.channels).filter(
                ([, channel]) => channel.owner === owner,
            );

            if (!owned.length) {
                return;
            }

            owner.stop();
            owned.forEach(([name, channel]) => release(state, name, channel, stopTime));
            renderTracks(
                element,
                state,
                owned.map(([name]) => name),
                stopTime,
            );
        },
    };
}
