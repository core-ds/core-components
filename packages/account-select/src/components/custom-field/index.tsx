import React, { useCallback } from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { Field, FieldProps, OptionShape } from '@alfalab/core-components-select/shared';

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
    ...restProps
}: CustomFieldProps) => {
    const valueRenderer = useCallback(
        ({ selected: selectedOption }: { selected?: OptionShape }) => {
            if (selectedOption?.key === ADD_CARD_KEY) {
                return (
                    <MultiStepCardInput
                        onSubmit={onSubmit}
                        onInput={onInput}
                        cardImage={cardImage}
                        needCvv={needCvv}
                        needExpiryDate={needExpiryDate}
                        expiryAsDate={expiryAsDate}
                    />
                );
            }

            return selectedOption?.content;
        },
        [onSubmit, onInput, cardImage, needCvv, needExpiryDate, expiryAsDate],
    );

    const FormControlComponent = view === 'mobile' ? FormControlMobile : FormControlDesktop;

    return (
        <Field
            FormControlComponent={FormControlComponent}
            label={selected ? null : label}
            selected={selected}
            innerProps={innerProps}
            leftAddons={selected ? undefined : leftAddons}
            {...restProps}
            valueRenderer={valueRenderer}
        />
    );
};
