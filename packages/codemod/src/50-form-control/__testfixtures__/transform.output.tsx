import React, {Fragment} from 'react';

import { FormControl } from '@alfalab/core-components-form-control';
import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

export const Component = () => (
    <Fragment>
        <FormControl size={48} />
        <FormControl size={48} />
        <FormControlDesktop size={48} />
        <FormControlDesktop size={48} />
        <FormControlMobile size={48} />
        <FormControlMobile size={48} />

        <FormControl size={56} />
        <FormControl size={56} />
        <FormControlDesktop size={56} />
        <FormControlDesktop size={56} />
        <FormControlMobile size={56} />
        <FormControlMobile size={56} />

        <FormControl size={64} />
        <FormControl size={64} />
        <FormControlDesktop size={64} />
        <FormControlDesktop size={64} />
        <FormControlMobile size={64} />
        <FormControlMobile size={64} />

        <FormControl size={72} />
        <FormControl size={72} />
        <FormControlDesktop size={72} />
        <FormControlDesktop size={72} />
        <FormControlMobile size={72} />
        <FormControlMobile size={72} />
    </Fragment>
);
