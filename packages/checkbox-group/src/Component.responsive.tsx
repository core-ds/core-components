import React, { FC } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseCheckboxGroupProps } from './components/base-checkbox-group';
import { CheckboxGroupDesktop } from './Component.desktop';
import { CheckboxGroupMobile } from './Component.mobile';

export type CheckboxGroupProps = Omit<BaseCheckboxGroupProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({ breakpoint = 1024, ...restProps }) => {
    const query = `(min-width: ${breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query);

    const Component = isDesktop ? CheckboxGroupDesktop : CheckboxGroupMobile;

    return <Component {...restProps} />;
};
