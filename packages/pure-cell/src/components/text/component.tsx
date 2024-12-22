import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { type Color, Text as TypographyText } from '@alfalab/core-components-typography';

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
    view?:
        | 'primary-large'
        | 'primary-medium'
        | 'primary-small'
        | 'component'
        | 'component-primary'
        | 'secondary-large';

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
     * Идентификатор для систем автоматизированного тестирования.
     * Для контента используется модификатор -text_content, для value ячейки -text_value
     */
    dataTestId?: string;
};

export const Text: React.FC<Props> = ({
    children,
    value,
    rowLimit,
    view = 'component-primary',
    titleWeight,
    titleColor,
    valueColor,
    dataTestId,
}) => {
    const { direction = 'horizontal', dataTestId: contextDataTestId } = useContext(PureCellContext);
    const className = rowLimit && styles[`rowLimit${rowLimit}`];

    return (
        <div
            className={cn(styles.component, {
                [styles.vertical]: direction !== 'horizontal',
            })}
        >
            <div className={styles.title}>
                <TypographyText
                    view={view}
                    weight={titleWeight}
                    tag='div'
                    color={titleColor}
                    className={className}
                    data-test-id={getDataTestId(dataTestId || contextDataTestId, 'text_content')}
                >
                    {children}
                </TypographyText>
            </div>

            {value && (
                <div className={styles.value}>
                    <TypographyText
                        view={view}
                        tag='div'
                        color={valueColor}
                        className={className}
                        data-test-id={getDataTestId(dataTestId || contextDataTestId, 'text_value')}
                    >
                        {value}
                    </TypographyText>
                </div>
            )}
        </div>
    );
};
