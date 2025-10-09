import React, { forwardRef } from 'react';

import { BaseFilterButton } from '../components/base-filter-button';
import { type BaseFilterButtonProps } from '../types';

export const FilterButtonDesktop = forwardRef<HTMLDivElement, BaseFilterButtonProps>(
    (restProps, ref) => <BaseFilterButton {...restProps} ref={ref} />,
);
