import React, { forwardRef } from 'react';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';

import { type AttachProps, Attach } from '../Component';

export const AttachMobile = forwardRef<HTMLInputElement, AttachProps>(
    (props: AttachProps, ref) => <Attach {...props} Button={ButtonDesktop} ref={ref} />,
);
