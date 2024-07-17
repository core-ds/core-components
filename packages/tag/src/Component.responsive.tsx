import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseTagProps } from './components/base-tag';
import { TagDesktop } from './desktop';
import { TagMobile } from './mobile';

export type TagProps = Omit<BaseTagProps, 'styles' | 'colorStylesMap'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const Tag = forwardRef<HTMLButtonElement, TagProps>(
    ({ children, breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

        const Component = isDesktop ? TagDesktop : TagMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Tag.displayName = 'Tag';
