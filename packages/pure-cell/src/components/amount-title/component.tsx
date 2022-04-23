import React from 'react';
import { Typography } from '@alfalab/core-components-typography';
import { Color } from '@alfalab/core-components-typography/src/colors';

import { Amount as CorAmount } from '@alfalab/core-components-amount';
import { AmountProps as AmountType } from '../typesProps';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

type Props = {
    /**
     * Props свойственные для компонента Amount
     */
    amount: AmountType;
    /**
     * Цвет денежного значения
     */
    color?: Color;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const AmountTitle: React.FC<Props> = ({ amount, color = 'primary', dataTestId }) => {
    const { value, currency, minority, minorUnits, rightAddons, showPlus, className } = amount;
    return (
        <Typography.Title
            tag='h4'
            view='small'
            dataTestId={getDataTestId(dataTestId, 'amount-title')}
            className={styles.component}
            color={color}
        >
            <CorAmount
                minority={minority === undefined ? minorUnits : minority}
                value={value}
                rightAddons={rightAddons}
                showPlus={showPlus}
                className={className}
                currency={currency}
                dataTestId={getDataTestId(dataTestId, 'amount-title')}
                view='withZeroMinorPart'
            />
        </Typography.Title>
    );
};
