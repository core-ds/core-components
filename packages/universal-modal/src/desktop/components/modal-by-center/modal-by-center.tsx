import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { UniversalModalDesktopProps } from '../../types/props';

import styles from './modal-by-center.module.css';
import transitionsCenter from './transitions-center.module.css';

export const ModalByCenter = forwardRef<HTMLDivElement, UniversalModalDesktopProps>(
    (props, ref) => {
        const { transitionProps, dataTestId, className, open, children, ...restProps } = props;

        return (
            <BaseModal
                {...restProps}
                dataTestId={dataTestId}
                ref={ref}
                transitionProps={{
                    classNames: transitionsCenter,
                    ...transitionProps,
                }}
                className={cn(className, styles.component)}
                scrollHandler='content'
                open={open}
            >
                <div>{children}</div>
            </BaseModal>
        );
    },
);
