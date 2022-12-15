import React, { forwardRef } from 'react';

import { useMedia } from '@alfalab/hooks';

import { SelectFieldProps, Select } from './Component';
import { AdditionalMobileProps, SelectMobile } from './components';
import { BaseSelectProps } from './typings';

export type SelectResponsiveProps = BaseSelectProps &
    AdditionalMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export const SelectResponsive = forwardRef<HTMLDivElement, SelectResponsiveProps>(
    (
        {
            footer,
            swipeable,
            bottomSheetProps,
            OptionsList,
            onScroll,
            fieldProps,
            breakpoint = 1024,
            ...restProps
        },
        ref,
    ) => {
        const [view] = useMedia(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return view === 'desktop' ? (
            <Select
                OptionsList={OptionsList}
                onScroll={onScroll}
                {...restProps}
                ref={ref}
                fieldProps={fieldProps as SelectFieldProps}
            />
        ) : (
            <SelectMobile
                footer={footer}
                swipeable={swipeable}
                bottomSheetProps={bottomSheetProps}
                fieldProps={fieldProps}
                {...restProps}
                ref={ref}
            />
        );
    },
);
