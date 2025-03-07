import React, { Fragment, RefObject } from 'react';
import { Story } from '@storybook/addon-docs';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Skeleton, useSkeleton } from '@alfalab/core-components-skeleton';
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

export const skeleton_text: Story = {
    name: 'SkeletonText',
    render: () => {
        const rows = select('rows', [undefined, 2, 4, 6, 8, 10], undefined);
        const width = select(
            'width',
            [undefined, [100, 200, 300, 400], 100, 200, 300, 400],
            undefined,
        );
        const align = select('align', [undefined, 'left', 'center', 'right'], undefined);

        // дополнительные преобразования нужны для скриншот-тестирования, так как все кнобсы в этом случае приходят в виде строки
        const getWidth = () => {
            if (typeof width === 'string') {
                if ((width as string).startsWith('[') && (width as string).endsWith(']')) {
                    return JSON.parse(width);
                }
            }

            return width;
        };

        // дополнительные преобразования нужны для скриншот-тестирования, так как все кнобсы в этом случае приходят в виде строки
        const getRows = () => {
            if (typeof rows === 'string') {
                return Number(rows);
            }

            return rows;
        };

        const { renderSkeleton, textRef } = useSkeleton(true, {
            rows: getRows(),
            width: getWidth(),
            align,
        });

        return (
            <Fragment>
                <div ref={textRef as RefObject<HTMLDivElement>} style={{ lineHeight: '20px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
                {renderSkeleton({})}
            </Fragment>
        );
    },
};

export default meta;
