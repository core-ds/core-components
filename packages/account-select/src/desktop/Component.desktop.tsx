import React, { forwardRef, useMemo, useState } from 'react';

import { Popover } from '@alfalab/core-components-popover';
import {
    AnyObject,
    Arrow,
    BaseOption,
    BaseSelect,
    Optgroup as DefaultOptgroup,
    OptionProps,
    OptionsList as DefaultOptionsList,
    BaseSelectChangePayload,
} from '@alfalab/core-components-select/shared';

import { CustomField } from '../components/custom-field';
import { ADD_CARD_KEY } from '../constants';
import { AccountSelectContext } from '../context';
import { AccountSelectProps } from '../types';

import styles from './index.module.css';

const DefaultOption = (props: OptionProps) => (
    <BaseOption {...props}>
        <div className={styles.optionContent}>{props.option.content}</div>
    </BaseOption>
);

export const AccountSelectDesktop = forwardRef<HTMLInputElement, AccountSelectProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            closeOnSelect = true,
            options,
            cardAddingProps,
            dataTestId,
            onChange,
            ...restProps
        },
        ref,
    ) => {
        const [error, setError] = useState<string | null>(null);
        const { content, ...restCardAddingProps } = cardAddingProps || {};
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
                <BaseSelect
                    dataTestId={dataTestId}
                    className={styles.accountSelect}
                    error={error}
                    view='desktop'
                    Popover={Popover}
                    ref={ref}
                    onChange={handleChange}
                    options={enhancedOptions}
                    closeOnSelect={closeOnSelect}
                    Option={Option}
                    Field={CustomField}
                    Optgroup={Optgroup}
                    OptionsList={OptionsList}
                    Arrow={Arrow}
                    optionClassName={styles.option}
                    {...restProps}
                    fieldProps={{
                        ...(restProps.fieldProps as AnyObject),
                        ...restCardAddingProps,
                    }}
                />
            </AccountSelectContext.Provider>
        );
    },
);
