import React, {Fragment} from 'react';

import { NumberInput } from '@alfalab/core-components-number-input';
import { NumberInputDesktop } from '@alfalab/core-components-number-input/desktop';
import { NumberInputMobile } from '@alfalab/core-components-number-input/mobile';

export const Component = () => (
    <Fragment>
        <NumberInput size="s" />
        <NumberInput size={"s"} />
        <NumberInputDesktop size="s" />
        <NumberInputDesktop size={"s"} />
        <NumberInputMobile size="s" />
        <NumberInputMobile size={"s"} />

        <NumberInput size="m" />
        <NumberInput size={"m"} />
        <NumberInputDesktop size="m" />
        <NumberInputDesktop size={"m"} />
        <NumberInputMobile size="m" />
        <NumberInputMobile size={"m"} />

        <NumberInput size="l" />
        <NumberInput size={"l"} />
        <NumberInputDesktop size="l" />
        <NumberInputDesktop size={"l"} />
        <NumberInputMobile size="l" />
        <NumberInputMobile size={"l"} />

        <NumberInput size="xl" />
        <NumberInput size={"xl"} />
        <NumberInputDesktop size="xl" />
        <NumberInputDesktop size={"xl"} />
        <NumberInputMobile size="xl" />
        <NumberInputMobile size={"xl"} />
    </Fragment>
);
