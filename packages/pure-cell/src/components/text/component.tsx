import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Color, Typography } from '@alfalab/core-components-typography';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { PureCellContext } from '../../component';

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
    view: 'primary-large' | 'primary-medium' | 'primary-small' | 'component';

    /**
     * Толщина title
     */
    titleWeight?: 'regular' | 'bold';

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
    titleWeight,
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
                <Typography.Text
                    view={view}
                    weight={titleWeight}
                    color={titleColor}
                    className={cn(styles.typography, className)}
                    data-test-id={getDataTestId(dataTestId, 'text_content')}
                >
                    {children}
                </Typography.Text>
            </span>

            {value && (
                <span className={styles.value}>
                    <Typography.Text
                        view={view}
                        color={valueColor}
                        className={cn(styles.typography, className)}
                        data-test-id={getDataTestId(dataTestId, 'text_value')}
                    >
                        {value}
                    </Typography.Text>
                </span>
            )}
        </div>
    );
};
