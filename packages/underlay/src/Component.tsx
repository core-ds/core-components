import React, { forwardRef } from 'react';
import cn from 'classnames';

import { UnderlayProps } from './types';

import styles from './index.module.css';
import { getBorderCorners } from './utils/getBorderCorners';

export const Underlay = forwardRef<HTMLDivElement, UnderlayProps>(
    (
        {
            children,
            borderRadius,
            shadow,
            dimensions,
            borderSize,
            backgroundColor,
            borderColor,
            className,
            padding,
            dataTestId,
            overflow = true,
            contentProps,
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

        const bordersStyles = getBorderCorners(borderRadius);
        const contentBordersStyles = getBorderCorners(contentProps?.borderRadius);

        return (
            <div
                ref={ref}
                style={{ ...dimensions }}
                className={cn(
                    styles.component,
                    paddingStyles,
                    backgroundColor && styles[`background-${backgroundColor}`],
                    bordersStyles,
                    borderColor && styles[`border-color-${borderColor}`],
                    borderSize && styles[`border-width-${borderSize}`],
                    shadow && styles[shadow],
                    { [styles.overflowHide]: !overflow },
                    className,
                )}
                data-test-id={dataTestId}
                {...restProps}
            >
                <div
                    style={
                        contentProps?.backgroundImageURL
                            ? { backgroundImage: `url(${contentProps.backgroundImageURL})` }
                            : undefined
                    }
                    className={cn(
                        styles.content,
                        { [styles.backgroundImage]: contentProps?.backgroundImageURL },
                        contentBordersStyles,
                        contentProps?.borderSize &&
                            styles[`border-width-${contentProps.borderSize}`],
                        contentProps?.borderColor &&
                            styles[`border-color-${contentProps.borderColor}`],
                        contentProps?.backgroundColor &&
                            styles[`background-${contentProps.backgroundColor}`],
                        contentProps?.shadow && styles[contentProps.shadow],
                        contentProps?.axis && styles[`direction-${contentProps.axis}`],
                        contentProps?.alignment && styles[`align-${contentProps.alignment}`],
                        contentProps?.justifyContent &&
                            styles[`justify-${contentProps.justifyContent}`],
                    )}
                >
                    {children}
                </div>
            </div>
        );
    },
);
