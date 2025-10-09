import React from 'react';
import type { Meta } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
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
                <FilterButton>{text('children', 'FilterButton')}</FilterButton>
            </div>
        );
    },
};

export const filter_button_mobile = {
    name: 'FilterButtonMobile',
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
                <FilterButtonMobile>{text('children', 'FilterButton')}</FilterButtonMobile>
            </div>
        );
    },
};

export const filter_button_desktop = {
    name: 'FilterButtonDesktop',
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
                <FilterButtonDesktop>{text('children', 'FilterButton')}</FilterButtonDesktop>
            </div>
        );
    },
};

export default meta;
