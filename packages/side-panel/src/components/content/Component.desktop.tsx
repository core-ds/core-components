import React, { type FC } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';

import { Content, type ContentProps } from './Component';

import styles from './desktop.module.css';

export type ContentDesktopProps = ContentProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const ContentDesktop: FC<ContentDesktopProps> = ({
    size = 500,
    className,
    ...restProps
}) => (
    <Content
        className={cn(className, size && styles[SIZE_TO_CLASSNAME_MAP[size]])}
        {...restProps}
    />
);
