import React, {Fragment} from 'react';

import { InternationalPhoneInput } from '@alfalab/core-components-international-phone-input';
import { InternationalPhoneInputDesktop } from '@alfalab/core-components-international-phone-input/desktop';
import { InternationalPhoneInputMobile } from '@alfalab/core-components-international-phone-input/mobile';

export const Component = () => (
    <Fragment>
        <InternationalPhoneInput size="s" />
        <InternationalPhoneInput size={"s"} />
        <InternationalPhoneInputDesktop size="s" />
        <InternationalPhoneInputDesktop size={"s"} />
        <InternationalPhoneInputMobile size="s" />
        <InternationalPhoneInputMobile size={"s"} />

        <InternationalPhoneInput size="m" />
        <InternationalPhoneInput size={"m"} />
        <InternationalPhoneInputDesktop size="m" />
        <InternationalPhoneInputDesktop size={"m"} />
        <InternationalPhoneInputMobile size="m" />
        <InternationalPhoneInputMobile size={"m"} />

        <InternationalPhoneInput size="l" />
        <InternationalPhoneInput size={"l"} />
        <InternationalPhoneInputDesktop size="l" />
        <InternationalPhoneInputDesktop size={"l"} />
        <InternationalPhoneInputMobile size="l" />
        <InternationalPhoneInputMobile size={"l"} />

        <InternationalPhoneInput size="xl" />
        <InternationalPhoneInput size={"xl"} />
        <InternationalPhoneInputDesktop size="xl" />
        <InternationalPhoneInputDesktop size={"xl"} />
        <InternationalPhoneInputMobile size="xl" />
        <InternationalPhoneInputMobile size={"xl"} />
    </Fragment>
);
