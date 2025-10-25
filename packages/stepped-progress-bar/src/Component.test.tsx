import React from 'react';
import { render, screen } from '@testing-library/react';

import { SteppedProgressBar } from './Component';

const defaultProps = {
    step: 7,
    maxStep: 8,
};

describe('SteppedProgressBar', () => {
    describe('common tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';
            const { queryByTestId } = render(
                <SteppedProgressBar {...defaultProps} dataTestId={dataTestId} />,
            );

            expect(queryByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(
                <SteppedProgressBar {...defaultProps} className={className} />,
            );

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should unmount without errors', () => {
            const { unmount } = render(<SteppedProgressBar {...defaultProps} />);

            expect(unmount).not.toThrow();
        });
    });

    describe('edge cases', () => {
        it('min step should be 0', async () => {
            render(<SteppedProgressBar {...defaultProps} step={-defaultProps.step} />);

            const doneBars = await screen.queryAllByTestId('on');
            const emptyBars = await screen.queryAllByTestId('off');

            expect(doneBars.length).toBe(0);
            expect(emptyBars.length).toBe(defaultProps.maxStep);
        });

        it('max value for step should be equal with maxStep', async () => {
            render(
                <SteppedProgressBar
                    {...defaultProps}
                    step={defaultProps.maxStep + defaultProps.step}
                />,
            );

            const doneBars = await screen.queryAllByTestId('on');
            const emptyBars = await screen.queryAllByTestId('off');

            expect(doneBars.length).toBe(defaultProps.maxStep);
            expect(emptyBars.length).toBe(0);
        });
        it('min value for maxStep should be 1', async () => {
            render(<SteppedProgressBar step={1} maxStep={0} />);

            const emptyBars = await screen.queryAllByTestId('off');
            const doneBars = await screen.queryAllByTestId('on');

            expect(emptyBars.length).toBe(0);
            expect(doneBars.length).toBe(1);
        });
    });

    describe('token color support', () => {
        it('should apply custom color token when step is done', () => {
            const { container } = render(
                <SteppedProgressBar step={1} maxStep={2} view='--color-light-accent-primary' />,
            );

            const firstBar = container.querySelector('[data-test-id="on"]');
            expect(firstBar).toHaveStyle('background: var(--color-light-accent-primary)');
        });

        it('should work with array of views including tokens', () => {
            const { container } = render(
                <SteppedProgressBar
                    step={2}
                    maxStep={3}
                    view={['positive', '--color-light-accent-primary', 'negative']}
                />,
            );

            const bars = container.querySelectorAll('[data-test-id="on"]');
            expect(bars[0]).toHaveClass('positive');
            expect(bars[1]).toHaveStyle('background: var(--color-light-accent-primary)');
        });

        it('should fallback to CSS class for non-token views', () => {
            const { container } = render(
                <SteppedProgressBar step={1} maxStep={2} view='positive' />,
            );

            const firstBar = container.querySelector('[data-test-id="on"]');
            expect(firstBar).toHaveClass('positive');
            expect(firstBar).not.toHaveStyle('background: var(--color-light-accent-primary)');
        });
    });
});
