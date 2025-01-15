import React, { ComponentRef, CSSProperties, forwardRef, ReactNode } from 'react';
import cn from 'classnames';
import SimpleBar, { Props as SimpleBarProps } from 'simplebar-react';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

type PrivateScrollbarRef = ComponentRef<typeof SimpleBar>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (this: any, ...args: any[]) => any;

type RenderFn = Extract<SimpleBarProps['children'], AnyFunction>;

type PartialArrayOfPartials<T> = T extends Array<infer U> ? Partial<Array<Partial<U>>> : never;

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export interface PrivateScrollbarProps extends Pick<SimpleBarProps, 'tabIndex'> {
    children:
        | ((...args: PartialArrayOfPartials<Parameters<RenderFn>>) => ReturnType<RenderFn>)
        | ReactNode;
    style?: CSSProperties;
    /**
     * @default false
     */
    native?: boolean;
    /**
     * @default default
     */
    colors?: 'default' | 'inverted';
}

export const PrivateScrollbar = forwardRef<PrivateScrollbarRef, PrivateScrollbarProps>(
    ({ children, native = false, style, colors = 'default', tabIndex }, ref) => {
        if (native) {
            return typeof children === 'function' ? children() : children;
        }

        return (
            <SimpleBar
                ref={ref}
                style={style}
                className={cn(styles.component, colorStyles[colors].component)}
                tabIndex={tabIndex}
            >
                {children}
            </SimpleBar>
        );
    },
);
