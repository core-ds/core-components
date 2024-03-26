import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { BlurredUnderlay } from '@alfalab/core-components-blurred-underlay';

const meta: Meta<typeof BlurredUnderlay> = {
    title: 'Components/BlurredUnderlay',
    component: BlurredUnderlay,
    id: 'BlurredUnderlay',
};

type Story = StoryObj<typeof BlurredUnderlay>;

export const blurred_underlay: Story = {
    name: 'BlurredUnderlay',
    render: () => {
        return <div></div>;
    },
};

export default meta;
