import React, { FC } from 'react';
import cn from 'classnames';

import { Footer, FooterProps } from './Component';

import styles from './desktop.module.css';

export type FooterDesktopProps = FooterProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const FooterDesktop: FC<FooterDesktopProps> = ({ className, sticky, ...restProps }) => (
    <Footer
        className={cn(className, {
            [styles.sticky]: sticky,
        })}
        sticky={sticky}
        {...restProps}
    />
);
