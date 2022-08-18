import { useMedia } from '@alfalab/hooks';
import React, { FC, forwardRef, useContext, useMemo } from 'react';

import { ModalDesktop, ModalDesktopProps } from './Component.desktop';
import { ModalMobile, ModalMobileProps } from './Component.mobile';
import { Closer } from './components/closer/Component';

export type ModalResponsiveProps = ModalMobileProps &
    ModalDesktopProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
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

const ModalResponsiveComponent = forwardRef<HTMLDivElement, ModalResponsiveProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const [view] = useMedia<View>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        const contextValue = useMemo<ResponsiveContext>(() => ({ view }), [view]);

        const Component = view === 'desktop' ? ModalDesktop : ModalMobile;

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <Component ref={ref} {...restProps}>
                    {children}
                </Component>
            </ResponsiveContext.Provider>
        );
    },
);

export const ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header: createResponsive(ModalDesktop.Header, ModalMobile.Header),
    Content: createResponsive(ModalDesktop.Content, ModalMobile.Content),
    Footer: createResponsive(ModalDesktop.Footer, ModalMobile.Footer),
    Closer,
});
