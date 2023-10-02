import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

import { AlfaBankLIcon } from '@alfalab/icons-logotype/AlfaBankLIcon';
import { AlfaInvestEnLogoShortLIcon } from '@alfalab/icons-logotype/AlfaInvestEnLogoShortLIcon';
import { BankCard } from '@alfalab/core-components-bank-card';

const logo = {
    default: <AlfaBankLIcon />,
    custom: <AlfaInvestEnLogoShortLIcon />,
};

const meta: Meta<typeof BankCard> = {
    title: 'Components/BankCard',
    component: BankCard,
    id: 'BankCard',
};

type Story = StoryObj<typeof BankCard>;

export const bank_card: Story = {
    name: 'BankCard',
    render: () => {
        return (
            <BankCard
                backgroundColor={text('backgroundColor', '#EF3124')}
                bankLogo={logo[select('bankLogo', ['default', 'custom'], 'default')]}
            />
        );
    },
};

export default meta;
