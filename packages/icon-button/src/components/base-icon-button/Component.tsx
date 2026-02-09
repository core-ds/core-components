import React, { forwardRef, type ReactElement } from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';

import { type IconButtonProps } from '../../types/icon-button-props';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

type BaseIconButtonProps = {
    client: 'desktop' | 'mobile';
    clientStyles: Record<string, string>;
};

export const BaseIconButton = forwardRef<HTMLButtonElement, IconButtonProps & BaseIconButtonProps>(
    (
        {
            className,
            icon: Icon,
            view = 'primary',
            size = 48,
            colors = 'default',
            alignIcon = 'center',
            transparentBg = false,
            client,
            clientStyles,
            ...restProps
        },
        ref,
    ) => {
        const Component = client === 'desktop' ? ButtonDesktop : ButtonMobile;

        return (
            <Component
                {...restProps}
                ref={ref}
                view='text'
                className={cn(
                    'cc-icon-button',
                    className,
                    colorStyles[colors][view],
                    colorStyles[colors].component,
                    clientStyles.component,
                    clientStyles[`border_${size}`],
                    {
                        [colorStyles[colors].loader]: restProps.loading,
                        [colorStyles[colors].transparentBg]: transparentBg,
                    },
                )}
                size={48}
            >
                <span className={cn(styles.iconWrapper, styles[`size-${size}`], styles[alignIcon])}>
                    {React.isValidElement(Icon) ? (
                        React.cloneElement(Icon as ReactElement<{ className?: string }>, {
                            className: cn(
                                styles.icon,
                                (Icon as ReactElement<{ className?: string }>).props.className,
                            ),
                        })
                    ) : (
                        <Icon className={styles.icon} />
                    )}
                </span>
            </Component>
        );
    },
);

BaseIconButton.displayName = 'BaseIconButton';
