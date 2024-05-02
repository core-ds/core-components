import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';

import { DiamondsXxlIcon } from '@alfalab/icons-glyph/DiamondsXxlIcon';
import { ProductCover } from '@alfalab/core-components-product-cover';

const meta: Meta<typeof ProductCover> = {
    title: 'Components/ProductCover',
    component: ProductCover,
    id: 'ProductCover',
};

type Story = StoryObj<typeof ProductCover>;

export const product_cover_single: Story = {
    name: 'ProductCover.Single',
    render: () => {
        const sizes = select('size', [164, 128, 96, 48, 40, 32, 16], 164);

        return (
            <ProductCover.Single
                baseUrl={text('baseUrl', 'https://online.alfabank.ru/cards-images/cards/')}
                layers={text('layers', 'BACKGROUND,LOGO,PAYMENT_SYSTEM')}
                cardId={text('cardId', 'RM')}
                icon={boolean('icon', false) && DiamondsXxlIcon}
                eyeButton={boolean('eyeButton', false)}
                cardNumber={number('cardNumber', 1234000000001234)}
                cardholderName={text('cardholderName', 'Cardholder Name')}
                cardholderNameUppercase={boolean('cardholderNameUppercase', false)}
                size={sizes}
                shadow={text('shadow', '2px 2px 2px 0px rgba(0, 0, 0, 0.20)')}
                borderColor={text('borderColor', undefined)}
                backgroundColor={text('backgroundColor', undefined)}
            />
        );
    },
};

export const product_cover_stack: Story = {
    name: 'ProductCover.Stack',
    render: () => {
        const sizes = select('size', [128, 40, 32, 16], 128);
        const shadow = text('shadow', '2px 2px 2px 0px rgba(0, 0, 0, 0.20)');

        const firstCard = {
            cardNumber: 1234000000001234,
            cardholderName: 'Cardholder Name',
            shadow: shadow,
            baseUrl: 'https://online.alfabank.ru/cards-images/cards/',
            layers: 'BACKGROUND,LOGO,PAYMENT_SYSTEM',
            cardId: 'RM',
        };
        const secondCard = {
            baseUrl: 'https://online.alfabank.ru/cards-images/cards/',
            layers: 'BACKGROUND,LOGO,PAYMENT_SYSTEM',
            cardId: 'RM',
        };

        return (
            <ProductCover.Stack
                size={sizes}
                firstCard={firstCard}
                secondCard={select('secondCard', [secondCard, null], secondCard)}
            />
        );
    },
};

export default meta;
