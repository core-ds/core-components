import React, { forwardRef, type HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type TBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const TBody = forwardRef<HTMLTableSectionElement, TBodyProps>(
    ({ className, children, dataTestId, ...restProps }, ref) => (
        <tbody
            className={cn(styles.component, className)}
            data-test-id={dataTestId}
            ref={ref}
            {...restProps}
        >
            {children}
        </tbody>
    ),
);

TBody.displayName = 'TBody';
