import React, { forwardRef, Fragment, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { defaultProps } from '@alfalab/core-components-button/shared/base-button/default-props';
import { NoStyleButton } from '@alfalab/core-components-button/shared/base-button/no-style';
import { type BaseButtonProps } from '@alfalab/core-components-button/shared/base-button/types';
import { useDisabled } from '@alfalab/core-components-config';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

export const BaseButton = forwardRef<HTMLElement, BaseButtonProps>(
    (
        {
            children: label,
            shape = defaultProps.shape,
            textResizing = defaultProps.textResizing,
            hint,
            leftAddons,
            rightAddons,
            size = defaultProps.size,
            block,
            className: classNameFromProps,
            spinnerClassName,
            loaderClassName = spinnerClassName,
            loading,
            nowrap,
            styles = {},
            labelClassName,
            hintClassName,
            disabled: disabledFromProps,
            layout = 'button',
            loadingClassName,
            disabledClassName: disabledClassNameFromProps,
            ...restProps
        },
        ref,
    ) => {
        const { dataTestId } = restProps;
        const disabled = useDisabled(disabledFromProps) || loading;
        const buttonRef = useRef<HTMLElement>(null);
        const [focused] = useFocus(buttonRef, 'keyboard');
        const isButtonLayout = layout === 'button';
        const showHint = hint && size >= 56;
        const className = cn(
            styles.component,
            styles[textResizing],
            styles[`size-${size}`],
            loading && [styles.loading, loadingClassName],
            {
                [styles.focused]: focused,
                [styles.block]: block,
                [styles[shape]]: shape === 'rounded',
                [styles.defaultPaddings]: label && isButtonLayout,
                [styles.defaultWidth]: label && isButtonLayout,
                [styles.minWidth]: !label && isButtonLayout,
                [styles.minHeight]: isButtonLayout,
            },
            classNameFromProps,
        );
        const children = (
            <Fragment>
                {leftAddons && <span className={cn(styles.leftAddon)}>{leftAddons}</span>}
                {label && (
                    <span
                        className={cn(styles.label, labelClassName, {
                            [styles.nowrap]: nowrap,
                            [styles.stretchText]:
                                !(leftAddons || rightAddons) || textResizing === 'fill',
                        })}
                    >
                        {label}
                        {showHint && <span className={cn(styles.hint, hintClassName)}>{hint}</span>}
                    </span>
                )}
                {rightAddons && <span className={cn(styles.rightAddon)}>{rightAddons}</span>}
                {loading && (
                    <Spinner
                        preset={24}
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        visible={true}
                        className={cn(styles.loader, loaderClassName)}
                    />
                )}
            </Fragment>
        );
        const disabledClassName = cn(styles.disabled, disabledClassNameFromProps);

        return (
            <NoStyleButton
                {...restProps}
                ref={mergeRefs([buttonRef, ref])}
                className={className}
                disabled={disabled}
                disabledClassName={disabledClassName}
            >
                {children}
            </NoStyleButton>
        );
    },
);
