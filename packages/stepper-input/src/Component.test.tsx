import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { StepperInputDesktop } from './desktop';

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

describe('StepperInput', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            expect(render(<StepperInputDesktop value={10} />)).toMatchSnapshot();
        });
    });

    describe('attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<StepperInputDesktop dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set `disabled` attribute', () => {
            const dataTestId = 'test-id';
            const incrementButtonId = dataTestId + '-increment-button';
            const decrementButtonId = dataTestId + '-decrement-button';
            const { getByTestId } = render(
                <StepperInputDesktop disabled={true} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveAttribute('disabled');
            expect(getByTestId(incrementButtonId)).toHaveAttribute('disabled');
            expect(getByTestId(decrementButtonId)).toHaveAttribute('disabled');
        });

        it('should decrement button disabled', () => {
            const dataTestId = 'test-id';
            const decrementButtonId = dataTestId + '-decrement-button';
            const incrementButtonId = dataTestId + '-increment-button';
            const { getByTestId } = render(
                <StepperInputDesktop value={10} min={10} dataTestId={dataTestId} />,
            );

            expect(getByTestId(decrementButtonId)).toHaveAttribute('disabled');
            expect(getByTestId(incrementButtonId)).not.toHaveAttribute('disabled');
        });

        it('should increment button disabled', () => {
            const dataTestId = 'test-id';
            const decrementButtonId = dataTestId + '-decrement-button';
            const incrementButtonId = dataTestId + '-increment-button';
            const { getByTestId } = render(
                <StepperInputDesktop value={10} max={10} dataTestId={dataTestId} />,
            );

            expect(getByTestId(decrementButtonId)).not.toHaveAttribute('disabled');
            expect(getByTestId(incrementButtonId)).toHaveAttribute('disabled');
        });

        it('should render error', () => {
            const { container } = render(<StepperInputDesktop error={true} />);

            expect(container.getElementsByClassName('errorIcon').length).toBe(1);
        });

        it('should set defaultValue', () => {
            const defaultValue = 5;
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <StepperInputDesktop defaultValue={defaultValue} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveValue(defaultValue.toString());
        });
    });

    describe('callback tests', () => {
        it('should increase value by 3', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const incrementButtonId = dataTestId + '-increment-button';
            const { getByTestId } = render(
                <StepperInputDesktop value={10} onChange={cb} dataTestId={dataTestId} step={3} />,
            );

            fireEvent.click(getByTestId(incrementButtonId));

            expect(cb).toBeCalledWith(expect.any(Object), { value: 13, valueString: '13' });
        });

        it('should decrease value by 3', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const decrementButtonId = dataTestId + '-decrement-button';
            const { getByTestId } = render(
                <StepperInputDesktop value={10} onChange={cb} dataTestId={dataTestId} step={3} />,
            );

            fireEvent.click(getByTestId(decrementButtonId));

            expect(cb).toBeCalledWith(expect.any(Object), { value: 7, valueString: '7' });
        });

        it('should return valid value', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { rerender, getByTestId } = render(
                <StepperInputDesktop min={10} max={50} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.change(getByTestId(dataTestId), { target: { value: 1 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: 1, valueString: '1' });

            rerender(
                <StepperInputDesktop min={-50} max={-10} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.change(getByTestId(dataTestId), { target: { value: -1 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: -1, valueString: '-1' });

            fireEvent.change(getByTestId(dataTestId), { target: { value: 1 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: -10, valueString: '-10' });
        });

        it('should return max value if value > max', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <StepperInputDesktop max={99} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.change(getByTestId(dataTestId), { target: { value: 101 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: 99, valueString: '99' });
        });

        it('should return min value if value < min', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <StepperInputDesktop min={10} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.change(getByTestId(dataTestId), { target: { value: 5 } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: 5, valueString: '5' });
            fireEvent.blur(getByTestId(dataTestId));
            expect(cb).toBeCalledWith(expect.any(Object), { value: 10, valueString: '10' });
        });

        it('should return valid value on blur', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <StepperInputDesktop defaultValue={0} onChange={cb} dataTestId={dataTestId} />,
            );

            fireEvent.change(getByTestId(dataTestId), { target: { value: '' } });
            expect(cb).toBeCalledWith(expect.any(Object), { value: null, valueString: '' });

            fireEvent.blur(getByTestId(dataTestId));
            expect(cb).toBeCalledWith(expect.any(Object), { value: 0, valueString: '0' });
        });
    });
});
