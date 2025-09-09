import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { AccountSelectDesktop } from '../desktop';
import { PureCell } from '@alfalab/core-components-pure-cell';
import { ProductCover } from '@alfalab/core-components-product-cover';
import { PlusMIcon } from '@alfalab/icons-glyph/PlusMIcon';
import { AccountSelectMobile } from '../mobile';
import { CardData } from '../types';
import { Amount } from '@alfalab/core-components-amount';
import { Typography } from '@alfalab/core-components-typography';

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

const getOptions = (platform: 'desktop' | 'mobile' = 'desktop') => [
    {
        key: '1',
        content: (
            <PureCell verticalPadding='default'>
                <PureCell.Graphics verticalAlign='center'>
                    <ProductCover.Single size={platform === 'desktop' ? 48 : 40} />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <Typography.Text color='secondary' view='primary-small'>
                            Карта с преимуществами
                        </Typography.Text>
                        <Amount
                            value={100000099}
                            minority={100}
                            currency='RUR'
                            bold='major'
                            transparentMinor={true}
                        />
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>
        ),
    },
    {
        key: '2',
        content: (
            <PureCell verticalPadding='default'>
                <PureCell.Graphics verticalAlign='center'>
                    <ProductCover.Single size={platform === 'desktop' ? 48 : 40} />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <Typography.Text color='secondary' view='primary-small'>
                            Карта с кредитным лимитом
                        </Typography.Text>
                        <Amount
                            value={100000099}
                            transparentMinor={true}
                            minority={100}
                            currency='RUR'
                            bold='major'
                        />
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>
        ),
    },
];

export const account_select_desktop: Story = {
    name: 'AccountSelectDesktop',
    render: () => {
        const [cardImage, setCardImage] = useState<typeof baseCard | undefined>(undefined);
        const handleInput = (data: CardData) => {
            if (data.number.startsWith('111111')) {
                setCardImage(baseCard);
            }
        };
        const handleSubmit = (data: CardData) => {
            console.log(data);
        };

        return (
            <AccountSelectDesktop
                size='s'
                onChange={(e) => {
                    console.log(e);
                }}
                label={text('label', 'Элемент')}
                fieldProps={{ leftAddons: <ProductCover.Single size={32} /> }}
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
                    needCvv: boolean('needCvv', true),
                    needExpiryDate: boolean('needExpiryDate', true),
                    expiryAsDate: boolean('expiryAsDate', true),
                    cardImage,
                }}
                options={getOptions()}
            />
        );
    },
};

export const account_select_mobile: Story = {
    name: 'AccountSelectMobile',
    render: () => (
        <AccountSelectMobile
            label={text('label', 'Элемент')}
            options={getOptions('mobile')}
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
                needCvv: boolean('needCvv', true),
                needExpiryDate: boolean('needExpiryDate', true),
                expiryAsDate: boolean('expiryAsDate', true),
            }}
        />
    ),
};

export default meta;
