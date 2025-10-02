import React, { type AnchorHTMLAttributes, forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { hasOwnProperty } from '@alfalab/core-components-shared';

import { type ButtonComponentProps } from '../base-button-candidate';

import styles from './index.module.css';

function isAnchorProps(props: ButtonComponentProps): props is AnchorHTMLAttributes<HTMLElement> {
    return hasOwnProperty(props, 'href') && typeof props.href === 'string';
}

export const ButtonComponent = forwardRef<HTMLElement, ButtonComponentProps>(
    (props, forwardedRef) => {
        const cls = cn(props.className, styles.component);
        const ref = mergeRefs([forwardedRef]);

        if (isAnchorProps(props)) {
            const {
                href,
                disabled,
                target,
                rel = target === '_blank' ? 'noreferrer noopener' : undefined,
                ...restProps
            } = props;

            return (
                // children are in restProps
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                    {...restProps}
                    ref={ref}
                    className={cls}
                    target={target}
                    rel={rel}
                    href={disabled ? undefined : href}
                    aria-disabled={disabled}
                />
            );
        }

        return (
            <button
                {...props}
                ref={ref}
                className={cls}
                // eslint-disable-next-line react/button-has-type
                type={props.type ?? 'button'}
            />
        );
    },
);
