import React, { ComponentType, FC, useMemo } from 'react';

import { FieldProps, OptionShape } from '@alfalab/core-components-select/typings';
import { isNonNullable } from '@alfalab/core-components-shared';

import { ArrowProps, BaseOption, BaseValueType } from '../../types';

interface InternalFieldProps<ValueType extends BaseValueType> extends FieldProps {
    /**
     * Выбранные пункты
     */
    value?: Array<BaseOption<ValueType>>;
    /**
     * Метод для ручной установки выбранных пунктов
     */
    onValueChange?: (value: ValueType[]) => void;
    /**
     * Компонент стрелки
     */
    ArrowComponent?: ComponentType<ArrowProps>;
    /*
     * Разрешает очищать поле крестиком
     */
    clear?: boolean;
    /**
     * Обработчик нажатия на крестик для очистки поля
     */
    onClear?: () => void;
    /**
     * Компонент FormControl
     */
    LegacyField: ComponentType<FieldProps>;
}

/**
 * @deprecated
 */
export function FieldAdapter<ValueType extends BaseValueType>(
    ...[props]: Parameters<FC<InternalFieldProps<ValueType>>>
): ReturnType<FC<InternalFieldProps<ValueType>>> {
    const { value, onValueChange, ArrowComponent, LegacyField, ...restProps } = props;

    const selectedOptions = useMemo(
        () =>
            value?.map<OptionShape>((val) => ({
                key: val.key?.toString() ?? (val.value ?? 'null').toString(),
                content: val.label,
                disabled: val.disabled,
                value: val.value,
                // TODO
                showCheckMark: false,
            })),
        [value],
    );

    const setSelectedItems = (options: OptionShape[]) => {
        onValueChange?.(options.map((option) => option.value));
    };

    return (
        <LegacyField
            {...restProps}
            setSelectedItems={setSelectedItems}
            selectedMultiple={selectedOptions}
            selected={selectedOptions?.[0]}
            Arrow={isNonNullable(ArrowComponent) ? <ArrowComponent open={props.open} /> : null}
        />
    );
}
