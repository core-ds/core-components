import {
    type AnyResolvedKeyframe,
    applyPxDefaults,
    buildTransform,
    calcGeneratorDuration,
    clamp,
    getComputedStyle,
    type KeyframeGenerator,
    maxGeneratorDuration,
    readTransformValue,
    setStyle,
    spring,
    type SpringOptions,
    type StyleKeyframesDefinition,
    transformProps,
} from 'motion';

import { findPassTime } from './find-pass-time';
import {
    createValue,
    getNow,
    getVelocity,
    jump,
    setWithVelocity,
    type Value,
} from './motion-value';
import { sampleGenerator } from './sample-generator';

type ValueName = Extract<keyof StyleKeyframesDefinition, string>;

export type AnimationTarget = { [K in ValueName]?: number };

export interface AnimationTransition extends SpringOptions {
    delay?: number;
}

export interface AnimationControls {
    finished: Promise<void>;
    passed: (name: ValueName, value: number) => Promise<void>;
    stop: () => void;
}

type Owner = ReturnType<typeof createOwner>;

interface Channel {
    value: Value;
    generator: KeyframeGenerator<number>;
    duration: number;
    startTime: number;
    owner: Owner;
}

interface ElementState {
    values: Map<ValueName, Value>;
    channels: Map<ValueName, Channel>;
    animations: Map<string, Animation>;
}

const sampleDelta = 10;

const nonNegativeValues = new Set<string>([
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingBlock',
    'paddingBlockStart',
    'paddingBlockEnd',
    'paddingInline',
    'paddingInlineStart',
    'paddingInlineEnd',
    'borderWidth',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'fontSize',
]);

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
        active: () => !stopped,
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
    const value = state.values.get(name) ?? createValue(readValue(element, name));

    state.values.set(name, value);

    return value;
};

export const resetValue = (element: HTMLElement, name: ValueName) => {
    const state = states.get(element);

    if (state && !state.channels.has(name)) {
        state.values.delete(name);
    }
};

const getLatestValues = (state: ElementState) =>
    Object.fromEntries(Array.from(state.values, ([name, value]) => [name, value.current]));

const buildKeyframe = (track: string, latest: Record<string, number>) => {
    if (track === 'transform') {
        return buildTransform(latest, {});
    }

    const keyframes: AnyResolvedKeyframe[] = [
        nonNegativeValues.has(track) ? Math.max(0, latest[track]) : latest[track],
    ];

    applyPxDefaults(keyframes, track);

    return keyframes[0];
};

const complete = (state: ElementState, name: ValueName, channel: Channel) => {
    jump(channel.value, channel.generator.next(channel.duration).value);
    state.channels.delete(name);
    channel.owner.complete();
};

const release = (state: ElementState, name: ValueName, channel: Channel, now: number) => {
    if (now - channel.startTime >= channel.duration) {
        complete(state, name, channel);

        return;
    }

    channel.owner.stop();
    state.channels.delete(name);

    if (now <= channel.startTime) {
        return;
    }

    const sampleTime = Math.max(sampleDelta, now - channel.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    const current = channel.generator.next(sampleTime).value;

    setWithVelocity(
        channel.value,
        channel.generator.next(Math.max(0, sampleTime - delta)).value,
        current,
        delta,
    );
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
            next: (t) => generator.next(Math.max(0, offset + t)),
        });

        return { name, values };
    });

    const keyframes = samples[0].values.map((_, index) => {
        samples.forEach(({ name, values }) => {
            latest[name] = values[index];
        });

        return buildKeyframe(track, latest);
    });

    const animation = element.animate({ [track]: keyframes } as PropertyIndexedKeyframes, {
        delay: 0,
        duration,
        easing: 'linear',
        fill: 'both',
        iterations: 1,
        direction: 'normal',
    });

    animation.onfinish = () => {
        setStyle(element, track, keyframes[keyframes.length - 1]);
        animation.cancel();
        state.animations.delete(track);
        state.channels.forEach((channel, name) => {
            if (getTrack(name) === track) {
                complete(state, name, channel);
            }
        });
    };
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
    { delay = 0, ...options }: AnimationTransition = {},
): AnimationControls {
    const now = getNow();
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
            velocity: getVelocity(value),
            ...options,
            keyframes: [value.current, to],
        });

        state.channels.set(name, {
            value,
            generator,
            duration: Math.min(
                generator.calculatedDuration ?? calcGeneratorDuration(generator),
                maxGeneratorDuration,
            ),
            startTime: now + delay,
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
        passed: (name, value) =>
            new Promise<void>((resolve) => {
                const channel = state.channels.get(name);
                const settle = () => {
                    if (owner.active()) {
                        resolve();
                    }
                };

                if (!channel || channel.owner !== owner) {
                    settle();

                    return;
                }

                setTimeout(
                    settle,
                    Math.max(
                        0,
                        channel.startTime +
                            findPassTime(channel.generator, channel.duration, value) -
                            getNow(),
                    ),
                );
            }),
        stop: () => {
            const stopTime = getNow();
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
