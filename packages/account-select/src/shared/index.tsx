import React from 'react';

import { Amount, type AmountProps } from '@alfalab/core-components-amount';
import { GenericWrapper, type GenericWrapperProps } from '@alfalab/core-components-generic-wrapper';
import { ProductCover } from '@alfalab/core-components-product-cover';
import { type SingleProps } from '@alfalab/core-components-product-cover/typings';
import { type OptionShape } from '@alfalab/core-components-select/shared';
import { Typography } from '@alfalab/core-components-typography';
import { PlusMIcon } from '@alfalab/icons-glyph/PlusMIcon';

export type AccountSelectOptionPlatform = 'desktop' | 'mobile';

export type AccountSelectCardOptionData = {
    key?: string;
    id?: string;
    text?: string;
    amount?: number;
};

export type AccountSelectCardContentProps = {
    text?: string;
    amount?: number;
    coverSize: SingleProps['size'];
    padding?: GenericWrapperProps['padding'];
    productCoverProps?: Omit<SingleProps, 'size'>;
    amountProps?: Partial<Omit<AmountProps, 'value'>>;
};

export const renderAccountSelectCardContent = ({
    text,
    amount = 0,
    coverSize,
    padding,
    productCoverProps,
    amountProps,
}: AccountSelectCardContentProps) => (
    <GenericWrapper alignItems='center' gap={16} padding={padding}>
        <GenericWrapper>
            <ProductCover.Single {...productCoverProps} size={coverSize} />
        </GenericWrapper>
        <GenericWrapper column={true} grow={true}>
            <Typography.Text rowLimit={1} color='secondary' view='primary-small'>
                {text}
            </Typography.Text>
            <Amount
                value={amount}
                minority={100}
                currency='RUR'
                bold='major'
                transparentMinor={true}
                {...amountProps}
            />
        </GenericWrapper>
    </GenericWrapper>
);

export type AccountSelectAddCardContentProps = {
    coverSize: SingleProps['size'];
    padding?: GenericWrapperProps['padding'];
    text?: string;
    productCoverProps?: Omit<SingleProps, 'size' | 'icon'>;
};

export const renderAccountSelectAddCardContent = ({
    coverSize,
    padding,
    text = 'Новая карта',
    productCoverProps,
}: AccountSelectAddCardContentProps) => (
    <GenericWrapper alignItems='center' gap={16} padding={padding}>
        <GenericWrapper>
            <ProductCover.Single
                iconColor='var(--color-light-neutral-700)'
                backgroundColor='var(--color-light-neutral-200)'
                {...productCoverProps}
                size={coverSize}
                icon={PlusMIcon}
            />
        </GenericWrapper>
        <GenericWrapper column={true} grow={true}>
            <Typography.Text view='component-primary'>{text}</Typography.Text>
        </GenericWrapper>
    </GenericWrapper>
);

export const getAccountSelectCardOptions = <T extends AccountSelectCardOptionData>(
    data: T[],
    platform: AccountSelectOptionPlatform = 'desktop',
): Array<OptionShape & { value: T }> =>
    data.map((item, index) => ({
        key: item.key ?? item.id ?? String(index),
        value: item,
        content: renderAccountSelectCardContent({
            text: item.text,
            amount: item.amount,
            coverSize: platform === 'desktop' ? 48 : 40,
            padding: platform === 'desktop' ? { top: 12, bottom: 12 } : undefined,
        }),
    }));
