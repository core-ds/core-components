import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useFocus } from '@alfalab/hooks';

import { type BaseTagProps } from '../../typings';
import { NativeTag as DefaultTag } from '../native-tag';

export const BaseTag = forwardRef<HTMLButtonElement, BaseTagProps>(
    (
        {
            Component = DefaultTag,
            children,
            size = 48,
            checked,
            name,
            colors = 'default',
            variant = 'default',
            view = 'outlined',
            shape,
            onClick,
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            ...restProps
        },
        ref,
    ) => {
        const tagRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(tagRef, 'keyboard');

        const variantClassName = variant === 'default' ? 'rounded' : 'rectangular';

        const shapeClassName = shape || variantClassName;

        const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (onClick) {
                onClick(event, { name, checked: !checked });
            }
        };

        return (
            <Component
                ref={mergeRefs([tagRef, ref])}
                checked={checked}
                colors={colors}
                view={view}
                colorStyles={colorStylesMap[colors]}
                shape={shapeClassName}
                size={size}
                styles={styles}
                focused={focused}
                onClick={handleClick}
                {...restProps}
            >
                {children}
            </Component>
        );
    },
);
