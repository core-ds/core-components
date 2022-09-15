import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Typography, Color } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../component';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

type Props = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Количество строк
     */
    rowLimit?: 1 | 2;

    /**
     * Размер текста
     */
    view: 'primary-small' | 'component';

    /**
     * Цвет title
     */
    titleColor: Color;

    /**
     * Value ячейки
     */
    value?: ReactNode;

    /**
     * Цвет value
     */
    valueColor?: Color;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Text: React.FC<Props> = ({
    children,
    value,
    rowLimit,
    view = 'component',
    titleColor,
    valueColor,
    dataTestId,
}) => {
    const { direction = 'horizontal' } = useContext(PureCellContext);
    const className = rowLimit && styles[`rowLimit${rowLimit}`];

    return (
        <div
            className={cn(styles.component, {
                [styles.vertical]: direction !== 'horizontal',
            })}
        >
            <span className={styles.title}>
                {typeof children === 'string' ? (
                    <Typography.Text
                        view={view}
                        color={titleColor}
                        className={className}
                        data-test-id={getDataTestId(dataTestId, 'text')}
                    >
                        {children}
                    </Typography.Text>
                ) : (
                    children
                )}
            </span>
            <span>
                {typeof value === 'string' ? (
                    <Typography.Text
                        view={view}
                        color={valueColor}
                        className={className}
                        data-test-id={getDataTestId(dataTestId, 'text')}
                    >
                        {value}
                    </Typography.Text>
                ) : (
                    value
                )}
            </span>
        </div>
    );
};
