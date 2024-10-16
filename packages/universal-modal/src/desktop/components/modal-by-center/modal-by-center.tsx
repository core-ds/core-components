import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { UniversalModalDesktopProps } from '../../types/props';
import { useModalHeight } from '../hooks/useModalHeight';
import { useModalMargin } from '../hooks/useModalMargin';
import { useModalWidth } from '../hooks/useModalWidth';

import styles from './modal-by-center.module.css';
import transitionsCenter from './transitions-center.module.css';

export const ModalByCenter = forwardRef<HTMLDivElement, UniversalModalDesktopProps>(
    (props, ref) => {
        const {
            transitionProps,
            dataTestId,
            className,
            open,
            children,
            width = 500,
            height = 'fullHeight',
            verticalAlign = 'center',
            overlay = true,
            margin = ['auto'],
            ...restProps
        } = props;

        const componentRef = useRef<HTMLDivElement>(null);

        useModalMargin(margin, open, componentRef);
        useModalWidth(width, open, componentRef);
        useModalHeight(height, open, componentRef);

        return (
            <BaseModal
                {...restProps}
                dataTestId={dataTestId}
                ref={ref}
                componentRef={componentRef}
                transitionProps={{
                    classNames: transitionsCenter,
                    ...transitionProps,
                }}
                className={cn(className, styles.component, styles[verticalAlign], {
                    [styles.overlayHidden]: !overlay,
                })}
                scrollHandler='content'
                open={open}
                backdropProps={{
                    transparent: !overlay,
                }}
                disableBlockingScroll={!overlay}
            >
                <div>{children}</div>
            </BaseModal>
        );
    },
);
