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
    ['пружина по умолчанию', {}],
    ['недодемпфированная пружина', { stiffness: 300, damping: 15 }],
    ['критически демпфированная пружина', { stiffness: 100, damping: 20 }],
    ['передемпфированная пружина', { stiffness: 100, damping: 40, mass: 2 }],
    ['пружина по visualDuration/bounce', { visualDuration: 0.4, bounce: 0.2 }],
    ['пружина с начальной скоростью', { stiffness: 200, damping: 20, velocity: 1000 }],
    [
        'пружина с отрицательной начальной скоростью',
        { stiffness: 400, damping: 25, velocity: -800 },
    ],
    ['пружина по duration/bounce', { duration: 500, bounce: 0.25 }],
    ['пружина по duration без bounce', { duration: 800 }],
    ['пружина по duration с длительностью, не кратной 50 и 10 мс', { duration: 526, bounce: 0 }],
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
    describe('совпадает с JS-путём motion: JSAnimation.sample в узлах сетки generateLinearEasing', () => {
        describe.each(springs)('%s', (_, options) => {
            it.each(ranges)('из %p в %p', (from, to) => {
                expectSameAsJsPath({ ...options, type: spring, keyframes: [from, to] });
            });
        });
    });
});
