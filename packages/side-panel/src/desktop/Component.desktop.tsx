import React, { cloneElement, forwardRef, isValidElement, useContext, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Drawer, DrawerProps } from '@alfalab/core-components-drawer';

import { ContentDesktop } from '../components/content/Component.desktop';
import { Controls, ControlsProps } from '../components/controls';
import { FooterDesktop } from '../components/footer/Component.desktop';
import { Header, HeaderProps } from '../components/header/Component';
import { SIZE_TO_CLASSNAME_MAP } from '../consts';
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
        size?: 's' | 500;

        /**
         * Управление наличием закрывающего крестика
         * @default false
         */
        hasCloser?: boolean;
    };

const SidePanelDesktopComponent = forwardRef<HTMLDivElement, SidePanelDesktopProps>(
    (
        {
            size = 500,
            children,
            className,
            wrapperClassName,
            contentTransitionProps = {},
            backdropProps,
            placement = 'right',
            dataTestId,
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
            () => ({ size, view: 'desktop', dataTestId }),
            [size, dataTestId],
        );

        const renderContent = () => (
            <Drawer
                {...restProps}
                dataTestId={dataTestId}
                ref={mergeRefs([ref, modalRef])}
                placement={placement}
                wrapperClassName={wrapperClassName}
                className={cn(className, styles[SIZE_TO_CLASSNAME_MAP[size]], styles.hidden)}
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

const HeaderCustomType = Header as React.FC<Omit<HeaderProps, 'titleSize' | 'subtitle'>>;
const ControlsCustomType = Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>;

/** @deprecated Используйте атомарные импорты */
export const SidePanelDesktop = Object.assign(SidePanelDesktopComponent, {
    Content: ContentDesktop,
    Header: HeaderCustomType,
    Footer: FooterDesktop,
    Controls: ControlsCustomType,
});

export {
    SidePanelDesktopComponent,
    ContentDesktop as Content,
    HeaderCustomType as Header,
    FooterDesktop as Footer,
    ControlsCustomType as Controls,
};
