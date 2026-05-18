import React, {Fragment} from 'react';

import { InputAutocomplete } from '@alfalab/core-components-input-autocomplete';
import { InputAutocompleteDesktop } from '@alfalab/core-components-input-autocomplete/desktop';
import { InputAutocompleteMobile } from '@alfalab/core-components-input-autocomplete/mobile';

export const Component = () => (
    <Fragment>
        <InputAutocomplete size="s" options={[]} />
        <InputAutocomplete size={"s"} options={[]} />
        <InputAutocompleteDesktop size="s" options={[]} />
        <InputAutocompleteDesktop size={"s"} options={[]} />
        <InputAutocompleteMobile size="s" options={[]} />
        <InputAutocompleteMobile size={"s"} options={[]} />

        <InputAutocomplete size="m" options={[]} />
        <InputAutocomplete size={"m"} options={[]} />
        <InputAutocompleteDesktop size="m" options={[]} />
        <InputAutocompleteDesktop size={"m"} options={[]} />
        <InputAutocompleteMobile size="m" options={[]} />
        <InputAutocompleteMobile size={"m"} options={[]} />

        <InputAutocomplete size="l" options={[]} />
        <InputAutocomplete size={"l"} options={[]} />
        <InputAutocompleteDesktop size="l" options={[]} />
        <InputAutocompleteDesktop size={"l"} options={[]} />
        <InputAutocompleteMobile size="l" options={[]} />
        <InputAutocompleteMobile size={"l"} options={[]} />

        <InputAutocomplete size="xl" options={[]} />
        <InputAutocomplete size={"xl"} options={[]} />
        <InputAutocompleteDesktop size="xl" options={[]} />
        <InputAutocompleteDesktop size={"xl"} options={[]} />
        <InputAutocompleteMobile size="xl" options={[]} />
        <InputAutocompleteMobile size={"xl"} options={[]} />
    </Fragment>
);
