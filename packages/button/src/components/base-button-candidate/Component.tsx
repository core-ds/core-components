import React, { type FC, forwardRef, type MouseEventHandler, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import { ButtonComponent } from '../button-component';

import { type BaseButtonCandidateProps, type BaseButtonContentProps } from './types';

import styles from './index.module.css';

const DefaultContent: FC<BaseButtonContentProps> = ({ children }) => children;

export const BaseButtonCandidate = forwardRef<HTMLElement, BaseButtonCandidateProps>(
    (
        {
            children,
            block,
            className,
            loaderClassName,
            disabledClassName,
            dataTestId,
            loading,
            Component = ButtonComponent,
            disabled: disabledFromProps,
            type,
            onClick,
            href,
            Content = DefaultContent,
            ...restProps
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLElement>(null);
        const [focused] = useFocus(buttonRef, 'keyboard');
        const disabled = disabledFromProps || loading;
        const passDisabledClassName = disabled && typeof href === 'string';

        const handleClick: MouseEventHandler<HTMLElement> = (event) => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                onClick?.(event);
            }
        };

        return (
            <Component
                data-test-id={dataTestId}
                {...restProps}
                href={href}
                className={cn(
                    styles.component,
                    {
                        [styles.focused]: focused,
                        [styles.block]: block,
                    },
                    passDisabledClassName && [styles.disabled, disabledClassName],
                    className,
                )}
                // @ts-expect-error anchor's type and button's type are not compatible
                type={type}
                disabled={disabled}
                onClick={handleClick}
                ref={mergeRefs([buttonRef, ref])}
            >
                <Content
                    dataTestId={dataTestId}
                    loading={loading}
                    loaderClassName={loaderClassName}
                >
                    {children}
                </Content>
            </Component>
        );
    },
);
