import React, { forwardRef, type ReactElement } from 'react';
import cn from 'classnames';

import { BaseButtonCandidate } from '@alfalab/core-components-button/components/base-button-candidate';
import { ButtonContent } from '@alfalab/core-components-button/components/button-content';
import { useLoading } from '@alfalab/core-components-button/shared';

import { type IconButtonProps } from '../../types/icon-button-props';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export const BaseIconButton = forwardRef<
    HTMLButtonElement,
    IconButtonProps & {
        clientStyles: Record<string, string>;
    }
>(
    (
        {
            className,
            icon: Icon,
            view = 'primary',
            size = 48,
            colors = 'default',
            alignIcon = 'center',
            transparentBg = false,
            clientStyles,
            loading: loadingFromProps,
            ...restProps
        },
        ref,
    ) => {
        const loading = useLoading(loadingFromProps);

        return (
            <BaseButtonCandidate
                {...restProps}
                Content={ButtonContent}
                ref={ref}
                disabledClassName={colorStyles[colors].disabled}
                loading={loading}
                loaderClassName={styles.loader}
                className={cn(
                    'cc-icon-button',
                    className,
                    styles.component,
                    colorStyles[colors][view],
                    colorStyles[colors].component,
                    clientStyles.component,
                    clientStyles[`border_${size}`],
                    {
                        [styles.loading]: loading,
                        [colorStyles[colors].loader]: loading,
                        [colorStyles[colors].transparentBg]: transparentBg,
                    },
                )}
            >
                <span className={cn(styles.iconWrapper, styles[`size-${size}`], styles[alignIcon])}>
                    {React.isValidElement(Icon) ? (
                        React.cloneElement(Icon, {
                            className: cn(
                                styles.icon,
                                (Icon as ReactElement<{ className?: string }>).props.className,
                            ),
                        })
                    ) : (
                        <Icon className={styles.icon} />
                    )}
                </span>
            </BaseButtonCandidate>
        );
    },
);

BaseIconButton.displayName = 'BaseIconButton';
