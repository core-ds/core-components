import React, { forwardRef, useMemo, useState } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { ContentMobile as Content } from '../components/content/Component.mobile';
import { Controls, ControlsProps } from '../components/controls';
import { FooterMobile as Footer } from '../components/footer/Component.mobile';
import { Header } from '../components/header/Component';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { ModalCustomFooterMobile } from './components/customs/modal-custom-footer/modalCustomFooterMobile';
import { ModalCustomHeaderMobile } from './components/customs/modal-custom-header/modalCustomHeaderMobile';
import { UniversalModalMobileProps } from './types/props';

import styles from './mobile.module.css';
import transitions from './transitions.mobile.module.css';

const UniversalModalMobileComponent = forwardRef<HTMLDivElement, UniversalModalMobileProps>(
    (
        {
            children,
            className,
            transitionProps,
            dataTestId,
            preset,
            footerPreset,
            onClose,
            ...restProps
        },
        ref,
    ) => {
        const [modalHeaderHighlighted, setModalHeaderHighlighted] = useState<boolean>(false);
        const contextValue = useMemo<TResponsiveModalContext>(
            () => ({
                view: 'mobile',
                dataTestId,
                modalHeaderHighlighted,
                setModalHeaderHighlighted,
            }),
            [dataTestId, modalHeaderHighlighted],
        );

        const renderContent = () => (
            <BaseModal
                {...restProps}
                dataTestId={dataTestId}
                ref={ref}
                transitionProps={{
                    classNames: transitions,
                    ...transitionProps,
                }}
                className={cn(className, styles.component)}
                scrollHandler='content'
                contentClassName={styles.content}
            >
                <ModalCustomHeaderMobile preset={preset} onClose={onClose} />
                {children}
                <ModalCustomFooterMobile preset={footerPreset} />
            </BaseModal>
        );

        return (
            <ResponsiveContext.Provider value={contextValue}>
                {renderContent()}
            </ResponsiveContext.Provider>
        );
    },
);

export const UniversalModalMobile = Object.assign(UniversalModalMobileComponent, {
    Content,
    Header,
    Footer,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
