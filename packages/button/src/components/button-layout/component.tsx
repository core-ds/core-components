import React, { Children, forwardRef } from 'react';
import cn from 'classnames';

import {
    BUTTON_DEFAULT_SHAPE,
    BUTTON_DEFAULT_SIZE,
    BUTTON_DEFAULT_TEXT_RESIZING,
} from '../../constants/const';
import { type ButtonLayoutProps, type ButtonRef } from '../../typings';
import { BaseButtonCandidate } from '../base-button-candidate';
import { ButtonComponent } from '../button-component';
import { ButtonContent } from '../button-content';

import styles from './index.module.css';

export const ButtonLayout = forwardRef<ButtonRef, ButtonLayoutProps>(
    (
        {
            children,
            layout,
            shape = BUTTON_DEFAULT_SHAPE,
            textResizing = BUTTON_DEFAULT_TEXT_RESIZING,
            hint,
            leftAddons,
            rightAddons,
            size = BUTTON_DEFAULT_SIZE,
            className: classNameFromProps,
            loaderClassName,
            loading,
            nowrap,
            Component = ButtonComponent,
            styles: stylesFromProps = [],
            ...restProps
        },
        ref,
    ) => {
        const hasLabel = Children.toArray(children).length > 0;
        const showHint = size >= 56 && Children.toArray(hint).length > 0;
        const allStyles = [styles, ...stylesFromProps];
        const className = cn(
            allStyles.flatMap((s) => [s.component, loading && s.loading]),
            styles[`size${size}`],
            styles[textResizing],
            {
                [styles[shape]]: shape === 'rounded',
                [styles.defaultPaddings]: hasLabel && layout === 'button',
                [styles.defaultWidth]: hasLabel && layout === 'button',
                [styles.minWidth]: !hasLabel && layout === 'button',
                [styles.minHeight]: layout === 'button',
            },
            classNameFromProps,
        );

        return (
            <BaseButtonCandidate
                {...restProps}
                ref={ref}
                className={className}
                Content={ButtonContent}
                Component={Component}
                loading={loading}
                loaderClassName={cn(
                    allStyles.map((s) => s.loader),
                    loaderClassName,
                )}
                disabledClassName={cn(allStyles.map((s) => s.disabled))}
            >
                {Children.toArray(leftAddons).length > 0 && (
                    <span className={styles.addon}>{leftAddons}</span>
                )}
                {hasLabel && (
                    <span
                        className={cn(styles.label, {
                            [styles.nowrap]: nowrap,
                            [styles.stretchText]: textResizing === 'fill',
                        })}
                    >
                        {children}
                        {showHint && (
                            <span className={cn(allStyles.map((s) => s.hint))}>{hint}</span>
                        )}
                    </span>
                )}
                {Children.toArray(rightAddons).length > 0 && (
                    <span className={styles.addon}>{rightAddons}</span>
                )}
            </BaseButtonCandidate>
        );
    },
);
