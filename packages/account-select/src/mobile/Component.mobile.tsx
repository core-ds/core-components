import React, { forwardRef, useMemo } from 'react';

import { useAccountSelect } from '@alfalab/core-components-account-select/context';
import { SelectMobile } from '@alfalab/core-components-select/mobile';
import { type BaseSelectChangePayload } from '@alfalab/core-components-select/shared';

import { CustomField, type CustomFieldProps } from '../components/custom-field';
import { ADD_CARD_KEY } from '../constants';
import { type AccountSelectProps } from '../types';

const MobileCustomField = (props: CustomFieldProps) => <CustomField {...props} view='mobile' />;

export const AccountSelectMobile = forwardRef<HTMLInputElement, AccountSelectProps>(
    (
        {
            cardAddingProps,
            options,
            closeOnSelect = true,
            dataTestId,
            block = true,
            onChange,
            size = 72,
            ...restProps
        },
        ref,
    ) => {
        const { error, setError } = useAccountSelect();

        const { content, ...restCardAddingProps } = cardAddingProps ?? {};

        const enhancedOptions = useMemo(() => {
            if (!content) return options;

            return [
                {
                    key: ADD_CARD_KEY,
                    content,
                    value: ADD_CARD_KEY,
                },
                ...options,
            ];
        }, [content, options]);

        const handleChange = (payload: BaseSelectChangePayload) => {
            setError(null);
            onChange?.(payload);
        };

        return (
            <SelectMobile
                block={block}
                dataTestId={dataTestId}
                error={error}
                ref={ref}
                onChange={handleChange}
                size={size}
                {...restProps}
                options={enhancedOptions}
                closeOnSelect={closeOnSelect}
                Field={MobileCustomField}
                isBottomSheet={true}
                fieldProps={{
                    ...(restProps.fieldProps as object),
                    ...restCardAddingProps,
                    size,
                }}
            />
        );
    },
);
