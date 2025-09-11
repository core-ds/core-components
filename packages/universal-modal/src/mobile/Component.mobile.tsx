import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { ContentMobile } from '../components/content';
import { FooterMobile } from '../components/footer';
import { HeaderMobile } from '../components/header';

import { type UniversalModalMobileProps } from './types/props';

import styles from './mobile.module.css';
import rightSideTransitions from './transitions/right-side-transitions.mobile.module.css';
import transitions from './transitions/transitions.mobile.module.css';

export const UniversalModalMobileComponent = forwardRef<HTMLDivElement, UniversalModalMobileProps>(
    (props, ref) => {
        const { children, className, dataTestId, appearance = 'bottom', ...restProps } = props;

        return (
            <BaseModal
                {...restProps}
                dataTestId={dataTestId}
                ref={ref}
                transitionProps={{
                    timeout: appearance === 'right' ? 360 : 200,
                    classNames: appearance === 'right' ? rightSideTransitions : transitions,
                    ...restProps.transitionProps,
                }}
                className={cn(className, styles.component)}
                scrollHandler='content'
                contentClassName={styles.content}
            >
                {children}
            </BaseModal>
        );
    },
);

export const UniversalModalMobile = Object.assign(UniversalModalMobileComponent, {
    Header: HeaderMobile,
    Content: ContentMobile,
    Footer: FooterMobile,
});
