import React, { useState } from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyCodes } from '@alfalab/data';
import { MMSP, THINSP } from '@alfalab/utils';
import { AmountInput } from './index';
import { AmountInputProps } from './Component';

describe('AmountInput', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    function renderAmountInput(
        value: AmountInputProps['value'],
        currency: CurrencyCodes | null = 'RUR',
        props: AmountInputProps = {},
    ) {
        // TODO: почему тесты в кор компонентах цепляются к data-test-id вместо label?
        const dataTestId = 'test-id';
        const { getByTestId } = render(
            <AmountInput
                value={value}
                currency={currency as CurrencyCodes}
                minority={100}
                dataTestId={dataTestId}
                {...props}
            />,
        );

        const input = getByTestId(dataTestId) as HTMLInputElement;

        return input;
    }

    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            expect(render(<AmountInput />)).toMatchSnapshot();
            expect(
                render(<AmountInput value={1234567} currency='USD' minority={100} />),
            ).toMatchSnapshot();
        });
    });

    it('should use default placeholder', () => {
        const input = renderAmountInput(null);
        expect(input.placeholder).toBe(`0${THINSP}₽`);
    });

    it('should correctly render default placeholder if currency is empty', () => {
        const input = renderAmountInput(null, null);
        expect(input.placeholder).toBe(`0${THINSP}`);
    });

    it('should use passed placeholder', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(
            <AmountInput
                value={null}
                currency='RUR'
                minority={100}
                dataTestId={dataTestId}
                placeholder='Сумма'
            />,
        );

        const input = getByTestId(dataTestId) as HTMLInputElement;
        expect(input.placeholder).toBe('Сумма');
    });

    it('should use custom suffix when currency empty', () => {
        const input = renderAmountInput(null, null, { suffix: '%' });
        expect(input.placeholder).toBe(`0${THINSP}%`);
    });

    it('should use custom suffix', () => {
        const input = renderAmountInput(null, 'RUR', { suffix: '%' });
        expect(input.placeholder).toBe(`0${THINSP}%`);
    });

    it('should use currency suffix with codeFormat=letter', () => {
        const input = renderAmountInput(null, 'RUR', { codeFormat: 'letter' });
        expect(input.placeholder).toBe(`0${THINSP}RUR`);
    });

    it('should use currency suffix with codeFormat=symbolic', () => {
        const input = renderAmountInput(null, 'RUR', { codeFormat: 'symbolic' });
        expect(input.placeholder).toBe(`0${THINSP}₽`);
    });

    it('should use currency suffix without codeFormat', () => {
        const input = renderAmountInput(null, 'RUR');
        expect(input.placeholder).toBe(`0${THINSP}₽`);
    });

    it('should allow to clean suffix when currency empty', () => {
        const input = renderAmountInput(null, null, { suffix: '' });
        expect(input.placeholder).toBe(`0${THINSP}`);
    });

    it('should allow to clean suffix', () => {
        const input = renderAmountInput(null, 'RUR', { suffix: '' });
        expect(input.placeholder).toBe(`0${THINSP}`);
    });

    it('should render passed amount', () => {
        const input = renderAmountInput(1234567);
        expect(input.value).toBe(`12${MMSP}345,67`);
    });

    it('should render passed negative amount', () => {
        const input = renderAmountInput(-1234567);
        expect(input.value).toBe(`-12${MMSP}345,67`);
    });

    it('should render passed amount without zero minor part', () => {
        const input = renderAmountInput(1234500);
        expect(input.value).toBe(`12${MMSP}345`);
    });

    it('should render empty input if passed amount.value is null', () => {
        const input = renderAmountInput(null);
        expect(input.value).toBe('');
    });

    it('should render empty input if passed amount.value is empty string', () => {
        const input = renderAmountInput('');
        expect(input.value).toBe('');
    });

    it('should render 0 in input if passed amount.value is 0', () => {
        const input = renderAmountInput(0);
        expect(input.value).toBe('0');
    });

    it('should render passed decimal amount', () => {
        const input = renderAmountInput(1234567);
        expect(input.value).toBe(`12${MMSP}345,67`);
    });

    it('should render passed decimal amount if value is string', () => {
        const input = renderAmountInput('1234567');
        expect(input.value).toBe(`12${MMSP}345,67`);
    });

    it("should replace entered '.' with ','", () => {
        const input = renderAmountInput(null, null, { positiveOnly: false, integerLength: 12 });

        fireEvent.change(input, { target: { value: '-0.' } });
        expect(input.value).toBe('-0,');

        fireEvent.change(input, { target: { value: '0.' } });
        expect(input.value).toBe('0,');

        fireEvent.change(input, { target: { value: '-123.' } });
        expect(input.value).toBe('-123,');

        fireEvent.change(input, { target: { value: '123.4' } });
        expect(input.value).toBe('123,4');

        fireEvent.change(input, { target: { value: '-123.45' } });
        expect(input.value).toBe('-123,45');

        fireEvent.change(input, { target: { value: '123456789.12' } });
        expect(input.value).toBe(`123${MMSP}456${MMSP}789,12`);
    });

    it('should allow input correct amounts', () => {
        const input = renderAmountInput(0, null, { integerLength: 12 });

        fireEvent.change(input, { target: { value: '123456' } });
        expect(input.value).toBe(`123${MMSP}456`);

        fireEvent.change(input, { target: { value: '0,' } });
        expect(input.value).toBe('0,');

        fireEvent.change(input, { target: { value: '0,2' } });
        expect(input.value).toBe('0,2');

        fireEvent.change(input, { target: { value: '123,' } });
        expect(input.value).toBe('123,');

        fireEvent.change(input, { target: { value: '123,4' } });
        expect(input.value).toBe('123,4');

        fireEvent.change(input, { target: { value: '123,45' } });
        expect(input.value).toBe('123,45');

        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input.value).toBe(`123${MMSP}456${MMSP}789`);

        fireEvent.change(input, { target: { value: '123456789,12' } });
        expect(input.value).toBe(`123${MMSP}456${MMSP}789,12`);
    });

    it('should allow input correct amounts when positiveOnly is false', () => {
        const input = renderAmountInput(0, null, { positiveOnly: false, integerLength: 13 });

        fireEvent.change(input, { target: { value: '-' } });
        expect(input.value).toBe('-');

        fireEvent.change(input, { target: { value: '-0,' } });
        expect(input.value).toBe('-0,');

        fireEvent.change(input, { target: { value: '-0,2' } });
        expect(input.value).toBe('-0,2');

        fireEvent.change(input, { target: { value: '-123456' } });
        expect(input.value).toBe(`-123${MMSP}456`);

        fireEvent.change(input, { target: { value: '-123,' } });
        expect(input.value).toBe('-123,');

        fireEvent.change(input, { target: { value: '-123,4' } });
        expect(input.value).toBe('-123,4');

        fireEvent.change(input, { target: { value: '-123,45' } });
        expect(input.value).toBe('-123,45');

        fireEvent.change(input, { target: { value: '-123456789' } });
        expect(input.value).toBe(`-123${MMSP}456${MMSP}789`);

        fireEvent.change(input, { target: { value: '-123456789,12' } });
        expect(input.value).toBe(`-123${MMSP}456${MMSP}789,12`);

        fireEvent.change(input, { target: { value: '123456' } });
        expect(input.value).toBe(`123${MMSP}456`);

        fireEvent.change(input, { target: { value: '0,' } });
        expect(input.value).toBe('0,');

        fireEvent.change(input, { target: { value: '0,2' } });
        expect(input.value).toBe('0,2');

        fireEvent.change(input, { target: { value: '123,' } });
        expect(input.value).toBe('123,');

        fireEvent.change(input, { target: { value: '123,4' } });
        expect(input.value).toBe('123,4');

        fireEvent.change(input, { target: { value: '123,45' } });
        expect(input.value).toBe('123,45');

        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input.value).toBe(`123${MMSP}456${MMSP}789`);

        fireEvent.change(input, { target: { value: '123456789,12' } });
        expect(input.value).toBe(`123${MMSP}456${MMSP}789,12`);
    });

    it("should infer 0 if only ',' is entered", () => {
        const input = renderAmountInput(null);

        fireEvent.change(input, { target: { value: ',' } });
        expect(input.value).toBe('0,');
    });

    it("should infer 0 if '-,' is entered", async () => {
        const input = renderAmountInput(null, null, { positiveOnly: false });

        fireEvent.change(input, { target: { value: '-,' } });
        expect(input.value).toBe('-0,');
    });

    it('should prevent input of incorrect values', async () => {
        const input = renderAmountInput(1234567);

        await userEvent.type(input, 'f');
        expect(input.value).toBe(`12${MMSP}345,67`);

        await userEvent.type(input, '!', { initialSelectionStart: 4, initialSelectionEnd: 4 });
        expect(input.value).toBe(`12${MMSP}345,67`);

        await userEvent.type(input, 'e', { initialSelectionStart: 0, initialSelectionEnd: 4 });
        expect(input.value).toBe(`12${MMSP}345,67`);
    });

    it('should prevent input of negative values when onlyPositive is true', () => {
        const input = renderAmountInput(null);

        fireEvent.change(input, { target: { value: '-' } });
        expect(input.value).toBe('');

        fireEvent.change(input, { target: { value: '-17700' } });
        expect(input.value).toBe('');
    });

    it('should allow enter only integer values when integersOnly is true', async () => {
        const input = renderAmountInput(12345, 'RUR', { integersOnly: true });

        expect(input.value).toBe('123,45');

        await userEvent.type(input, '1');
        expect(input.value).toBe('123');

        await userEvent.type(input, '.');
        expect(input.value).toBe('123');

        await userEvent.type(input, ',');
        expect(input.value).toBe('123');

        await userEvent.type(input, '.50');
        expect(input.value).toBe(`12${MMSP}350`);

        await userEvent.click(input);
        await act(() => {
            input.setSelectionRange(0, 3);
        });
        await userEvent.paste('123.456');
        expect(input.value).toBe('123');
    });

    it('should avoid inserting leading zero before number, but allow inserting zero', async () => {
        const input = renderAmountInput(null);
        await userEvent.type(input, '0');
        expect(input.value).toBe('0');

        await userEvent.type(input, '1234');
        expect(input.value).toBe(`1${MMSP}234`);

        await userEvent.type(input, '0', {
            initialSelectionStart: 0,
            initialSelectionEnd: 0,
            delay: 10,
        });
        expect(input.value).toBe(`1${MMSP}234`);

        fireEvent.change(input, { target: { value: '' } });
        await userEvent.type(input, '0');
        expect(input.value).toBe('0');
    });

    it('should allow replace minor part without deleting', async () => {
        const input = renderAmountInput(1234567);

        await userEvent.click(input);

        await userEvent.type(input, '8', {
            initialSelectionStart: 7,
            initialSelectionEnd: 7,
            delay: 10,
        });
        expect(input.value).toBe(`12${MMSP}345,86`);
    });

    it('should allow to paste value with spaces', async () => {
        const input = renderAmountInput(null);

        await userEvent.click(input);
        await userEvent.paste('1 23');
        expect(input.value).toBe('123');
    });

    it('should allow to paste value with invalid chars', async () => {
        const input = renderAmountInput(null);

        await userEvent.click(input);
        await userEvent.paste('1 23₽');
        expect(input.value).toBe('123');
    });

    it('should delete symbols on delete button press event', async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, '123,45');
        await userEvent.click(input);
        await userEvent.type(input, '{Delete}', {
            initialSelectionStart: 1,
            initialSelectionEnd: 1,
            delay: 10,
        });
        expect(input.value).toBe('13,45');
    });

    it('should allow set caret in the middle and enter decimal divider symbol', async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, '123456');

        await userEvent.type(input, ',', {
            initialSelectionStart: 4,
            initialSelectionEnd: 4,
            delay: 10,
        });

        expect(input.value).toBe('123,45');

        await userEvent.type(input, '.', {
            initialSelectionStart: 4,
            initialSelectionEnd: 4,
            delay: 10,
        });

        expect(input.value).toBe('123,45');
    });

    it('should not delete any symbol when caret set after space and backspace pressed', async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, '1234');
        expect(input.value).toBe(`1${MMSP}234`);

        await userEvent.type(input, '{backspace}', {
            initialSelectionStart: 2,
            initialSelectionEnd: 2,
            delay: 10,
        });

        expect(input.value).toBe(`1${MMSP}234`);
    });

    it('should render new amount from props (looped value)', async () => {
        const dataTestId = 'test-id';
        let setAmountManually: (value: number, currency: CurrencyCodes, minority: number) => void;
        const HOCWithAmountInState = () => {
            const [value, setValue] = useState<number | null>(200);
            const [currency, setCurrency] = useState<CurrencyCodes>('RUR');
            const [minority, setMinority] = useState(100);

            /* eslint-disable no-shadow */
            setAmountManually = (
                value: number | null,
                currency: CurrencyCodes,
                minority: number,
            ) => {
                setValue(value);
                setCurrency(currency);
                setMinority(minority);
            };
            /* eslint-enable no-shadow */

            return (
                <AmountInput
                    value={value}
                    currency={currency}
                    minority={minority}
                    dataTestId={dataTestId}
                    onChange={(e, payload) => setValue(payload.value)}
                />
            );
        };

        const { getByTestId } = render(<HOCWithAmountInState />);

        const input = getByTestId(dataTestId) as HTMLInputElement;

        await userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}5678');

        expect(input.value).toBe(`5${MMSP}678`);

        act(() => {
            setAmountManually(34567, 'USD', 100);
        });

        expect(input.value).toBe('345,67');

        await userEvent.clear(input);

        expect(input.value).toBe('');

        await userEvent.type(input, '0,');

        expect(input.value).toBe('0,');

        act(() => {
            setAmountManually(1, 'USD', 100);
        });

        expect(input.value).toBe('0,01');
    });

    describe('should drop decimal comma when blur for view=default', () => {
        it.each`
            initialValue | eventValue  | expectValue
            ${123456}    | ${'1234,'}  | ${`1${MMSP}234`}
            ${123456}    | ${'1234,5'} | ${`1${MMSP}234,5`}
            ${123456}    | ${'1234'}   | ${`1${MMSP}234`}
        `('drop decimal if value is $eventValue', ({ initialValue, eventValue, expectValue }) => {
            const input = renderAmountInput(initialValue, null);

            fireEvent.change(input, { target: { value: eventValue } });
            fireEvent.blur(input);

            expect(input.value).toBe(expectValue);
        });
    });

    describe('should fill minor part with view="withZeroMinorPart"', () => {
        const testCases = [
            {
                userInput: '1',
                value: 100,
                valueString: '1,00',
            },
            {
                userInput: '0',
                value: 0,
                valueString: '0,00',
            },
            {
                userInput: '1,2',
                value: 120,
                valueString: '1,20',
            },
        ];

        testCases.forEach(({ value, valueString }) => {
            it(`should contain value=${valueString} if initialValue=${value}`, () => {
                const input = renderAmountInput(value, undefined, {
                    view: 'withZeroMinorPart',
                });

                expect(input.value).toBe(valueString);
            });
        });

        testCases.forEach(({ userInput, value, valueString }) => {
            it(`should emit blur event with value=${value} and valueString=${valueString} when userInput=${userInput}`, () => {
                const onChange = jest.fn();
                const input = renderAmountInput(null, undefined, {
                    onChange,
                    view: 'withZeroMinorPart',
                });

                fireEvent.change(input, { target: { value: userInput } });
                fireEvent.blur(input);

                expect(onChange).toBeCalledWith(expect.anything(), {
                    value: value,
                    valueString: valueString,
                });
            });
        });
    });

    describe('should emit value in minority on change event', () => {
        const dataTestId = 'test-id';

        const testCases = [
            {
                minority: 100,
                userInput: '1',
                expectedValue: 100,
            },
            {
                minority: 100,
                userInput: '1,1',
                expectedValue: 110,
            },
            {
                minority: 1000,
                userInput: '2',
                expectedValue: 2000,
            },
            {
                minority: 1000,
                userInput: '2,2',
                expectedValue: 2200,
            },
            {
                minority: 100,
                userInput: '9,12',
                expectedValue: 912,
            },
        ];

        testCases.forEach(({ minority, userInput, expectedValue }) => {
            it(`should emit event with value=${expectedValue} when minority=${minority} and userInput=${userInput}`, async () => {
                const handleChangeMock = jest.fn();
                const { getByTestId } = render(
                    <AmountInput
                        minority={minority}
                        dataTestId={dataTestId}
                        onChange={handleChangeMock}
                    />,
                );
                const input = getByTestId(dataTestId) as HTMLInputElement;

                await userEvent.click(input);

                await userEvent.paste(userInput);

                expect(handleChangeMock).toBeCalledWith(expect.anything(), {
                    value: expectedValue,
                    valueString: userInput,
                });
            });
        });
    });

    it('should has passed `inputClassName` too', () => {
        const input = renderAmountInput(null, 'RUR', { inputClassName: 'foo' });
        expect(input).toHaveClass('foo');
    });

    describe('stepper tests', () => {
        it('should render stepper increment', () => {
            const dataTestId = 'test-id';

            render(<AmountInput dataTestId={dataTestId} value={1000} stepper={{ step: 1 }} />);

            expect(screen.queryByTestId(`${dataTestId}-increment-button`)).toBeInTheDocument();
        });

        it('should render stepper decrement', () => {
            const dataTestId = 'test-id';

            render(<AmountInput dataTestId={dataTestId} value={1000} stepper={{ step: 1 }} />);

            expect(screen.queryByTestId(`${dataTestId}-decrement-button`)).toBeInTheDocument();
        });

        it('should increment', () => {
            const dataTestId = 'test-id';

            const Component = () => {
                const [value, setValue] = useState(1000);
                const handleChange: AmountInputProps['onChange'] = (e, payload) => {
                    if (payload.value) {
                        setValue(payload.value);
                    }
                };

                return (
                    <AmountInput
                        dataTestId={dataTestId}
                        value={value}
                        stepper={{ step: 1 }}
                        onChange={handleChange}
                    />
                );
            };

            render(<Component />);

            const incrementButton = screen.getByTestId(`${dataTestId}-increment-button`);
            const input: HTMLInputElement = screen.getByTestId(dataTestId);

            fireEvent.click(incrementButton);
            fireEvent.click(incrementButton);

            expect(input.value).toBe('10,02');
        });

        it('should decrement', () => {
            const dataTestId = 'test-id';

            const Component = () => {
                const [value, setValue] = useState(1000);
                const handleChange: AmountInputProps['onChange'] = (e, payload) => {
                    if (payload.value) {
                        setValue(payload.value);
                    }
                };

                return (
                    <AmountInput
                        dataTestId={dataTestId}
                        value={value}
                        stepper={{ step: 1 }}
                        onChange={handleChange}
                    />
                );
            };

            render(<Component />);

            const decrementButton = screen.getByTestId(`${dataTestId}-decrement-button`);
            const input: HTMLInputElement = screen.getByTestId(dataTestId);

            fireEvent.click(decrementButton);
            fireEvent.click(decrementButton);

            expect(input.value).toBe('9,98');
        });
    });

    /**
     * + тест на адекватность (снапшот)
     * + тест на дефолтные значения (нужно разобраться про label)
     * - проброс пропсов
     * + 100003 вставить ',' после 100
     * + 100003 вставить '.' после 100
     * максимум 12 символов в мажорной части и не более 2х в минорной
     * + 1234 каретка перед двойкой backspace
     * + Тест на то что если amount зацикливать то все ок
     * - Тест при вставке невалидного символа каретка не двигается
     */
});
