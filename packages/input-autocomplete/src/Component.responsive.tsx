import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonProps } from '@alfalab/core-components-button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseSelectProps } from '@alfalab/core-components-select';
import { useMedia } from '@alfalab/hooks';

import { InputAutocompleteDesktop, InputAutocompleteDesktopProps } from './Component.desktop';
import { InputAutocompleteMobile, InputAutocompleteMobileProps } from './Component.mobile';

export type InputAutocompleteResponsiveProps = InputAutocompleteDesktopProps &
    InputAutocompleteMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export type InputAutocompleteMedia = 'desktop' | 'mobile';

export const InputAutocompleteResponsive = forwardRef<
    HTMLInputElement | HTMLDivElement,
    InputAutocompleteResponsiveProps
>(({ breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia<InputAutocompleteMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <InputAutocompleteDesktop {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
    ) : (
        <InputAutocompleteMobile {...restProps} ref={ref} />
    );
});
