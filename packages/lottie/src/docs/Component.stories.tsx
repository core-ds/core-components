import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Lottie } from '@alfalab/core-components-lottie';

const meta: Meta<typeof Lottie> = {
    title: 'Components/Lottie',
    component: Lottie,
    id: 'Lottie',
};

type Story = StoryObj<typeof Lottie>;

export const lottie: Story = {
    name: 'Lottie',
    render: () => {
        return <Lottie animation={{ path: 'http://localhost:9009/twitter-heart.json' }} />;
    },
};

export default meta;
