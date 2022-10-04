import React from 'react';
import cn from 'classnames';

import { Typography, Color } from '@alfalab/core-components-typography';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { AmountProps as AmountType } from '../typesProps';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

type Props = {
    /**
     * Начертание шрифта денежного значения
     */
    weight?: 'bold' | 'normal';

    /**
     * Размер денежного значения
     */
    textView?: 'component' | 'primary-small';

    /**
     * Цвет денежного значения
     */
    color?: Color;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
} & AmountType;

export const Amount: React.FC<Props> = ({
    weight = 'normal',
    textView = 'component',
    color = 'primary',
    dataTestId,
    value,
    currency,
    minority,
    minorUnits = 100,
    rightAddons,
    showPlus,
    className,
    transparentMinor,
    view,
}) => {
    return (
        <Typography.Text
            view={textView}
            dataTestId={getDataTestId(dataTestId, 'amount-text')}
            className={cn(styles.component)}
            color={color}
        >
            <CoreAmount
                minority={minority || minorUnits}
                value={value}
                transparentMinor={transparentMinor}
                bold={weight === 'bold' ? 'full' : 'none'}
                rightAddons={rightAddons}
                showPlus={showPlus}
                className={className}
                currency={currency}
                dataTestId={getDataTestId(dataTestId, 'amount')}
                view={view}
            />
        </Typography.Text>
    );
};
