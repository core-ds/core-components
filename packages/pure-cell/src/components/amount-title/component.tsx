import React, { useContext } from 'react';
import cn from 'classnames';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { getDataTestId } from '@alfalab/core-components-shared';
import { type Color, type TitleProps, TitleResponsive } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../context';
import { type AmountProps as AmountType } from '../typesProps';

import styles from './index.module.css';

type Props = {
    /**
     * Цвет денежного значения
     * @deprecated Используйте titleProps.color
     */
    color?: Color;

    /**
     * Пропсы, которые будут прокинуты в компонент типографики
     */
    titleProps?: TitleProps;

    /**
     * Скрыть денежное значение
     */
    hidden?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для typography используется модификатор -amount-title, для компонента Amount -core-amount-title
     */
    dataTestId?: string;
} & Omit<AmountType, 'dataTestId'>;

export const AmountTitle: React.FC<Props> = ({
    minority,
    minorUnits = 100,
    hidden,
    className,
    color = 'primary',
    dataTestId,
    titleProps: titlePropsFromProps = {},
    ...restProps
}) => {
    const pureCellContext = useContext(PureCellContext);

    const titleProps = {
        tag: 'h4',
        view: 'small',
        color,
        ...titlePropsFromProps,
    } as Omit<TitleProps, 'className' | 'dataTestId'>;

    if (hidden) {
        return (
            <div className={cn(styles.hiddenWrapper, styles[`hiddenWrapper-${titleProps.view}`])}>
                <div className={cn(styles.hidden, styles[`hidden-${titleProps.view}`])} />
            </div>
        );
    }

    return (
        <TitleResponsive
            {...titleProps}
            dataTestId={getDataTestId(dataTestId || pureCellContext.dataTestId, 'amount-title')}
            className={cn(styles.component, titlePropsFromProps?.className)}
        >
            <CoreAmount
                minority={minority || minorUnits}
                className={cn(styles.weight, className)}
                dataTestId={getDataTestId(
                    dataTestId || pureCellContext.dataTestId,
                    'core-amount-title',
                )}
                {...restProps}
                bold='none'
            />
        </TitleResponsive>
    );
};
