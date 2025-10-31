import React, { forwardRef, useContext } from 'react';
import cn from 'classnames';

import { UniversalModalContext } from '../../../context/universal-modal-context';
import { FOOTER_MEDIUM_BREAKPOINT } from '../../../desktop/constants';
import { BaseFooter, type FooterProps } from '../base-footer/base-footer';

import styles from './desktop.module.css';
import layoutStyles from './layout.module.css';

export interface FooterDesktopProps extends FooterProps {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
}

export const FooterDesktop = forwardRef<HTMLDivElement, FooterDesktopProps>((props, ref) => {
    const { className, sticky, layout = 'start', ...restProps } = props;
    const { modalWidth = 500, modalFooterHighlighted } = useContext(UniversalModalContext);

    const isMiddle = modalWidth === 'fullWidth' || modalWidth >= FOOTER_MEDIUM_BREAKPOINT;

    return (
        <BaseFooter
            ref={ref}
            className={cn(layoutStyles[layout], className, {
                [styles.sticky]: sticky,
                [layoutStyles.middle]: isMiddle,
            })}
            sticky={sticky}
            layout={layout}
            isHighlighted={modalFooterHighlighted}
            {...restProps}
        />
    );
});

FooterDesktop.displayName = 'FooterDesktop';
