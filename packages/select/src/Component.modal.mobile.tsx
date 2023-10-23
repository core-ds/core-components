import React, { forwardRef } from 'react';

import { SelectMobile } from './Component.mobile';
import { SelectModalMobileProps } from './typings';

export const SelectModalMobile = forwardRef((props: SelectModalMobileProps, ref) => (
    <SelectMobile {...props} isBottomSheet={false} ref={ref} />
));
