import React, {
    type ButtonHTMLAttributes,
    type ComponentType,
    Fragment,
    type SVGProps,
} from 'react';
import cn from 'classnames';

import { CustomButton, type CustomButtonProps } from '@alfalab/core-components-custom-button';
import {
    getIcon,
    type PickerButtonSize,
    type PickerButtonVariant,
} from '@alfalab/core-components-picker-button/shared';
import { type FieldProps as BaseFieldProps } from '@alfalab/core-components-select/shared';

import styles from './index.module.css';

type FieldProps = Pick<BaseFieldProps, 'open' | 'label' | 'innerProps'> &
    CustomButtonProps & {
        buttonSize?: PickerButtonSize;
        buttonVariant?: PickerButtonVariant;
        showArrow?: boolean;
        icon?: ComponentType<SVGProps<SVGSVGElement>>;
    };

export const Field = ({
    buttonSize = 56,
    buttonVariant = 'default',
    backgroundColor,
    contentColor,
    stateType,
    label,
    open,
    rightAddons,
    innerProps,
    className,
    showArrow = true,
    icon,
    ...restProps
}: FieldProps) => {
    const Icon: ComponentType<SVGProps<SVGSVGElement>> = getIcon(
        buttonVariant,
        `size-${buttonSize}`,
        icon,
    );

    const buttonProps = {
        ...restProps,
        ...innerProps,
    } as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
        <CustomButton
            {...buttonProps}
            rightAddons={
                <Fragment>
                    {rightAddons && (
                        <span
                            className={cn(styles.addonsContainer, {
                                [styles.showControlIcon]: showArrow || buttonVariant === 'compact',
                            })}
                        >
                            {rightAddons}
                        </span>
                    )}

                    {(showArrow || buttonVariant === 'compact') && (
                        <span
                            className={cn(
                                styles.iconContainer,
                                buttonVariant !== 'compact' && open && styles.open,
                            )}
                        >
                            <Icon data-test-id='custom-picker-button-icon' />
                        </span>
                    )}
                </Fragment>
            }
            block={true}
            size={buttonSize}
            backgroundColor={backgroundColor}
            contentColor={contentColor}
            stateType={stateType}
            className={className}
        >
            {buttonVariant !== 'compact' && label}
        </CustomButton>
    );
};
