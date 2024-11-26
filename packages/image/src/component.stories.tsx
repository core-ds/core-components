import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Image } from '.';

export default {
    title: 'Common/Image',
    component: Image,
    tags: ['!dev'],
    argTypes: {
        dataTestId: { control: false },
        className: { control: false },
    },
} as Meta<typeof Image>;

export const Basic: StoryFn<typeof Image> = (args) => (
    <Image
        {...args}
        src='https://web-test.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png'
    />
);
