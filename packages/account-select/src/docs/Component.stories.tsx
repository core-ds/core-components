import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AccountSelectDesktop } from '../desktop';
import { PureCell } from '../../../pure-cell/src';
import { ProductCover } from '../../../product-cover/src';
import { Amount } from '../../../amount/src';

const meta: Meta<typeof AccountSelectDesktop> = {
    title: 'Components/AccountSelect',
    component: AccountSelectDesktop,
    tags: ['autodocs'],
    argTypes: {
        hasNewCardAdding: {
            control: 'boolean',
            description: 'Включить возможность добавления новой карты',
        },
    },
};

export default meta;
type Story = StoryObj<typeof AccountSelectDesktop>;

const options = [
    {
        key: '1',
        content: (
            <PureCell verticalPadding='compact'>
                <PureCell.Graphics verticalAlign='center'>
                    <ProductCover.Single size={32} />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Альфа-карта с преимуществами
                        </PureCell.Text>
                        <PureCell.Amount
                            value={100000099}
                            minorUnits={100}
                            currency='RUR'
                            color='primary'
                            view={'withZeroMinorPart'}
                            transparentMinor={true}
                        />
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>
        ),
        value: '1',
    },
    {
        key: '2',
        content: (
            <PureCell verticalPadding='compact'>
                <PureCell.Graphics verticalAlign='center'>
                    <ProductCover.Single size={32} />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Альфа-карта с кредитным лимитом
                        </PureCell.Text>
                        <PureCell.Amount
                            value={100099}
                            minorUnits={100}
                            currency='RUR'
                            color='primary'
                            view={'withZeroMinorPart'}
                            transparentMinor={true}
                        />
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>
        ),
        value: '2',
    },
];

export const account_select_desktop: Story = {
    name: 'AccountSelectDesktop',
    render: () => (
        <AccountSelectDesktop
            onInput={(values) => console.log(values)}
            label='Выберите карту'
            options={options}
            hasNewCardAdding={true}
        />
    ),
};
