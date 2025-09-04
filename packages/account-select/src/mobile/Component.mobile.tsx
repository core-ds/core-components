import React, { forwardRef, useMemo, useState } from 'react';

import { SelectMobile } from '@alfalab/core-components-select/mobile';
import { BaseSelectChangePayload } from '@alfalab/core-components-select/shared';

import { CustomField, CustomFieldProps } from '../components/custom-field';
import { ADD_CARD_KEY } from '../constants';
import { AccountSelectContext } from '../context';
import { AccountSelectProps } from '../types';

const MobileCustomField = (props: CustomFieldProps) => <CustomField {...props} view='mobile' />;

export const AccountSelectMobile = forwardRef<HTMLInputElement, AccountSelectProps>(
    (
        { cardAddingProps, options, closeOnSelect = true, dataTestId, block = true, onChange, ...restProps },
        ref
    ) => {
        const [error, setError] = useState<string | null>(null);
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

        const contextValue = useMemo(() => ({ setError }), [setError]);

        const handleChange = (payload: BaseSelectChangePayload) => {
            setError(null);
            onChange?.(payload);
        };

        return (
            <AccountSelectContext.Provider value={contextValue}>
                <SelectMobile
                    block={block}
                    dataTestId={dataTestId}
                    error={error}
                    ref={ref}
                    onChange={handleChange}
                    {...restProps}
                    options={enhancedOptions}
                    closeOnSelect={closeOnSelect}
                    Field={MobileCustomField}
                    isBottomSheet={true}
                    fieldProps={{
                        ...(restProps.fieldProps as object),
                        ...restCardAddingProps,
                    }}
                />
            </AccountSelectContext.Provider>
        );
    },
);
