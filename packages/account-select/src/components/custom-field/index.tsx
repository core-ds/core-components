import React from 'react';
import cn from 'classnames';

import { useAccountSelect } from '@alfalab/core-components-account-select/context';
import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { ProductCover } from '@alfalab/core-components-product-cover';
import { Field, type FieldProps, type OptionShape } from '@alfalab/core-components-select/shared';

import { ADD_CARD_KEY, PRODUCT_COVER_SIZE_MAPPER } from '../../constants';
import { MultiStepCardInput } from '../multi-step-card-input';

import styles from './index.module.css';

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
    toggleMenu,
    ...restProps
}: CustomFieldProps) => {
    const { cardNumber } = useAccountSelect();

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
                    size={cardImage?.size ?? PRODUCT_COVER_SIZE_MAPPER[size]}
                    className={cardImage?.className}
                    {...cardImage}
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
            leftAddonsProps={{ className: cn(styles.leftAddon, styles[`size${size}`]) }}
            toggleMenu={toggleMenu}
            {...restProps}
            valueRenderer={fieldRenderer}
        />
    );
};
