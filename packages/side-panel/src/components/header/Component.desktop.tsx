import React, { ElementType, FC } from 'react';
import cn from 'classnames';

import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';

import { Closer } from '../closer/Component';

import { Header, HeaderProps } from './Component';

import styles from './desktop.module.css';

export type HeaderDesktopProps = Omit<HeaderProps, 'closer'> & {
    /**
     * Размер
     */
    size?: 's';

    /**
     * Наличие крестика
     */
    hasCloser?: boolean;

    /**
     * Иконка closer.
     */
    closerIcon?: ElementType;
};

export const HeaderDesktop: FC<HeaderDesktopProps> = ({
    size = 's',
    className,
    contentClassName,
    hasCloser = true,
    closerIcon = CrossHeavyMIcon,
    sticky,
    leftAddons = <span />,
    title,
    children,
    ...restProps
}) => {
    const hasContent = Boolean(title || children);

    return (
        <Header
            className={cn(className, size && styles[size], {
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
            })}
            contentClassName={cn(styles.content, contentClassName)}
            closer={hasCloser ? <Closer icon={closerIcon} /> : null}
            leftAddons={leftAddons}
            sticky={sticky}
            title={title}
            {...restProps}
        >
            {children}
        </Header>
    );
};
