import React, { ComponentType, FC, useMemo } from 'react';

import { FieldProps, OptionShape } from '@alfalab/core-components-select/typings';
import { isNonNullable } from '@alfalab/core-components-shared';

import { ArrowProps, BaseValueType, LabeledValue } from '../../types';

interface InternalFieldProps<ValueType extends BaseValueType> extends FieldProps {
    /**
     * Выбранные пункты
     */
    value?: Array<LabeledValue<ValueType>>;
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
    onClear?: (event: React.MouseEvent<HTMLElement>) => void;
    /**
     * Компонент FormControl
     */
    LegacyField: ComponentType<FieldProps>;
}

/**
 * @deprecated
 */
export function FieldAdapter<ValueType extends BaseValueType>(
    ...[
        { value: valueFromProps, onValueChange, ArrowComponent, LegacyField, open, ...restProps },
    ]: Parameters<FC<InternalFieldProps<ValueType>>>
): ReturnType<FC<InternalFieldProps<ValueType>>> {
    const selectedOptions = useMemo(
        () =>
            valueFromProps?.map<OptionShape>((labeledValue) => ({
                key: labeledValue.value?.toString() ?? 'null',
                content: labeledValue.label,
                disabled: false,
                value: labeledValue.value,
                // TODO
                showCheckMark: false,
            })),
        [valueFromProps],
    );

    const setSelectedItems = (nextOptions: OptionShape[]) => {
        onValueChange?.(nextOptions.map((option) => option.value));
    };

    return (
        <LegacyField
            {...restProps}
            open={open}
            setSelectedItems={setSelectedItems}
            selectedMultiple={selectedOptions}
            selected={selectedOptions?.[0]}
            Arrow={isNonNullable(ArrowComponent) ? <ArrowComponent open={open} /> : null}
        />
    );
}
