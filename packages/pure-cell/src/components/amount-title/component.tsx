import React from 'react';
import cn from 'classnames';

import { Amount as CoreAmount } from '@alfalab/core-components-amount';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Color, TitleProps, Typography } from '@alfalab/core-components-typography';

import { AmountProps as AmountType } from '../typesProps';

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
} & AmountType;

export const AmountTitle: React.FC<Props> = ({
    minority,
    minorUnits = 100,
    className,
    color = 'primary',
    dataTestId,
    titleProps = {},
    ...restProps
}) => {
    const titleDefaultProps = {
        tag: 'h4',
        view: 'small',
        color,
        ...titleProps,
    } as Omit<TitleProps, 'className' | 'dataTestId'>;

    return (
        <Typography.Title
            {...titleDefaultProps}
            dataTestId={getDataTestId(dataTestId, 'amount-title')}
            className={cn(styles.component, titleProps.className)}
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
