import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BUTTON_DEFAULT_SHAPE, BUTTON_DEFAULT_SIZE } from '../../constants/const';
import { useLoading } from '../../shared';
import { type ButtonRef, type CommonButtonProps, type PrivateButtonProps } from '../../typings';
import { ButtonComponent } from '../button-component';
import { ButtonLayout } from '../button-layout';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const BaseButton = forwardRef<ButtonRef, CommonButtonProps & PrivateButtonProps>(
    (
        {
            allowBackdropBlur,
            view = 'secondary',
            className: classNameFromProps,
            spinnerClassName,
            loaderClassName = spinnerClassName,
            loading: loadingFromProps,
            colors = 'default',
            Component = ButtonComponent,
            styles: stylesFromProps = {},
            colorStylesMap,
            ...restProps
        },
        ref,
    ) => {
        const loading = useLoading(loadingFromProps);
        const { size = BUTTON_DEFAULT_SIZE, shape = BUTTON_DEFAULT_SHAPE, disabled } = restProps;
        const styles = [stylesFromProps, colorStyles[colors], colorStylesMap[colors]];
        const blurred =
            allowBackdropBlur &&
            (view === 'secondary' || (disabled && (view === 'accent' || view === 'primary')));
        const className = cn(
            styles.map((s) => s[view]),
            {
                [stylesFromProps[`size${size}`]]: shape === 'rectangular',
                [commonStyles.blurred]: blurred,
            },
            classNameFromProps,
        );

        return (
            <ButtonLayout
                {...restProps}
                ref={ref}
                layout={view === 'text' ? 'text' : 'button'}
                className={className}
                Component={Component}
                loading={loading}
                loaderClassName={loaderClassName}
                styles={styles}
            />
        );
    },
);
