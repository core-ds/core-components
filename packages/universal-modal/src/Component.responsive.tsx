import React, { FC, forwardRef, useContext, useMemo } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { DrawerProps } from '@alfalab/core-components-drawer';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint, isClient } from '@alfalab/core-components-shared';

import { Controls } from './components/controls';
import { Header } from './components/header/Component';
import { UniversalModalDesktop } from './desktop';
import { SidePanelMobile } from './mobile';
import { ResponsiveContext } from './ResponsiveContext';
import { TResponsiveModalContext } from './typings';

export type UniversalModalResponsiveProps = BaseModalProps &
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
         * Значение по-умолчанию для хука useMatchMedia
         */
        defaultMatchMediaValue?: boolean | (() => boolean);

        /**
         * Расположение по горизонтали и сторона с которой модал “выезжает” при открытии.
         * @default right
         */
        horizontalAlign: 'left' | 'right' | 'center';
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

const UniversalModal = forwardRef<HTMLDivElement, UniversalModalResponsiveProps>(
    (
        {
            children,
            breakpoint = getComponentBreakpoint(),
            size = 500,
            defaultMatchMediaValue,
            dataTestId,
            horizontalAlign,
            ...restProps
        },
        ref,
    ) => {
        const query = `(min-width: ${breakpoint}px)`;
        const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

        const view = isDesktop ? 'desktop' : 'mobile';

        const contextValue = useMemo<TResponsiveModalContext>(
            () => ({ view, size, dataTestId }),
            [view, size, dataTestId],
        );

        const Component = isDesktop ? UniversalModalDesktop : SidePanelMobile;

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <Component
                    ref={ref}
                    size={size}
                    dataTestId={dataTestId}
                    horizontalAlign={horizontalAlign}
                    {...restProps}
                >
                    {children}
                </Component>
            </ResponsiveContext.Provider>
        );
    },
);

export const UniversalModalResponsive = Object.assign(UniversalModal, {
    Header,
    Controls,
    Content: createResponsive(UniversalModalDesktop.Content, SidePanelMobile.Content),
    Footer: createResponsive(UniversalModalDesktop.Footer, SidePanelMobile.Footer),
});

UniversalModalResponsive.displayName = 'UniversalModalResponsive';
