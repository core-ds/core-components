import React from 'react';
import type { Meta } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { FilterButton } from '@alfalab/core-components-filter-button';
import { FilterButtonMobile } from '@alfalab/core-components-filter-button/mobile';
import { FilterButtonDesktop } from '@alfalab/core-components-filter-button/desktop';

const meta: Meta = {
    title: 'Components/FilterButton',
    component: FilterButton,
    id: 'FilterButton',
};

export const filter_button = {
    name: 'FilterButton',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const size = select(
            'size',
            [32, 40] as unknown as string[],
            40 as unknown as string,
        ) as unknown as 32 | 40;
        const showIndicator = boolean('showIndicator', false);
        const indicatorValue = number('indicatorValue', 3);

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
                <FilterButton
                    colors={colors as 'default' | 'inverted'}
                    size={size}
                    indicatorProps={
                        showIndicator
                            ? {
                                  value: indicatorValue,
                              }
                            : undefined
                    }
                >
                    {text('children', 'FB')}
                </FilterButton>
            </div>
        );
    },
};

export const filter_button_mobile = {
    name: 'FilterButtonMobile',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const size = select(
            'size',
            [32, 40] as unknown as string[],
            32 as unknown as string,
        ) as unknown as 32 | 40;
        const showIndicator = boolean('showIndicator', true);
        const indicatorValue = number('indicatorValue', 1);

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
                <FilterButtonMobile
                    colors={colors as 'default' | 'inverted'}
                    size={size}
                    indicatorProps={
                        showIndicator
                            ? {
                                  value: indicatorValue,
                              }
                            : undefined
                    }
                >
                    {text('children', 'FB')}
                </FilterButtonMobile>
            </div>
        );
    },
};

export const filter_button_desktop = {
    name: 'FilterButtonDesktop',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const size = select(
            'size',
            [32, 40] as unknown as string[],
            40 as unknown as string,
        ) as unknown as 32 | 40;
        const showIndicator = boolean('showIndicator', true);
        const indicatorValue = number('indicatorValue', 5);

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
                <FilterButtonDesktop
                    colors={colors as 'default' | 'inverted'}
                    size={size}
                    indicatorProps={
                        showIndicator
                            ? {
                                  value: indicatorValue,
                              }
                            : undefined
                    }
                >
                    {text('children', 'FB')}
                </FilterButtonDesktop>
            </div>
        );
    },
};

export default meta;
