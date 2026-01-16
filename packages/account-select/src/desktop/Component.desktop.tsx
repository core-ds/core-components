import React, { forwardRef, useMemo } from 'react';
import cn from 'classnames';

import { Popover } from '@alfalab/core-components-popover';
import {
    type AnyObject,
    Arrow,
    BaseOption,
    BaseSelect,
    type BaseSelectChangePayload,
    Optgroup as DefaultOptgroup,
    OptionsList as DefaultOptionsList,
} from '@alfalab/core-components-select/shared';

import { CustomField } from '../components/custom-field';
import { ADD_CARD_KEY } from '../constants';
import { useAccountSelect } from '../context';
import { type AccountSelectProps } from '../types';

import styles from './index.module.css';

export const AccountSelectDesktop = forwardRef<HTMLInputElement, AccountSelectProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = BaseOption,
            closeOnSelect = true,
            options,
            cardAddingProps,
            dataTestId,
            onChange,
            size = 72,
            ...restProps
        },
        ref,
    ) => {
        const { error, setError } = useAccountSelect();

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

        const handleChange = (payload: BaseSelectChangePayload) => {
            setError(null);
            onChange?.(payload);
        };

        return (
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
                optionClassName={cn(styles.option, styles[`size${size}`])}
                size={size}
                {...restProps}
                fieldProps={{
                    ...(restProps.fieldProps as AnyObject),
                    ...restCardAddingProps,
                    size,
                }}
            />
        );
    },
);
