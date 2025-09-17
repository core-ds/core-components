import { createRangeValues } from './createRangeValues';

// todo: после upgrade jest до 27+ переписать на it.each и $description
describe('Unit/utils/function/createRangeValues', () => {
    describe('Success cases', () => {
        const successCases = [
            {
                input: { min: 0, max: 10, step: 2, hasCustomDots: false },
                expected: [0, 2, 4, 6, 8, 10],
                description: 'Should generate step values when hasCustomDots is false',
            },
            {
                input: { min: 5, max: 5, step: 1, hasCustomDots: false },
                expected: [5],
                description: 'Should generate single value when min equals max',
            },
            {
                input: { min: 0, max: 1, step: 0.25, hasCustomDots: false },
                expected: [0, 0.25, 0.5, 0.75, 1],
                description: 'Should generate step values with decimal step',
            },
            {
                input: { min: 0, max: 5, step: 2, hasCustomDots: true },
                expected: [0, 1, 2, 3, 4, 5],
                description: 'Should generate integer values when hasCustomDots is true',
            },
            {
                input: { min: -3, max: 3, step: 1, hasCustomDots: true },
                expected: [-3, -2, -1, 0, 1, 2, 3],
                description: 'Should generate integer values with negative range',
            },
            {
                input: { min: 0, max: 3, step: 1 },
                expected: [0, 1, 2, 3],
                description: 'Should use default hasCustomDots value when not provided',
            },
        ];

        successCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createRangeValues(input);

                expect(result).toEqual(expected);
            });
        });
    });

    describe('Edge cases', () => {
        const edgeCases = [
            {
                input: { min: 0, max: 0.1, step: 0.01, hasCustomDots: false },
                expected: [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1],
                description: 'Should handle very small step values',
            },
            {
                input: { min: 0, max: 100, step: 50, hasCustomDots: false },
                expected: [0, 50, 100],
                description: 'Should handle large step values',
            },
            {
                input: { min: 0, max: 5, step: 10, hasCustomDots: false },
                expected: [0],
                description: 'Should handle step larger than range',
            },
            {
                input: { min: 10, max: 0, step: -2, hasCustomDots: false },
                expected: [10, 8, 6, 4, 2, 0],
                description: 'Should handle negative step values',
            },
            {
                input: { min: 0.5, max: 2.5, step: 1, hasCustomDots: false },
                expected: [0.5, 1.5, 2.5],
                description: 'Should handle decimal min and max with integer step',
            },
            {
                input: { min: 0, max: 3, step: 0, hasCustomDots: true },
                expected: [0, 1, 2, 3],
                description: 'Should handle zero step with hasCustomDots true',
            },
        ];

        edgeCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createRangeValues(input);

                expect(result).toEqual(expected);
            });
        });
    });

    describe('Error cases', () => {
        const errorCases = [
            {
                input: { min: 0, max: 10, step: 3, hasCustomDots: false },
                expected: [0, 3, 6, 9],
                description: 'Should handle invalid step that does not divide range evenly',
            },
            {
                input: { min: 5, max: 0, step: 1, hasCustomDots: false },
                expected: [],
                description: 'Should handle negative range with positive step',
            },
            {
                input: {
                    min: Number.MAX_SAFE_INTEGER - 10,
                    max: Number.MAX_SAFE_INTEGER,
                    step: 1,
                    hasCustomDots: true,
                },
                expected: {
                    length: 11,
                    first: Number.MAX_SAFE_INTEGER - 10,
                    last: Number.MAX_SAFE_INTEGER,
                },
                description: 'Should handle very large numbers',
            },
            {
                input: {
                    min: Number.MIN_SAFE_INTEGER,
                    max: Number.MIN_SAFE_INTEGER + 10,
                    step: 1,
                    hasCustomDots: true,
                },
                expected: {
                    length: 11,
                    first: Number.MIN_SAFE_INTEGER,
                    last: Number.MIN_SAFE_INTEGER + 10,
                },
                description: 'Should handle very small numbers',
            },
            {
                input: { min: NaN, max: 5, step: 1, hasCustomDots: false },
                expected: [],
                description: 'Should handle NaN values gracefully',
            },
        ];

        errorCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createRangeValues(input);

                if (
                    typeof expected === 'object' &&
                    'length' in expected &&
                    !Array.isArray(expected)
                ) {
                    expect(result.length).toBe(expected.length);
                    expect(result[0]).toBe(expected.first);
                    expect(result[result.length - 1]).toBe(expected.last);
                } else {
                    expect(result).toEqual(expected);
                }
            });
        });
    });
});
