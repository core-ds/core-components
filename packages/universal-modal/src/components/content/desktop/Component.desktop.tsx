import React, { FC } from 'react';
import cn from 'classnames';

import { BaseContent, ContentProps } from '../base-content/base-content';

export type ContentDesktopProps = ContentProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const ContentDesktop: FC<ContentDesktopProps> = ({ className, ...restProps }) => (
    <BaseContent className={cn(className)} {...restProps} />
);
