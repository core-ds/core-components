import { type ComponentProps, type ReactNode } from 'react';
import { type SimpleBarOptions } from 'simplebar-core';

export type SimpleBarRenderFunction = (props: {
    scrollableNodeProps: Pick<
        ComponentProps<'div'>,
        'ref' | 'className' | 'role' | 'tabIndex' | 'aria-label'
    >;
    contentNodeProps: Pick<ComponentProps<'div'>, 'ref' | 'className'>;
}) => ReactNode;

export interface SimpleBarClassNames
    extends Omit<
        NonNullable<SimpleBarOptions['classNames']>,
        | 'contentEl'
        | 'heightAutoObserverEl'
        | 'heightAutoObserverWrapperEl'
        | 'dragging' // global
        | 'mouseEntered' // global
        | 'scrollable' // global
        | 'scrolling' // global
        | 'visible' // global
    > {
    content?: string;
    heightAutoObserver?: string;
    heightAutoObserverWrapper?: string;
}

export interface SimpleBarProps
    extends Omit<ComponentProps<'div'>, 'ref' | 'children' | 'tabIndex' | 'aria-label'>,
        Omit<SimpleBarOptions, 'scrollableNode' | 'contentNode' | 'classNames'> {
    children?: SimpleBarRenderFunction;
    styles: SimpleBarClassNames;
    classNames?: SimpleBarClassNames;
}

export interface ScrollbarPrivateProps extends Omit<SimpleBarProps, 'children' | 'styles'> {
    children?: ReactNode;
    /**
     * @default default
     */
    colors?: 'default' | 'inverted';
    /**
     * @default false
     */
    native?: boolean;
    scrollableNodeProps?: ComponentProps<'div'>;
    contentNodeProps?: ComponentProps<'div'>;
}
