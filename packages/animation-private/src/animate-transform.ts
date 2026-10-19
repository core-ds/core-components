import {
    buildTransform,
    calcGeneratorDuration,
    clamp,
    type KeyframeGenerator,
    maxGeneratorDuration,
    type MotionValue,
    motionValue,
    NativeAnimation,
    readTransformValue,
    setStyle,
    spring,
    type SpringOptions,
    time,
    type TransformProperties,
} from 'motion';

import { sampleGenerator } from './sample-generator';

type TransformName = keyof TransformProperties;

export type TransformTarget = Partial<Record<TransformName, number>>;

export type TransformTransition = SpringOptions;

export interface TransformAnimation {
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
    values: Map<TransformName, MotionValue<number>>;
    channels: Map<TransformName, Channel>;
}

const sampleDelta = 10;

const states = new WeakMap<HTMLElement, ElementState>();

const animations = new WeakMap<HTMLElement, NativeAnimation<string>>();

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

const getState = (element: HTMLElement) => {
    const state = states.get(element) ?? { values: new Map(), channels: new Map() };

    states.set(element, state);

    return state;
};

const getValue = (element: HTMLElement, state: ElementState, name: TransformName) => {
    const value = state.values.get(name) ?? motionValue(readTransformValue(element, name));

    state.values.set(name, value);

    return value;
};

const getLatestValues = (state: ElementState) =>
    Object.fromEntries(Array.from(state.values, ([name, value]) => [name, value.get()]));

const complete = (state: ElementState, name: TransformName, channel: Channel) => {
    channel.value.jump(channel.generator.next(channel.duration).value);
    state.channels.delete(name);
    channel.owner.complete();
};

const release = (state: ElementState, name: TransformName, channel: Channel, now: number) => {
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

const render = (element: HTMLElement, state: ElementState, now: number) => {
    state.channels.forEach((channel, name) => {
        if (now - channel.startTime >= channel.duration) {
            complete(state, name, channel);
        }
    });

    const previous = animations.get(element);
    const channels = Array.from(state.channels);
    const latest = getLatestValues(state);

    animations.delete(element);

    if (!channels.length) {
        setStyle(element, 'transform', buildTransform(latest, {}));
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

        return buildTransform(latest, {});
    });
    const animation = new NativeAnimation({
        element,
        name: 'transform',
        keyframes,
        duration,
        ease: 'linear',
        onComplete: () => {
            animations.delete(element);
            state.channels.forEach((channel, name) => complete(state, name, channel));
        },
    });

    animation.startTime = now;
    animations.set(element, animation);
    previous?.cancel();
};

export function animateTransform(
    element: HTMLElement,
    target: TransformTarget,
    options: TransformTransition = {},
): TransformAnimation {
    const now = time.now();
    const state = getState(element);
    const entries = Object.entries(target) as Array<[TransformName, number]>;
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

    if (entries.length) {
        render(element, state, now);
    }

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
            render(element, state, stopTime);
        },
    };
}
