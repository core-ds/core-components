import React, { cloneElement, forwardRef, isValidElement, useContext, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Drawer, DrawerProps } from '@alfalab/core-components-drawer';

import { ContentDesktop } from '../components/content/Component.desktop';
import { Controls, ControlsProps } from '../components/controls';
import { FooterDesktop } from '../components/footer/Component.desktop';
import { Header } from '../components/header/Component';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

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
        const responsiveContext = useContext(ResponsiveContext);
        const modalRef = useRef<HTMLElement>(null);

        const enterCn = cn({
            [transitions.appearRight]: placement === 'right',
            [transitions.appearLeft]: placement === 'left',
        });

        const exitCn = cn({
            [transitions.exitActiveRight]: placement === 'right',
            [transitions.exitActiveLeft]: placement === 'left',
        });

        const contextValue = React.useMemo<TResponsiveModalContext>(
            () => ({ size, view: 'desktop' }),
            [size],
        );

        const renderContent = () => (
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
                {React.Children.map(children, (child) =>
                    isValidElement(child) ? cloneElement(child, { size }) : child,
                )}
            </Drawer>
        );

        const renderWithContext = () => (
            <ResponsiveContext.Provider value={contextValue}>
                {renderContent()}
            </ResponsiveContext.Provider>
        );

        return responsiveContext ? renderContent() : renderWithContext();
    },
);

export const SidePanelDesktop = Object.assign(SidePanelDesktopComponent, {
    Content: ContentDesktop,
    Header,
    Footer: FooterDesktop,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
