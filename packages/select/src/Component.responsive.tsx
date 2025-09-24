import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { SelectDesktop } from './desktop';
import { SelectMobile } from './mobile';
import { type SelectFieldProps, type SelectProps } from './typings';

export const SelectResponsive = forwardRef<
    HTMLDivElement,
    SelectProps & { originalProps?: SelectProps }
>(
    (
        {
            onScroll,
            fieldProps,
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

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
    },
);

SelectResponsive.displayName = 'SelectResponsive';
