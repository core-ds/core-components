import React, { forwardRef } from 'react';
import cn from 'classnames';

import { UnderlayProps } from './types';

import styles from './index.module.css';

export const Underlay = forwardRef<HTMLDivElement, UnderlayProps>(
    (
        {
            children,
            borderRadius,
            shadow,
            borderSize,
            backgroundColor,
            borderColor,
            className,
            padding,
            dataTestId,
            overflow = true,
            ...restProps
        },
        ref,
    ) => {
        const paddingSize =
            typeof padding === 'string'
                ? { top: padding, left: padding, right: padding, bottom: padding }
                : padding;

        const paddingStyles = paddingSize && {
            [styles[`padding-top-${paddingSize.top}`]]: paddingSize.top,
            [styles[`padding-right-${paddingSize.right}`]]: paddingSize.right,
            [styles[`padding-bottom-${paddingSize.bottom}`]]: paddingSize.bottom,
            [styles[`padding-left-${paddingSize.left}`]]: paddingSize.left,
        };

        return (
            <div
                ref={ref}
                className={cn(
                    styles.component,
                    paddingStyles,
                    backgroundColor && styles[`background-${backgroundColor}`],
                    borderRadius && styles[`border-radius-${borderRadius}`],
                    borderColor && styles[`border-color-${borderColor}`],
                    borderSize && styles[`border-width-${borderSize}`],
                    shadow && styles[shadow],
                    { [styles.overflowHide]: !overflow },
                    className,
                )}
                data-test-id={dataTestId}
                {...restProps}
            >
                {children}
            </div>
        );
    },
);
