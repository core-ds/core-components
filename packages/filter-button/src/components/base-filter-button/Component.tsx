import React, { forwardRef } from 'react';

import { type BaseFilterButtonProps } from '../../types';

export const BaseFilterButton = forwardRef<HTMLDivElement, BaseFilterButtonProps>(
    ({ children, className, dataTestId, ...restProps }, ref) => (
        <div ref={ref} className={className} data-test-id={dataTestId} {...restProps}>
            {children}
        </div>
    ),
);
