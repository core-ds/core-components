import React, {
    type ButtonHTMLAttributes,
    type ComponentType,
    Fragment,
    type SVGProps,
} from 'react';
import cn from 'classnames';

import { Button, type ButtonProps } from '@alfalab/core-components-button';
import { type FieldProps as BaseFieldProps } from '@alfalab/core-components-select/typings';

import { type PickerButtonSize, type PickerButtonVariant } from '../types';
import { getIcon } from '../utils';

import styles from './index.module.css';

type FieldProps = Omit<BaseFieldProps, 'size' | 'hint' | 'success' | 'error' | 'placeholder'> &
    ButtonProps & {
        buttonSize?: PickerButtonSize;
        buttonVariant?: PickerButtonVariant;
        showArrow?: boolean;
        icon?: ComponentType<SVGProps<SVGSVGElement>>;
    };

export const Field = ({
    buttonSize = 56,
    buttonVariant = 'default',
    view,
    label,
    open,
    multiple,
    rightAddons,
    Arrow,
    innerProps,
    className,
    selected,
    selectedMultiple,
    setSelectedItems,
    toggleMenu,
    valueRenderer,
    showArrow = true,
    labelView,
    FormControlComponent,
    icon,
    onClear,
    ...restProps
}: FieldProps) => {
    const Icon: ComponentType<SVGProps<SVGSVGElement>> = getIcon(
        buttonVariant,
        `size-${buttonSize}`,
        icon,
    );

    const { ref, ...restInnerProps } = innerProps;

    const buttonProps = {
        ...restProps,
        ...restInnerProps,
    } as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
        <div ref={ref}>
            <Button
                {...buttonProps}
                rightAddons={
                    <Fragment>
                        {rightAddons && (
                            <span
                                className={cn(styles.addonsContainer, {
                                    [styles.showControlIcon]:
                                        showArrow || buttonVariant === 'compact',
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
                                <Icon data-test-id='picker-button-icon' />
                            </span>
                        )}
                    </Fragment>
                }
                block={true}
                view={view}
                size={buttonSize}
                className={cn(className, {
                    [styles.linkOpen]: view === 'transparent' && open,
                })}
            >
                {buttonVariant !== 'compact' && label}
            </Button>
        </div>
    );
};
