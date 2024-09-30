import React, { FC } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';

import { Footer, FooterProps } from './Component';

import styles from './desktop.module.css';

export type FooterDesktopProps = FooterProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const FooterDesktop: FC<FooterDesktopProps> = ({
    size = 500,
    className,
    sticky,
    ...restProps
}) => (
    <Footer
        className={cn(className, size && styles[SIZE_TO_CLASSNAME_MAP[size]], {
            [styles.sticky]: sticky,
        })}
        sticky={sticky}
        {...restProps}
    />
);
