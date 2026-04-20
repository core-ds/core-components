import React, {Fragment} from 'react';

import { FormControl } from '@alfalab/core-components-form-control';
import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

export const Component = () => (
    <Fragment>
        <FormControl size="s" />
        <FormControl size={"s"} />
        <FormControlDesktop size="s" />
        <FormControlDesktop size={"s"} />
        <FormControlMobile size="s" />
        <FormControlMobile size={"s"} />

        <FormControl size="m" />
        <FormControl size={"m"} />
        <FormControlDesktop size="m" />
        <FormControlDesktop size={"m"} />
        <FormControlMobile size="m" />
        <FormControlMobile size={"m"} />

        <FormControl size="l" />
        <FormControl size={"l"} />
        <FormControlDesktop size="l" />
        <FormControlDesktop size={"l"} />
        <FormControlMobile size="l" />
        <FormControlMobile size={"l"} />

        <FormControl size="xl" />
        <FormControl size={"xl"} />
        <FormControlDesktop size="xl" />
        <FormControlDesktop size={"xl"} />
        <FormControlMobile size="xl" />
        <FormControlMobile size={"xl"} />
    </Fragment>
);
