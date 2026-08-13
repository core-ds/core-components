import React, { useEffect, useState } from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { Switch } from '@alfalab/core-components-switch';
import { TextShimmer } from '@alfalab/core-components-text-shimmer';
import { Typography } from '@alfalab/core-components-typography';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextShimmer> = {
    title: 'Components/TextShimmer',
    component: TextShimmer,
    id: 'TextShimmer',
};

type Story = StoryObj<typeof TextShimmer>;

const VALUES = ['−4 940 ₽', '−5 186 ₽'];

export const text_shimmer: Story = {
    name: 'TextShimmer',
    render: () => {
        const [active, setActive] = useState(false);
        const [valueIndex, setValueIndex] = useState(0);

        useEffect(() => {
            if (!active) {
                return undefined;
            }

            const timer = window.setTimeout(() => {
                setValueIndex((current) => (current + 1) % VALUES.length);
            }, 500);

            return () => window.clearTimeout(timer);
        }, [active]);

        return (
            <div
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'var(--gap-24)',
                    padding: 'var(--gap-24)',
                }}
            >
                <Typography.Title tag='div' view='medium' font='system'>
                    <TextShimmer
                        active={active}
                        animate={boolean('animate', true)}
                        color={text('color', '')}
                        particleCount={number('particleCount', 0) || undefined}
                        style={{ fontVariantNumeric: 'tabular-nums', minWidth: 132 }}
                    >
                        {VALUES[valueIndex]}
                    </TextShimmer>
                </Typography.Title>

                <Switch
                    checked={active}
                    label='Shimmer'
                    onChange={() => setActive((current) => !current)}
                />
            </div>
        );
    },
};

export const text_shimmer_example: Story = {
    name: 'Example',
    render: () => {
        const [active, setActive] = useState(false);

        return (
            <div
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'var(--gap-24)',
                    padding: 'var(--gap-24)',
                }}
            >
                <Typography.Text tag='div' view='primary-large'>
                    Доступно: <TextShimmer active={active}>125 600 ₽</TextShimmer>
                </Typography.Text>

                <Switch
                    checked={active}
                    label='Shimmer'
                    onChange={() => setActive((current) => !current)}
                />
            </div>
        );
    },
};

export default meta;
