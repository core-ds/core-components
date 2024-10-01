import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { UniversalModalDesktopProps } from '../../types/props';
import { useHeight } from '../hooks/useHeight';
import { useWidth } from '../hooks/useWidth';

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
            ...restProps
        } = props;

        const componentRef = useRef<HTMLDivElement>(null);

        useWidth(width, open, componentRef);
        useHeight(height, open, componentRef);

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
                className={cn(className, styles.component, styles[verticalAlign])}
                scrollHandler='content'
                open={open}
            >
                <div>{children}</div>
            </BaseModal>
        );
    },
);
