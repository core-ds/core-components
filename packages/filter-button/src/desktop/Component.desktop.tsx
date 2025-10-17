import React, { forwardRef } from 'react';

import { BaseFilterButton } from '../components/base-filter-button';
import { type BaseFilterButtonProps } from '../types';

export const FilterButtonDesktop = forwardRef<
    HTMLButtonElement,
    Omit<BaseFilterButtonProps, 'size'>
>((props, ref) => <BaseFilterButton size={40} {...props} ref={ref} />);
