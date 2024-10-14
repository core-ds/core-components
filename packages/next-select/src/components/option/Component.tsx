import React, { ComponentType, FC, HTMLProps, PropsWithoutRef } from 'react';
import cn from 'classnames';

import { BaseOption, BaseValueType, Size } from '../../types';

interface CheckmarkProps {
    multiple?: boolean;
}

export interface OptionProps<ValueType extends BaseValueType> {
    disabled?: boolean;
    highlighted?: boolean;
    multiple?: boolean;
    className?: string;
    option: BaseOption<ValueType>;
    size?: Size;
    innerProps?: PropsWithoutRef<HTMLProps<HTMLElement>>;
    Checkmark?: ComponentType<CheckmarkProps>;
}

export function Option<ValueType extends BaseValueType>(
    ...[{ option, label, innerProps, size, highlighted }]: Parameters<FC<OptionProps<ValueType>>>
): ReturnType<FC<OptionProps<ValueType>>> {
    return (
        <div {...innerProps} className={cn(innerProps?.className, { [highlighted]: highlighted })}>
            {option.label}
        </div>
    );
}
