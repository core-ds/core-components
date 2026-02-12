import React, { forwardRef, useMemo } from 'react';

import { ContentDesktop } from '../components/content';
import { FooterDesktop } from '../components/footer';
import { HeaderDesktop } from '../components/header';
import { UniversalModalContext } from '../context/universal-modal-context';
import { type UniversalModalContextType } from '../typings';

import { CenterModal } from './components/center-modal';
import { SideModal } from './components/side-modal';
import { type UniversalModalDesktopProps } from './types/props';

export const UniversalModalDesktopComponent = forwardRef<
    HTMLDivElement,
    UniversalModalDesktopProps
>(({ children, horizontalAlign = 'center', ...restProps }, ref) => {
    const contextValue = useMemo<UniversalModalContextType>(
        () => ({
            modalWidth: restProps.width,
        }),
        [restProps.width],
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
        <UniversalModalContext.Provider value={contextValue}>
            {renderModal()}
        </UniversalModalContext.Provider>
    );
});

export const UniversalModalDesktop = Object.assign(UniversalModalDesktopComponent, {
    Header: HeaderDesktop,
    Content: ContentDesktop,
    Footer: FooterDesktop,
});
