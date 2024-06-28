import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { SelectDesktop } from './desktop';
import { SelectMobile } from './mobile';
import type { SelectFieldProps, SelectProps } from './typings';

export const SelectResponsive = forwardRef<
    HTMLDivElement,
    SelectProps & { originalProps?: SelectProps }
>(({ onScroll, fieldProps, breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    if (isDesktop) {
        return (
            <SelectDesktop
                onScroll={onScroll}
                {...restProps}
                ref={ref}
                fieldProps={fieldProps as SelectFieldProps}
            />
        );
    }

    const mobileProps = {
        ...restProps,
        /* В мобильную версию хук уже зашит, и это единственный передать в мобилку оригинальные пропсы */
        ...restProps.originalProps,
    };

    return <SelectMobile fieldProps={fieldProps} {...mobileProps} ref={ref} />;
});

SelectResponsive.displayName = 'SelectResponsive';
