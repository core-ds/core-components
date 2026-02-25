import React, { forwardRef, useContext } from 'react';
import cn from 'classnames';

import { ModalContext } from '../../../Context';
import { FOOTER_MEDIUM_BREAKPOINT } from '../../../desktop/constants';
import { UniversalModalContext } from '../../../desktop/context';
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
    const { width: modalWidth } = useContext(UniversalModalContext);
    const { footerHighlighted: modalFooterHighlighted } = useContext(ModalContext);

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
