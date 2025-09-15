import React from 'react';
import { render } from '@testing-library/react';

import { ProgressBar } from './Component';

describe('ProgressBar', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<ProgressBar value={20} />);
            expect(container).toMatchSnapshot();
        });

        it('should match with view snapshot', () => {
            const { container } = render(<ProgressBar value={20} view='negative' />);
            expect(container).toMatchSnapshot();
        });

        it('should fill all progress bar and match view snapshot', () => {
            const { container } = render(<ProgressBar value={150} view='negative' />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('Attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const testId = 'test-id';
            const { getByTestId } = render(<ProgressBar value={20} dataTestId={testId} />);

            expect(getByTestId(testId)).toHaveAttribute('data-test-id', testId);
        });
    });

    it('should use passed `value`', () => {
        const value = 72;
        const { container } = render(<ProgressBar value={value} />);

        expect(container.querySelector('.filled')).toHaveStyle('transform: translateX(-28%)');
    });

    it('should constrain passed `value` more then 100', () => {
        const value = 120;
        const { container } = render(<ProgressBar value={value} />);

        expect(container.querySelector('.filled')).toHaveStyle('transform: translateX(0%)');
    });

    it('should constrain passed `value` less then 0', () => {
        const value = -120;
        const { container } = render(<ProgressBar value={value} />);

        expect(container.querySelector('.filled')).toHaveStyle('transform: translateX(-100%)');
    });

    describe('Classes tests', () => {
        it('should set `className` class to root', () => {
            const className = 'test-class';
            const { container } = render(<ProgressBar value={20} className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set default color class', () => {
            const { container } = render(<ProgressBar value={20} />);

            expect(container.querySelector('.filled')).toHaveClass('positive');
        });

        it('should set color class', () => {
            const { container } = render(<ProgressBar value={20} view='negative' />);

            expect(container.querySelector('.filled')).toHaveClass('negative');
        });

        it('should set default size class', () => {
            const { container } = render(<ProgressBar value={20} />);

            expect(container.querySelector('.container')).toHaveClass('size-8');
        });

        it('should set size class', () => {
            const { container } = render(<ProgressBar value={20} size={4} />);

            expect(container.querySelector('.container')).toHaveClass('size-4');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<ProgressBar value={20} />);

        expect(unmount).not.toThrow();
    });
});
