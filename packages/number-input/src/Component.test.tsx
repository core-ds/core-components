import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberInput } from '.';

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
        const dataTestId = 'test-id';
        const { getByTestId } = render(<NumberInput dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<NumberInput className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set `disabled` atribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<NumberInput disabled={true} dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId)).toHaveAttribute('disabled');
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
        it('should set value to input without signs', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <NumberInput onChange={cb} allowSigns={false} dataTestId={dataTestId} />,
            );

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputNumber, { target: { value: '+' } });
            expect(inputNumber.value).toBe('');

            fireEvent.change(inputNumber, { target: { value: '-' } });
            expect(inputNumber.value).toBe('');

            fireEvent.change(inputNumber, { target: { value: '123' } });
            expect(inputNumber.value).toBe('123');
        });

        it('should set value to input with plus sign', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const value = '+123';
            const { getByTestId } = render(<NumberInput onChange={cb} dataTestId={dataTestId} />);

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputNumber, { target: { value } });

            expect(cb).toBeCalledTimes(1);
            expect(inputNumber.value).toBe(value);
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onChange` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const value = '123';
            const { getByTestId } = render(<NumberInput onChange={cb} dataTestId={dataTestId} />);

            const inputNumber = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputNumber, { target: { value } });

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

            expect(cb).toBeCalledWith(expect.any(Object), { value: 123.3, valueString: '123,3' });
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<NumberInput value='123' onChange={jest.fn()} />);

            expect(unmount).not.toThrowError();
        });
    });
});
