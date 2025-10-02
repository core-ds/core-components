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
        defaultValue: AmountInputProps['defaultValue'],
        currency: CurrencyCodes | null = 'RUR',
        props: AmountInputProps = {},
    ) {
        // TODO: почему тесты в кор компонентах цепляются к data-test-id вместо label?
        const dataTestId = 'test-id';
        const { getByTestId } = render(
            <AmountInput
                defaultValue={defaultValue}
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
        expect(input).toHaveValue(`12${MMSP}345,67`);
    });

    it('should render passed negative amount', () => {
        const input = renderAmountInput(-1234567, 'RUR', { positiveOnly: false });
        expect(input).toHaveValue(`-12${MMSP}345,67`);
    });

    it('should render passed amount without zero minor part', () => {
        const input = renderAmountInput(1234500);
        expect(input).toHaveValue(`12${MMSP}345`);
    });

    it('should render empty input if passed amount.value is null', () => {
        const input = renderAmountInput(null);
        expect(input).toHaveValue('');
    });

    it('should render empty input if passed amount.value is empty string', () => {
        const input = renderAmountInput('');
        expect(input).toHaveValue('');
    });

    it('should render 0 in input if passed amount.value is 0', () => {
        const input = renderAmountInput(0);
        expect(input).toHaveValue('0');
    });

    it('should render passed decimal amount', () => {
        const input = renderAmountInput(1234567);
        expect(input).toHaveValue(`12${MMSP}345,67`);
    });

    it('should render passed decimal amount if value is string', () => {
        const input = renderAmountInput('1234567');
        expect(input).toHaveValue(`12${MMSP}345,67`);
    });

    it.each`
        userValue         | inputValue
        ${'-0.'}          | ${'-0,'}
        ${'-123.'}        | ${'-123,'}
        ${'123.4'}        | ${'123,4'}
        ${'-123.45'}      | ${'-123,45'}
        ${'123456789.12'} | ${`123${MMSP}456${MMSP}789,12`}
    `(
        "should replace entered '.' with ',' userValue=$userValue inputValue=$inputValue",
        async ({ userValue, inputValue }: { userValue: string; inputValue: string }) => {
            const input = renderAmountInput(null, null, { positiveOnly: false, integerLength: 12 });
            await userEvent.type(input, userValue);
            expect(input).toHaveValue(inputValue);
        },
    );

    it.each`
        userValue         | inputValue
        ${'123456'}       | ${`123${MMSP}456`}
        ${'0,'}           | ${'0,'}
        ${'0,2'}          | ${'0,2'}
        ${'123,'}         | ${'123,'}
        ${'123,4'}        | ${'123,4'}
        ${'123,45'}       | ${'123,45'}
        ${'123456789'}    | ${`123${MMSP}456${MMSP}789`}
        ${'123456789,12'} | ${`123${MMSP}456${MMSP}789,12`}
    `(
        'should allow input correct amounts userValue=$userValue inputValue=$inputValue',
        async ({ userValue, inputValue }: { userValue: string; inputValue: string }) => {
            const input = renderAmountInput(0, null, { integerLength: 12 });
            await userEvent.type(input, userValue);
            expect(input).toHaveValue(inputValue);
        },
    );

    it.each`
        userValue          | inputValue
        ${'-'}             | ${'-'}
        ${'-0,'}           | ${'-0,'}
        ${'-0,2'}          | ${'-0,2'}
        ${'-123456'}       | ${`-123${MMSP}456`}
        ${'-123,'}         | ${'-123,'}
        ${'-123,4'}        | ${'-123,4'}
        ${'-123,45'}       | ${'-123,45'}
        ${'-123456789'}    | ${`-123${MMSP}456${MMSP}789`}
        ${'-123456789,12'} | ${`-123${MMSP}456${MMSP}789,12`}
        ${'123456'}        | ${`123${MMSP}456`}
        ${'0,'}            | ${'0,'}
        ${'0,2'}           | ${'0,2'}
        ${'123,'}          | ${'123,'}
        ${'123,4'}         | ${'123,4'}
        ${'123,45'}        | ${'123,45'}
    `(
        'should allow input correct amounts when positiveOnly is false userValue=$userValue inputValue=$inputValue',
        async ({ userValue, inputValue }: { userValue: string; inputValue: string }) => {
            const input = renderAmountInput(null, null, {
                positiveOnly: false,
                integerLength: 13,
            });
            await userEvent.type(input, userValue);
            expect(input).toHaveValue(inputValue);
        },
    );

    it("should infer 0 if only ',' is entered", async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, ',');

        expect(input).toHaveValue('0,');
    });

    it("should infer 0 if '-,' is entered", async () => {
        const input = renderAmountInput(null, null, { positiveOnly: false });

        await userEvent.type(input, '-,');

        expect(input).toHaveValue('-0,');
    });

    it('should prevent input of incorrect values', async () => {
        const input = renderAmountInput(1234567);

        await userEvent.type(input, 'f');
        expect(input).toHaveValue(`12${MMSP}345,67`);

        await userEvent.type(input, '!', { initialSelectionStart: 4, initialSelectionEnd: 4 });
        expect(input).toHaveValue(`12${MMSP}345,67`);

        await userEvent.type(input, 'e', { initialSelectionStart: 0, initialSelectionEnd: 4 });
        expect(input).toHaveValue(`12${MMSP}345,67`);
    });

    it('should prevent input of negative values when onlyPositive is true', async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, '-');

        expect(input).toHaveValue('');

        await userEvent.type(input, '-17700');
        expect(input).toHaveValue(`17${MMSP}700`);
    });

    it.each`
        userValue    | inputValue
        ${'12345'}   | ${`12${MMSP}345`}
        ${'12.345'}  | ${`12${MMSP}345`}
        ${'.'}       | ${''}
        ${','}       | ${''}
        ${'.50'}     | ${'50'}
        ${'123.456'} | ${`123${MMSP}456`}
    `(
        'should allow type only integer values when integersOnly is true userValue=$userValue inputValue=$inputValue',
        async ({ userValue, inputValue }: { userValue: string; inputValue: string }) => {
            const input = renderAmountInput(null, 'RUR', { integersOnly: true });
            await userEvent.type(input, userValue);
            expect(input).toHaveValue(inputValue);
        },
    );

    it.each`
        userValue    | inputValue
        ${'12345'}   | ${`12${MMSP}345`}
        ${'12.345'}  | ${'12'}
        ${'.'}       | ${''}
        ${','}       | ${''}
        ${'.50'}     | ${''}
        ${'0.50'}    | ${'0'}
        ${'123.456'} | ${'123'}
    `(
        'should allow paste only integer values when integersOnly is true userValue=$userValue inputValue=$inputValue',
        async ({ userValue, inputValue }: { userValue: string; inputValue: string }) => {
            const input = renderAmountInput(null, 'RUR', { integersOnly: true });

            await userEvent.click(input);

            await userEvent.paste(userValue);
            expect(input).toHaveValue(inputValue);
        },
    );

    it('should avoid inserting leading zero before number, but allow inserting zero', async () => {
        const input = renderAmountInput(null);
        await userEvent.type(input, '0');
        expect(input).toHaveValue('0');

        await userEvent.type(input, '1234');
        expect(input).toHaveValue(`1${MMSP}234`);

        await userEvent.type(input, '0', {
            initialSelectionStart: 0,
            initialSelectionEnd: 0,
            delay: 10,
        });
        expect(input).toHaveValue(`1${MMSP}234`);

        fireEvent.change(input, { target: { value: '' } });
        await userEvent.type(input, '0');
        expect(input).toHaveValue('0');
    });

    it('should allow replace minor part without deleting', async () => {
        const input = renderAmountInput(1234567);

        await userEvent.click(input);

        await userEvent.type(input, '8', {
            initialSelectionStart: 7,
            initialSelectionEnd: 7,
            delay: 10,
        });
        expect(input).toHaveValue(`12${MMSP}345,86`);
    });

    it('should allow to paste value with spaces', async () => {
        const input = renderAmountInput(null);

        await userEvent.click(input);
        await userEvent.paste('1 23');
        expect(input).toHaveValue('123');
    });

    it('should allow to paste value with invalid chars', async () => {
        const input = renderAmountInput(null);

        await userEvent.click(input);
        await userEvent.paste('1 23₽');
        expect(input).toHaveValue('123');
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
        expect(input).toHaveValue('13,45');
    });

    it('should allow set caret in the middle and enter decimal divider symbol', async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, '123456');

        await userEvent.type(input, ',', {
            initialSelectionStart: 4,
            initialSelectionEnd: 4,
            delay: 10,
        });

        expect(input).toHaveValue('123,45');

        await userEvent.type(input, '.', {
            initialSelectionStart: 4,
            initialSelectionEnd: 4,
            delay: 10,
        });

        expect(input).toHaveValue('123,45');
    });

    it('should delete the symbol before the space when placing the cursor after the space and pressing the Backspace key', async () => {
        const input = renderAmountInput(null);

        await userEvent.type(input, '12345');
        expect(input).toHaveValue(`12${MMSP}345`);

        await userEvent.type(input, '{backspace}', {
            initialSelectionStart: 2,
            initialSelectionEnd: 2,
            delay: 10,
        });

        expect(input).toHaveValue(`1${MMSP}345`);
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

        expect(input).toHaveValue(`5${MMSP}678`);

        act(() => {
            setAmountManually(34567, 'USD', 100);
        });

        expect(input).toHaveValue('345,67');

        await userEvent.clear(input);

        expect(input).toHaveValue('');

        await userEvent.type(input, '0,');

        expect(input).toHaveValue('0,');

        act(() => {
            setAmountManually(1, 'USD', 100);
        });

        expect(input).toHaveValue('0,01');
    });

    describe('should drop decimal comma when blur for view=default', () => {
        it.each`
            initialValue | eventValue  | expectValue
            ${123456}    | ${'1234,'}  | ${`1${MMSP}234`}
            ${123456}    | ${'1234,5'} | ${`1${MMSP}234,50`}
            ${123456}    | ${'1234'}   | ${`1${MMSP}234`}
        `('drop decimal if value is $eventValue', ({ initialValue, eventValue, expectValue }) => {
            const input = renderAmountInput(initialValue, null);

            fireEvent.change(input, { target: { value: eventValue } });
            fireEvent.blur(input);

            expect(input).toHaveValue(expectValue);
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

        it.each(testCases)(
            'should contain value=$valueString if initialValue=$value',
            ({ value, valueString }) => {
                const input = renderAmountInput(value, undefined, {
                    view: 'withZeroMinorPart',
                });

                expect(input).toHaveValue(valueString);
            },
        );

        it.each(testCases)(
            'should emit blur event with value=$value and valueString=$valueString when userInput=$userInput',
            ({ userInput, value, valueString }) => {
                const onChange = jest.fn();
                const input = renderAmountInput(null, undefined, {
                    onChange,
                    view: 'withZeroMinorPart',
                });

                fireEvent.change(input, { target: { value: userInput } });
                fireEvent.blur(input);

                expect(onChange).toHaveBeenCalledWith(expect.anything(), {
                    value: value,
                    valueString: valueString,
                });
            },
        );
    });

    it.each([
        {
            minority: 100,
            userInput: '1',
            expectedValue: 100,
            expectedValueString: '1',
        },
        {
            minority: 100,
            userInput: '1,1',
            expectedValue: 110,
            expectedValueString: '1,10',
        },
        {
            minority: 1000,
            userInput: '2',
            expectedValue: 2000,
            expectedValueString: '2',
        },
        {
            minority: 1000,
            userInput: '2,2',
            expectedValue: 2200,
            expectedValueString: '2,200',
        },
    ])(
        'should emit change event on blur with value=$expectedValue valueString=$expectedValueString when minority=$minority and userInput=$userInput',
        async ({ minority, userInput, expectedValue, expectedValueString }) => {
            const dataTestId = 'test-id';
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

            input.blur();

            expect(handleChangeMock).toHaveBeenCalledWith(expect.anything(), {
                value: expectedValue,
                valueString: expectedValueString,
            });
        },
    );

    it.each([
        {
            minority: 100,
            userInput: '1,00',
            expectedValue: 100,
        },
        {
            minority: 100,
            userInput: '1,10',
            expectedValue: 110,
        },
        {
            minority: 1000,
            userInput: '2,000',
            expectedValue: 2000,
        },
        {
            minority: 1000,
            userInput: '2,200',
            expectedValue: 2200,
        },
        {
            minority: 100,
            userInput: '9,12',
            expectedValue: 912,
        },
    ])(
        'should emit event with value=$expectedValue when minority=$minority and userInput=$userInput',
        async ({ minority, userInput, expectedValue }) => {
            const dataTestId = 'test-id';
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

            expect(handleChangeMock).toHaveBeenCalledWith(expect.anything(), {
                value: expectedValue,
                valueString: userInput,
            });
        },
    );

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

            expect(input).toHaveValue('10,02');
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

            expect(input).toHaveValue('9,98');
        });
    });

    it.each`
        userValue   | selectionStart | selectionEnd | key            | inputValue
        ${'123.45'} | ${0}           | ${6}         | ${'Delete'}    | ${''}
        ${'123.45'} | ${0}           | ${6}         | ${'Backspace'} | ${''}
        ${'123.45'} | ${1}           | ${6}         | ${'Delete'}    | ${'1'}
        ${'123.45'} | ${1}           | ${6}         | ${'Backspace'} | ${'1'}
        ${'123.45'} | ${2}           | ${5}         | ${'Delete'}    | ${'125'}
        ${'123.45'} | ${2}           | ${5}         | ${'Backspace'} | ${'125'}
    `(
        'should has inputValue=$inputValue on input value=$userValue then selecting selectionStart=$selectionStart selectionEnd=$selectionEnd value and pressing "%s" key',
        async ({
            userValue,
            selectionStart,
            selectionEnd,
            key,
            inputValue,
        }: {
            userValue: string;
            selectionStart: number;
            selectionEnd: number;
            key: string;
            inputValue: string;
        }) => {
            const input = renderAmountInput(null, 'RUR');
            expect(input).toHaveValue('');

            await userEvent.type(input, userValue);
            expect(input).not.toHaveValue('');

            await userEvent.click(input);
            input.setSelectionRange(selectionStart, selectionEnd);
            await userEvent.keyboard(`{${key}}`);
            expect(input).toHaveValue(inputValue);
        },
    );

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
