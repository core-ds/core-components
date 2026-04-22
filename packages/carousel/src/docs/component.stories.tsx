import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';

import { Carousel } from '@alfalab/core-components-carousel';

import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';

const meta: Meta<typeof Carousel> = {
    title: 'Components/Carousel',
    component: Carousel,
    id: 'Carousel',
};

type Story = StoryObj<typeof Carousel>;

const Card: FC<{ bgColor: string; itemColor: string }> = ({ bgColor, itemColor }) => {
    return (
        <div
            style={{
                background: bgColor,
                padding: 'var(--gap-16)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--border-radius-20)',
                height: 'calc(100% - var(--gap-16) * 2)',
            }}
        >
            <SuperEllipse backgroundColor={itemColor} />
            <div
                style={{
                    height: 12,
                    background: itemColor,
                    margin: 'auto 0 var(--gap-6)',
                    borderRadius: 'var(--border-radius-pill)',
                }}
            />
            <div
                style={{
                    height: 12,
                    background: itemColor,
                    margin: 'var(--gap-6) 0',
                    borderRadius: 'var(--border-radius-pill)',
                }}
            />
        </div>
    );
};

export const carousel: Story = {
    name: 'Carousel',
    render: () => {
        const navigation = select('navigation', ['hover', 'true', 'false'], 'false');
        const visibleItems = select('visibleItems', ['auto', 1, 2, 2.2, 3], 'auto');
        const height = select('height', ['auto', 200, 300], 'auto');

        return (
            <Carousel
                items={[
                    {
                        bgColor: 'var(--color-light-decorative-muted-blue)',
                        itemColor: 'var(--color-light-decorative-muted-alt-blue)',
                        height: 200,
                    },
                    {
                        bgColor: 'var(--color-light-decorative-muted-red)',
                        itemColor: 'var(--color-light-decorative-muted-alt-red)',
                        height: 280,
                    },
                    {
                        bgColor: 'var(--color-light-decorative-muted-orange)',
                        itemColor: 'var(--color-light-decorative-muted-alt-orange)',
                        height: 160,
                    },
                    {
                        bgColor: 'var(--color-light-decorative-muted-green)',
                        itemColor: 'var(--color-light-decorative-muted-alt-green)',
                        height: 240,
                    },
                    {
                        bgColor: 'var(--color-light-decorative-muted-indigo)',
                        itemColor: 'var(--color-light-decorative-muted-alt-indigo)',
                        height: 200,
                    },
                    {
                        bgColor: 'var(--color-light-decorative-muted-cyan)',
                        itemColor: 'var(--color-light-decorative-muted-alt-cyan)',
                        height: 160,
                    },
                    {
                        bgColor: 'var(--color-light-decorative-muted-pistachio)',
                        itemColor: 'var(--color-light-decorative-muted-alt-pistachio)',
                        height: 240,
                    },
                ].map((itemProps, index) => ({
                    key: index,
                    height: itemProps.height,
                    width: 256,
                    children: <Card {...itemProps} />,
                }))}
                visibleItems={visibleItems === 'auto' ? visibleItems : Number(visibleItems)}
                height={height === 'auto' ? height : Number(height)}
                navigation={navigation === 'hover' ? navigation : navigation === 'true'}
                gap={number('gap', 8)}
                loop={boolean('loop', false)}
                mouseWheel={boolean('mouseWheel', false)}
            />
        );
    },
};

export default meta;
