import React, { FC } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { BaseCheckboxGroupProps } from './components/base-checkbox-group';
import { CheckboxGroupDesktop } from './desktop';
import { CheckboxGroupMobile } from './mobile';

export type CheckboxGroupProps = Omit<BaseCheckboxGroupProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
    breakpoint = getComponentBreakpoint(),
    defaultMatchMediaValue,
    ...restProps
}) => {
    const query = `(min-width: ${breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

    const Component = isDesktop ? CheckboxGroupDesktop : CheckboxGroupMobile;

    return <Component {...restProps} />;
};
