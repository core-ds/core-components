import React, { FC, forwardRef, SVGProps } from 'react';
import cn from 'classnames';

import type { ButtonProps } from '@alfalab/core-components-button';
import { Popover } from '@alfalab/core-components-popover';
import {
    BaseSelect,
    BaseSelectProps,
    Optgroup as DefaultOptgroup,
    OptionsList as DefaultOptionsList,
} from '@alfalab/core-components-select/shared';

import { Field as DefaultField } from '../field';
import { Option as DefaultOption } from '../option';
import type { PickerButtonSize, PickerButtonVariant } from '../types';

import styles from '../index.module.css';

const SIDE_POSITIONS = ['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'];

export type PickerButtonDesktopProps = Omit<
    BaseSelectProps,
    | 'placeholder'
    | 'Arrow'
    | 'autocomplete'
    | 'size'
    | 'onFocus'
    | 'selected'
    | 'closeOnSelect'
    | 'multiple'
    | 'hint'
    | 'allowUnselect'
    | 'options'
    | 'searchProps'
    | 'showSearch'
    | 'Search'
> &
    Pick<ButtonProps, 'view' | 'loading' | 'leftAddons' | 'rightAddons'> & {
        options: Array<
            BaseSelectProps['options'][0] & {
                /**
                 * Иконка, отображающаяся слева от текстового представления пункта
                 */
                icon?: FC<SVGProps<SVGSVGElement>>;
            }
        >;

        /**
         * Размер кнопки
         */
        size?: PickerButtonSize;

        /**
         * Тип кнопки
         */
        variant?: PickerButtonVariant;

        /**
         * Показывать стрелку
         * @default true
         */
        showArrow?: boolean;
    };

export const PickerButtonDesktop = forwardRef<HTMLInputElement, PickerButtonDesktopProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            view,
            loading,
            size = 'm',
            variant = 'default',
            className,
            leftAddons,
            rightAddons,
            popperClassName,
            optionClassName,
            showArrow,
            Field = DefaultField,
            fieldProps = {},
            ...restProps
        },
        ref,
    ) => {
        const isSideGap =
            !!restProps.popoverPosition && SIDE_POSITIONS.includes(restProps.popoverPosition);

        const fieldDefaultProps = {
            view,
            loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons,
            rightAddons,
            showArrow,
            breakpoint: 1,
        };

        return (
            <BaseSelect
                {...restProps}
                Popover={Popover}
                view='desktop'
                optionProps={{ Checkmark: null }}
                ref={ref}
                Option={Option}
                Field={Field}
                size={size === 'm' ? 'm' : 's'}
                fieldProps={{
                    ...fieldDefaultProps,
                    ...(fieldProps as object),
                }}
                Optgroup={Optgroup}
                OptionsList={OptionsList}
                className={cn(styles.container, className)}
                popperClassName={cn('cc-picker-button', styles.optionsPopover, popperClassName, {
                    [styles.sideGap]: isSideGap,
                })}
                optionClassName={cn(styles.option, optionClassName)}
                selected={[]}
                closeOnSelect={true}
            />
        );
    },
);
