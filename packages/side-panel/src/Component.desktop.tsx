import React, { cloneElement, forwardRef, isValidElement, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Drawer, DrawerProps } from '@alfalab/core-components-drawer';

import { ContentDesktop } from './components/content/Component.desktop';
import { FooterDesktop } from './components/footer/Component.desktop';
import { HeaderDesktop } from './components/header/Component.desktop';

import styles from './desktop.module.css';
import transitions from './transitions.desktop.module.css';

export type SidePanelDesktopProps = BaseModalProps &
    Pick<DrawerProps, 'placement' | 'nativeScrollbar' | 'contentTransitionProps'> & {
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
            placement = 'right',
            ...restProps
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLElement>(null);

        const enterCn = cn({
            [transitions.appearRight]: placement === 'right',
            [transitions.appearLeft]: placement === 'left',
        });

        const exitCn = cn({
            [transitions.exitActiveRight]: placement === 'right',
            [transitions.exitActiveLeft]: placement === 'left',
        });

        return (
            <Drawer
                {...restProps}
                ref={mergeRefs([ref, modalRef])}
                placement={placement}
                wrapperClassName={wrapperClassName}
                className={cn(className, styles[size], styles.hidden)}
                backdropProps={backdropProps}
                contentTransitionProps={{
                    classNames: {
                        appear: enterCn,
                        enter: enterCn,
                        appearActive: transitions.enterActive,
                        enterActive: transitions.enterActive,
                        exit: transitions.exit,
                        exitActive: exitCn,
                        exitDone: exitCn,
                    },
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
