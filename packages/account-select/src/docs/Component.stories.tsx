import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { AccountSelectDesktop } from '../desktop';
import { ProductCover } from '@alfalab/core-components-product-cover';
import { AccountSelectMobile } from '../mobile';
import { CardData } from '../types';
import { PRODUCT_COVER_SIZE_MAPPER } from '../constants';
import {
    getAccountSelectCardOptions,
    renderAccountSelectAddCardContent,
    renderAccountSelectCardContent,
} from '../shared';

const baseCard = {
    baseUrl: 'https://online.alfabank.ru/cards-images/cards/',
    layers: 'BACKGROUND,LOGO,PAYMENT_SYSTEM',
    cardId: 'RM',
};

const meta: Meta<typeof AccountSelectDesktop> = {
    title: 'Components/AccountSelect',
    component: AccountSelectDesktop,
    id: 'AccountSelect',
};

type Story = StoryObj<typeof AccountSelectDesktop>;

const DATA = [
    { text: 'Карта с преимуществами', amount: 100000099, id: '1' },
    { text: 'Карта с кредитным лимитом', amount: 999999, id: '2' },
    { text: 'Карта с вашим дизайном', amount: 0, id: '3' },
];

export const account_select_desktop: Story = {
    name: 'AccountSelectDesktop',
    render: () => {
        const size = select('size', [40, 48, 56, 64, 72], 56);
        const [cardImage, setCardImage] = useState<typeof baseCard | undefined>(undefined);
        const handleInput = (data: CardData) => {
            if (data.number.startsWith('111111')) {
                setCardImage(baseCard);
            } else {
                setCardImage(undefined);
            }
        };
        const handleSubmit = (data: CardData) => {
            console.log(data);
        };

        return (
            <div style={{ width: 456 }}>
                <AccountSelectDesktop
                    size={size}
                    onChange={(e) => {
                        console.log(e);
                    }}
                    valueRenderer={({ selected }) => {
                        return renderAccountSelectCardContent({
                            text: selected?.value.text,
                            amount: selected?.value.amount,
                            coverSize: PRODUCT_COVER_SIZE_MAPPER[size],
                        });
                    }}
                    placeholder={text('placeholder', 'Элемент')}
                    fieldProps={{
                        leftAddons: <ProductCover.Single size={PRODUCT_COVER_SIZE_MAPPER[size]} />,
                    }}
                    cardAddingProps={{
                        content: renderAccountSelectAddCardContent({
                            coverSize: 48,
                            padding: { top: 12, bottom: 12 },
                        }),
                        onInput: handleInput,
                        onSubmit: handleSubmit,
                        needCVC: boolean('needCVC', true),
                        needExpiryDate: boolean('needExpiryDate', true),
                        expiryAsDate: boolean('expiryAsDate', true),
                        cardImage,
                    }}
                    options={getAccountSelectCardOptions(DATA)}
                />
            </div>
        );
    },
};

export const account_select_mobile: Story = {
    name: 'AccountSelectMobile',
    render: () => {
        const size = select('size', [40, 48, 56, 64, 72], 56);
        return (
            <AccountSelectMobile
                size={size}
                placeholder={text('placeholder', 'Элемент')}
                options={getAccountSelectCardOptions(DATA, 'mobile')}
                fieldProps={{
                    leftAddons: <ProductCover.Single size={PRODUCT_COVER_SIZE_MAPPER[size]} />,
                }}
                valueRenderer={({ selected }) => {
                    return renderAccountSelectCardContent({
                        text: selected?.value.text,
                        amount: selected?.value.amount,
                        coverSize: PRODUCT_COVER_SIZE_MAPPER[size],
                    });
                }}
                cardAddingProps={{
                    content: renderAccountSelectAddCardContent({ coverSize: 40 }),
                    needCVC: boolean('needCVC', true),
                    needExpiryDate: boolean('needExpiryDate', true),
                    expiryAsDate: boolean('expiryAsDate', true),
                }}
            />
        );
    },
};

export default meta;
