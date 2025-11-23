import React, { type FC, forwardRef, useContext, useMemo } from 'react';

import { type BaseModalProps } from '@alfalab/core-components-base-modal';
import { type DrawerProps } from '@alfalab/core-components-drawer';
import { useIsDesktop } from '@alfalab/core-components-mq';

import { Controls } from './components/controls';
import { Header } from './components/header/Component';
import { SidePanelDesktop } from './desktop';
import { SidePanelMobile } from './mobile';
import { ResponsiveContext } from './ResponsiveContext';
import { type TResponsiveModalContext } from './typings';

export type SidePanelResponsiveProps = BaseModalProps &
    Pick<DrawerProps, 'contentTransitionProps' | 'placement' | 'nativeScrollbar'> & {
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

        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;

        /**
         * Версия, которая будет использоваться при серверном рендеринге
         */
        client?: 'desktop' | 'mobile';

        /**
         * Значение по-умолчанию для хука useMatchMedia
         * @deprecated Используйте client
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
    };

function createResponsive<DesktopType extends FC, MobileType extends FC>(
    desktop: DesktopType,
    mobile: MobileType,
) {
    // eslint-disable-next-line
    function ResponsiveChild(props: any) {
        const { view = 'desktop' } = useContext(ResponsiveContext) || {};

        const Child = view === 'desktop' ? desktop : mobile;

        return <Child {...props} />;
    }

    return ResponsiveChild as DesktopType | MobileType;
}

const SidePanelResponsiveComponent = forwardRef<HTMLDivElement, SidePanelResponsiveProps>(
    (
        {
            children,
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            size = 500,
            dataTestId,
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const view = isDesktop ? 'desktop' : 'mobile';

        const contextValue = useMemo<TResponsiveModalContext>(
            () => ({ view, size, dataTestId }),
            [view, size, dataTestId],
        );

        const Component = isDesktop ? SidePanelDesktop : SidePanelMobile;

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <Component ref={ref} size={size} dataTestId={dataTestId} {...restProps}>
                    {children}
                </Component>
            </ResponsiveContext.Provider>
        );
    },
);

const ContentResponsive = createResponsive(SidePanelDesktop.Content, SidePanelMobile.Content);
const FooterResponsive = createResponsive(SidePanelDesktop.Footer, SidePanelMobile.Footer);

/** Респонсив компаунд */
const SidePanelResponsive = Object.assign(SidePanelResponsiveComponent, {
    Header,
    Controls,
    Content: ContentResponsive,
    Footer: FooterResponsive,
});

SidePanelResponsiveComponent.displayName = 'SidePanelResponsiveComponent';

export {
    SidePanelResponsive,
    SidePanelResponsiveComponent as SidePanelComponentResponsive,
    Header as HeaderResponsive,
    Controls as ControlsResponsive,
    ContentResponsive,
    FooterResponsive,
};
