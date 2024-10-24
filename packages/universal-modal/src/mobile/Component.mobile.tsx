import React, { forwardRef, useContext, useMemo } from 'react';
import cn from 'classnames';

import { BaseModal, BaseModalProps } from '@alfalab/core-components-base-modal';

import { ContentMobile } from '../components/content/Component.mobile';
import { Controls, ControlsProps } from '../components/controls';
import { FooterMobile } from '../components/footer/Component.mobile';
import { Header } from '../components/header/Component';
import { ResponsiveContext } from '../ResponsiveContext';
import { TResponsiveModalContext } from '../typings';

import styles from './mobile.module.css';
import transitions from './transitions.mobile.module.css';

export type UniversalModalMobileProps = BaseModalProps & {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};

const UniversalModalMobileComponent = forwardRef<HTMLDivElement, UniversalModalMobileProps>(
    ({ children, className, transitionProps, dataTestId, ...restProps }, ref) => {
        const responsiveContext = useContext(ResponsiveContext);
        const contextValue = useMemo<TResponsiveModalContext>(
            () => ({ size: 500, view: 'mobile', dataTestId }),
            [dataTestId],
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
            >
                <div className={styles.mobileContent}>{children}</div>
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
