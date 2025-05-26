import React, { forwardRef, useMemo } from 'react';

import { Popover } from '@alfalab/core-components-popover';
import {
    AnyObject,
    Arrow,
    BaseSelect,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
} from '@alfalab/core-components-select/shared';

import { MultiStepCardInput } from '../components/multi-step-card-input';
import { ADD_CARD_KEY } from '../constants';
import { AccountSelectProps } from '../types';

export const AccountSelectDesktop = forwardRef<HTMLInputElement, AccountSelectProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            onInput,
            hasNewCardAdding,
            onSubmit,
            closeOnSelect = true,
            options,
            ...restProps
        },
        ref,
    ) => {

        const enhancedOptions = useMemo(() => {
            if (!hasNewCardAdding) return options;

            return [
                {
                    key: ADD_CARD_KEY,
                    content: 'Новая карта',
                    value: ADD_CARD_KEY,
                },
                ...options,
            ];
        }, [hasNewCardAdding, options]);

        return (
            <BaseSelect
                view='desktop'
                Popover={Popover}
                ref={ref}
                options={enhancedOptions}
                closeOnSelect={closeOnSelect}
                Option={Option}
                Field={MultiStepCardInput}
                Optgroup={Optgroup}
                OptionsList={OptionsList}
                Arrow={Arrow}
                {...restProps}
                fieldProps={{
                    ...(restProps.fieldProps as AnyObject),
                    onInput,
                    onSubmit,
                }}
            />
        );
    },
);
