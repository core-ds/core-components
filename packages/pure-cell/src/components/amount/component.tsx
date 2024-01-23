import React, { useContext } from 'react';
import cn from 'classnames';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Color, Typography } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../component';
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
     * Идентификатор для систем автоматизированного тестирования.
     * Для typography используется модификатор -amount-text, для компонента Amount -amount
     */
    dataTestId?: string;
} & Omit<AmountType, 'dataTestId'>;

export const Amount: React.FC<Props> = ({
    weight = 'normal',
    textView = 'component',
    color = 'primary',
    minority,
    minorUnits = 100,
    dataTestId,
    ...restProps
}) => {
    const pureCellContext = useContext(PureCellContext);

    return (
        <Typography.Text
            view={textView}
            dataTestId={getDataTestId(dataTestId || pureCellContext.dataTestId, 'amount-text')}
            className={cn(styles.component)}
            color={color}
        >
            <CoreAmount
                minority={minority || minorUnits}
                bold={weight === 'bold' ? 'full' : 'none'}
                dataTestId={getDataTestId(dataTestId || pureCellContext.dataTestId, 'amount')}
                {...restProps}
            />
        </Typography.Text>
    );
};
