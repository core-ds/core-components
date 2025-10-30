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
                <SteppedProgressBar
                    step={1}
                    maxStep={2}
                    view='var(--color-light-accent-primary)'
                />,
            );

            const firstBar = container.querySelector('[data-test-id="on"]');
            expect(firstBar).toHaveStyle('background: var(--color-light-accent-primary)');
        });

        it('should work with array of views including tokens', () => {
            const { container } = render(
                <SteppedProgressBar
                    step={4}
                    maxStep={4}
                    view={[
                        'positive',
                        'var(--color-light-accent-primary)',
                        '#fff',
                        'rgb(255, 255, 255)',
                    ]}
                />,
            );

            const bars = container.querySelectorAll('[data-test-id="on"]');

            expect(bars[0]).toHaveClass('positive');
            expect(bars[1]).toHaveStyle('background: var(--color-light-accent-primary)');
            expect(bars[2]).toHaveStyle('background: #fff');
            expect(bars[3]).toHaveStyle('background: rgb(255, 255, 255)');
        });

        it('should fallback to CSS class for non-token views', () => {
            const { container } = render(
                <SteppedProgressBar step={1} maxStep={2} view='positive' />,
            );

            const firstBar = container.querySelector('[data-test-id="on"]') as HTMLElement;

            expect(firstBar).toHaveClass('positive');
            expect(firstBar.style.background).toBe('');
        });

        describe('custom color formats', () => {
            it.each`
                color                                  | description
                ${'#fff'}                              | ${'hex short format'}
                ${'#ffffff'}                           | ${'hex long format'}
                ${'#123456'}                           | ${'hex color'}
                ${'rgb(255, 255, 255)'}                | ${'rgb format'}
                ${'rgba(255, 255, 255, 0.5)'}          | ${'rgba format'}
                ${'hsl(0, 0%, 100%)'}                  | ${'hsl format'}
                ${'hsla(0, 0%, 100%, 0.5)'}            | ${'hsla format'}
                ${'var(--color-light-accent-primary)'} | ${'var() token'}
                ${'transparent'}                       | ${'transparent keyword'}
            `('should apply $description color through style', ({ color }) => {
                const { container } = render(
                    <SteppedProgressBar step={1} maxStep={2} view={color} />,
                );

                const firstBar = container.querySelector('[data-test-id="on"]');

                expect(firstBar).toHaveStyle(`background: ${color}`);
            });
        });

        describe('preset colors', () => {
            it.each`
                preset
                ${'positive'}
                ${'negative'}
                ${'attention'}
                ${'link'}
                ${'tertiary'}
                ${'secondary'}
                ${'primary'}
                ${'accent'}
            `('should use CSS class for preset "$preset"', ({ preset }) => {
                const { container } = render(
                    <SteppedProgressBar step={1} maxStep={2} view={preset} />,
                );

                const firstBar = container.querySelector('[data-test-id="on"]') as HTMLElement;

                expect(firstBar).toHaveClass(preset);
                expect(firstBar.style.background).toBe('');
            });
        });

        it('should not apply custom color for inactive steps', () => {
            const { container } = render(
                <SteppedProgressBar step={1} maxStep={3} view='#ff0000' />,
            );

            const bars = container.querySelectorAll('[data-test-id="off"]');

            bars.forEach((bar) => {
                expect((bar as HTMLElement).style.background).toBe('');
            });
        });

        it('should handle mixed preset and custom colors in array', () => {
            const { container } = render(
                <SteppedProgressBar
                    step={5}
                    maxStep={5}
                    view={['positive', 'negative', '#fff', 'attention', 'rgb(0,0,0)']}
                />,
            );

            const bars = container.querySelectorAll('[data-test-id="on"]');

            expect(bars[0]).toHaveClass('positive');
            expect((bars[0] as HTMLElement).style.background).toBe('');
            expect(bars[1]).toHaveClass('negative');
            expect((bars[1] as HTMLElement).style.background).toBe('');
            expect(bars[2]).toHaveStyle('background: #fff');
            expect(bars[3]).toHaveClass('attention');
            expect((bars[3] as HTMLElement).style.background).toBe('');
            expect(bars[4]).toHaveStyle('background: rgb(0,0,0)');
        });

        it('should handle empty array gracefully', () => {
            const { container } = render(<SteppedProgressBar step={2} maxStep={3} view={[]} />);

            const bars = container.querySelectorAll('[data-test-id="on"]');
            expect(bars.length).toBe(2);
        });

        it('should apply default preset when view is not provided', () => {
            const { container } = render(<SteppedProgressBar step={1} maxStep={2} />);

            const firstBar = container.querySelector('[data-test-id="on"]');
            expect(firstBar).toHaveClass('positive');
        });
    });
});
