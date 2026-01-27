import React, {Fragment} from 'react';

import { IntlPhoneInput } from '@alfalab/core-components-intl-phone-input';

export const Component = () => (
    <Fragment>
        <IntlPhoneInput size="s" value='1' onChange={() => {}} />
        <IntlPhoneInput size={"s"} value='1' onChange={() => {}} />

        <IntlPhoneInput size="m" value='1' onChange={() => {}} />
        <IntlPhoneInput size={"m"} value='1' onChange={() => {}} />

        <IntlPhoneInput size="l" value='1' onChange={() => {}} />
        <IntlPhoneInput size={"l"} value='1' onChange={() => {}} />

        <IntlPhoneInput size="xl" value='1' onChange={() => {}} />
        <IntlPhoneInput size={"xl"} value='1' onChange={() => {}} />
    </Fragment>
);
