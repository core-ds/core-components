import React, { type ComponentProps, forwardRef } from 'react';
import cn from 'classnames';

import {
    BaseButton as Button,
    defaultProps,
    useButtonLoading,
} from '@alfalab/core-components-button/shared';

import { type CommonButtonProps, type PrivateButtonProps } from '../../typings';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorsStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const BaseButton = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonButtonProps & PrivateButtonProps
>(
    (
        {
            allowBackdropBlur,
            colors = 'default',
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            view = 'secondary',
            children,
            spinnerClassName,
            loaderClassName = spinnerClassName,
            className: classNameFromProps,
            loading: loadingFromProps,
            hintClassName,
            ...restProps
        },
        ref,
    ) => {
        const loading = useButtonLoading(loadingFromProps);
        const { size = defaultProps.size, shape = defaultProps.shape } = restProps;
        const commonColorStyles = colorsStyles[colors];
        const colorStyles = colorStylesMap[colors];

        return (
            <Button
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                {...(restProps as ComponentProps<typeof Button>)}
                loading={loading}
                ref={ref}
                layout={view === 'text' ? 'text' : 'button'}
                styles={commonStyles}
                className={cn(
                    styles.component,
                    commonColorStyles.component,
                    colorStyles.component,
                    commonStyles[view],
                    commonColorStyles[view],
                    colorStyles[view],
                    {
                        [styles[`size-${size}`]]: shape === 'rectangular',
                        [commonStyles.allowBackdropBlur]: allowBackdropBlur,
                    },
                    classNameFromProps,
                )}
                hintClassName={cn(colorStyles.hint, commonColorStyles.hint, hintClassName)}
                loadingClassName={cn(commonColorStyles.loading, colorStyles.loading)}
                disabledClassName={cn(commonColorStyles.disabled, colorStyles.disabled)}
                loaderClassName={cn(commonColorStyles.loader, colorStyles.loader, loaderClassName)}
            >
                {children}
            </Button>
        );
    },
);
