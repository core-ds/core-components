import React, { useState } from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { Field, type FieldProps, type OptionShape } from '@alfalab/core-components-select/shared';

import { ADD_CARD_KEY, PRODUCT_COVER_SIZE_MAPPER } from '../../constants';
import { MultiStepCardInput } from '../multi-step-card-input';

import styles from './index.module.css';
import cn from 'classnames';
import { ProductCover } from '@alfalab/core-components-product-cover';

export interface CustomFieldProps extends FieldProps {
    view?: 'desktop' | 'mobile';
}

export const CustomField = ({
    innerProps,
    selected,
    onSubmit,
    onInput,
    needCVC,
    needExpiryDate,
    expiryAsDate,
    view = 'desktop',
    cardImage,
    leftAddons,
    valueRenderer,
    placeholder,
    size,
    ...restProps
}: CustomFieldProps) => {
    const [cardNumber, setCardNumber] = useState('');
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
                    placeholder={placeholder}
                    onSubmit={onSubmit}
                    onInput={onInput}
                    setCardNumberForAddon={setCardNumber}
                    needCVC={needCVC}
                    needExpiryDate={needExpiryDate}
                    expiryAsDate={expiryAsDate}
                />
            );
        }

        return valueRenderer && selected
            ? valueRenderer({ selected: selectedOption, selectedMultiple: selectedOptions })
            : selectedOption?.content;
    };

    const FormControlComponent = view === 'mobile' ? FormControlMobile : FormControlDesktop;

    const getLeftAddon = () => {
        if (selected && selected.key === ADD_CARD_KEY) {
            return (
                <ProductCover.Single
                    cardNumber={cardNumber.length >= 16 ? Number(cardNumber) : undefined}
                    {...cardImage}
                    size={cardImage?.size ?? PRODUCT_COVER_SIZE_MAPPER[size]}
                    className={cardImage?.className}
                />
            );
        }
        if (selected) {
            return undefined;
        }
        return leftAddons;
    };

    return (
        <Field
            FormControlComponent={FormControlComponent}
            size={size}
            placeholder={placeholder}
            selected={selected}
            innerProps={innerProps}
            leftAddons={getLeftAddon()}
            leftAddonsProps={{ className: styles.leftAddon }}
            {...restProps}
            valueRenderer={fieldRenderer}
        />
    );
};
