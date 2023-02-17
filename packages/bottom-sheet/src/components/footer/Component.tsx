import React, { ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';

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
};

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(({ children, className, sticky }, ref) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    return (
        <div
            ref={ref}
            className={cn(styles.footer, className, {
                [styles.sticky]: sticky,
                [styles.highlighted]: footerHighlighted && sticky,
            })}
        >
            {children}
        </div>
    );
});
