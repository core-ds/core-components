import React, { type ComponentProps, type ComponentRef, type ElementType, forwardRef } from 'react';

import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic/types';
import { passCustomProps } from '@alfalab/core-components-polymorphic/utils';

export interface PolymorphicInputProps
    extends ComponentProps<'input'>,
        PolymorphicComponentProps<
            ElementType<ComposedPolymorphicProps<ComponentProps<'input'>>, 'input'>
        > {}

export const PolymorphicInput = forwardRef<ComponentRef<'input'>, PolymorphicInputProps>(
    ({ children, as: Component = 'input', customProps, ...restProps }, ref) => (
        <Component {...restProps} {...passCustomProps(customProps)} ref={ref}>
            {children}
        </Component>
    ),
);
