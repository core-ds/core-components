import React, { ButtonHTMLAttributes, FC, Fragment, SVGProps } from 'react';
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
    };

export const Field = ({
    buttonSize = 'm',
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
    ...restProps
}: FieldProps) => {
    const Icon: FC<SVGProps<SVGSVGElement>> = getIcon(buttonVariant, buttonSize);

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
