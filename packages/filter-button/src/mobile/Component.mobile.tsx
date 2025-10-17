import React, { forwardRef } from 'react';

import { BaseFilterButton } from '../components/base-filter-button';
import { type BaseFilterButtonProps } from '../types';

export const FilterButtonMobile = forwardRef<
    HTMLButtonElement,
    Omit<BaseFilterButtonProps, 'size'>
>((props, ref) => <BaseFilterButton size={32} {...props} ref={ref} />);
