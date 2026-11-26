import React, { type ComponentProps, type ComponentRef, type ElementType, forwardRef } from 'react';

import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic/types';
import { passCustomProps } from '@alfalab/core-components-polymorphic/utils';

export interface PolymorphicButtonProps
    extends ComponentProps<'button'>,
        PolymorphicComponentProps<
            ElementType<ComposedPolymorphicProps<ComponentProps<'button'>>, 'button'>
        > {}

export const PolymorphicButton = forwardRef<ComponentRef<'button'>, PolymorphicButtonProps>(
    ({ children, as: Component = 'button', customProps, ...restProps }, ref) => (
        <Component {...restProps} {...passCustomProps(customProps)} ref={ref}>
            {children}
        </Component>
    ),
);
