import React, { FC, forwardRef, useContext, useMemo } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { DrawerProps } from '@alfalab/core-components-drawer';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { isClient } from '@alfalab/core-components-shared';

import { Header } from './components/header/Component';
import { SidePanelDesktop } from './Component.desktop';
import { SidePanelMobile } from './Component.mobile';
import { ResponsiveContext } from './ResponsiveContext';
import { TResponsiveModalContext } from './typings';

export type SidePanelResponsiveProps = BaseModalProps &
    Pick<
        DrawerProps,
        'contentTransitionProps' | 'placement' | 'nativeScrollbar' | 'scrollbarProps'
    > & {
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

        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;

        /**
         * Значение по-умолчанию для хука useMatchMedia
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
    ({ children, breakpoint = 1024, size = 's', defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;
        const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

        const view = isDesktop ? 'desktop' : 'mobile';

        const contextValue = useMemo<TResponsiveModalContext>(() => ({ view, size }), [view, size]);

        const Component = isDesktop ? SidePanelDesktop : SidePanelMobile;

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <Component ref={ref} size={size} {...restProps}>
                    {children}
                </Component>
            </ResponsiveContext.Provider>
        );
    },
);

export const SidePanelResponsive = Object.assign(SidePanelResponsiveComponent, {
    Header,
    Content: createResponsive(SidePanelDesktop.Content, SidePanelMobile.Content),
    Footer: createResponsive(SidePanelDesktop.Footer, SidePanelMobile.Footer),
});
