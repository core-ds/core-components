import React, { forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { ResponsiveContext } from './ResponsiveContext';
import { ModalDesktopProps, View } from './typings';

import desktopStyles from './desktop.module.css';
import mobileStyles from './mobile.module.css';
import transitions from './transitions.module.css';

export const Modal = forwardRef<HTMLDivElement, ModalDesktopProps & { view: View }>(
    (
        {
            size = 's',
            fixedPosition,
            fullscreen,
            children,
            className,
            wrapperClassName,
            transitionProps = {},
            view,
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
                          desktopStyles[componentSize],
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
                      ref,
                      transitionProps: {
                          classNames: transitions,
                          ...transitionProps,
                      },
                      className: cn(className, mobileStyles.component),
                  };

        const contextValue = useMemo(() => ({ size: componentSize, view }), [componentSize, view]);

        return (
            <ResponsiveContext.Provider value={contextValue}>
                <BaseModal {...restProps} {...baseModalProps}>
                    {children}
                </BaseModal>
            </ResponsiveContext.Provider>
        );
    },
);
