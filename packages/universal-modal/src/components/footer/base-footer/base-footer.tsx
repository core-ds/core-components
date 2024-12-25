import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { ModalContext } from '../../../Context';

import styles from '../index.module.css';

export type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Фиксирует футер
     */
    sticky?: boolean;

    /**
     * Выравнивание элементов футера
     */
    layout?: 'start' | 'center' | 'space-between' | 'column';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Отбивка бордером
     */
    isHighlighted?: boolean;
};

export const BaseFooter: FC<FooterProps> = ({
    children,
    className,
    sticky,
    dataTestId,
    isHighlighted,
}) => {
    const { setHasFooter } = useContext(ModalContext);

    useEffect(() => {
        setHasFooter(true);

        return () => {
            setHasFooter(false);
        };
    }, [setHasFooter]);

    return (
        <div
            className={cn(styles.footer, className, {
                [styles.highlighted]: sticky && isHighlighted,
                [styles.sticky]: sticky,
            })}
            data-test-id={dataTestId}
            data-name='modalFooterDesktop'
        >
            {children}
        </div>
    );
};
