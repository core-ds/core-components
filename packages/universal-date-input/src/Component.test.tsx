import React from 'react';
import { DATE_RANGE_SEPARATOR, DATE_TIME_SEPARATOR } from './consts';
import { UniversalDateInputDesktop } from './desktop';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('UniversalDateInput', () => {
    describe('Snapshot tests', () => {
        const tests = [
            { view: 'date', value: '01.01.2020' },
            { view: 'date-time', value: `01.01.2020${DATE_TIME_SEPARATOR}00:00` },
            { view: 'date-range', value: `01.01.2020${DATE_RANGE_SEPARATOR}02.02.2025` },
            { view: 'time', value: `00:00` },
        ];

        for (const props of tests) {
            const { view, value } = props;
            it('should match snapshot', () => {
                expect(
                    render(<UniversalDateInputDesktop view={view as any} value={value} />)
                        .container,
                ).toMatchSnapshot();
            });
        }
    });

    describe('DateInput onChange tests', () => {
        const tests: Array<[{ value: string }, [Object, { value: string }]]> = [
            [{ value: '5' }, [expect.any(Object), { value: '05' }]],
            [{ value: '35' }, [expect.any(Object), { value: '31' }]],
            [{ value: '1215' }, [expect.any(Object), { value: '12.12' }]],
            [{ value: '12152022' }, [expect.any(Object), { value: '12.12.2022' }]],
        ];

        for (const [{ value }, result] of tests) {
            it(`should call with ${result[1].value}`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='date' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, value);

                expect(onChange).toBeCalledWith(...result);
            });
        }
    });

    describe('DateTimeInput onChange tests', () => {
        const tests: Array<[{ value: string }, [Object, { value: string }]]> = [
            [
                { value: '121520223' },
                [expect.any(Object), { value: `12.12.2022${DATE_TIME_SEPARATOR}03` }],
            ],
            [
                { value: '1215202236' },
                [expect.any(Object), { value: `12.12.2022${DATE_TIME_SEPARATOR}03:06` }],
            ],
        ];

        for (const [{ value }, result] of tests) {
            it(`should call with ${result[1].value}`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='date-time' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, value);

                expect(onChange).toBeCalledWith(...result);
            });
        }
    });

    describe('DateRangeInput onChange tests', () => {
        const tests: Array<[{ value: string }, [Object, { value: string }]]> = [
            [
                { value: '121520223' },
                [expect.any(Object), { value: `12.12.2022${DATE_RANGE_SEPARATOR}3` }],
            ],
            [
                { value: '1215202236' },
                [expect.any(Object), { value: `12.12.2022${DATE_RANGE_SEPARATOR}31` }],
            ],
            [
                { value: '12152022363' },
                [expect.any(Object), { value: `12.12.2022${DATE_RANGE_SEPARATOR}31.03` }],
            ],
            [
                { value: '121520223632' },
                [expect.any(Object), { value: `12.12.2022${DATE_RANGE_SEPARATOR}31.03.2` }],
            ],
            [
                { value: '121520223632222' },
                [expect.any(Object), { value: `12.12.2022${DATE_RANGE_SEPARATOR}31.12.2124` }],
            ],
        ];

        for (const [{ value }, result] of tests) {
            it(`should call with ${result[1].value}`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='date-range' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, value);

                expect(onChange).toBeCalledWith(...result);
            });
        }
    });

    describe('DateInput onComplete test', () => {
        it(`should call onComplete`, async () => {
            const onComplete = jest.fn();
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='date' onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            await userEvent.type(input, '12122022');

            expect(onComplete).toBeCalledTimes(1);
            expect(onComplete).toBeCalledWith('12.12.2022', new Date('2022-12-12'));
        });
    });

    describe('DateTimeInput onComplete test', () => {
        it(`should call onComplete`, async () => {
            const onComplete = jest.fn();
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='date-time' onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            await userEvent.type(input, '121220221212');

            expect(onComplete).toBeCalledTimes(1);
            expect(onComplete).toBeCalledWith(
                `12.12.2022${DATE_TIME_SEPARATOR}12:12`,
                new Date('2022-12-12T12:12:00'),
            );
        });
    });

    describe('DateRangeInput onComplete test', () => {
        it(`should call onComplete`, async () => {
            const onComplete = jest.fn();
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='date-range' onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            await userEvent.type(input, '1212202212122023');

            expect(onComplete).toBeCalledTimes(1);
            expect(onComplete).toBeCalledWith(
                `12.12.2022${DATE_RANGE_SEPARATOR}12.12.2023`,
                new Date('2022-12-12'),
                new Date('2023-12-12'),
            );
        });
    });

    describe('TimeInput onComplete test', () => {
        it(`should call onComplete`, async () => {
            const onComplete = jest.fn();
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='time' onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            await userEvent.type(input, '1212');

            expect(onComplete).toBeCalledTimes(1);
            expect(onComplete).toBeCalledWith('12:12');
        });
    });
});
