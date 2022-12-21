import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type DataContentProps = {
    /**
     * Дочерние элементы. Ожидаются компоненты `GenericWrapper.Line`, `Gap`
     */
    children: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const DataContent = ({ children, className, dataTestId }: DataContentProps) => (
    <div className={cn(styles.component, className)} data-test-id={dataTestId}>
        {children}
    </div>
);
