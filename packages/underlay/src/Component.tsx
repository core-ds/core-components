import React, { forwardRef } from 'react';
import cn from 'classnames';

import { getBorderCorners } from './utils/getBorderCorners';
import { getClasses, isBackgroundToken } from './utils/getClasses';
import { UnderlayProps } from './types';

import styles from './index.module.css';

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

        const underlayStyles = {
            ...dimensions,
            ...(isBackgroundToken(backgroundColor) ? {} : { backgroundColor }),
        };

        const contentStyles = {
            ...(isBackgroundToken(contentProps?.backgroundColor)
                ? {}
                : { backgroundColor: contentProps?.backgroundColor }),
            ...(contentProps?.backgroundImageURL
                ? { backgroundImage: `url(${contentProps.backgroundImageURL})` }
                : {}),
        };

        return (
            <div
                ref={ref}
                style={underlayStyles}
                className={cn(
                    styles.component,
                    paddingStyles,
                    bordersStyles,
                    getClasses(backgroundColor, borderColor, borderSize, shadow),
                    { [styles.overflowHide]: !overflow },
                    className,
                )}
                data-test-id={dataTestId}
                {...restProps}
            >
                <div
                    style={contentStyles}
                    className={cn(
                        styles.content,
                        { [styles.backgroundImage]: contentProps?.backgroundImageURL },
                        contentBordersStyles,
                        getClasses(
                            contentProps?.backgroundColor,
                            contentProps?.borderColor,
                            contentProps?.borderSize,
                            contentProps?.shadow,
                        ),
                        contentProps?.axis && styles[`direction-${contentProps.axis}`],
                        contentProps?.alignment && styles[`align-${contentProps.alignment}`],
                        contentProps?.justifyContent &&
                            styles[`justify-${contentProps.justifyContent}`],
                        contentProps?.className,
                    )}
                >
                    {children}
                </div>
            </div>
        );
    },
);

Underlay.displayName = 'Underlay';
