import React, { type ComponentPropsWithoutRef, type ElementType, forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { hasOwnProperty } from '@alfalab/core-components-shared';

import { type ButtonComponentProps } from '../base-button-candidate';

import styles from './index.module.css';

function isAnchorProps(props: ButtonComponentProps): props is ComponentPropsWithoutRef<'a'> {
    return hasOwnProperty(props, 'href') && Boolean(props.href);
}

export const ButtonComponent = forwardRef<HTMLElement, ButtonComponentProps>(
    (props, forwardedRef) => {
        const cls = cn(props.className, styles.component);
        const ref = mergeRefs([forwardedRef]);

        if (isAnchorProps(props)) {
            const {
                as = 'a',
                href,
                disabled,
                target,
                rel = target === '_blank' ? 'noreferrer noopener' : undefined,
                ...restProps
            } = props;

            const Component = as as ElementType<ComponentPropsWithoutRef<'a'>, 'a'>;
            const hrefProps = {
                [typeof Component === 'string' ? 'href' : 'to']: disabled ? undefined : href,
            };

            return (
                <Component
                    {...restProps}
                    {...hrefProps}
                    ref={ref}
                    className={cls}
                    target={target}
                    rel={rel}
                    aria-disabled={disabled}
                />
            );
        }

        const { as = 'button', ...restProps } = props;
        const Component = as as ElementType<ComponentPropsWithoutRef<'button'>, 'button'>;

        return (
            <Component
                {...restProps}
                ref={ref}
                className={cls}
                // eslint-disable-next-line react/button-has-type
                type={restProps.type ?? 'button'}
            />
        );
    },
);
