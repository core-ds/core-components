import React, { forwardRef, useMemo, useState } from 'react';

import { ContentDesktop } from '../components/content/Component.desktop';
import { ControlsDesktop } from '../components/controls';
import { FooterDesktop } from '../components/footer/desktop/Component.desktop';
import { HeaderDesktop } from '../components/header';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { CenterModal } from './components/center-modal';
import { SideModal } from './components/side-modal';
import { UniversalModalDesktopProps } from './types/props';

export const UniversalModalDesktopComponent = forwardRef<
    HTMLDivElement,
    UniversalModalDesktopProps
>(({ children, horizontalAlign = 'center', ...restProps }, ref) => {
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

    const renderModal = () => {
        if (horizontalAlign === 'center') {
            return (
                <CenterModal {...restProps} ref={ref} horizontalAlign={horizontalAlign}>
                    {children}
                </CenterModal>
            );
        }

        return (
            <SideModal {...restProps} ref={ref} horizontalAlign={horizontalAlign}>
                {children}
            </SideModal>
        );
    };

    return (
        <ResponsiveContext.Provider value={contextValue}>
            {renderModal()}
        </ResponsiveContext.Provider>
    );
});

export const UniversalModalDesktop = Object.assign(UniversalModalDesktopComponent, {
    Header: HeaderDesktop,
    Content: ContentDesktop,
    Footer: FooterDesktop,
    Controls: ControlsDesktop,
});
