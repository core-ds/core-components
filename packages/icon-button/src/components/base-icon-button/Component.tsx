import React, { type ComponentProps, forwardRef } from 'react';
import cn from 'classnames';

import { NoStyleButton, useButtonLoading } from '@alfalab/core-components-button/shared';
import { useDisabled } from '@alfalab/core-components-config';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';

import { type IconButtonProps } from '../../types/icon-button-props';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

type BaseIconButtonProps = {
    clientStyles: Record<string, string>;
};

export const BaseIconButton = forwardRef<HTMLButtonElement, IconButtonProps & BaseIconButtonProps>(
    (
        {
            className: classNameFromProps,
            icon: Icon,
            view = 'primary',
            size = 48,
            colors = 'default',
            alignIcon = 'center',
            transparentBg,
            clientStyles,
            loading: loadingFromProps,
            disabled: disabledFromProps,
            ...restProps
        },
        ref,
    ) => {
        const { dataTestId } = restProps;
        const loading = useButtonLoading(loadingFromProps);
        const disabled = useDisabled(disabledFromProps) || loading;

        return (
            <NoStyleButton
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                {...(restProps as ComponentProps<typeof NoStyleButton>)}
                ref={ref}
                disabled={disabled}
                className={cn(
                    'cc-icon-button',
                    styles.component,
                    colorStyles[colors][view],
                    clientStyles[`size-${size}`],
                    {
                        [styles.loading]: loading,
                        [colorStyles[colors].transparentBg]: transparentBg,
                    },
                    classNameFromProps,
                )}
            >
                <span className={cn(styles.iconWrapper, styles[`size-${size}`], styles[alignIcon])}>
                    {React.isValidElement(Icon) ? (
                        React.cloneElement(Icon, {
                            className: cn(styles.icon, Icon.props.className),
                        })
                    ) : (
                        <Icon className={styles.icon} />
                    )}
                </span>
                {loading && (
                    <Spinner
                        preset={24}
                        colors={colors}
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        visible={true}
                        className={cn(styles.loader)}
                    />
                )}
            </NoStyleButton>
        );
    },
);

BaseIconButton.displayName = 'BaseIconButton';
