import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BaseModal, BaseModalProps } from '@alfalab/core-components-base-modal';

import { HeaderMobile } from './components/header/Component.mobile';
import { ContentMobile } from './components/content/Component.mobile';
import { FooterMobile } from './components/footer/Component.mobile';

import styles from './mobile.module.css';
import transitions from './transitions.mobile.module.css';

export type SidePanelMobileProps = BaseModalProps & {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};

const SidePanelMobileComponent = forwardRef<HTMLDivElement, SidePanelMobileProps>(
    ({ children, className, ...restProps }, ref) => {
        return (
            <BaseModal
                {...restProps}
                ref={ref}
                transitionProps={{
                    classNames: transitions,
                    ...restProps.transitionProps,
                }}
                className={cn(className, styles.component)}
            >
                {children}
            </BaseModal>
        );
    },
);

export const SidePanelMobile = Object.assign(SidePanelMobileComponent, {
    Content: ContentMobile,
    Header: HeaderMobile,
    Footer: FooterMobile,
});
