import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { CodeInputDesktop } from './desktop';
import { CodeInputMobile } from './mobile';
import { BaseCodeInputProps, CustomInputRef } from './typings';

export type CodeInputProps = Omit<BaseCodeInputProps, 'stylesInput'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const CodeInput = forwardRef<CustomInputRef, CodeInputProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? CodeInputDesktop : CodeInputMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

CodeInput.displayName = 'CodeInput';
