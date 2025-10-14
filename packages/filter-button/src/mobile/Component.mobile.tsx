import React, { forwardRef } from 'react';

import { BaseFilterButton } from '../components/base-filter-button';
import { type BaseFilterButtonProps } from '../types';

export const FilterButtonMobile = forwardRef<HTMLButtonElement, BaseFilterButtonProps>(
    (restProps, ref) => <BaseFilterButton {...restProps} ref={ref} />,
);
