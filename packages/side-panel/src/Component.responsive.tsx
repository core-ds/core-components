import { useMedia } from '@alfalab/hooks';
import React, { FC, forwardRef, useContext, useMemo } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { DrawerProps } from '@alfalab/core-components-drawer';
import { SidePanelDesktop } from './Component.desktop';
import { SidePanelMobile } from './Component.mobile';
import { Closer } from './components/closer/Component';

export type SidePanelResponsiveProps = BaseModalProps &
    Pick<DrawerProps, 'contentTransitionProps' | 'placement' | 'nativeScrollbar'> & {
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

type View = 'desktop' | 'mobile';

type ResponsiveContext = {
    view?: View;
};

const ResponsiveContext = React.createContext<ResponsiveContext>({
    view: 'desktop',
});

function createResponsive<DesktopType extends FC, MobileType extends FC>(
    desktop: DesktopType,
    mobile: MobileType,
) {
    function ResponsiveChild(props: never) {
        const { view } = useContext(ResponsiveContext);

        const Child = view === 'desktop' ? desktop : mobile;

        return <Child {...props} />;
    }

    return ResponsiveChild as DesktopType | MobileType;
}

const SidePanelResponsiveComponent = forwardRef<HTMLDivElement, SidePanelResponsiveProps>(
    ({ children, ...restProps }, ref) => {
        const [view] = useMedia<View>(
            [
                ['mobile', '(max-width: 1023px)'],
                ['desktop', '(min-width: 1024px)'],
            ],
            'desktop',
        );

        const contextValue = useMemo<ResponsiveContext>(() => ({ view }), [view]);

        const Component = view === 'desktop' ? SidePanelDesktop : SidePanelMobile;

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <Component ref={ref} {...restProps}>
                    {children}
                </Component>
            </ResponsiveContext.Provider>
        );
    },
);

export const SidePanelResponsive = Object.assign(SidePanelResponsiveComponent, {
    Header: createResponsive(SidePanelDesktop.Header, SidePanelMobile.Header),
    Content: createResponsive(SidePanelDesktop.Content, SidePanelMobile.Content),
    Footer: createResponsive(SidePanelDesktop.Footer, SidePanelMobile.Footer),
    Closer,
});
