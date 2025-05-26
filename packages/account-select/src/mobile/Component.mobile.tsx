import React from 'react';

import { Select } from '@alfalab/core-components-select';

import { AccountSelectProps } from '../types';

export const AccountSelectMobile: React.FC<AccountSelectProps> = ({
    isAddingNewCard,
    options,
    onChange,
    ...restProps
}) => {
    

    return (
        <Select
            {...restProps}
            options={enhancedOptions}
            onChange={handleChange}
            Field={CustomField}
            open={isAddingCard ? false : restProps.open}
            isBottomSheet={true}
        />
    );
};
