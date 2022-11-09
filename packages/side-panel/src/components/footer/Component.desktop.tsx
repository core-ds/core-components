import React, { FC } from 'react';
import cn from 'classnames';

import { Footer, FooterProps } from './Component';

import styles from './desktop.module.css';

export type FooterDesktopProps = FooterProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's';
};

export const FooterDesktop: FC<FooterDesktopProps> = ({
    size = 's',
    className,
    sticky,
    ...restProps
}) => (
    <Footer
        className={cn(className, size && styles[size], {
            [styles.sticky]: sticky,
        })}
        sticky={sticky}
        {...restProps}
    />
);
