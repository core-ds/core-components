import React, { forwardRef } from 'react';

import { type NoStyleButtonProps } from '@alfalab/core-components-button/shared/base-button/types';
import { HeadlessButton } from '@alfalab/core-components-headless-button';

export const NoStyleButton = forwardRef<HTMLElement, NoStyleButtonProps>((props, ref) => {
    const {
        customProps,
        href,
        as: PolymorphicComponent,
        Component = href ? 'a' : 'button',
        dataTestId,
        ...domProps
    } = props;
    const RenderComponent =
        PolymorphicComponent ??
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (Component as Extract<typeof Component, typeof PolymorphicComponent>);

    return (
        <HeadlessButton
            as={RenderComponent}
            customProps={{
                componentProps: {
                    ...{ 'data-test-id': dataTestId },
                    ...domProps,
                    ref,
                    [RenderComponent === PolymorphicComponent || typeof Component === 'string'
                        ? 'href'
                        : 'to']: href,
                },
                customProps,
            }}
        />
    );
});
