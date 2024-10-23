import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { BaseUniversalModalContent } from '../../../components/base-universal-modal-content/base-universal-modal-content';
import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalByCenterProps } from '../../types/props';

import styles from './modal-by-center.module.css';
import transitionsCenter from './transitions-center.module.css';

export const ModalByCenter = forwardRef<HTMLDivElement, ModalByCenterProps>((props, ref) => {
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
        preset,
        header,
        footer,
        footerPreset,
        ...restProps
    } = props;

    const componentRef = useRef<HTMLDivElement>(null);

    useModalMargin(margin, open, componentRef);
    const { currentWidth } = useModalWidth(width, open, componentRef);

    useModalHeight(height, open, componentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

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
            onWheel={handleWheel}
        >
            <div className={styles.container}>
                <BaseUniversalModalContent
                    preset={preset}
                    header={header}
                    width={currentWidth}
                    footer={footer}
                    footerPreset={footerPreset}
                    wheelDeltaY={wheelDeltaY}
                >
                    {children}
                </BaseUniversalModalContent>
            </div>
        </BaseModal>
    );
});
