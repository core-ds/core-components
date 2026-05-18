import React from 'react';
import { render } from '@testing-library/react';

import { Slider } from './index';

type Props = {
    dots: boolean;
    hasPips: boolean;
    hasCustomDots: boolean;
    pipsLabel: 'all' | 'pipsOnly' | 'customPipsOnly' | 'none';
    showPipsDots?: boolean;
};

const renderComponent = ({
    dots,
    hasPips,
    hasCustomDots,
    pipsLabel,
    showPipsDots = false,
}: Props) =>
    render(
        <Slider
            min={1}
            max={3}
            step={0.5}
            value={1}
            dots={dots}
            pipsLabel={pipsLabel}
            pips={hasPips ? { mode: 'values', values: [1, 2, 3] } : undefined}
            dotsSlider={hasCustomDots ? 'custom' : 'step'}
            customDots={hasCustomDots ? [1.5, 2.5] : undefined}
            showPipsDots={showPipsDots}
        />,
    );

describe('Slider', () => {
    it('should match snapshot', () => {
        const { container } = render(<Slider step={1} />);

        expect(container).toMatchSnapshot();
    });

    describe('Success cases', () => {
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
    });

    describe('Edge cases', () => {
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

            rerender(
                <Slider value={valueAboveMaximum} min={min} max={max} dataTestId={dataTestId} />,
            );

            expect(getByRole('slider')).toHaveAttribute('aria-valuenow', max.toFixed(1));
        });
        it('should hide step labels when pipsLabel is none even with custom format', () => {
            const pips = {
                mode: 'values' as const,
                values: [1, 2, 3],
                format: {
                    to: (currentValue: number) => `Value ${currentValue}`,
                },
            };
            const { queryByText } = render(
                <Slider min={1} max={3} value={1} pips={pips} dots pipsLabel='none' />,
            );

            expect(queryByText('Value 1')).not.toBeInTheDocument();
            expect(queryByText('Value 2')).not.toBeInTheDocument();
            expect(queryByText('Value 3')).not.toBeInTheDocument();
        });

        it('should hide pips-only markers in custom dots mode by default', () => {
            const { container } = render(
                <Slider
                    min={1}
                    max={7}
                    step={0.5}
                    value={1}
                    dots
                    dotsSlider='custom'
                    customDots={[1, 4, 5.5, 7]}
                    pipsLabel='all'
                    pips={{
                        mode: 'values',
                        values: [1, 2, 3, 4, 5, 6, 7],
                    }}
                />,
            );

            expect(container.querySelectorAll('.hide-for-pips-value')).toHaveLength(4);
        });

        it('should keep pips markers visible when showPipsDots is enabled', () => {
            const { container } = render(
                <Slider
                    min={1}
                    max={7}
                    step={0.5}
                    value={1}
                    dots
                    dotsSlider='custom'
                    customDots={[1, 4, 5.5, 7]}
                    showPipsDots
                    pipsLabel='all'
                    pips={{
                        mode: 'values',
                        values: [1, 2, 3, 4, 5, 6, 7],
                    }}
                />,
            );

            expect(container.querySelectorAll('.hide-for-pips-value')).toHaveLength(0);
        });
    });

    describe('Error cases', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(<Slider />);

            expect(unmount).not.toThrow();
        });
    });

    describe('Slider labels-dots visibility', () => {
        it.each([
            ['all', false, false],
            ['all', true, true],
            ['pipsOnly', false, false],
            ['pipsOnly', true, true],
            ['customPipsOnly', false, false],
            ['customPipsOnly', true, false],
            ['none', false, false],
            ['none', true, false],
        ] as const)(
            'should render label=%s when dots=false, customDots=[] and pips=%s',
            (pipsLabel, hasPips, shouldRenderLabel) => {
                const { queryByText } = renderComponent({
                    dots: false,
                    hasPips,
                    hasCustomDots: false,
                    pipsLabel,
                });

                if (shouldRenderLabel) {
                    expect(queryByText('2')).toBeInTheDocument();
                } else {
                    expect(queryByText('2')).not.toBeInTheDocument();
                }
            },
        );

        it.each([
            ['all', false, '1.5', true],
            ['all', true, '2', true],
            ['pipsOnly', false, '1.5', false],
            ['pipsOnly', true, '2', true],
            ['customPipsOnly', false, '1.5', true],
            ['customPipsOnly', true, '1.5', true],
            ['none', false, '1.5', false],
            ['none', true, '2', false],
        ] as const)(
            'should render label=%s when dots=false, customDots=custom and pips=%s',
            (pipsLabel, hasPips, label, shouldRenderLabel) => {
                const { queryByText } = renderComponent({
                    dots: false,
                    hasPips,
                    hasCustomDots: true,
                    pipsLabel,
                });

                if (shouldRenderLabel) {
                    expect(queryByText(label)).toBeInTheDocument();
                } else {
                    expect(queryByText(label)).not.toBeInTheDocument();
                }
            },
        );

        it.each([
            ['all', false, false],
            ['all', true, true],
            ['pipsOnly', false, false],
            ['pipsOnly', true, true],
            ['customPipsOnly', false, false],
            ['customPipsOnly', true, false],
            ['none', false, false],
            ['none', true, false],
        ] as const)(
            'should render label=%s when dots=true, customDots=[] and pips=%s',
            (pipsLabel, hasPips, shouldRenderLabel) => {
                const { queryByText } = renderComponent({
                    dots: true,
                    hasPips,
                    hasCustomDots: false,
                    pipsLabel,
                });

                if (shouldRenderLabel) {
                    expect(queryByText('2')).toBeInTheDocument();
                } else {
                    expect(queryByText('2')).not.toBeInTheDocument();
                }
            },
        );

        it.each([
            ['all', false, '1.5', true],
            ['all', true, '2', true],
            ['pipsOnly', false, '1.5', false],
            ['pipsOnly', true, '2', true],
            ['customPipsOnly', false, '1.5', true],
            ['customPipsOnly', true, '1.5', true],
            ['none', false, '1.5', false],
            ['none', true, '2', false],
        ] as const)(
            'should render label=%s when dots=true, customDots=custom and pips=%s',
            (pipsLabel, hasPips, label, shouldRenderLabel) => {
                const { queryByText } = renderComponent({
                    dots: true,
                    hasPips,
                    hasCustomDots: true,
                    pipsLabel,
                });

                if (shouldRenderLabel) {
                    expect(queryByText(label)).toBeInTheDocument();
                } else {
                    expect(queryByText(label)).not.toBeInTheDocument();
                }
            },
        );
    });
});
