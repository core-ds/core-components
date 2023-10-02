import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { UniversalDateInput } from '@alfalab/core-components-universal-date-input';
import { Calendar } from '@alfalab/core-components-calendar';
import { boolean, select } from '@storybook/addon-knobs';

const meta: Meta<typeof UniversalDateInput> = {
    title: 'Components/UniversalDateInput',
    component: UniversalDateInput,
    id: 'UniversalDateInput',
};

type Story = StoryObj<typeof UniversalDateInput>;

export const universal_date_input: Story = {
    name: 'UniversalDateInput',
    render: () => {
        return (
            <UniversalDateInput
                autoCorrection={boolean('autoCorrection', true)}
                view={select('view', ['date', 'date-time', 'date-range', 'time'] as any, 'date')}
                picker={boolean('picker', false) as true}
                Calendar={Calendar}
            />
        );
    },
};

export default meta;
