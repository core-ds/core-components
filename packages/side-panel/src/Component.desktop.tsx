import React, { cloneElement, forwardRef, isValidElement, useRef } from 'react';
import cn from 'classnames';

import { Drawer, DrawerProps } from '@alfalab/core-components-drawer';
import mergeRefs from 'react-merge-refs';
import { HeaderDesktop } from './components/header/Component.desktop';
import { ContentDesktop } from './components/content/Component.desktop';
import { FooterDesktop } from './components/footer/Component.desktop';

import styles from './desktop.module.css';
import transitions from './transitions.desktop.module.css';

export type SidePanelDesktopProps = DrawerProps & {
    /**
     * Ширина модального окна
     * @default "s"
     */
    size?: 's';

    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};

const SidePanelDesktopComponent = forwardRef<HTMLDivElement, SidePanelDesktopProps>(
    (
        {
            size = 's',
            children,
            className,
            wrapperClassName,
            contentTransitionProps = {},
            backdropProps,
            ...restProps
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLElement>(null);

        return (
            <Drawer
                {...restProps}
                ref={mergeRefs([ref, modalRef])}
                wrapperClassName={wrapperClassName}
                className={cn(className, styles[size], styles.hidden)}
                backdropProps={backdropProps}
                contentTransitionProps={{
                    classNames: transitions,
                    ...contentTransitionProps,
                }}
            >
                {React.Children.map(children, child =>
                    isValidElement(child) ? cloneElement(child, { size }) : child,
                )}
            </Drawer>
        );
    },
);

export const SidePanelDesktop = Object.assign(SidePanelDesktopComponent, {
    Content: ContentDesktop,
    Header: HeaderDesktop,
    Footer: FooterDesktop,
});
