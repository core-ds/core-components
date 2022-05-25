import React, { cloneElement, forwardRef, isValidElement, useCallback, useRef } from 'react';
import cn from 'classnames';
import { TransitionProps } from 'react-transition-group/Transition';

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
     * Фиксирует позицию модального окна после открытия,
     * предотвращая скачки, если контент внутри будет меняться
     */
    fixedPosition?: boolean;

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
            fixedPosition,
            children,
            className,
            wrapperClassName,
            contentTransitionProps = {},
            ...restProps
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLElement>(null);

        const handleEntered: TransitionProps['onEntered'] = useCallback(
            (node, isAppearing) => {
                if (fixedPosition && modalRef.current) {
                    const content = modalRef.current.querySelector<HTMLElement>(
                        `.${styles.component}`,
                    );

                    if (content) {
                        const { marginTop } = window.getComputedStyle(content);
                        content.style.marginTop = marginTop;
                    }
                }

                if (contentTransitionProps.onEntered) {
                    contentTransitionProps.onEntered(node, isAppearing);
                }
            },
            [fixedPosition, contentTransitionProps],
        );

        return (
            <Drawer
                {...restProps}
                ref={mergeRefs([ref, modalRef])}
                wrapperClassName={wrapperClassName}
                className={cn(className, styles[size])}
                backdropProps={{
                    ...restProps.backdropProps,
                }}
                contentTransitionProps={{
                    classNames: transitions,
                    ...contentTransitionProps,
                    onEntered: handleEntered,
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
