import React, { forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import { BaseModal } from '@balafla/core-components-base-modal';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from './consts';
import { ResponsiveContext } from './ResponsiveContext';
import { ModalDesktopProps, View } from './typings';

import desktopStyles from './desktop/desktop.module.css';
import mobileStyles from './mobile/mobile.module.css';
import transitions from './transitions.module.css';

export const Modal = forwardRef<HTMLDivElement, ModalDesktopProps & { view: View }>(
    (
        {
            size = 500,
            fixedPosition,
            fullscreen,
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
        // TODO: удалить, после удаления пропсы fullscreen
        const componentSize = fullscreen ? 'fullscreen' : size;

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
                          [desktopStyles.fullscreen]: componentSize === 'fullscreen',
                      }),
                      className: cn(
                          desktopStyles.component,
                          className,
                          desktopStyles[SIZE_TO_CLASSNAME_MAP[componentSize]],
                      ),
                      backdropProps: {
                          invisible: componentSize === 'fullscreen',
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

        const contextValue = useMemo(
            () => ({ size: componentSize, view, dataTestId }),
            [componentSize, view, dataTestId],
        );

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
