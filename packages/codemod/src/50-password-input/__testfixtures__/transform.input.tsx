import React, {Fragment} from 'react';

import { PasswordInput } from '@alfalab/core-components-password-input';

export const Component = () => (
    <Fragment>
        <PasswordInput size="s" />
        <PasswordInput size={"s"} />

        <PasswordInput size="m" />
        <PasswordInput size={"m"} />

        <PasswordInput size="l" />
        <PasswordInput size={"l"} />

        <PasswordInput size="xl" />
        <PasswordInput size={"xl"} />
    </Fragment>
);
