import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { ModalContext } from '../../../Context';
import { BaseFooter, type FooterProps } from '../base-footer/base-footer';

import layoutStylesMobile from './layout.mobile.module.css';
import styles from './mobile.module.css';

export type FooterMobileProps = FooterProps;

export const FooterMobile: FC<FooterMobileProps> = ({
    className,
    sticky,
    layout = 'start',
    ...restProps
}) => {
    const { footerHighlighted } = useContext(ModalContext);

    return (
        <BaseFooter
            className={cn(styles.footer, layoutStylesMobile[layout], className, {
                [styles.sticky]: sticky,
            })}
            sticky={sticky}
            layout={layout}
            isHighlighted={footerHighlighted}
            {...restProps}
        />
    );
};
