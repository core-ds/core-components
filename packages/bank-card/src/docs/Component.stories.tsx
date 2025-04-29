import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';
import styles from './preview.module.css';

import { AlfaBankSignMIcon } from '@alfalab/icons-logo/AlfaBankSignMIcon';
import { AlfaInvestEnLogoShortLIcon } from '@alfalab/icons-logotype/AlfaInvestEnLogoShortLIcon';
import { BankCard } from '@alfalab/core-components-bank-card';

const logo = {
    default: <AlfaBankSignMIcon width={30} height={40} />,
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
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;

        return (
            <div style={previewStyles}>
                <BankCard
                    className={isPreview ? styles.preview : undefined}
                    backgroundColor={text('backgroundColor', '#EF3124')}
                    bankLogo={logo[select('bankLogo', ['default', 'custom'], 'default')]}
                    maskType={select('maskType', ['default', 'card', 'account-number'], 'default')}
                />
            </div>
        );
    },
};

export default meta;
