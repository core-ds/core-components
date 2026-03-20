import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from '@alfalab/core-components-carousel';

const meta: Meta<typeof Carousel> = {
    title: 'Components/Carousel',
    component: Carousel,
    id: 'Carousel',
};

type Story = StoryObj<typeof Carousel>;

export const carousel: Story = {
    name: 'Carousel',
    render: () => {
        return <Carousel items={[]} />;
    },
};

export default meta;
