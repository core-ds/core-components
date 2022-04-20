import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SliderPicker } from './index';

describe('SliderPicker', () => {
    it('should match snapshot', () => {
        const { container } = render(<SliderPicker />);
        expect(container).toMatchSnapshot();
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<SliderPicker dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId)).toBeTruthy();
    });

    describe('Classes tests', () => {
        it('should set `className` class to root', () => {
            const className = 'test-class';
            const { container } = render(<SliderPicker className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set `sliderClassName` class to slider', () => {
            const className = 'test-class';
            const { container } = render(<SliderPicker sliderClassName={className} />);

            expect(container.getElementsByClassName(className).length).toBe(1);
        });

        it('should set `stepsClassName` class to input', () => {
            const className = 'test-class';
            const { container } = render(
                <SliderPicker stepsClassName={className} steps={['1', '2']} />,
            );

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
                <SliderPicker min={min} max={max} step={step} dataTestId={dataTestId} />,
            );
            const slider = getByRole('slider') as HTMLInputElement;

            expect(slider.min).toBe(min.toString());
            expect(slider.max).toBe(max.toString());
            expect(slider.step).toBe(step.toString());
        });

        it('should set sliderValue same as value by default', () => {
            const value = 10;
            const { getByRole } = render(<SliderPicker value={value} />);

            expect((getByRole('slider') as HTMLInputElement).value).toBe(value.toString());
        });

        it('should render steps', () => {
            const steps = ['1', '2', '3'];
            const { queryByText } = render(<SliderPicker steps={steps} />);

            steps.map(step => expect(queryByText(step)).toBeInTheDocument());
        });
    });

    it('should call `onChange` prop', () => {
        const cb = jest.fn();
        const dataTestId = 'test-id';
        const value = 10;
        const { getByRole } = render(<SliderPicker onChange={cb} dataTestId={dataTestId} />);

        const slider = getByRole('slider') as HTMLInputElement;

        fireEvent.change(slider, { target: { value } });

        expect(cb).toBeCalledTimes(1);
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<SliderPicker />);

        expect(unmount).not.toThrowError();
    });
});
