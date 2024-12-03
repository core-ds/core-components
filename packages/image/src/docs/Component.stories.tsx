import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Image } from '..';

const meta: Meta<typeof Image> = {
    title: 'Components/Image',
    component: Image,
    id: 'Image',
};

type Story = StoryObj<typeof IconButton>;

export const image: Story = {
    name: 'Image',
    render: () => {
        <Image src='https://web-test.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png' />;
    },
};

export default meta;
