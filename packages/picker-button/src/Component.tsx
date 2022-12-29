import React, { FC, forwardRef, SVGProps } from 'react';
import cn from 'classnames';

import { ButtonProps } from '@alfalab/core-components-button';
import {
    BaseSelect,
    BaseSelectProps,
    Optgroup as DefaultOptgroup,
    OptionsList as DefaultOptionsList,
} from '@alfalab/core-components-select';

import { Field as DefaultField } from './field';
import { Option as DefaultOption } from './option';

import styles from './index.module.css';

const SIDE_POSITIONS = ['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'];

export type PickerButtonSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export type PickerButtonVariant = 'default' | 'compact';

export type PickerButtonDesktopProps = Omit<
    BaseSelectProps,
    | 'Field'
    | 'placeholder'
    | 'Arrow'
    | 'autocomplete'
    | 'size'
    | 'onFocus'
    | 'selected'
    | 'closeOnSelect'
    | 'multiple'
    | 'fieldProps'
    | 'hint'
    | 'allowUnselect'
    | 'options'
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
            optionsListClassName,
            optionClassName,
            showArrow,
            ...restProps
        },
        ref,
    ) => {
        const isSideGap =
            !!restProps.popoverPosition && SIDE_POSITIONS.includes(restProps.popoverPosition);

        return (
            <BaseSelect
                {...restProps}
                optionProps={{ Checkmark: null }}
                ref={ref}
                Option={Option}
                Field={DefaultField}
                size={size === 'm' ? 'm' : 's'}
                fieldProps={{
                    view,
                    loading,
                    /** size у select, button несовместимы */
                    buttonSize: size,
                    buttonVariant: variant,
                    leftAddons,
                    rightAddons,
                    showArrow,
                }}
                Optgroup={Optgroup}
                OptionsList={OptionsList}
                className={cn(styles.container, className)}
                popperClassName={cn('cc-picker-button', styles.optionsPopover, popperClassName, {
                    [styles.sideGap]: isSideGap,
                })}
                optionsListClassName={cn(styles.optionsListContainer, optionsListClassName)}
                optionClassName={cn(styles.option, optionClassName)}
                selected={[]}
                closeOnSelect={true}
            />
        );
    },
);
