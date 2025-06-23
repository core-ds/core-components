import React from 'react';
import { DATE_RANGE_SEPARATOR, DATE_TIME_SEPARATOR } from './consts';
import { UniversalDateInputDesktop } from './desktop';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getUniversalDateInputTestIds } from './utils';
import { Calendar } from '../../calendar/src';

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
            { view: 'date', value: new Date('2020-01-01') },
            { view: 'date-time', value: new Date('2020-01-01T00:00') },
            {
                view: 'date-range',
                value: { dateFrom: new Date('2020-01-01'), dateTo: new Date('2025-02-02') },
            },
            { view: 'time', value: `00:00` },
        ];

        for (const props of tests) {
            const { view, value } = props;
            it('should match snapshot', () => {
                expect(
                    render(<UniversalDateInputDesktop view={view as any} value={value as any} />)
                        .container,
                ).toMatchSnapshot();
            });
        }
    });

    describe('DateInput tests', () => {
        it('should set default value to input', () => {
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='date' defaultValue={new Date('2022-12-12')} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe(`12.12.2022`);
        });

        it('should set value to input', () => {
            const { queryByRole, rerender } = render(
                <UniversalDateInputDesktop view='date' value={new Date('2022-12-12')} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe(`12.12.2022`);

            rerender(<UniversalDateInputDesktop view='date' value={new Date('2024-12-12')} />);
            expect(input.value).toBe(`12.12.2024`);
        });

        describe('onInputChange tests', () => {
            const tests: Array<[{ value: string }, [Object, { value: string }]]> = [
                [{ value: '5' }, [expect.any(Object), { value: '05' }]],
                [{ value: '35' }, [expect.any(Object), { value: '31' }]],
                [{ value: '1215' }, [expect.any(Object), { value: '12.12' }]],
                [{ value: '12152022' }, [expect.any(Object), { value: '12.12.2022' }]],
            ];

            for (const [{ value }, result] of tests) {
                it(`should call with ${result[1].value}`, async () => {
                    const onInputChange = jest.fn();
                    const { queryByRole } = render(
                        <UniversalDateInputDesktop view='date' onInputChange={onInputChange} />,
                    );

                    const input = queryByRole('textbox') as HTMLInputElement;
                    await userEvent.type(input, value);

                    expect(onInputChange).toBeCalledWith(...result);
                });
            }
        });

        describe('onChange test', () => {
            it(`should call onChange`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='date' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '12122022');

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith(new Date('2022-12-12'), '12.12.2022');
            });

            it(`should call onChange when clear input`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop
                        view='date'
                        onChange={onChange}
                        defaultValue={new Date('2022-12-12')}
                    />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '{Backspace}', {
                    initialSelectionStart: 0,
                    initialSelectionEnd: 10,
                });

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith(null, '');
            });
        });

        describe('onClear test', () => {
            it(`should call onClear when controlled`, async () => {
                const onClear = jest.fn();
                const { getByRole } = render(
                    <UniversalDateInputDesktop
                        view='date'
                        clear
                        onClear={onClear}
                        value={new Date('2022-12-12')}
                    />,
                );

                fireEvent.click(getByRole('button', { name: 'Очистить' }));

                expect(onClear).toBeCalledTimes(1);
            });

            it(`should clear input when uncontrolled`, async () => {
                const { getByRole } = render(<UniversalDateInputDesktop view='date' clear />);

                const input = getByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '12122024');

                expect(input.value).toBe('12.12.2024');

                fireEvent.click(getByRole('button', { name: 'Очистить' }));

                expect(input.value).toBe('');
            });
        });
    });

    describe('DateTimeInput tests', () => {
        it('should set default value to input', () => {
            const { queryByRole } = render(
                <UniversalDateInputDesktop
                    view='date-time'
                    defaultValue={new Date('2022-12-12')}
                />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe(`12.12.2022${DATE_TIME_SEPARATOR}00:00`);
        });

        it('should set value to input', () => {
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='date-time' value={new Date('2022-12-12')} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe(`12.12.2022${DATE_TIME_SEPARATOR}00:00`);
        });

        it('should not show an error', () => {
            const dataTestId = 'test-id';

            const { queryByText } = render(
                <UniversalDateInputDesktop
                    dataTestId={dataTestId}
                    view='date-time'
                    value={new Date().getTime()}
                    minDate={new Date().getTime()}
                />,
            );
            const errorMessageText = 'Эта дата недоступна';
            expect(queryByText(errorMessageText)).toBeNull();
        });

        describe('onInputChange tests', () => {
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
                    const onInputChange = jest.fn();
                    const { queryByRole } = render(
                        <UniversalDateInputDesktop
                            view='date-time'
                            onInputChange={onInputChange}
                        />,
                    );

                    const input = queryByRole('textbox') as HTMLInputElement;
                    await userEvent.type(input, value);

                    expect(onInputChange).toBeCalledWith(...result);
                });
            }
        });

        describe('DateTimeInput onChange test', () => {
            it(`should call onChange`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='date-time' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '121220221212');

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith(
                    new Date('2022-12-12T12:12:00'),
                    `12.12.2022${DATE_TIME_SEPARATOR}12:12`,
                );
            });

            it(`should call onChange when clear input`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop
                        view='date-time'
                        onChange={onChange}
                        defaultValue={new Date('2022-12-12')}
                    />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '{Backspace}', {
                    initialSelectionStart: 0,
                    initialSelectionEnd: 17,
                });

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith(null, '');
            });
        });
    });

    describe('DateRangeInput tests', () => {
        it('should set default value to input', () => {
            const { queryByRole } = render(
                <UniversalDateInputDesktop
                    view='date-range'
                    defaultValue={{
                        dateFrom: new Date('2022-12-12'),
                        dateTo: new Date('2022-12-13'),
                    }}
                />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe(`12.12.2022${DATE_RANGE_SEPARATOR}13.12.2022`);
        });

        it('should set value to input', () => {
            const { queryByRole, rerender } = render(
                <UniversalDateInputDesktop
                    view='date-range'
                    value={{
                        dateFrom: new Date('2022-12-12'),
                        dateTo: new Date('2022-12-13'),
                    }}
                />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe(`12.12.2022${DATE_RANGE_SEPARATOR}13.12.2022`);

            rerender(
                <UniversalDateInputDesktop
                    view='date-range'
                    value={{
                        dateFrom: new Date('2021-12-12'),
                        dateTo: new Date('2024-12-13'),
                    }}
                />,
            );
            expect(input.value).toBe(`12.12.2021${DATE_RANGE_SEPARATOR}13.12.2024`);
        });

        it('should call onBlur callback', async () => {
            const onBlur = jest.fn();

            const { queryByRole } = render(
                <UniversalDateInputDesktop
                    view='date-range'
                    onBlur={onBlur}
                    picker={true}
                    Calendar={Calendar}
                />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.click(input);
            fireEvent.blur(input);

            expect(onBlur).toBeCalledTimes(1);
        });

        describe('onInputChange tests', () => {
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
                    const onInputChange = jest.fn();
                    const { queryByRole } = render(
                        <UniversalDateInputDesktop
                            view='date-range'
                            onInputChange={onInputChange}
                        />,
                    );

                    const input = queryByRole('textbox') as HTMLInputElement;
                    await userEvent.type(input, value);

                    expect(onInputChange).toBeCalledWith(...result);
                });
            }
        });

        describe('onChange test', () => {
            it(`should call onChange`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='date-range' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '1212202212122023');

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith(
                    {
                        dateFrom: new Date('2022-12-12'),
                        dateTo: new Date('2023-12-12'),
                    },
                    `12.12.2022${DATE_RANGE_SEPARATOR}12.12.2023`,
                );
            });

            it(`should call onChange when clear input`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop
                        view='date-range'
                        onChange={onChange}
                        defaultValue={{
                            dateFrom: new Date('2022-12-12'),
                            dateTo: new Date('2023-12-12'),
                        }}
                    />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '{Backspace}', {
                    initialSelectionStart: 0,
                    initialSelectionEnd: 23,
                });

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith({ dateFrom: null, dateTo: null }, '');
            });
        });
    });

    describe('TimeInput tests', () => {
        it('should set default value to input', () => {
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='time' defaultValue={'12:12'} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe('12:12');
        });

        it('should set value to input', () => {
            const { queryByRole } = render(
                <UniversalDateInputDesktop view='time' value={'12:12'} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;
            expect(input.value).toBe('12:12');
        });

        describe('onChange test', () => {
            it(`should call onChange`, async () => {
                const onChange = jest.fn();
                const { queryByRole } = render(
                    <UniversalDateInputDesktop view='time' onChange={onChange} />,
                );

                const input = queryByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '1212');

                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith('12:12');
            });
        });

        describe('onClear test', () => {
            it(`should call onClear when controlled`, async () => {
                const onClear = jest.fn();
                const { getByRole } = render(
                    <UniversalDateInputDesktop view='time' clear onClear={onClear} value='00:00' />,
                );

                fireEvent.click(getByRole('button', { name: 'Очистить' }));

                expect(onClear).toBeCalledTimes(1);
            });

            it(`should clear input when uncontrolled`, async () => {
                const { getByRole } = render(<UniversalDateInputDesktop view='time' clear />);

                const input = getByRole('textbox') as HTMLInputElement;
                await userEvent.type(input, '1212');

                expect(input.value).toBe('12:12');

                fireEvent.click(getByRole('button', { name: 'Очистить' }));

                expect(input.value).toBe('');
            });
        });
    });

    describe('Snapshots tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';

            const { getByTestId, getByRole } = render(
                <UniversalDateInputDesktop
                    error='error message'
                    leftAddons={<span />}
                    rightAddons={<span />}
                    view='date'
                    dataTestId={dataTestId}
                />,
            );

            const testIds = getUniversalDateInputTestIds(dataTestId);
            expect(getByTestId(testIds.input)).toBeInTheDocument();
            expect(getByTestId(testIds.componentWrapper)).toBeInTheDocument();
            expect(getByTestId(testIds.inputWrapper)).toBeInTheDocument();
            expect(getByTestId(testIds.inputWrapperInner)).toBeInTheDocument();
            expect(getByTestId(testIds.leftAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.rightAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.error)).toBeInTheDocument();

            const { getByTestId: getByTestIdHint } = render(
                <UniversalDateInputDesktop view='date' dataTestId={dataTestId} hint='hint' />,
            );

            expect(getByTestIdHint(testIds.hint)).toBeInTheDocument();
        });
    });
});
