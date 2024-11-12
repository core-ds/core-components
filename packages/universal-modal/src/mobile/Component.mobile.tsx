import React, { forwardRef, useMemo, useState } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { ContentMobile as Content } from '../components/content/Component.mobile';
import { Controls, ControlsProps } from '../components/controls';
import { FooterMobile as Footer } from '../components/footer/Component.mobile';
import { Header } from '../components/header/Component';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import { UniversalModalMobileProps } from './types/props';

import styles from './mobile.module.css';
import rightSideTransitons from './transitions/right-side-transitions.mobile.module.css';
import transitions from './transitions/transitions.mobile.module.css';

const UniversalModalMobileComponent = forwardRef<HTMLDivElement, UniversalModalMobileProps>(
    ({ children, className, dataTestId, onClose, appearance = 'bottom', ...restProps }, ref) => {
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
                    timeout: appearance === 'right' ? 360 : 200,
                    classNames: appearance === 'right' ? rightSideTransitons : transitions,
                }}
                className={cn(className, styles.component)}
                scrollHandler='content'
                contentClassName={styles.content}
            >
                {children}
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
