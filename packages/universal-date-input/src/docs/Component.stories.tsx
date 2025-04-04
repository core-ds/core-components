import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { UniversalDateInput } from '@balafla/core-components-universal-date-input';
import { UniversalDateInputDesktop } from '@balafla/core-components-universal-date-input/desktop';
import { UniversalDateInputMobile } from '@balafla/core-components-universal-date-input/mobile';
import { Calendar } from '@balafla/core-components-calendar';
import { boolean, select } from '@storybook/addon-knobs';

const meta: Meta<typeof UniversalDateInput> = {
    title: 'Components/UniversalDateInput',
    component: UniversalDateInput,
    id: 'UniversalDateInput',
};

type Story = StoryObj<typeof UniversalDateInput>;

export const universal_date_input_responsive: Story = {
    name: 'UniversalDateInputResponsive',
    render: () => {
        return (
            <UniversalDateInput
                autoCorrection={boolean('autoCorrection', true)}
                view={select('view', ['date', 'date-time', 'date-range', 'time'] as any, 'date')}
                picker={boolean('picker', false) as true}
                Calendar={Calendar}
                size={select('size', [40, 48, 56, 64, 72], 48)}
            />
        );
    },
};

export const universal_date_input_desktop: Story = {
    name: 'UniversalDateInputDesktop',
    render: () => {
        return (
            <UniversalDateInputDesktop
                autoCorrection={boolean('autoCorrection', true)}
                view={select('view', ['date', 'date-time', 'date-range', 'time'] as any, 'date')}
                picker={boolean('picker', false) as true}
                Calendar={Calendar}
                size={select('size', [40, 48, 56, 64, 72], 48)}
            />
        );
    },
};

export const universal_date_input_mobile: Story = {
    name: 'UniversalDateInputMobile',
    render: () => {
        return (
            <UniversalDateInputMobile
                autoCorrection={boolean('autoCorrection', true)}
                view={select('view', ['date', 'date-time', 'date-range', 'time'] as any, 'date')}
                picker={boolean('picker', false) as true}
                Calendar={Calendar}
                size={select('size', [40, 48, 56, 64, 72], 48)}
            />
        );
    },
};

export default meta;
