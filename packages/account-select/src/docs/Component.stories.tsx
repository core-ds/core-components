import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AccountSelectDesktop } from '@alfalab/core-components-account-select/desktop';

const meta: Meta<typeof AccountSelectDesktop> = {
    title: 'Components/AccountSelect',
    component: AccountSelectDesktop,
    id: 'AccountSelect',
    argTypes: {
        size: {
            control: 'select',
            options: ['s', 'm', 'l'],
            description: 'Размер компонента',
        },
        block: {
            control: 'boolean',
            description: 'Растягивает компонент на ширину контейнера',
        },
        label: {
            control: 'text',
            description: 'Текст подписи',
        },
        error: {
            control: 'text',
            description: 'Текст ошибки',
        },
        hint: {
            control: 'text',
            description: 'Текст подсказки',
        },
    },
};

export default meta;

type Story = StoryObj<typeof AccountSelect>;

const options = [
    { key: '1', content: 'Счет 1' },
    { key: '2', content: 'Счет 2' },
    { key: '3', content: 'Счет 3' },
];

export const Default: Story = {
    args: {
        label: 'Выберите счет',
        options,
    },
};

export const WithError: Story = {
    args: {
        label: 'Выберите счет',
        error: 'Обязательное поле',
        options,
    },
};

export const WithHint: Story = {
    args: {
        label: 'Выберите счет',
        hint: 'Выберите счет для перевода',
        options,
    },
};

export const Block: Story = {
    args: {
        label: 'Выберите счет',
        block: true,
        options,
    },
};

export const Small: Story = {
    args: {
        label: 'Выберите счет',
        size: 's',
        options,
    },
};

export const Large: Story = {
    args: {
        label: 'Выберите счет',
        size: 'l',
        options,
    },
};
