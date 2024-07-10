import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

const meta: Meta<typeof Scrollbar> = {
    title: 'Components/Scrollbar',
    component: Scrollbar,
    id: 'Scrollbar',
};

type Story = StoryObj<typeof Scrollbar>;

export const scrollbar: Story = {
    name: 'Scrollbar',
    render: () => {
        const direction = select('direction', ['vertical', 'horizontal'], 'vertical');
        const colors = select('colors', ['default', 'inverted'], 'default');
        const autoHide = boolean('autoHide', false);
        const autoHideTimeout = number('autoHideTimeout', 1000);
        const clickOnTrack = boolean('clickOnTrack', true);
        const getChildVerticalStyle = (bgColor, color) => ({
            height: 80,
            textAlign: 'center' as const,
            lineHeight: '80px',
            fontSize: 40,
            fontWeight: 700,
            color: `var(${color})`,
            background: `var(${bgColor})`,
        });
        const getChildHorizontalStyle = (bgColor, color) => ({
            display: 'inline-block',
            height: 200,
            width: 80,
            textAlign: 'center' as const,
            lineHeight: '80px',
            fontSize: 40,
            fontWeight: 700,
            color: `var(${color})`,
            background: `var(${bgColor})`,
        });
        const bgColorMap = {
            default: {
                background: ['--color-light-neutral-200', '--color-light-base-bg-secondary'],
                color: '--color-light-text-tertiary',
            },
            inverted: {
                background: [
                    '--color-light-neutral-200-inverted',
                    '--color-light-base-bg-secondary-inverted',
                ],
                color: '--color-light-text-tertiary-inverted',
            },
        };
        const getBgColor = (idx) =>
            idx % 2 === 0 ? bgColorMap[colors].background[0] : bgColorMap[colors].background[1];
        const textColor = bgColorMap[colors].color;
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-base-bg-primary-inverted)'
                            : 'transparent',
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                {direction === 'vertical' ? (
                    <Scrollbar
                        style={{ height: 200, width: 1000 }}
                        autoHide={autoHide}
                        colors={colors}
                        autoHideTimeout={autoHideTimeout}
                        clickOnTrack={clickOnTrack}
                    >
                        {new Array(51).fill(null).map((_, idx) => (
                            <div
                                key={idx}
                                style={getChildVerticalStyle(getBgColor(idx), textColor)}
                            >
                                {idx}
                            </div>
                        ))}
                    </Scrollbar>
                ) : (
                    <Scrollbar
                        style={{ height: 200, width: 1000, whiteSpace: 'nowrap' }}
                        autoHide={autoHide}
                        colors={colors}
                        autoHideTimeout={autoHideTimeout}
                        clickOnTrack={clickOnTrack}
                    >
                        {new Array(51).fill(null).map((_, idx) => (
                            <div
                                key={idx}
                                style={getChildHorizontalStyle(getBgColor(idx), textColor)}
                            >
                                {idx}
                            </div>
                        ))}
                    </Scrollbar>
                )}
            </div>
        );
    },
};

export default meta;
