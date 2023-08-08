/* eslint-disable */
import React from 'react';

import { InputAutocompleteDesktop, InputAutocompleteDesktopProps } from '@alfalab/core-components/input-autocomplete/desktop';
import { InputAutocomplete, InputAutocompleteProps } from '@alfalab/core-components/input-autocomplete';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <InputAutocompleteDesktop options={[]}/>
            <InputAutocomplete options={[]} onChange={noop} onFilter={noop} />
        </React.Fragment>
    );
};
