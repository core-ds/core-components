import React, {Fragment} from 'react';

import { AmountInput } from '@alfalab/core-components-amount-input';

export const Component = () => (
    <Fragment>
        <AmountInput size="s" />
        <AmountInput size={"s"} />

        <AmountInput size="m" />
        <AmountInput size={"m"} />

        <AmountInput size="l" />
        <AmountInput size={"l"} />

        <AmountInput size="xl" />
        <AmountInput size={"xl"} />
    </Fragment>
);
