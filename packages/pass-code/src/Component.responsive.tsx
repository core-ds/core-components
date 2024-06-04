import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { PassCodeDesktop } from './desktop/PassCodeDesktop';
import { PassCodeMobile } from './mobile/PassCodeMobile';
import { PassCodeProps } from './typings';

export const PassCode = forwardRef<HTMLDivElement, PassCodeProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? PassCodeDesktop : PassCodeMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
