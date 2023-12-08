import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import styles from './index.module.css';
import layoutStyles from './layout.module.css';

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
     * Отступы между элементами футера
     */
    gap?: 16 | 24 | 32;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Footer: FC<FooterProps> = ({
    children,
    className,
    sticky,
    layout = 'start',
    gap,
    dataTestId,
}) => {
    const { footerHighlighted, setHasFooter } = useContext(ModalContext);
    const responsiveContext = useContext(ResponsiveContext);

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    return (
        <div
            className={cn(
                styles.footer,
                className,
                layoutStyles[layout],
                gap && layoutStyles[`gap-${gap}`],
                {
                    [styles.highlighted]: sticky && footerHighlighted,
                    [styles.sticky]: sticky,
                },
            )}
            data-test-id={dataTestId || getDataTestId(responsiveContext?.dataTestId, 'footer')}
        >
            {children}
        </div>
    );
};
