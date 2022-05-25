import React, { FC } from 'react';
import cn from 'classnames';
import { Footer, FooterProps } from './Component';
import { SidePanelDesktopProps } from '../../Component.desktop';

import styles from './desktop.module.css';

export type FooterDesktopProps = FooterProps & {
    /**
     * Размер
     */
    size?: SidePanelDesktopProps['size'];
};

export const FooterDesktop: FC<FooterDesktopProps> = ({
    size,
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
