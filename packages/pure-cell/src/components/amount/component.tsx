import React from 'react';
import cn from 'classnames';

import { Typography, Color } from '@alfalab/core-components-typography';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { AmountProps as AmountType } from '../typesProps';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

type Props = {
    /**
     * Props свойственные для компонента Amount
     */
    amount: AmountType;

    /**
     * Начертание шрифта денежного значения
     */
    weight?: 'bold' | 'normal';

    /**
     * Размер денежного значения
     */
    view?: 'component' | 'primary-small';

    /**
     * Цвет денежного значения
     */
    color?: Color;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Amount: React.FC<Props> = ({
    amount,
    weight = 'normal',
    view = 'component',
    color = 'primary',
    dataTestId,
}) => {
    const {
        value,
        currency,
        minority,
        minorUnits,
        rightAddons,
        showPlus,
        className,
        transparentMinor,
        view: viewAmount,
    } = amount;
    return (
        <Typography.Text
            view={view}
            dataTestId={getDataTestId(dataTestId, 'amount-text')}
            className={cn(styles.component)}
            color={color}
        >
            <CoreAmount
                minority={minority === undefined ? minorUnits : minority}
                value={value}
                transparentMinor={transparentMinor}
                bold={weight === 'bold' ? 'full' : 'none'}
                rightAddons={rightAddons}
                showPlus={showPlus}
                className={className}
                currency={currency}
                dataTestId={getDataTestId(dataTestId, 'amount')}
                view={viewAmount}
            />
        </Typography.Text>
    );
};
