import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { ResponsiveContext } from '../../../context/responsive-context';
import { FOOTER_MEDIUM_BREAKPOINT } from '../../../desktop/constants';
import { BaseFooter, FooterProps } from '../base-footer/base-footer';

import styles from './desktop.module.css';
import layoutStyles from './layout.module.css';

export type FooterDesktopProps = FooterProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const FooterDesktop: FC<FooterDesktopProps> = ({
    className,
    sticky,
    layout = 'start',
    ...restProps
}) => {
    const { modalWidth = 500, modalFooterHighlighted } = useContext(ResponsiveContext);

    const isMiddle = modalWidth === 'fullWidth' || modalWidth >= FOOTER_MEDIUM_BREAKPOINT;

    return (
        <BaseFooter
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
};

FooterDesktop.displayName = 'FooterDesktop';
