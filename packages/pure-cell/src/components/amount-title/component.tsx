import React from 'react';
import cn from 'classnames';

import { Typography, Color } from '@alfalab/core-components-typography';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { AmountProps as AmountType } from '../typesProps';
import { getDataTestId } from '../../../../utils/getDataTestId';

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
}) => {
    return (
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
};
