import React, { ButtonHTMLAttributes, ComponentType, Fragment, SVGProps } from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from '@alfalab/core-components-button';
import { FieldProps as BaseFieldProps } from '@alfalab/core-components-select/typings';

import type { PickerButtonSize, PickerButtonVariant } from '../types';
import { getIcon } from '../utils';

import styles from './index.module.css';

type FieldProps = Omit<BaseFieldProps, 'size' | 'hint' | 'success' | 'error' | 'placeholder'> &
    ButtonProps & {
        buttonSize?: PickerButtonSize;
        buttonVariant?: PickerButtonVariant;
        showArrow?: boolean;
        icon?: ComponentType<SVGProps<SVGSVGElement>>;
    };

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
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
        SIZE_TO_CLASSNAME_MAP[buttonSize],
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
                    [styles.linkOpen]: view === 'link' && open,
                })}
            >
                {buttonVariant !== 'compact' && label}
            </Button>
        </div>
    );
};
