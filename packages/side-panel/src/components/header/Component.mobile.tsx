import React, { ElementType, FC } from 'react';
import cn from 'classnames';
import CrossMIcon from '@alfalab/icons-glyph/CrossMIcon';
import { Header, HeaderProps } from './Component';
import { Closer } from '../closer/Component';

import styles from './mobile.module.css';

export type HeaderMobileProps = Omit<HeaderProps, 'closer'> & {
    /**
     * Наличие крестика
     */
    hasCloser?: boolean;

    /**
     * Иконка closer.
     */
    closerIcon?: ElementType;
};

export const HeaderMobile: FC<HeaderMobileProps> = ({
    className,
    contentClassName,
    hasCloser = true,
    sticky,
    closerIcon = CrossMIcon,
    ...restProps
}) => (
    <Header
        className={cn(className, {
            [styles.sticky]: sticky,
        })}
        contentClassName={cn(styles.content, contentClassName)}
        closer={hasCloser ? <Closer icon={closerIcon} size='xs' /> : null}
        sticky={sticky}
        {...restProps}
    />
);
