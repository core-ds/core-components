import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type GenericWrapperAddonProps = {
    /**
     * Дочерние элементы.
     */
    children: ReactNode;

    /**
     * Позволяет заполнить всё доступное пространство родительского элемента.
     */
    grow?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Addon = ({ children, grow, className, dataTestId }: GenericWrapperAddonProps) => (
    <div className={cn({ [styles.grow]: grow }, className)} data-test-id={dataTestId}>
        {children}
    </div>
);
