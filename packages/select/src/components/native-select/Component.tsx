import React, { forwardRef, type SelectHTMLAttributes, useCallback } from 'react';

import { type GroupShape, type OptionShape } from '../../typings';
import { isGroup } from '../../utils';

export type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    /**
     * Список вариантов выбора
     */
    options: Array<OptionShape | GroupShape>;

    /**
     * Значение селекта
     */
    value: string | string[];
};

const Option = ({ option }: { option: OptionShape }) => (
    <option value={option.key} disabled={option.disabled}>
        {typeof option.content === 'string' ? option.content : option.key}
    </option>
);

const Group = ({ label, options }: GroupShape) => (
    <optgroup label={label}>
        {options.map((option) => (
            <Option option={option} key={option.key} />
        ))}
    </optgroup>
);

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    ({ className, disabled, multiple, value, name, options, onChange, ...restProps }, ref) => {
        const handleClick = useCallback((event: React.MouseEvent<HTMLSelectElement>) => {
            event.stopPropagation();
        }, []);

        return (
            <select
                className={className}
                disabled={disabled}
                multiple={multiple}
                name={name}
                value={value}
                onChange={onChange}
                onClick={handleClick}
                ref={ref}
                {...restProps}
            >
                {options.map((option) =>
                    isGroup(option) ? (
                        <Group {...option} key={option.label} />
                    ) : (
                        <Option option={option} key={option.key} />
                    ),
                )}
            </select>
        );
    },
);
