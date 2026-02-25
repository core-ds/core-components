import React, {Fragment} from 'react';

import { Input } from '@alfalab/core-components-input';
import { InputDesktop } from '@alfalab/core-components-input/desktop';
import { InputMobile } from '@alfalab/core-components-input/mobile';

export const Component = () => (
    <Fragment>
        <Input size={48} />
        <Input size={48} />
        <InputDesktop size={48} />
        <InputDesktop size={48} />
        <InputMobile size={48} />
        <InputMobile size={48} />

        <Input size={56} />
        <Input size={56} />
        <InputDesktop size={56} />
        <InputDesktop size={56} />
        <InputMobile size={56} />
        <InputMobile size={56} />

        <Input size={64} />
        <Input size={64} />
        <InputDesktop size={64} />
        <InputDesktop size={64} />
        <InputMobile size={64} />
        <InputMobile size={64} />

        <Input size={72} />
        <Input size={72} />
        <InputDesktop size={72} />
        <InputDesktop size={72} />
        <InputMobile size={72} />
        <InputMobile size={72} />
    </Fragment>
);
