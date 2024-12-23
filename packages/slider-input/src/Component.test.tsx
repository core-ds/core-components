import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SliderInput } from './index';

describe('SliderInput', () => {
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

    it('should match snapshot', () => {
        const { container } = render(<SliderInput />);
        expect(container).toMatchSnapshot();
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<SliderInput dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId)).toBeTruthy();
    });

    it('should forward ref to input element', () => {
        const ref = jest.fn();
        const dataTestId = 'test-id';

        render(<SliderInput ref={ref} dataTestId={dataTestId} />);

        expect(ref.mock.calls[0][0].tagName).toBe('INPUT');
    });

    describe('Classes tests', () => {
        it('should set `className` class to root', () => {
            const className = 'test-class';
            const { container } = render(<SliderInput className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set `sliderClassName` class to slider', () => {
            const className = 'test-class';
            const { container } = render(<SliderInput sliderClassName={className} />);

            expect(container.getElementsByClassName(className).length).toBe(1);
        });

        it('should set `inputClassName` class to input', () => {
            const className = 'test-class';
            const { container } = render(<SliderInput inputClassName={className} />);

            expect(container.getElementsByClassName(className).length).toBe(1);
        });

        it('should set `focusedClassName` class to slider', () => {
            const className = 'test-class';
            const { container, queryByRole } = render(<SliderInput focusedClassName={className} />);

            const input = queryByRole('textbox');

            if (input) fireEvent.focus(input);

            expect(container.getElementsByClassName(className).length).toBe(1);
        });

        it('should set `fieldClassName` class to slider', () => {
            const className = 'test-class';
            const { container } = render(<SliderInput fieldClassName={className} />);

            expect(container.getElementsByClassName(className).length).toBe(1);
        });
    });

    describe('Attributes tests', () => {
        it('should set min, max and step to Slider', () => {
            const dataTestId = 'test-id';
            const min = 5;
            const max = 50;
            const step = 1;
            const { getByRole } = render(
                <SliderInput min={min} max={max} step={step} dataTestId={dataTestId} />,
            );
            const slider = getByRole('slider') as HTMLInputElement;

            expect(slider).toHaveAttribute('aria-valueMin', min.toFixed(1));
            expect(slider).toHaveAttribute('aria-valueMax', max.toFixed(1));
        });

        it('should set value to input', () => {
            const value = 10;
            const { getByRole } = render(<SliderInput value={value} />);

            expect((getByRole('textbox') as HTMLInputElement).value).toBe(value.toString());
        });

        it('should set sliderValue to Slider', () => {
            const value = 10;
            const { getByRole } = render(<SliderInput sliderValue={value} />);

            expect(getByRole('slider')).toHaveAttribute('aria-valueNow', value.toFixed(1));
        });

        it('should set sliderValue same as value by default', () => {
            const value = 10;
            const { getByRole } = render(<SliderInput value={value} />);

            expect(getByRole('slider')).toHaveAttribute('aria-valueNow', value.toFixed(1));
        });

        it('should render pips', () => {
            const pips = {
                mode: 'values' as const,
                values: [1, 2, 3],
            };

            const { queryByText } = render(<SliderInput pips={pips} />);

            pips.values.map((value) => expect(queryByText(value.toString())).toBeInTheDocument());
        });

        it('should render info', () => {
            const info = 'test-info';
            const { getByText } = render(<SliderInput info={info} />);

            expect(getByText(info)).toBeInTheDocument();
        });
    });

    it('should call `onChange` prop', () => {
        const cb = jest.fn();
        const dataTestId = 'test-id';
        const value = 10;
        const { getByRole } = render(<SliderInput onChange={cb} dataTestId={dataTestId} />);

        const input = getByRole('textbox') as HTMLInputElement;

        fireEvent.change(input, { target: { value } });

        expect(cb).toBeCalledTimes(1);
    });

    it('should call `onInputChange` prop', () => {
        const cb = jest.fn();
        const dataTestId = 'test-id';
        const value = 10;
        const { getByRole } = render(<SliderInput onInputChange={cb} dataTestId={dataTestId} />);

        const input = getByRole('textbox') as HTMLInputElement;

        fireEvent.change(input, { target: { value } });

        expect(cb).toBeCalledTimes(1);
    });

    it.skip('should call `onSliderChange` prop', () => {
        const cb = jest.fn();
        const dataTestId = 'test-id';
        const value = 10;
        const { getByRole } = render(<SliderInput onSliderChange={cb} dataTestId={dataTestId} />);

        const slider = getByRole('slider') as HTMLInputElement;

        fireEvent.change(slider, { target: { value } });

        expect(cb).toBeCalledTimes(1);
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<SliderInput />);

        expect(unmount).not.toThrowError();
    });
});
