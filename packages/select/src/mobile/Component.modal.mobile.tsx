import React, { forwardRef } from 'react';

import { type SelectModalMobileProps } from '../typings';

import { SelectMobile } from './Component.mobile';

export const SelectModalMobile = forwardRef((props: SelectModalMobileProps, ref) => (
    <SelectMobile {...props} isBottomSheet={false} ref={ref} />
));
