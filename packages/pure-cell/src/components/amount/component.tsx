import React, { useContext } from 'react';
import cn from 'classnames';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { getDataTestId } from '@alfalab/core-components-shared';
import { type Color, TypographyText } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../context';
import { type AmountProps as AmountType } from '../typesProps';

import styles from './index.module.css';

type Props = {
    /**
     * Начертание шрифта денежного значения
     */
    weight?: 'bold' | 'normal';

    /**
     * Размер денежного значения
     */
    textView?: 'component-primary' | 'primary-small';

    /**
     * Цвет денежного значения
     */
    color?: Color;

    /**
     * Скрыть денежное значение
     */
    hidden?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для typography используется модификатор -amount-text, для компонента Amount -amount
     */
    dataTestId?: string;
} & Omit<AmountType, 'dataTestId'>;

export const Amount: React.FC<Props> = ({
    weight = 'normal',
    textView = 'component-primary',
    color = 'primary',
    minority,
    minorUnits = 100,
    hidden,
    dataTestId,
    ...restProps
}) => {
    const pureCellContext = useContext(PureCellContext);

    if (hidden) {
        return (
            <div className={styles.hiddenWrapper}>
                <div className={styles.hidden} />
            </div>
        );
    }

    return (
        <TypographyText
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
        </TypographyText>
    );
};
