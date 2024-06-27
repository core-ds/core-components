import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { BaseRadioGroupProps } from './components/base-radio-group';
import { RadioGroupDesktop } from './desktop';
import { RadioGroupMobile } from './mobile';

export type RadioGroupProps = Omit<BaseRadioGroupProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ breakpoint = getComponentBreakpoint(), ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? RadioGroupDesktop : RadioGroupMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

RadioGroup.displayName = 'RadioGroup';
