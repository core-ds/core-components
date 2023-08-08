/* eslint-disable */
import React from 'react';

import { InputAutocomplete, InputAutocompleteProps } from '@alfalab/core-components/input-autocomplete';
import { InputAutocompleteResponsive, InputAutocompleteResponsiveProps } from '@alfalab/core-components/input-autocomplete/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <InputAutocomplete options={[]}/>
            <InputAutocompleteResponsive options={[]} onChange={noop} onFilter={noop} />
        </React.Fragment>
    );
};
