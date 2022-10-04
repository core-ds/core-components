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
    value,
    currency,
    minority,
    transparentMinor,
    minorUnits = 100,
    rightAddons,
    showPlus,
    className,
    view,
    color = 'primary',
    dataTestId,
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
                value={value}
                currency={currency}
                rightAddons={rightAddons}
                showPlus={showPlus}
                className={cn(styles.weight, className)}
                dataTestId={getDataTestId(dataTestId, 'core-amount-title')}
                view={view}
                bold='none'
                transparentMinor={transparentMinor}
            />
        </Typography.Title>
    );
};
