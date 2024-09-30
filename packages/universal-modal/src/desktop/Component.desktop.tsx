import React, { cloneElement, forwardRef, isValidElement, useContext } from 'react';

import { ContentDesktop } from '../components/content/Component.desktop';
import { Controls, ControlsProps } from '../components/controls';
import { FooterDesktop } from '../components/footer/Component.desktop';
import { Header, HeaderProps } from '../components/header/Component';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { ModalByCenter } from './components/modal-by-center';
import { ModalBySide } from './components/modal-by-side';
import { UniversalModalDesktopProps } from './types/props';

const UniversalModalDesktopComponent = forwardRef<HTMLDivElement, UniversalModalDesktopProps>(
    (
        {
            size = 500,
            children,
            className,
            wrapperClassName,
            backdropProps,
            horizontalAlign = 'right',
            dataTestId,
            transitionProps,
            ...restProps
        },
        ref,
    ) => {
        const responsiveContext = useContext(ResponsiveContext);

        const contextValue = React.useMemo<TResponsiveModalContext>(
            () => ({ size, view: 'desktop', dataTestId }),
            [size, dataTestId],
        );

        const renderContent = () => {
            if (horizontalAlign === 'center') {
                return (
                    <ModalByCenter {...restProps} ref={ref} horizontalAlign={horizontalAlign}>
                        <div>{children}</div>
                    </ModalByCenter>
                );
            }

            return (
                <ModalBySide {...restProps} ref={ref} horizontalAlign={horizontalAlign}>
                    {React.Children.map(children, (child) =>
                        isValidElement(child) ? cloneElement(child, { size }) : child,
                    )}
                </ModalBySide>
            );
        };

        const renderWithContext = () => (
            <ResponsiveContext.Provider value={contextValue}>
                {renderContent()}
            </ResponsiveContext.Provider>
        );

        return responsiveContext ? renderContent() : renderWithContext();
    },
);

export const UniversalModalDesktop = Object.assign(UniversalModalDesktopComponent, {
    Content: ContentDesktop,
    Header: Header as React.FC<Omit<HeaderProps, 'titleSize' | 'subtitle'>>,
    Footer: FooterDesktop,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
