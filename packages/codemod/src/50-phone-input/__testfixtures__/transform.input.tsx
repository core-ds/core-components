import React, {Fragment} from 'react';

import { PhoneInput } from '@alfalab/core-components-phone-input';

export const Component = () => (
    <Fragment>
        <PhoneInput size="s" />
        <PhoneInput size={"s"} />

        <PhoneInput size="m" />
        <PhoneInput size={"m"} />

        <PhoneInput size="l" />
        <PhoneInput size={"l"} />

        <PhoneInput size="xl" />
        <PhoneInput size={"xl"} />
    </Fragment>
);
