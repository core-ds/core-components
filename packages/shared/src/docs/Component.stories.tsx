import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { getColorVar } from '../get-color-var';

const meta: Meta<typeof Image> = {
    title: 'Components/shared',
    // component: Image,
    id: 'Image',
};

type Story = StoryObj<typeof Image>;

export const image: Story = {
    name: 'Image',
    render: () => {
        const lightToken = getColorVar({ color: 'accentColorPrimary', pure: true });
        console.log('🚀 ~ lightToken:', lightToken);
        const darkToken = getColorVar({ color: 'accentColorPrimary', pure: true, theme: 'dark' });
        console.log('🚀 ~ darkToken:', darkToken);
        return (
            <div>
                <div>lightToken: {lightToken}</div>
                <div>darkToken: {darkToken}</div>
            </div>
        );
    },
};

export default meta;
