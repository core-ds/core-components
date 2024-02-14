import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';

import { DiamondsXxlIcon } from '@alfalab/icons-glyph/DiamondsXxlIcon';
import { BankСardView } from '@alfalab/core-components-bank-card-view';

const meta: Meta<typeof BankСardView> = {
    title: 'Components/BankСardView',
    component: BankСardView,
    id: 'BankСardView',
};

type Story = StoryObj<typeof BankСardView>;

export const bank_card_view_image: Story = {
    name: 'BankСardView.Image',
    render: () => {
        const sizes = select(
            'size',
            [
                [164, 264],
                [128, 205],
                [96, 152],
                [48, 76],
                [40, 65],
                [32, 51],
                [16, 24],
            ],
            [164, 264],
        );

        return (
            <BankСardView.Image
                imageUrl={text('imageUrl', 'https://online.alfabank.ru/cards-images/cards/')}
                layers={text('layers', 'BACKGROUND,LOGO,PAYMENT_SYSTEM')}
                cardId={text('cardId', 'RM')}
                statusIcon={boolean('statusIcon', false) && DiamondsXxlIcon}
                colors={select('colors', ['default', 'inverted'], 'default')}
                eyeButton={boolean('eyeButton', false)}
                maskedCardNumber={number('maskedCardNumber', 1234000000001234)}
                cardholderName={text('cardholderName', 'Cardholder Name')}
                cardholderNameUppercase={boolean('cardholderNameUppercase', false)}
                size={sizes}
                shadow={text('shadow', '2px 2px 2px 0px rgba(0, 0, 0, 0.20)')}
            />
        );
    },
};

export const bank_card_view_stack: Story = {
    name: 'BankСardView.Stack',
    render: () => {
        const sizes = select(
            'size',
            [
                [164, 264],
                [128, 205],
                [96, 152],
                [48, 76],
                [40, 65],
                [32, 51],
                [16, 24],
            ],
            [164, 264],
        );
        const shadow = text('shadow', '2px 2px 2px 0px rgba(0, 0, 0, 0.20)');
        const colors = select('colors', ['default', 'inverted'], 'default');

        const firstCard = {
            maskedCardNumber: 1234000000001234,
            cardholderName: 'Cardholder Name',
            shadow: shadow,
            imageUrl: 'https://online.alfabank.ru/cards-images/cards/',
            layers: 'BACKGROUND,LOGO,PAYMENT_SYSTEM',
            cardId: 'RM',
            colors: colors,
        };
        const secondCard = {
            imageUrl: 'https://online.alfabank.ru/cards-images/cards/',
            layers: 'BACKGROUND,LOGO,PAYMENT_SYSTEM',
            cardId: 'RM',
        };

        return (
            <BankСardView.Stack
                size={sizes}
                firstCard={firstCard}
                secondCard={select('secondCard', [secondCard, null], secondCard)}
            />
        );
    },
};

export default meta;
