import React, { type ComponentProps, type ComponentRef, type ElementType, forwardRef } from 'react';

import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic/types';
import { passCustomProps } from '@alfalab/core-components-polymorphic/utils';

export interface PolymorphicAProps
    extends ComponentProps<'a'>,
        PolymorphicComponentProps<
            ElementType<ComposedPolymorphicProps<ComponentProps<'a'>>, 'a'>
        > {}

export const PolymorphicA = forwardRef<ComponentRef<'a'>, PolymorphicAProps>(
    ({ children, as: Component = 'a', customProps, ...restProps }, ref) => (
        <Component {...restProps} {...passCustomProps(customProps)} ref={ref}>
            {children}
        </Component>
    ),
);
