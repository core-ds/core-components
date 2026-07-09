import React, {Fragment} from 'react';

import { NumberInput } from '@alfalab/core-components-number-input';
import { NumberInputDesktop } from '@alfalab/core-components-number-input/desktop';
import { NumberInputMobile } from '@alfalab/core-components-number-input/mobile';

export const Component = () => (
    <Fragment>
        <NumberInput size={48} />
        <NumberInput size={48} />
        <NumberInputDesktop size={48} />
        <NumberInputDesktop size={48} />
        <NumberInputMobile size={48} />
        <NumberInputMobile size={48} />

        <NumberInput size={56} />
        <NumberInput size={56} />
        <NumberInputDesktop size={56} />
        <NumberInputDesktop size={56} />
        <NumberInputMobile size={56} />
        <NumberInputMobile size={56} />

        <NumberInput size={64} />
        <NumberInput size={64} />
        <NumberInputDesktop size={64} />
        <NumberInputDesktop size={64} />
        <NumberInputMobile size={64} />
        <NumberInputMobile size={64} />

        <NumberInput size={72} />
        <NumberInput size={72} />
        <NumberInputDesktop size={72} />
        <NumberInputDesktop size={72} />
        <NumberInputMobile size={72} />
        <NumberInputMobile size={72} />
    </Fragment>
);
