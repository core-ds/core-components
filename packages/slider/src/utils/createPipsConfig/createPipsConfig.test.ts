import { createPipsConfig } from './createPipsConfig';

describe('Unit/utils/function/createPipsConfig', () => {
    describe('Success cases', () => {
        it.each([
            {
                description: 'Should create step pips config with default parameters',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step',
                    showNumbers: true,
                    pips: { mode: 'values', values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
                    customDots: [],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                },
            },
            {
                description: 'Should create custom pips config with custom dots',
                input: {
                    min: 0,
                    max: 50,
                    step: 5,
                    dotsSlider: 'custom',
                    customDots: [10, 25, 40],
                    showNumbers: true,
                },
                expected: {
                    mode: 'values',
                    values: [10, 25, 40],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
            {
                description: 'Should merge pips and custom dots when both provided',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
        ])('$description', ({ input, expected }) => {
            const result = createPipsConfig(input as any);

            expect(result).toMatchObject(expected);
        });
    });

    describe('Edge cases', () => {
        it.each([
            {
                description: 'Should return undefined when pips is not provided for step mode',
                input: {
                    min: 0,
                    max: 0,
                    step: 1,
                    dotsSlider: 'step',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: undefined,
                },
                expected: undefined,
            },
            {
                description: 'Should handle negative range with custom dots',
                input: {
                    min: -10,
                    max: 10,
                    step: 5,
                    dotsSlider: 'custom',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: [-5, 0, 5],
                },
                expected: {
                    mode: 'values',
                    values: [-5, 0, 5],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
            {
                description:
                    'Should return undefined for decimal step values when pips not provided',
                input: {
                    min: 0,
                    max: 1,
                    step: 0.25,
                    dotsSlider: 'step',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: undefined,
                },
                expected: undefined,
            },
            {
                description: 'Should handle empty custom dots array',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: [],
                },
                expected: {
                    mode: 'values',
                    values: [],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
        ])('$description', ({ input, expected }) => {
            const result = createPipsConfig(input as any);

            if (expected === undefined) {
                expect(result).toBeUndefined();
            } else {
                expect(result).toMatchObject(expected);
            }
        });
    });

    describe('Pips integration cases', () => {
        it.each([
            {
                description: 'Should merge pips values with custom dots',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
            {
                description:
                    'Should merge pips values with custom dots and hideCustomDotsNumbers=true',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom',
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
            {
                description: 'Should merge pips values with custom dots and showNumbers=false',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom',
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
        ])('$description', ({ input, expected }) => {
            const result = createPipsConfig(input as any);

            expect(result).toMatchObject(expected);
        });
    });

    describe('Return pips directly cases', () => {
        it.each([
            {
                description: 'Should return pips directly when no custom dots',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
                    customDots: undefined,
                },
                expected: { mode: 'values', values: [0, 25, 50, 75, 100] },
            },
            {
                description: 'Should return pips directly when custom dots is empty array',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
                    customDots: [],
                },
                expected: { mode: 'values', values: [0, 25, 50, 75, 100] },
            },
        ])('$description', ({ input, expected }) => {
            const result = createPipsConfig(input as any);

            expect(result).toEqual(expected);
        });
    });

    describe('Error cases', () => {
        it.each([
            {
                description: 'Should return undefined for NaN min value when pips not provided',
                input: {
                    min: NaN,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step',
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: undefined,
                },
                expected: undefined,
            },
        ])('$description', ({ input, expected }) => {
            const result = createPipsConfig(input as any);

            expect(result).toBeUndefined();
        });
    });

    describe('Function behavior', () => {
        it('Should return undefined when pips not provided for step mode', () => {
            const result = createPipsConfig({
                dotsSlider: 'step',
                showNumbers: true,
                pipsValues: [],
                customDots: [],
                hideCustomDotsNumbers: false,
            });

            expect(result).toBeUndefined();
        });

        it('Should handle different dotsSlider values', () => {
            const stepResult = createPipsConfig({
                dotsSlider: 'step',
                showNumbers: true,
                pipsValues: [],
                customDots: [],
                hideCustomDotsNumbers: false,
                pips: { mode: 'values', values: [0, 2, 4, 6, 8, 10] },
            });

            const customResult = createPipsConfig({
                dotsSlider: 'custom',
                showNumbers: true,
                pipsValues: [],
                customDots: [2, 6, 8],
                hideCustomDotsNumbers: false,
            });

            expect(stepResult).toMatchObject({
                mode: 'values',
                values: [0, 2, 4, 6, 8, 10],
            });

            expect(customResult).toMatchObject({
                mode: 'values',
                values: [2, 6, 8],
            });
        });

        it('Should extract pips values correctly', () => {
            const result = createPipsConfig({
                dotsSlider: 'custom',
                showNumbers: true,
                pipsValues: [],
                hideCustomDotsNumbers: false,
                customDots: [25, 50, 75],
                pips: { mode: 'values', values: [0, 25, 50, 75, 100] },
            });

            expect(result).toMatchObject({
                mode: 'values',
                values: expect.arrayContaining([0, 25, 50, 75, 100]),
            });
        });
    });
});
