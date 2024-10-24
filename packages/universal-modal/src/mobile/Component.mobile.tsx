import React, { forwardRef, useContext, useMemo, SyntheticEvent, useState } from 'react';
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

const UniversalModalMobileComponent = forwardRef<HTMLDivElement, UniversalModalMobileProps>(
    ({ children, className, transitionProps, dataTestId, header, preset, ...restProps }, ref) => {
        const responsiveContext = useContext(ResponsiveContext);
        const contextValue = useMemo<TResponsiveModalContext>(
            () => ({ view: 'mobile', dataTestId }),
            [dataTestId],
        );
        const [hiddenTitle, setHiddenTitle] = useState<boolean>(false);

        const handleContentScroll = (e: SyntheticEvent) => {
            const target = e.target as HTMLDivElement;

            setHiddenTitle(target.scrollTop > 5);
        };

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
                onContentScroll={handleContentScroll}
            >
                <ModalHeaderMobile preset={preset} header={header} hiddenTitle={hiddenTitle} />
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
