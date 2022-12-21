import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Addon } from './components/addon';

import styles from './index.module.css';

export type DataContentProps = {
    /**
     * Дочерние элементы. Ожидаются компоненты `GenericWrapper.DataContent.Addon`
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

const DataContentComponent = ({ children, className, dataTestId }: DataContentProps) => (
    <div className={cn(styles.component, className)} data-test-id={dataTestId}>
        {children}
    </div>
);

export const DataContent = Object.assign(DataContentComponent, {
    Addon,
});
