import React, { forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { ContentMobile } from '../components/content/Component.mobile';
import { Controls, ControlsProps } from '../components/controls';
import { FooterMobile } from '../components/footer/Component.mobile';
import { Header } from '../components/header/Component';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { ModalHeaderMobile } from './components/modal-header/modalHeader';
import { UniversalModalMobileProps } from './types/props';

import styles from './mobile.module.css';
import transitions from './transitions.mobile.module.css';
import { ModalFooterMobile } from './components/modal-footer/modalFooter';

const UniversalModalMobileComponent = forwardRef<HTMLDivElement, UniversalModalMobileProps>(
    (
        {
            children,
            className,
            transitionProps,
            dataTestId,
            header,
            footer,
            preset,
            footerPreset,
            onClose,
            ...restProps
        },
        ref,
    ) => {
        const responsiveContext = useContext(ResponsiveContext);
        const contextValue = useMemo<TResponsiveModalContext>(
            () => ({ view: 'mobile', dataTestId }),
            [dataTestId],
        );
        const [hasScroll, setHasScroll] = useState<boolean>(false);
        const baseModalComponentRef = useRef<HTMLDivElement>(null);

        const handleContentScroll = (e: Event) => {
            const target = e.target as HTMLDivElement;

            setHasScroll(target.scrollTop > 5);
        };

        useEffect(() => {
            const element = baseModalComponentRef.current;

            if (element) {
                element.addEventListener('scroll', handleContentScroll);
            }

            return () => {
                if (element) {
                    element.removeEventListener('scroll', handleContentScroll);
                }
            };
        });

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
                componentRef={baseModalComponentRef}
            >
                <div>
                    <ModalHeaderMobile
                        preset={preset}
                        header={header}
                        hasScroll={hasScroll}
                        onClose={onClose}
                    />
                    <div className={styles.mobileContent}>{children}</div>
                    <ModalFooterMobile
                        preset={footerPreset}
                        footer={footer}
                        hasScroll={hasScroll}
                    />
                </div>
            </BaseModal>
        );

        const renderWithContext = () => (
            <ResponsiveContext.Provider value={contextValue}>
                {renderContent()}
            </ResponsiveContext.Provider>
        );

        return responsiveContext ? renderContent() : renderWithContext();
    },
);

export const UniversalModalMobile = Object.assign(UniversalModalMobileComponent, {
    Content: ContentMobile,
    Header,
    Footer: FooterMobile,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
