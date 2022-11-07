import React from 'react';
import cn from 'classnames';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { Color, Typography } from '@alfalab/core-components-typography';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { AmountProps as AmountType } from '../typesProps';

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
    minority,
    minorUnits = 100,
    dataTestId,
    ...restProps
}) => (
    <Typography.Text
        view={textView}
        dataTestId={getDataTestId(dataTestId, 'amount-text')}
        className={cn(styles.component)}
        color={color}
    >
        <CoreAmount
            minority={minority || minorUnits}
            bold={weight === 'bold' ? 'full' : 'none'}
            dataTestId={getDataTestId(dataTestId, 'amount')}
            {...restProps}
        />
    </Typography.Text>
);
