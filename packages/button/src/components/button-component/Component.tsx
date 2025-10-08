import React, { forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { type ButtonComponentProps } from '../../typings';

import styles from './index.module.css';

export const ButtonComponent = forwardRef<HTMLElement, ButtonComponentProps>(
    ({ children, href, type = 'button', disabled = false, rel, className, ...restProps }, ref) => {
        const isAnchor = Boolean(href);
        const Tag = isAnchor ? 'a' : 'button';

        return (
            <Tag
                {...restProps}
                className={cn(className, styles.component)}
                ref={mergeRefs([ref])}
                rel={
                    rel ??
                    (isAnchor && restProps.target === '_blank' ? 'noreferrer noopener' : undefined)
                }
                type={isAnchor ? undefined : type}
                href={isAnchor && !disabled ? href : undefined}
                disabled={isAnchor ? undefined : disabled}
                aria-disabled={isAnchor ? disabled : undefined}
            >
                {children}
            </Tag>
        );
    },
);
