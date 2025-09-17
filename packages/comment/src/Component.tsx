import React, { type ReactNode } from 'react';
import cn from 'classnames';

import { Text } from '@alfalab/core-components-typography';

import styles from './index.module.css';

export type CommentProps = {
    /**
     * Количество строк
     */
    rowLimit?: 2 | 5;
    /**
     *  Сss класс для стилизации общей обёртки
     */
    className?: string;

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const Comment: React.FC<CommentProps> = ({ className, dataTestId, children, rowLimit }) => {
    const textClassName = rowLimit && styles[`rowLimit${rowLimit}`];

    return (
        <div className={cn(styles.component, className)} data-test-id={dataTestId}>
            <Text tag='div' view='component-primary' className={textClassName} color='primary'>
                {children}
            </Text>
        </div>
    );
};
