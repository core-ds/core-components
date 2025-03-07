import React from 'react';
import { Story } from '@storybook/addon-docs';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Skeleton } from '@alfalab/core-components-skeleton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Skeleton> = {
    title: 'Components/Skeleton',
    component: Skeleton,
    id: 'Skeleton',
};

type Story = StoryObj<typeof Skeleton>;

export const skeleton: Story = {
    name: 'Skeleton',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const borderRadius = select(
            'borderRadius',
            [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 36, 64, 'pill'],
            8,
        );

        return (
            <div
                style={{
                    width: 150,
                    height: 150,
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-base-bg-primary-inverted)'
                            : 'transparent',
                    padding: 'var(--gap-40)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Skeleton
                    visible={boolean('visible', true)}
                    className={text('className', '')}
                    dataTestId={text('dataTestId', '')}
                    animate={boolean('animate', true)}
                    colors={colors}
                    borderRadius={borderRadius}
                >
                    <img
                        width={150}
                        height={150}
                        alt='Фижер'
                        src='https://rawgit.com/alfa-laboratory/arui-feather/master/logo.svg'
                    />
                </Skeleton>
            </div>
        );
    },
};

export default meta;
