import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { CalendarRange } from '@balafla/core-components-calendar-range';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof CalendarRange> = {
    title: 'Components/CalendarRange',
    component: CalendarRange,
    id: 'CalendarRange',
};

type Story = StoryObj<typeof CalendarRange>;

const WRAPPER_STYLES = {
    display: 'inline-block',
    border: '1px solid var(--color-light-neutral-300)',
    borderRadius: 8,
    boxShadow: 'var(--shadow-m)',
    background: 'var(--color-light-base-bg-primary)',
    padding: 'var(--gap-16)',
};

export const calendar_range: Story = {
    name: 'CalendarRange',
    render: () => {
        return (
            <div style={stylesStringToObj(getQueryParam('wrapperStyles'))}>
                <div style={WRAPPER_STYLES}>
                    <CalendarRange
                        defaultMonth={new Date('2022-03-01')}
                        calendarPosition={select(
                            'calendarPosition',
                            ['static', 'popover'],
                            'static',
                        )}
                    />
                </div>
            </div>
        );
    },
};

export default meta;
