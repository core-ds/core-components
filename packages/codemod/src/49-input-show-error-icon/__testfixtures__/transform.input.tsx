import React, {Fragment} from 'react';

import { Input } from '@alfalab/core-components-input';
import { InputAutocomplete } from '@alfalab/core-components-input-autocomplete';
import { InputAutocompleteDesktop } from '@alfalab/core-components-input-autocomplete/desktop';
import { InputAutocompleteMobile, InputAutocompleteModalMobile } from '@alfalab/core-components-input-autocomplete/mobile';
import { InternationalPhoneInput } from '@alfalab/core-components-international-phone-input';
import { InternationalPhoneInputDesktop } from '@alfalab/core-components-international-phone-input/desktop';
import { InternationalPhoneInputMobile } from '@alfalab/core-components-international-phone-input/mobile';
import { MaskedInput } from '@alfalab/core-components-masked-input';
import { NumberInput } from '@alfalab/core-components-number-input';
import { NumberInputDesktop } from '@alfalab/core-components-number-input/desktop';
import { NumberInputMobile } from '@alfalab/core-components-number-input/mobile';
import { PasswordInput } from '@alfalab/core-components-password-input';
import { PhoneInput } from '@alfalab/core-components-phone-input';
import { Select } from '@alfalab/core-components-select';
import { SelectDesktop } from '@alfalab/core-components-select/desktop';
import { SelectMobile, SelectModalMobile } from '@alfalab/core-components-select/mobile';
import { SliderInput } from '@alfalab/core-components-slider-input';
import { UniversalDateInput } from '@alfalab/core-components-universal-date-input';
import { UniversalDateInputDesktop } from '@alfalab/core-components-universal-date-input/desktop';
import { UniversalDateInputMobile } from '@alfalab/core-components-universal-date-input/mobile';

export const Component = () => (
    <Fragment>
        <Input error='Error'>Input</Input>

        <InputAutocomplete  options={[{ key: 'Fermium' }]} error='Error' />
        <InputAutocompleteDesktop  options={[{ key: 'Fermium' }]} error='Error' />
        <InputAutocompleteMobile  options={[{ key: 'Fermium' }]} error='Error' />
        <InputAutocompleteModalMobile  options={[{ key: 'Fermium' }]} error='Error' />

        <InputAutocomplete  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{ hint: 'Hint' }} />
        <InputAutocompleteDesktop  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{ hint: 'Hint' }} />
        <InputAutocompleteMobile  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{ hint: 'Hint' }} />
        <InputAutocompleteModalMobile  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{ hint: 'Hint' }} />

        <PasswordInput error='error' />

        <InternationalPhoneInput error='error' />
        <InternationalPhoneInputDesktop error='error' />
        <InternationalPhoneInputMobile error='error' />

        <MaskedInput error='error' />

        <NumberInput error='error' />
        <NumberInputDesktop error='error' />
        <NumberInputMobile error='error' />

        <PhoneInput error='error' />

        <Select options={[{ key: '1', content: 'Neptunium' }]} error='error' />
        <SelectDesktop options={[{ key: '1', content: 'Neptunium' }]} error='error' />
        <SelectMobile options={[{ key: '1', content: 'Neptunium' }]} error='error' />
        <SelectModalMobile options={[{ key: '1', content: 'Neptunium' }]} error='error' />

        <Select options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{ hint: 'Hint' }} />
        <SelectDesktop options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{ hint: 'Hint' }} />
        <SelectMobile options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{ hint: 'Hint' }} />
        <SelectModalMobile options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{ hint: 'Hint' }} />

        <SliderInput error='error' />

        <UniversalDateInput view='date' error='error' />
        <UniversalDateInputDesktop view='date' error='error' />
        <UniversalDateInputMobile view='date' error='error' />
    </Fragment>
);
