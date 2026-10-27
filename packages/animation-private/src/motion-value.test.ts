import { motionValue, time } from 'motion';

import { createValue, getNow, getVelocity, jump, setWithVelocity } from './motion-value';

let clock = 0;

const tick = async (to: number) => {
    await Promise.resolve();
    clock = to;
};

beforeEach(async () => {
    await Promise.resolve();
    clock = 0;
    jest.spyOn(performance, 'now').mockImplementation(() => clock);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('getNow', () => {
    it('совпадает с time.now()', async () => {
        await tick(1234.5678);

        expect(getNow()).toBe(time.now());
    });

    it('кеширует значение до микротаска', async () => {
        await tick(100);

        expect(getNow()).toBe(100);
        expect(time.now()).toBe(100);

        clock = 200;

        expect(getNow()).toBe(100);
        expect(time.now()).toBe(100);

        await Promise.resolve();

        expect(getNow()).toBe(200);
        expect(time.now()).toBe(200);
    });
});

describe('createValue', () => {
    it('совпадает с motionValue по значению и скорости', async () => {
        await tick(1234.5678);

        const expected = motionValue(42.5);
        const actual = createValue(42.5);

        expect(actual.current).toBe(expected.get());
        expect(getVelocity(actual)).toBe(expected.getVelocity());
        expect(getVelocity(actual)).toBe(0);
    });
});

describe('setWithVelocity', () => {
    it.each([0, 5, 10, 3.3333333333333335])(
        'скорость совпадает с motion при delta = %p',
        async (delta) => {
            await tick(1000);

            const expected = motionValue(0);
            const actual = createValue(0);

            await tick(1234.5678);

            expected.setWithVelocity(17.123456789, 18.987654321, delta);
            setWithVelocity(actual, 17.123456789, 18.987654321, delta);

            expect(actual.current).toBe(expected.get());
            expect(getVelocity(actual)).toBe(expected.getVelocity());
        },
    );

    it.each([
        [29.9, false],
        [30, false],
        [30.1, true],
    ])('через %p мс скорость совпадает с motion (нулевая: %p)', async (elapsed, zero) => {
        await tick(1000);

        const expected = motionValue(0);
        const actual = createValue(0);

        await tick(1234.5678);

        expected.setWithVelocity(10, 20, 10);
        setWithVelocity(actual, 10, 20, 10);

        await tick(1234.5678 + elapsed);

        expect(getVelocity(actual)).toBe(expected.getVelocity());
        expect(getVelocity(actual) === 0).toBe(zero);
    });
});

describe('jump', () => {
    it('сбрасывает скорость после setWithVelocity', async () => {
        await tick(1000);

        const expected = motionValue(0);
        const actual = createValue(0);

        await tick(1016.25);

        expected.setWithVelocity(1, 7.5, 10);
        setWithVelocity(actual, 1, 7.5, 10);

        expect(getVelocity(actual)).toBe(expected.getVelocity());
        expect(getVelocity(actual)).not.toBe(0);

        await tick(1020.125);

        expected.jump(-3.75);
        jump(actual, -3.75);

        expect(actual.current).toBe(expected.get());
        expect(getVelocity(actual)).toBe(expected.getVelocity());
        expect(getVelocity(actual)).toBe(0);
    });
});

describe('цикл прерываний', () => {
    type Step = [prev: number, current: number, delta: number, elapsed: number];

    it.each<[string, Step[]]>([
        [
            'частые прерывания',
            [
                [0, 12.5, 10, 4.2],
                [12.5, 20.75, 5, 8.1],
                [20.75, 19.1, 10, 0],
            ],
        ],
        [
            'прерывания с паузами на границе окна',
            [
                [100, 87.654321, 10, 30],
                [87.654321, 80.1, 0, 30.1],
                [80.1, 60.0000001, 7.25, 12.5],
            ],
        ],
    ])('%s: совпадает с motion', async (_, steps) => {
        await tick(500.123);

        let expected = motionValue(steps[0][0]);
        let actual = createValue(steps[0][0]);

        for (const [prev, current, delta, elapsed] of steps) {
            await tick(clock + 16.6667);

            expected.setWithVelocity(prev, current, delta);
            setWithVelocity(actual, prev, current, delta);

            await tick(clock + elapsed);

            const velocity = expected.getVelocity();

            expect(getVelocity(actual)).toBe(velocity);
            expect(actual.current).toBe(expected.get());

            expected = motionValue(expected.get());
            actual = createValue(actual.current);

            expect(getVelocity(actual)).toBe(expected.getVelocity());

            expected.jump(current);
            jump(actual, current);

            expect(getVelocity(actual)).toBe(expected.getVelocity());
        }
    });
});
