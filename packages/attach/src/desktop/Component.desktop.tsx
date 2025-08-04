import React, { forwardRef } from 'react';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';

import { type AttachProps, Attach } from '../Component';

export const AttachDesktop = forwardRef<HTMLInputElement, AttachProps>(
    (props: AttachProps, ref) => <Attach {...props} Button={ButtonMobile} ref={ref} />,
);
