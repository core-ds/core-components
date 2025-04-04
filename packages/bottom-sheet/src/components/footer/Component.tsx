import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { BaseModalContext } from '@balafla/core-components-base-modal';
import cn from 'classnames';

import styles from './index.module.css';

export type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;

    /**
     * Фиксирует футер
     */
    sticky?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Footer: FC<FooterProps> = ({ children, className, sticky, dataTestId }) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    return (
        <div
            className={cn(styles.footer, className, {
                [styles.sticky]: sticky,
                [styles.highlighted]: footerHighlighted && sticky,
            })}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};
