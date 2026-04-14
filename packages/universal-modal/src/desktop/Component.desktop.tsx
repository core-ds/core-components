import React, { forwardRef, useMemo } from 'react';

import { ContentDesktop } from '../components/content';
import { FooterDesktop } from '../components/footer';
import { HeaderDesktop } from '../components/header';

import { CenterModal } from './components/center-modal';
import { SideModal } from './components/side-modal';
import { type UniversalModalContextType } from './types/context';
import { type UniversalModalDesktopProps } from './types/props';
import { UniversalModalContext } from './context';

export const UniversalModalDesktopComponent = forwardRef<
    HTMLDivElement,
    UniversalModalDesktopProps
>((props, ref) => {
    const { children, horizontalAlign = 'center', ...restProps } = props;
    const { width = 500 } = restProps;

    const contextValue = useMemo<UniversalModalContextType>(
        () => ({
            width,
        }),
        [width],
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
