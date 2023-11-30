import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import layoutStyles from './layout.module.css';
import mobileStyles from './mobile.module.css';

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
};

export const Footer: FC<FooterProps> = ({ children, className, sticky, layout = 'start', gap }) => {
    const { footerHighlighted, setHasFooter } = useContext(ModalContext);
    const { size, view, dataTestId } = useContext(ResponsiveContext);

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    return (
        <div
            data-test-id={getDataTestId(dataTestId, 'footer')}
            className={cn(
                styles.footer,
                className,
                layoutStyles[layout],
                gap && layoutStyles[`gap-${gap}`],
                {
                    [styles.highlighted]: sticky && footerHighlighted,
                    [styles.sticky]: sticky,
                    [desktopStyles.footer]: view === 'desktop',
                    [desktopStyles.sticky]: view === 'desktop' && sticky,
                    [desktopStyles[size]]: view === 'desktop',
                    [mobileStyles.footer]: view === 'mobile',
                    [mobileStyles.sticky]: view === 'mobile' && sticky,
                },
            )}
        >
            {children}
        </div>
    );
};
