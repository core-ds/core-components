import React, { cloneElement, forwardRef, isValidElement, useRef } from 'react';
import cn from 'classnames';

import { Drawer } from '@alfalab/core-components-drawer';
import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { TransitionProps } from 'react-transition-group/Transition';

import mergeRefs from 'react-merge-refs';
import { HeaderDesktop } from './components/header/Component.desktop';
import { ContentDesktop } from './components/content/Component.desktop';
import { FooterDesktop } from './components/footer/Component.desktop';

import styles from './desktop.module.css';
import transitions from './transitions.desktop.module.css';

export type SidePanelDesktopProps = BaseModalProps & {
    /**
     * Пропсы для анимации контента (CSSTransition)
     */
    contentTransitionProps?: Partial<TransitionProps>;

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
