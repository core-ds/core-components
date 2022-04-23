import React from 'react';
import cn from 'classnames';

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
     * Начертание шрифта денежного значения
     */
    wight?: 'bold' | 'normal';
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
    wight = 'normal',
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
        view: viewAount,
    } = amount;
    return (
        <Typography.Text
            view={view}
            dataTestId={getDataTestId(dataTestId, 'amount')}
            className={cn(styles.component, styles[wight])}
            color={color}
        >
            <CorAmount
                minority={minority === undefined ? minorUnits : minority}
                value={value}
                rightAddons={rightAddons}
                showPlus={showPlus}
                className={className}
                currency={currency}
                dataTestId={getDataTestId(dataTestId, 'amount')}
                view={viewAount}
            />
        </Typography.Text>
    );
};
