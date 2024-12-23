import React, { ComponentType, FC } from 'react';
import cn from 'classnames';

import { internalMergeRefs } from '@alfalab/core-components-shared';

import { BaseOption, BaseValueType, Size } from '../../types';

import styles from './index.module.css';

interface CheckmarkProps {
    multiple?: boolean;
}

export interface OptionProps<ValueType extends BaseValueType> {
    selected?: boolean;
    disabled?: boolean;
    highlighted?: boolean;
    multiple?: boolean;
    className?: string;
    option: BaseOption<ValueType>;
    size?: Size;
    innerProps?: React.HTMLProps<HTMLElement>;
    Checkmark?: ComponentType<CheckmarkProps>;
}

export function Option<ValueType extends BaseValueType>(
    ...[{ option, innerProps, size, highlighted, className, disabled, selected }]: Parameters<
        FC<OptionProps<ValueType>>
    >
): ReturnType<FC<OptionProps<ValueType>>> {
    return (
        <div
            {...innerProps}
            ref={internalMergeRefs([innerProps?.ref])}
            key={innerProps?.key}
            className={cn(styles.option, innerProps?.className, styles[`size${size}`], className, {
                [styles.highlighted]: highlighted,
                [styles.selected]: selected,
                [styles.disabled]: disabled,
            })}
        >
            {option.label}
        </div>
    );
}
