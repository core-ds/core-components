import React from 'react';
import { IntlPhoneInput } from '@alfalab/core-components-intl-phone-input';
import { Wrapper } from './Wrapper';

const IntlPhoneInputExample = () => {
    const [value, setValue] = React.useState('+7');
    const [selectedCountry, setSelectedCountry] = React.useState('RU');

    const handleChange = React.useCallback(
        newValue => {
            setValue(newValue);
        },
        [setValue],
    );

    const handleCountryChange = React.useCallback(countryCode => {
        setSelectedCountry(countryCode);
    }, []);

    const handleClear = React.useCallback(() => setValue(''), []);

    return (
        <Wrapper>
            <div style={{ width: '320px' }}>
                <IntlPhoneInput
                    inputProps={{
                        clear: true,
                        onClear: handleClear,
                    }}
                    value={value}
                    onChange={handleChange}
                    block={true}
                    label='Номер телефона'
                    defaultCountryIso2='RU'
                    onCountryChange={handleCountryChange}
                />
                <br />
                Код выбранной страны: <strong>{selectedCountry}</strong>
            </div>
        </Wrapper>
    );
};

export default IntlPhoneInputExample;
