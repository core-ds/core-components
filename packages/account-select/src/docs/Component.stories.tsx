import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AccountSelectDesktop } from '../desktop';

const meta: Meta<typeof AccountSelectDesktop> = {
    title: 'Components/AccountSelect',
    component: AccountSelectDesktop,
    tags: ['autodocs'],
    argTypes: {
       hasNewCardAdding: {
        control: 'boolean',
        description: 'Включить возможность добавления новой карты',
       }
    },
};

export default meta;
type Story = StoryObj<typeof AccountSelectDesktop>;

const options = [
    {
        key: '1',
        content: 'Карта *1234',
        value: '1'
    },
    {
        key: '2',
        content: 'Карта *5678',
        value: '2'
    }
];

export const account_select_desktop: Story = {
    name: 'AccountSelectDesktop',
    render: () => <AccountSelectDesktop label='Выберите карту' options={options} hasNewCardAdding={true} />,
};
