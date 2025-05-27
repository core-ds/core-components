import React, { useCallback } from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { Field, FieldProps, OptionShape } from '@alfalab/core-components-select/shared';

import { ADD_CARD_KEY } from '../../constants';
import { MultiStepCardInput } from '../multi-step-card-input';

export const CustomField = ({
    innerProps,
    selected,
    label,
    onSubmit,
    onInput,
    ...restProps
}: FieldProps) => {
    const valueRenderer = useCallback(
        ({ selected: selectedOption }: { selected?: OptionShape }) => {
            if (selectedOption?.key === ADD_CARD_KEY) {
                return <MultiStepCardInput onSubmit={onSubmit} onInput={onInput} />;
            }

            return selectedOption?.content;
        },
        [onSubmit, onInput],
    );

    return (
        <Field
            FormControlComponent={FormControlDesktop}
            label={selected ? null : label}
            selected={selected}
            innerProps={innerProps}
            {...restProps}
            valueRenderer={valueRenderer}
        />
    );
};
