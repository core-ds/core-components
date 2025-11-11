import React from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { Field, type FieldProps, type OptionShape } from '@alfalab/core-components-select/shared';

import { ADD_CARD_KEY } from '../../constants';
import { MultiStepCardInput } from '../multi-step-card-input';

export interface CustomFieldProps extends FieldProps {
    view?: 'desktop' | 'mobile';
}

export const CustomField = ({
    innerProps,
    selected,
    label,
    onSubmit,
    onInput,
    needCvv,
    needExpiryDate,
    expiryAsDate,
    view = 'desktop',
    cardImage,
    leftAddons,
    valueRenderer,
    size,
    ...restProps
}: CustomFieldProps) => {
    const fieldRenderer = ({
        selected: selectedOption,
        selectedMultiple: selectedOptions,
    }: {
        selected?: OptionShape;
        selectedMultiple: OptionShape[];
    }) => {
        if (selectedOption?.key === ADD_CARD_KEY) {
            return (
                <MultiStepCardInput
                    onSubmit={onSubmit}
                    onInput={onInput}
                    cardImage={cardImage}
                    needCvv={needCvv}
                    needExpiryDate={needExpiryDate}
                    expiryAsDate={expiryAsDate}
                    size={size}
                />
            );
        }

        return valueRenderer && selected
            ? valueRenderer({ selected: selectedOption, selectedMultiple: selectedOptions })
            : selectedOption?.content;
    };

    const FormControlComponent = view === 'mobile' ? FormControlMobile : FormControlDesktop;

    return (
        <Field
            FormControlComponent={FormControlComponent}
            size={size}
            label={selected ? null : label}
            selected={selected}
            innerProps={innerProps}
            leftAddons={selected ? undefined : leftAddons}
            {...restProps}
            valueRenderer={fieldRenderer}
        />
    );
};
