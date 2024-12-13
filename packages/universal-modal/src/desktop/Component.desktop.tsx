import React, { forwardRef, useMemo, useState } from 'react';

import { ContentDesktop } from '../components/content/Component.desktop';
import { ControlsDesktop } from '../components/controls';
import { FooterDesktop } from '../components/footer/Component.desktop';
import { HeaderDesktop } from '../components/header';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { ModalByCenter } from './components/modal-by-center';
import { ModalBySide } from './components/modal-by-side';
import { UniversalModalDesktopProps } from './types/props';

export const UniversalModalDesktopComponent = forwardRef<
    HTMLDivElement,
    UniversalModalDesktopProps
>(({ children, dataTestId, horizontalAlign = 'center', ...restProps }, ref) => {
    const [modalWidth, setModalWidth] = useState<number>(0);
    const [modalHeaderHighlighted, setModalHeaderHighlighted] = useState<boolean>(false);
    const [modalFooterHighlighted, setModalFooterHighlighted] = useState<boolean>(false);

    const contextValue = useMemo<TResponsiveModalContext>(
        () => ({
            modalWidth,
            modalHeaderHighlighted,
            modalFooterHighlighted,
            setModalWidth,
            setModalHeaderHighlighted,
            setModalFooterHighlighted,
        }),
        [modalWidth, modalHeaderHighlighted, modalFooterHighlighted],
    );

    const renderContent = () => {
        if (horizontalAlign === 'center') {
            return (
                <ModalByCenter
                    {...restProps}
                    horizontalAlign={horizontalAlign}
                    dataTestId={dataTestId}
                    ref={ref}
                >
                    {children}
                </ModalByCenter>
            );
        }

        return (
            <ModalBySide
                {...restProps}
                horizontalAlign={horizontalAlign}
                dataTestId={dataTestId}
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
});

export const UniversalModalDesktop = Object.assign(UniversalModalDesktopComponent, {
    Header: HeaderDesktop,
    Content: ContentDesktop,
    Footer: FooterDesktop,
    Controls: ControlsDesktop,
});
