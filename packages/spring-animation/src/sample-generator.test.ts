import {
    generateLinearEasing,
    type GeneratorFactory,
    JSAnimation,
    secondsToMilliseconds,
    spring,
    type SpringOptions,
    type ValueAnimationOptions,
} from 'motion';

import { sampleGenerator } from './sample-generator';

type Range = [from: number, to: number];

type GeneratorOptions = ValueAnimationOptions & { type: GeneratorFactory };

const springs: Array<[string, SpringOptions]> = [
    ['default spring', {}],
    ['underdamped spring', { stiffness: 300, damping: 15 }],
    ['critically damped spring', { stiffness: 100, damping: 20 }],
    ['overdamped spring', { stiffness: 100, damping: 40, mass: 2 }],
    ['spring by visualDuration/bounce', { visualDuration: 0.4, bounce: 0.2 }],
    ['spring with initial velocity', { stiffness: 200, damping: 20, velocity: 1000 }],
    ['spring with negative initial velocity', { stiffness: 400, damping: 25, velocity: -800 }],
    ['spring by duration/bounce', { duration: 500, bounce: 0.25 }],
    ['spring by duration without bounce', { duration: 800 }],
    ['spring by duration not divisible by 50 and 10 ms', { duration: 526, bounce: 0 }],
];

const ranges: Range[] = [
    [0, 100],
    [100, 0],
    [-50, 50],
    [0, 1000],
    [10, -300],
    [0, 37],
    [0, 4],
    [1, 0],
    [0, 0.3],
];

const expectSameAsJsPath = (options: GeneratorOptions) => {
    const actual = sampleGenerator(options.type({ ...options }));
    const animation = new JSAnimation({ ...options, autoplay: false });
    const duration = secondsToMilliseconds(animation.duration);
    const values: number[] = [];

    generateLinearEasing((p) => {
        values.push(animation.sample(duration * p).value);

        return p;
    }, duration);
    animation.stop();

    expect(actual.duration).toBe(duration);
    expect(actual.values).toEqual(values.map((value) => expect.closeTo(value, 9)));
};

describe('sampleGenerator', () => {
    describe('matches motion JS path: JSAnimation.sample at generateLinearEasing grid points', () => {
        describe.each(springs)('%s', (_, options) => {
            it.each(ranges)('from %p to %p', (from, to) => {
                expectSameAsJsPath({ ...options, type: spring, keyframes: [from, to] });
            });
        });
    });
});
