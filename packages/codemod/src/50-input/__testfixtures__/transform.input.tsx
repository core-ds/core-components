import React, {Fragment} from 'react';

import { Input } from '@alfalab/core-components-input';
import { InputDesktop } from '@alfalab/core-components-input/desktop';
import { InputMobile } from '@alfalab/core-components-input/mobile';

export const Component = () => (
    <Fragment>
        <Input size="s" />
        <Input size={"s"} />
        <InputDesktop size="s" />
        <InputDesktop size={"s"} />
        <InputMobile size="s" />
        <InputMobile size={"s"} />

        <Input size="m" />
        <Input size={"m"} />
        <InputDesktop size="m" />
        <InputDesktop size={"m"} />
        <InputMobile size="m" />
        <InputMobile size={"m"} />

        <Input size="l" />
        <Input size={"l"} />
        <InputDesktop size="l" />
        <InputDesktop size={"l"} />
        <InputMobile size="l" />
        <InputMobile size={"l"} />

        <Input size="xl" />
        <Input size={"xl"} />
        <InputDesktop size="xl" />
        <InputDesktop size={"xl"} />
        <InputMobile size="xl" />
        <InputMobile size={"xl"} />
    </Fragment>
);
