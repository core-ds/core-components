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
        <Input error='Error' showErrorIcon={true}>Input</Input>

        <InputAutocomplete
            options={[{ key: 'Fermium' }]}
            error='Error'
            fieldProps={{
                showErrorIcon: true
            }} />
        <InputAutocompleteDesktop
            options={[{ key: 'Fermium' }]}
            error='Error'
            fieldProps={{
                showErrorIcon: true
            }} />
        <InputAutocompleteMobile
            options={[{ key: 'Fermium' }]}
            error='Error'
            fieldProps={{
                showErrorIcon: true
            }} />
        <InputAutocompleteModalMobile
            options={[{ key: 'Fermium' }]}
            error='Error'
            fieldProps={{
                showErrorIcon: true
            }} />

        <InputAutocomplete  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />
        <InputAutocompleteDesktop  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />
        <InputAutocompleteMobile  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />
        <InputAutocompleteModalMobile  options={[{ key: 'Fermium' }]} error='Error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />

        <PasswordInput error='error' showErrorIcon={true} />

        <InternationalPhoneInput error='error' showErrorIcon={true} />
        <InternationalPhoneInputDesktop error='error' showErrorIcon={true} />
        <InternationalPhoneInputMobile error='error' showErrorIcon={true} />

        <MaskedInput error='error' showErrorIcon={true} />

        <NumberInput error='error' showErrorIcon={true} />
        <NumberInputDesktop error='error' showErrorIcon={true} />
        <NumberInputMobile error='error' showErrorIcon={true} />

        <PhoneInput error='error' showErrorIcon={true} />

        <Select
            options={[{ key: '1', content: 'Neptunium' }]}
            error='error'
            fieldProps={{
                showErrorIcon: true
            }} />
        <SelectDesktop
            options={[{ key: '1', content: 'Neptunium' }]}
            error='error'
            fieldProps={{
                showErrorIcon: true
            }} />
        <SelectMobile
            options={[{ key: '1', content: 'Neptunium' }]}
            error='error'
            fieldProps={{
                showErrorIcon: true
            }} />
        <SelectModalMobile
            options={[{ key: '1', content: 'Neptunium' }]}
            error='error'
            fieldProps={{
                showErrorIcon: true
            }} />

        <Select options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />
        <SelectDesktop options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />
        <SelectMobile options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />
        <SelectModalMobile options={[{ key: '1', content: 'Neptunium' }]} error='error' fieldProps={{
            hint: 'Hint',
            showErrorIcon: true
        }} />

        <SliderInput error='error' showErrorIcon={true} />

        <UniversalDateInput view='date' error='error' showErrorIcon={true} />
        <UniversalDateInputDesktop view='date' error='error' showErrorIcon={true} />
        <UniversalDateInputMobile view='date' error='error' showErrorIcon={true} />
    </Fragment>
);
