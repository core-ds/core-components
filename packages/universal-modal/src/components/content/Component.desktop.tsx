import React, { FC } from 'react';
import cn from 'classnames';

import { Content, ContentProps } from './Component';

export type ContentDesktopProps = ContentProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const ContentDesktop: FC<ContentDesktopProps> = ({ className, ...restProps }) => (
    <Content className={cn(className)} {...restProps} />
);
