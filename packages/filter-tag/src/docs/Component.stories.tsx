import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { FilterTag } from '@alfalab/core-components-filter-tag';
import { FilterTagMobile } from '@alfalab/core-components-filter-tag/mobile';
import { FilterTagDesktop } from '@alfalab/core-components-filter-tag/desktop';

const meta: Meta<typeof FilterTag> = {
    title: 'Components/FilterTag',
    component: FilterTag,
    id: 'FilterTag',
};

type Story = StoryObj<typeof FilterTag>;

const SIZES = [32, 40, 48] as const;

export const filter_tag: Story = {
    name: 'FilterTag',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');

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
                <FilterTag
                    size={select('size', SIZES, 48)}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select('view', ['outlined', 'filled'], 'outlined')}
                    disabled={boolean('disabled', false)}
                    checked={boolean('checked', false)}
                    open={boolean('open', false)}
                    showClear={boolean('showClear', true)}
                    colors={colors}
                >
                    {text('children', 'FilterTag')}
                </FilterTag>
            </div>
        );
    },
};

export const filter_tag_mobile: Story = {
    name: 'FilterTagMobile',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');

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
                <FilterTagMobile
                    size={select('size', SIZES, 48)}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select('view', ['outlined', 'filled'], 'outlined')}
                    disabled={boolean('disabled', false)}
                    checked={boolean('checked', false)}
                    open={boolean('open', false)}
                    showClear={boolean('showClear', true)}
                    colors={select('colors', ['default', 'inverted'], 'default')}
                >
                    {colors}
                </FilterTagMobile>
            </div>
        );
    },
};

export const filter_tag_desktop: Story = {
    name: 'FilterTagDesktop',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');

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
                <FilterTagDesktop
                    size={select('size', SIZES, 48)}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select('view', ['outlined', 'filled'], 'outlined')}
                    disabled={boolean('disabled', false)}
                    checked={boolean('checked', false)}
                    open={boolean('open', false)}
                    showClear={boolean('showClear', true)}
                    colors={colors}
                >
                    {text('children', 'FilterTag')}
                </FilterTagDesktop>
            </div>
        );
    },
};

export default meta;
