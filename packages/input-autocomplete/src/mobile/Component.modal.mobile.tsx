import React from 'react';

import { type InputAutocompleteMobileProps } from '../types';

import { InputAutocompleteMobile } from './Component.mobile';

export const InputAutocompleteModalMobile = React.forwardRef<
    HTMLDivElement,
    InputAutocompleteMobileProps
>((props, ref) => <InputAutocompleteMobile {...props} ref={ref} isBottomSheet={false} />);
