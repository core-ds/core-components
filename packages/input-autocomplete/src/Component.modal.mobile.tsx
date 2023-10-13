import React from 'react';

import { InputAutocompleteMobile } from './Component.mobile';
import { InputAutocompleteMobileProps } from './types';

export const InputAutocompleteModalMobile = React.forwardRef<
    HTMLDivElement,
    InputAutocompleteMobileProps
>((props, ref) => <InputAutocompleteMobile {...props} ref={ref} isBottomSheet={false} />);
