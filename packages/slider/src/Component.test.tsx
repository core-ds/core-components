import React from 'react';
import { render } from '@testing-library/react';

import { Slider } from './index';

describe('Slider', () => {
    it('should match snapshot', () => {
        const { container } = render(<Slider step={1} />);
        
        expect(container).toMatchSnapshot();
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Slider dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId)).toBeTruthy();
    });

    it('should set `className` class to root', () => {
        const className = 'test-class';
        const { container } = render(<Slider className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set min, max correctly', () => {
        const dataTestId = 'test-id';
        const min = 5;
        const max = 50;
        const { getByRole } = render(<Slider min={min} max={max} dataTestId={dataTestId} />);
        const slider = getByRole('slider') as HTMLInputElement;

        expect(slider).toHaveAttribute('aria-valueMin', min.toFixed(1));
        expect(slider).toHaveAttribute('aria-valueMax', max.toFixed(1));
    });

    it('should set value correctly', () => {
        const dataTestId = 'test-id';
        const value = 10;
        const min = 5;
        const max = 50;
        const step = 5;
        const { getByRole } = render(
            <Slider value={value} min={min} max={max} step={step} dataTestId={dataTestId} />,
        );

        expect(getByRole('slider')).toHaveAttribute('aria-valuenow', value.toFixed(1));
    });

    it('should set out of bounds value in range [min, max]', () => {
        const dataTestId = 'test-id';
        const min = 5;
        const max = 55;
        const valueBelowMinimum = 4;
        const valueAboveMaximum = 56;

        const { getByRole, rerender } = render(
            <Slider value={valueBelowMinimum} min={min} max={max} dataTestId={dataTestId} />,
        );

        expect(getByRole('slider')).toHaveAttribute('aria-valuenow', min.toFixed(1));

        rerender(<Slider value={valueAboveMaximum} min={min} max={max} dataTestId={dataTestId} />);

        expect(getByRole('slider')).toHaveAttribute('aria-valuenow', max.toFixed(1));
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Slider />);

        expect(unmount).not.toThrow();
    });
});
