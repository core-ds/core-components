import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import styles from './index.module.css';
import layoutStylesMobile from './layout.mobile.module.css';
import layoutStyles from './layout.module.css';
import { FOOTER_MEDIUM_BREAKPOINT } from '../../desktop/const';

const layouts = {
    desktop: layoutStyles,
    mobile: layoutStylesMobile,
};

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
};

export const Footer: FC<FooterProps> = ({
    children,
    className,
    sticky,
    layout = 'start',
    dataTestId,
}) => {
    const { setHasFooter, footerHighlighted } = useContext(ModalContext);
    const responsiveContext = useContext(ResponsiveContext);
    const { modalFooterHighlighted, view = 'desktop', modalWidth = 500 } = responsiveContext || {};

    useEffect(() => {
        setHasFooter(true);

        return () => {
            setHasFooter(false);
        };
    }, [setHasFooter]);

    // custom scroll ломает highlight логику в base-modal, поэтому для десктопа обрабатываем самостоятельно
    const isHighlighted = view === 'desktop' ? modalFooterHighlighted : footerHighlighted;

    return (
        <div
            className={cn(styles.footer, className, layouts[view][layout], {
                [styles.highlighted]: sticky && isHighlighted,
                [styles.sticky]: sticky,
                [layoutStyles.middle]: view === 'desktop' && modalWidth >= FOOTER_MEDIUM_BREAKPOINT,
            })}
            data-test-id={dataTestId || getDataTestId(responsiveContext?.dataTestId, 'footer')}
            data-name='modalFooterDesktop'
        >
            {children}
        </div>
    );
};
