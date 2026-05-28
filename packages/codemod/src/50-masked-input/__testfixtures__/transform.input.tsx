import React, {Fragment} from 'react';

import { MaskedInput } from '@alfalab/core-components-masked-input';

export const Component = () => (
    <Fragment>
        <MaskedInput size="s" />
        <MaskedInput size={"s"} />

        <MaskedInput size="m" />
        <MaskedInput size={"m"} />

        <MaskedInput size="l" />
        <MaskedInput size={"l"} />

        <MaskedInput size="xl" />
        <MaskedInput size={"xl"} />
    </Fragment>
);
