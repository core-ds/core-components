/* eslint-disable */
import React from 'react';

import { InputAutocompleteDesktop, InputAutocompleteDesktopProps } from '@balafla/core-components/input-autocomplete/desktop';
import { InputAutocomplete, InputAutocompleteProps } from '@balafla/core-components/input-autocomplete';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <InputAutocompleteDesktop options={[]}/>
            <InputAutocomplete options={[]} onChange={noop} onFilter={noop} />
        </React.Fragment>
    );
};
