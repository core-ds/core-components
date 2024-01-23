import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getNumberInputTestIds } from './utils';

import { NumberInput, NumberInputProps } from '.';

describe('NumberInput', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            expect(render(<NumberInput value='1234.567' />).container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const dti = 'number-input-dti';
        const { getByTestId } = render(
            <NumberInput
                block={true}
                dataTestId={dti}
                error='error message'
                leftAddons={<span />}
                rightAddons={<span />}
            />,
        );

        const testIds = getNumberInputTestIds(dti);

        expect(getByTestId(testIds.input)).toBeInTheDocument();
        expect(getByTestId(testIds.inputWrapper)).toBeInTheDocument();
        expect(getByTestId(testIds.inputWrapperInner)).toBeInTheDocument();
        expect(getByTestId(testIds.leftAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.rightAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.error)).toBeInTheDocument();
    });

    it('should set `data-test-id` attribute for hint, decrement, increment', () => {
        const dti = 'number-input-dti';
        const { getByTestId } = render(
            <NumberInput block={true} dataTestId={dti} step={1} hint='hint' />,
        );

        const testIds = getNumberInputTestIds(dti);

        expect(getByTestId(testIds.decrementButton)).toBeInTheDocument();
        expect(getByTestId(testIds.incrementButton)).toBeInTheDocument();
        expect(getByTestId(testIds.hint)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<NumberInput className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set `disabled` atribute', () => {
        const dataTestId = 'test-id';
        const incrementButtonId = dataTestId + '-increment-button';
        const decrementButtonId = dataTestId + '-decrement-button';
        const { getByTestId } = render(
            <NumberInput disabled={true} dataTestId={dataTestId} step={1} />,
        );

        expect(getByTestId(dataTestId)).toHaveAttribute('disabled');
        expect(getByTestId(incrementButtonId)).toHaveAttribute('disabled');
        expect(getByTestId(decrementButtonId)).toHaveAttribute('disabled');

        expect(getByTestId(dataTestId)).toHaveAttribute('disabled');
    });

    it('should decrement button disabled', () => {
        const dataTestId = 'test-id';
        const decrementButtonId = dataTestId + '-decrement-button';
        const incrementButtonId = dataTestId + '-increment-button';
        const { getByTestId } = render(
            <NumberInput value={10} min={10} dataTestId={dataTestId} step={1} />,
        );

        expect(getByTestId(decrementButtonId)).toHaveAttribute('disabled');
        expect(getByTestId(incrementButtonId)).not.toHaveAttribute('disabled');
    });

    it('should increment button disabled', () => {
        const dataTestId = 'test-id';
        const decrementButtonId = dataTestId + '-decrement-button';
        const incrementButtonId = dataTestId + '-increment-button';
        const { getByTestId } = render(
            <NumberInput value={10} max={10} dataTestId={dataTestId} step={1} />,
        );

        expect(getByTestId(decrementButtonId)).not.toHaveAttribute('disabled');
        expect(getByTestId(incrementButtonId)).toHaveAttribute('disabled');
    });

    it('should render error icon', () => {
        const { container } = render(<NumberInput error={true} />);

        expect(container.getElementsByClassName('errorIcon').length).toBe(1);
    });

    it('should render success icon', () => {
        const { container } = render(<NumberInput success={true} />);

        expect(container.getElementsByClassName('successIcon').length).toBe(1);
    });

    it('should not render success icon if has error', () => {
        const { container } = render(<NumberInput success={true} error={true} />);

        expect(container.getElementsByClassName('successIcon').length).toBe(0);
    });

    describe('Controlled-way', () => {
        it('should set value to input without minus sign', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <NumberInput onChange={cb} min={0} dataTestId={dataTestId} />,
            );

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.input(inputNumber, { target: { value: '-' } });
            expect(inputNumber.value).toBe('');

            fireEvent.input(inputNumber, { target: { value: '123' } });
            expect(inputNumber.value).toBe('123');
        });
    });

    describe('Callbacks tests', () => {
        it('should increase value by 3', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const incrementButtonId = dataTestId + '-increment-button';
            const { getByTestId } = render(
                <NumberInput value={10} onChange={cb} dataTestId={dataTestId} step={3} />,
            );

            fireEvent.click(getByTestId(incrementButtonId));

            expect(cb).toBeCalledWith(expect.any(Object), { value: 13 });
        });

        it('should decrease value by 3', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const decrementButtonId = dataTestId + '-decrement-button';
            const { getByTestId } = render(
                <NumberInput value={10} onChange={cb} dataTestId={dataTestId} step={3} />,
            );

            fireEvent.click(getByTestId(decrementButtonId));

            expect(cb).toBeCalledWith(expect.any(Object), { value: 7 });
        });

        it('should call onChange with valid value if max min is set', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { rerender, getByTestId } = render(
                <NumberInput min={10} max={50} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.input(getByTestId(dataTestId), { target: { value: 1 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: 1 });

            rerender(<NumberInput min={-50} max={-10} onChange={cb} dataTestId={dataTestId} />);

            fireEvent.input(getByTestId(dataTestId), { target: { value: -1 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: -1 });

            fireEvent.input(getByTestId(dataTestId), { target: { value: 1 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: -10 });
        });

        it('should call onChange with max value if value > max', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <NumberInput max={99} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.input(getByTestId(dataTestId), { target: { value: 101 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: 99 });
        });

        it('should call onChange with min value if value < min', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <NumberInput min={10} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.input(getByTestId(dataTestId), { target: { value: 5 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: 5 });
            fireEvent.blur(getByTestId(dataTestId));
            expect(cb).toBeCalledWith(expect.any(Object), { value: 10 });
        });

        it('should call `onChange` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const value = '123';
            const { getByTestId } = render(<NumberInput onChange={cb} dataTestId={dataTestId} />);

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.input(inputNumber, { target: { value } });

            expect(cb).toBeCalledTimes(1);
            expect(inputNumber.value).toBe(value);
        });

        it('should call `onFocus` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(<NumberInput onFocus={cb} dataTestId={dataTestId} />);

            fireEvent.focus(getByTestId(dataTestId));

            expect(cb).toBeCalledTimes(1);
        });

        it('should call `onBlur` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(<NumberInput onBlur={cb} dataTestId={dataTestId} />);

            fireEvent.blur(getByTestId(dataTestId));

            expect(cb).toBeCalledTimes(1);
        });

        it('should not call `onChange` prop if disabled', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <NumberInput onChange={cb} dataTestId={dataTestId} disabled={true} />,
            );

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            await userEvent.type(inputNumber, '123');

            expect(cb).not.toBeCalled();
        });

        it('should call `onClear` prop when clear button clicked', () => {
            const cb = jest.fn();
            const { getByLabelText } = render(
                <NumberInput onClear={cb} clear={true} value='123' />,
            );

            fireEvent.click(getByLabelText('Очистить'));

            expect(cb).toBeCalledTimes(1);
        });

        it('should call `onChange` with valid value, when initial state is bad', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <NumberInput onChange={cb} dataTestId={dataTestId} value='Вася123,Гена33' />,
            );

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            await userEvent.type(inputNumber, '{backspace}');

            expect(cb).toBeCalledWith(expect.any(Object), { value: 123.3 });
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<NumberInput value='123' onChange={jest.fn()} />);

            expect(unmount).not.toThrowError();
        });
    });
});
