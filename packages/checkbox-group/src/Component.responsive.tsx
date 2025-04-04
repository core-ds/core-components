import React, { FC } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

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
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    const Component = isDesktop ? CheckboxGroupDesktop : CheckboxGroupMobile;

    return <Component {...restProps} />;
};
