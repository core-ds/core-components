import {
    calcGeneratorDuration,
    createGeneratorEasing,
    generateLinearEasing,
    type GeneratorFactory,
    inertia,
    JSAnimation,
    keyframes,
    maxGeneratorDuration,
    progress,
    secondsToMilliseconds,
    spring,
    type SpringOptions,
    type ValueAnimationOptions,
} from 'motion';

import { sampleGenerator } from './sample-generator';

type Range = [from: number, to: number];

type GeneratorOptions = ValueAnimationOptions & { type: GeneratorFactory };

const physicsSprings: Array<[string, SpringOptions]> = [
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
];

const durationSprings: Array<[string, SpringOptions]> = [
    ['пружина по duration/bounce', { duration: 500, bounce: 0.25 }],
    ['пружина по duration без bounce', { duration: 800 }],
];

const offGridDurationSprings: Array<[string, SpringOptions]> = [
    ['пружина по duration с длительностью, не кратной 50 и 10 мс', { duration: 526, bounce: 0 }],
];

const waapiComparableSprings = [...physicsSprings, ...durationSprings];

const allSprings = [...waapiComparableSprings, ...offGridDurationSprings];

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

const expectSameAsJsPath = (options: GeneratorOptions, resolution?: number) => {
    const actual = sampleGenerator(options.type({ ...options }), resolution);
    const animation = new JSAnimation({ ...options, autoplay: false });
    const duration = Math.min(secondsToMilliseconds(animation.duration), maxGeneratorDuration);
    const values: number[] = [];

    generateLinearEasing(
        (p) => {
            values.push(animation.sample(duration * p).value);

            return p;
        },
        duration,
        resolution,
    );
    animation.stop();

    expect(actual.duration).toBe(duration);
    expect(actual.values).toEqual(values.map((value) => expect.closeTo(value, 9)));
};

const expectSameAsWaapiPath = (options: SpringOptions, [from, to]: Range, resolution?: number) => {
    const actual = sampleGenerator(spring({ ...options, keyframes: [from, to] }), resolution);
    const { ease, duration } = createGeneratorEasing(options, to - from, spring);
    const queue = actual.values.map((value) => progress(from, to, value));
    const actualLinear = generateLinearEasing(
        () => queue.shift() ?? NaN,
        actual.duration,
        resolution,
    );

    expect(actual.duration).toBe(secondsToMilliseconds(duration));
    expect(queue).toHaveLength(0);
    expect(actualLinear).toBe(
        generateLinearEasing(ease, secondsToMilliseconds(duration), resolution),
    );
};

describe('sampleGenerator', () => {
    describe('совпадает с JS-путём motion: JSAnimation.sample в узлах сетки generateLinearEasing', () => {
        describe.each(allSprings)('%s', (_, options) => {
            it.each(ranges)('из %p в %p', (from, to) => {
                expectSameAsJsPath({ ...options, type: spring, keyframes: [from, to] });
            });
        });

        it.each<[string, GeneratorOptions]>([
            [
                'keyframes с easing и несколькими ключевыми кадрами',
                { type: keyframes, keyframes: [0, 80, -20, 100], duration: 450, ease: 'easeOut' },
            ],
            [
                'keyframes с длительностью, не кратной 50 и 10 мс',
                { type: keyframes, keyframes: [0, 100], duration: 434 },
            ],
            [
                'keyframes с times и массивом easing',
                {
                    type: keyframes,
                    keyframes: [100, 0, 50],
                    times: [0, 0.3, 1],
                    duration: 600,
                    ease: ['easeIn', 'linear'],
                },
            ],
            [
                'keyframes нулевой длительности',
                { type: keyframes, keyframes: [0, 100], duration: 0 },
            ],
            [
                'keyframes короче двух шагов сетки',
                { type: keyframes, keyframes: [0, 100], duration: 10 },
            ],
            [
                'keyframes длиннее maxGeneratorDuration',
                { type: keyframes, keyframes: [0, 100], duration: 30000, ease: 'linear' },
            ],
            ['inertia без скорости', { type: inertia, keyframes: [0], velocity: 0 }],
            ['inertia без границ', { type: inertia, keyframes: [0], velocity: 800 }],
            [
                'inertia, упирающаяся в границу max',
                { type: inertia, keyframes: [0], velocity: 2000, max: 300 },
            ],
            [
                'inertia с отрицательной скоростью и границей min',
                { type: inertia, keyframes: [50], velocity: -1500, min: -200, power: 0.5 },
            ],
        ])('%s', (_, options) => {
            expectSameAsJsPath(options);
        });
    });

    describe('совпадает с WAAPI-путём motion: createGeneratorEasing + generateLinearEasing', () => {
        describe.each(waapiComparableSprings)('%s', (_, options) => {
            it.each(ranges)('из %p в %p', (from, to) => {
                expectSameAsWaapiPath(options, [from, to]);
            });
        });
    });

    describe('пружина, не успокаивающаяся за maxGeneratorDuration', () => {
        const options: SpringOptions = { stiffness: 100, damping: 0.1 };

        it('длительность ограничена maxGeneratorDuration, как в motion', () => {
            expect(calcGeneratorDuration(spring({ ...options, keyframes: [0, 100] }))).toBe(
                Infinity,
            );
            expect(sampleGenerator(spring({ ...options, keyframes: [0, 100] })).duration).toBe(
                maxGeneratorDuration,
            );
        });

        it('совпадает с JS-путём motion', () => {
            expectSameAsJsPath({ ...options, type: spring, keyframes: [0, 100] });
        });

        it('совпадает с WAAPI-путём motion', () => {
            expectSameAsWaapiPath(options, [0, 100]);
        });
    });

    describe.each([1, 16, 1000 / 60, 30, 100])('resolution %p', (resolution) => {
        it.each(allSprings)('%s совпадает с JS-путём motion', (_, options) => {
            expectSameAsJsPath({ ...options, type: spring, keyframes: [0, 250] }, resolution);
        });

        it.each(waapiComparableSprings)('%s совпадает с WAAPI-путём motion', (_, options) => {
            expectSameAsWaapiPath(options, [100, 0], resolution);
        });
    });
});
