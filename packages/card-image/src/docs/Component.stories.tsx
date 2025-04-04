import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import { CardImage } from '@balafla/core-components-card-image';

const meta: Meta<typeof CardImage> = {
    title: 'Components/CardImage',
    component: CardImage,
    id: 'CardImage',
};

type Story = StoryObj<typeof CardImage>;

export const card_image: Story = {
    name: 'CardImage',
    render: () => {
        return (
            <CardImage
                cardId={text('cardId', 'EG')}
                layers={text(
                    'layers',
                    'BACKGROUND,CARD_NUMBER,CARD_HOLDER,PAY_PASS,CHIP,LOGO,PAYMENT_SYSTEM,RESERVED_1,RESERVED_2,VALID_DATE',
                )}
                width={number('width', 280)}
                rounded={boolean('rounded', false)}
                baseUrl={text('baseUrl', 'https://online.alfabank.ru/cards-images/cards/')}
            />
        );
    },
};

export default meta;
