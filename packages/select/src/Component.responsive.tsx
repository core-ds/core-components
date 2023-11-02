import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { SelectDesktop } from './Component.desktop';
import { SelectMobile } from './Component.mobile';
import type { SelectFieldProps, SelectProps } from './typings';

export const SelectResponsive = forwardRef<HTMLDivElement, SelectProps>(
    ({ onScroll, fieldProps, breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

        return isDesktop ? (
            <SelectDesktop
                onScroll={onScroll}
                {...restProps}
                ref={ref}
                fieldProps={fieldProps as SelectFieldProps}
            />
        ) : (
            <SelectMobile fieldProps={fieldProps} {...restProps} ref={ref} />
        );
    },
);
