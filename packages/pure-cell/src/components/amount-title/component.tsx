import React from 'react';
import cn from 'classnames';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Color, Typography } from '@alfalab/core-components-typography';

import { AmountProps as AmountType } from '../typesProps';

import styles from './index.module.css';

type Props = {
    /**
     * Цвет денежного значения
     */
    color?: Color;
} & AmountType;

export const AmountTitle: React.FC<Props> = ({
    minority,
    minorUnits = 100,
    className,
    color = 'primary',
    dataTestId,
    ...restProps
}) => (
    <Typography.Title
        tag='h4'
        view='small'
        dataTestId={getDataTestId(dataTestId, 'amount-title')}
        className={styles.component}
        color={color}
    >
        <CoreAmount
            minority={minority || minorUnits}
            className={cn(styles.weight, className)}
            dataTestId={getDataTestId(dataTestId, 'core-amount-title')}
            {...restProps}
            bold='none'
        />
    </Typography.Title>
);
