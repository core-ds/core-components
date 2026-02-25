import React, { forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { ResponsiveContext } from './ResponsiveContext';
import { type ModalDesktopProps, type View } from './typings';
import { getSizeStyle } from './utils';

import desktopStyles from './desktop/desktop.module.css';
import mobileStyles from './mobile/mobile.module.css';
import transitions from './transitions.module.css';

export const Modal = forwardRef<HTMLDivElement, ModalDesktopProps & { view: View }>(
    (
        {
            size = 500,
            fixedPosition,
            children,
            className,
            wrapperClassName,
            transitionProps = {},
            view,
            dataTestId,
            ...restProps
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLElement>(null);

        const handleEntered = (node: HTMLElement, isAppearing: boolean) => {
            if (fixedPosition && modalRef.current) {
                const content = modalRef.current.querySelector<HTMLElement>(
                    `.${desktopStyles.component}`,
                );

                if (content) {
                    const { marginTop } = window.getComputedStyle(content);

                    content.style.marginTop = marginTop;
                }
            }

            if (transitionProps.onEntered) {
                transitionProps.onEntered(node, isAppearing);
            }
        };

        const baseModalProps =
            view === 'desktop'
                ? {
                      ref: mergeRefs([ref, modalRef]),
                      wrapperClassName: cn(desktopStyles.wrapper, wrapperClassName, {
                          [desktopStyles.fullscreen]: size === 'fullscreen',
                      }),
                      className: cn(
                          desktopStyles.component,
                          className,
                          desktopStyles[getSizeStyle(size)],
                      ),
                      backdropProps: {
                          invisible: size === 'fullscreen',
                          ...restProps.backdropProps,
                      },
                      transitionProps: {
                          classNames: transitions,
                          ...transitionProps,
                          onEntered: handleEntered,
                      },
                  }
                : {
                      wrapperClassName,
                      ref,
                      transitionProps: {
                          classNames: transitions,
                          ...transitionProps,
                      },
                      className: cn(className, mobileStyles.component),
                      contentProps: {
                          ...restProps.contentProps,
                          className: cn(mobileStyles.content, restProps.contentProps?.className),
                      },
                  };

        const contextValue = useMemo(() => ({ size, view, dataTestId }), [size, view, dataTestId]);

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <BaseModal {...restProps} {...baseModalProps} dataTestId={dataTestId}>
                    {children}
                </BaseModal>
            </ResponsiveContext.Provider>
        );
    },
);

Modal.displayName = 'Modal';
