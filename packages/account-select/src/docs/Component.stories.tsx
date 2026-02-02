import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { AccountSelectDesktop } from '../desktop';
import { PureCell } from '@alfalab/core-components-pure-cell';
import { ProductCover } from '@alfalab/core-components-product-cover';
import { PlusMIcon } from '@alfalab/icons-glyph/PlusMIcon';
import { AccountSelectMobile } from '../mobile';
import { CardData } from '../types';
import { Amount } from '@alfalab/core-components-amount';
import { Typography } from '@alfalab/core-components-typography';
import { PRODUCT_COVER_SIZE_MAPPER } from '../constants';

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

const getOptions = (platform: 'desktop' | 'mobile' = 'desktop') =>
    DATA.map((el) => ({
        key: el.id,
        value: el,
        content: (
            <PureCell verticalPadding='default'>
                <PureCell.Graphics verticalAlign='center'>
                    <ProductCover.Single size={platform === 'desktop' ? 48 : 40} />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <Typography.Text rowLimit={1} color='secondary' view='primary-small'>
                            {el.text}
                        </Typography.Text>
                        <Amount
                            value={el.amount}
                            minority={100}
                            currency='RUR'
                            bold='major'
                            transparentMinor={true}
                        />
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>
        ),
    }));

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
                        return (
                            <PureCell verticalPadding='none'>
                                <PureCell.Graphics verticalAlign='center'>
                                    <ProductCover.Single size={PRODUCT_COVER_SIZE_MAPPER[size]} />
                                </PureCell.Graphics>
                                <PureCell.Content>
                                    <PureCell.Main>
                                        <Typography.Text
                                            rowLimit={1}
                                            color='secondary'
                                            view='primary-small'
                                        >
                                            {selected?.value.text}
                                        </Typography.Text>
                                        <Amount
                                            value={selected?.value.amount}
                                            minority={100}
                                            currency='RUR'
                                            bold='major'
                                            transparentMinor={true}
                                        />
                                    </PureCell.Main>
                                </PureCell.Content>
                            </PureCell>
                        );
                    }}
                    placeholder={text('placeholder', 'Элемент')}
                    fieldProps={{
                        leftAddons: <ProductCover.Single size={PRODUCT_COVER_SIZE_MAPPER[size]} />,
                    }}
                    cardAddingProps={{
                        content: (
                            <PureCell verticalPadding='default'>
                                <PureCell.Graphics verticalAlign='center'>
                                    <ProductCover.Single
                                        size={48}
                                        iconColor='var(--color-light-neutral-700)'
                                        backgroundColor='var(--color-light-neutral-200)'
                                        icon={PlusMIcon}
                                    />
                                </PureCell.Graphics>
                                <PureCell.Content>
                                    <PureCell.Main>
                                        <Typography.Text view='component-primary'>
                                            Новая карта
                                        </Typography.Text>
                                    </PureCell.Main>
                                </PureCell.Content>
                            </PureCell>
                        ),
                        onInput: handleInput,
                        onSubmit: handleSubmit,
                        needCVC: boolean('needCVC', true),
                        needExpiryDate: boolean('needExpiryDate', true),
                        expiryAsDate: boolean('expiryAsDate', true),
                        cardImage,
                    }}
                    options={getOptions()}
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
                options={getOptions('mobile')}
                fieldProps={{
                    leftAddons: <ProductCover.Single size={PRODUCT_COVER_SIZE_MAPPER[size]} />,
                }}
                valueRenderer={({ selected }) => {
                    return (
                        <PureCell verticalPadding='none'>
                            <PureCell.Graphics verticalAlign='center'>
                                <ProductCover.Single size={PRODUCT_COVER_SIZE_MAPPER[size]} />
                            </PureCell.Graphics>
                            <PureCell.Content>
                                <PureCell.Main>
                                    <Typography.Text
                                        rowLimit={1}
                                        color='secondary'
                                        view='primary-small'
                                    >
                                        {selected?.value.text}
                                    </Typography.Text>
                                    <Amount
                                        value={selected?.value.amount}
                                        minority={100}
                                        currency='RUR'
                                        bold='major'
                                        transparentMinor={true}
                                    />
                                </PureCell.Main>
                            </PureCell.Content>
                        </PureCell>
                    );
                }}
                cardAddingProps={{
                    content: (
                        <PureCell verticalPadding='none'>
                            <PureCell.Graphics verticalAlign='center'>
                                <ProductCover.Single
                                    size={40}
                                    iconColor='var(--color-light-neutral-700)'
                                    backgroundColor='var(--color-light-neutral-200)'
                                    icon={PlusMIcon}
                                />
                            </PureCell.Graphics>
                            <PureCell.Content>
                                <PureCell.Main>
                                    <Typography.Text view='component-primary'>
                                        Новая карта
                                    </Typography.Text>
                                </PureCell.Main>
                            </PureCell.Content>
                        </PureCell>
                    ),
                    needCVC: boolean('needCVC', true),
                    needExpiryDate: boolean('needExpiryDate', true),
                    expiryAsDate: boolean('expiryAsDate', true),
                }}
            />
        );
    },
};

export default meta;
