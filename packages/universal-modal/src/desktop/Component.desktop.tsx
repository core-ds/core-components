import React, { forwardRef, useMemo, useState } from 'react';

import { ContentDesktop } from '../components/content';
import { FooterDesktop } from '../components/footer';
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
    const [modalHeaderHighlighted, setModalHeaderHighlighted] = useState<boolean>(false);
    const [modalFooterHighlighted, setModalFooterHighlighted] = useState<boolean>(false);

    const contextValue = useMemo<TResponsiveModalContext>(
        () => ({
            modalWidth: restProps.width,
            modalHeaderHighlighted,
            modalFooterHighlighted,
            setModalHeaderHighlighted,
            setModalFooterHighlighted,
        }),
        [restProps.width, modalHeaderHighlighted, modalFooterHighlighted],
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
});
