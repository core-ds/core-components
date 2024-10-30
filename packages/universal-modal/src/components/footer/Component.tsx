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
    const { setHasFooter, footerHighlighted } = useContext(ModalContext);
    const responsiveContext = useContext(ResponsiveContext);
    const { modalFooterHighlighted, view } = responsiveContext || {};

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    // custom scroll ломает highlight логику в base-modal, поэтому для десктопа обрабатываем самостоятельно
    const isHighlighted = view === 'desktop' ? modalFooterHighlighted : footerHighlighted;

    return (
        <div
            className={cn(
                styles.footer,
                className,
                layoutStyles[layout],
                gap && layoutStyles[`gap-${gap}`],
                {
                    [styles.highlighted]: sticky && isHighlighted,
                    [styles.sticky]: sticky,
                },
            )}
            data-test-id={dataTestId || getDataTestId(responsiveContext?.dataTestId, 'footer')}
            data-name='modalFooterDesktop'
        >
            {children}
        </div>
    );
};
