import { pickAccessibilityProps } from './accessibility';

describe('Unit/utils/function/pickAccessibilityProps', () => {
    describe('Success cases', () => {
        const successTestCases = [
            {
                name: 'should extract aria- attributes from props',
                props: {
                    'aria-label': 'Test label',
                    'aria-hidden': true,
                    'aria-expanded': false,
                    className: 'test-class',
                    onClick: jest.fn(),
                },
                expected: {
                    'aria-label': 'Test label',
                    'aria-hidden': true,
                    'aria-expanded': false,
                },
            },
            {
                name: 'should extract data- attributes from props',
                props: {
                    'data-testid': 'test-component',
                    'data-tracking': 'click-event',
                    'data-value': 123,
                    className: 'test-class',
                    onClick: jest.fn(),
                },
                expected: {
                    'data-testid': 'test-component',
                    'data-tracking': 'click-event',
                    'data-value': 123,
                },
            },
            {
                name: 'should extract both aria- and data- attributes simultaneously',
                props: {
                    'aria-label': 'Button',
                    'aria-disabled': true,
                    'data-testid': 'submit-button',
                    'data-analytics': 'form-submit',
                    className: 'btn-primary',
                    disabled: false,
                },
                expected: {
                    'aria-label': 'Button',
                    'aria-disabled': true,
                    'data-testid': 'submit-button',
                    'data-analytics': 'form-submit',
                },
            },
            {
                name: 'should return an empty object when there are no aria- and data- attributes',
                props: {
                    className: 'test-class',
                    onClick: jest.fn(),
                    disabled: false,
                    children: 'Test content',
                },
                expected: {},
            },
        ];

        successTestCases.forEach(({ name, props, expected }) => {
            it(name, () => {
                const result = pickAccessibilityProps(props);

                expect(result).toEqual(expected);
            });
        });

        const valueTypeTestCases = [
            {
                name: 'string values',
                input: 'string value',
                attribute: 'aria-label',
            },
            {
                name: 'boolean values true',
                input: true,
                attribute: 'aria-expanded',
            },
            {
                name: 'boolean values false',
                input: false,
                attribute: 'aria-hidden',
            },
            {
                name: 'number values',
                input: 42,
                attribute: 'aria-level',
            },
            {
                name: 'null values',
                input: null,
                attribute: 'data-active',
            },
            {
                name: 'undefined values',
                input: undefined,
                attribute: 'data-config',
            },
        ];

        it('should handle attributes with different value types', () => {
            valueTypeTestCases.forEach(({ name, input, attribute }) => {
                const props = { [attribute]: input, className: 'test' };
                const result = pickAccessibilityProps(props);

                expect(result).toEqual({ [attribute]: input });
            });
        });
    });

    describe('Edge cases', () => {
        const edgeTestCases = [
            {
                name: 'should handle empty props object',
                props: {},
                expected: {},
            },
            {
                name: 'should handle attributes with empty strings',
                props: {
                    'aria-label': '',
                    'data-testid': '',
                    'aria-description': '   ',
                    'data-value': '0',
                },
                expected: {
                    'aria-label': '',
                    'data-testid': '',
                    'aria-description': '   ',
                    'data-value': '0',
                },
            },
            {
                name: 'should ignore attributes that only contain "aria" or "data" in the middle',
                props: {
                    'my-aria-label': 'should not match',
                    'some-data-attr': 'should not match',
                    arialabel: 'should not match',
                    datatestid: 'should not match',
                    'aria-label': 'should match',
                    'data-testid': 'should match',
                },
                expected: {
                    'aria-label': 'should match',
                    'data-testid': 'should match',
                },
            },
        ];

        edgeTestCases.forEach(({ name, props, expected }) => {
            it(name, () => {
                const result = pickAccessibilityProps(props);

                expect(result).toEqual(expected);
            });
        });

        it('should consider case in attribute names', () => {
            const props = {
                'ARIA-LABEL': 'uppercase',
                'Data-TestId': 'mixed case',
                'aria-expanded': 'lowercase aria',
                'data-testid': 'lowercase data',
            };

            const result = pickAccessibilityProps(props);

            expect(result).toEqual({
                'aria-expanded': 'lowercase aria',
                'data-testid': 'lowercase data',
            });

            expect(result).not.toHaveProperty('ARIA-LABEL');
            expect(result).not.toHaveProperty('Data-TestId');
        });

        it('should handle a large number of attributes', () => {
            const props: Record<string, unknown> = {};

            for (let i = 0; i < 100; i++) {
                props[`aria-test-${i}`] = `aria-value-${i}`;
                props[`data-test-${i}`] = `data-value-${i}`;
                props[`other-prop-${i}`] = `other-value-${i}`;
            }

            const result = pickAccessibilityProps(props);

            expect(Object.keys(result)).toHaveLength(200);
            expect(result['aria-test-0']).toBe('aria-value-0');
            expect(result['data-test-0']).toBe('data-value-0');
            expect(result).not.toHaveProperty('other-prop-0');
        });
    });

    describe('Error cases', () => {
        const errorTestCases = [
            {
                name: 'should handle props with null values',
                props: {
                    'aria-label': null,
                    'data-testid': null,
                    normalProp: null,
                },
                expected: {
                    'aria-label': null,
                    'data-testid': null,
                },
            },
            {
                name: 'should handle props with undefined values',
                props: {
                    'aria-hidden': undefined,
                    'data-value': undefined,
                    normalProp: undefined,
                },
                expected: {
                    'aria-hidden': undefined,
                    'data-value': undefined,
                },
            },
        ];

        errorTestCases.forEach(({ name, props, expected }) => {
            it(name, () => {
                const result = pickAccessibilityProps(props);

                expect(result).toEqual(expected);
            });
        });
    });
});
