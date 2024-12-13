import React, { forwardRef, useState } from 'react';

import { ContentDesktop as Content } from '../components/content/Component.desktop';
import { Controls, ControlsProps } from '../components/controls';
import { FooterDesktop as Footer } from '../components/footer/Component.desktop';
import { HeaderDesktop } from '../components/header';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { ModalByCenter } from './components/modal-by-center';
import { ModalBySide } from './components/modal-by-side';
import { UniversalModalDesktopProps } from './types/props';

const UniversalModalDesktopComponent = forwardRef<HTMLDivElement, UniversalModalDesktopProps>(
    ({ children, dataTestId, horizontalAlign = 'center', ...restProps }, ref) => {
        const [modalWidth, setModalWidth] = useState<number>(0);
        const [modalHeaderHighlighted, setModalHeaderHighlighted] = useState<boolean>(false);
        const [modalFooterHighlighted, setModalFooterHighlighted] = useState<boolean>(false);

        const contextValue = React.useMemo<TResponsiveModalContext>(
            () => ({
                view: 'desktop',
                dataTestId,
                modalWidth,
                modalHeaderHighlighted,
                modalFooterHighlighted,
                setModalWidth,
                setModalHeaderHighlighted,
                setModalFooterHighlighted,
            }),
            [dataTestId, modalWidth, modalHeaderHighlighted, modalFooterHighlighted],
        );

        const renderContent = () => {
            if (horizontalAlign === 'center') {
                return (
                    <ModalByCenter
                        horizontalAlign={horizontalAlign}
                        dataTestId={dataTestId}
                        {...restProps}
                        ref={ref}
                    >
                        {children}
                    </ModalByCenter>
                );
            }

            return (
                <ModalBySide
                    horizontalAlign={horizontalAlign}
                    dataTestId={dataTestId}
                    {...restProps}
                    ref={ref}
                >
                    {children}
                </ModalBySide>
            );
        };

        return (
            <ResponsiveContext.Provider value={contextValue}>
                {renderContent()}
            </ResponsiveContext.Provider>
        );
    },
);

export const UniversalModalDesktop = Object.assign(UniversalModalDesktopComponent, {
    Content,
    Header: HeaderDesktop,
    Footer,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
