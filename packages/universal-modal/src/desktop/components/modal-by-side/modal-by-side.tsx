import React, { forwardRef, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Drawer } from '@alfalab/core-components-drawer';
import { isClient } from '@alfalab/core-components-shared';

import { BaseUniversalModalContent } from '../../../components/base-universal-modal-content/base-universal-modal-content';
import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalBySideProps } from '../../types/props';

import styles from './modal-by-side.module.css';

export const ModalBySide = forwardRef<HTMLDivElement, ModalBySideProps>((props, ref) => {
    const {
        horizontalAlign = 'center',
        verticalAlign = 'center',
        dataTestId,
        wrapperClassName,
        className,
        width = 500,
        height = 'fullHeight',
        contentTransitionProps,
        children,
        margin = [12],
        overlay = true,
        preset,
        header,
        footer,
        footerPreset,
        ...restProps
    } = props;

    const modalRef = useRef<HTMLElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);

    useModalMargin(margin, restProps.open, componentRef);
    const { currentWidth } = useModalWidth(width, restProps.open, componentRef);

    useModalHeight(height, restProps.open, componentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    // устанавливает боковое модальное окно вертикально по центру
    useEffect(() => {
        if (verticalAlign === 'center' && height !== 'fullHeight' && componentRef.current) {
            const { offsetHeight } = componentRef.current;
            let computedMarginTop = '0';

            if (isClient()) {
                computedMarginTop = window.getComputedStyle(componentRef.current).marginTop;
            }

            componentRef.current.style.top = `calc(50% - ${
                offsetHeight / 2
            }px - ${computedMarginTop})`;
        }
    }, [restProps.open, verticalAlign, componentRef, height]);

    if (horizontalAlign === 'right' || horizontalAlign === 'left') {
        return (
            <Drawer
                {...restProps}
                dataTestId={dataTestId}
                ref={mergeRefs([ref, modalRef])}
                componentRef={componentRef}
                placement={horizontalAlign}
                wrapperClassName={wrapperClassName}
                className={cn(
                    className,
                    styles.component,
                    styles[horizontalAlign],
                    styles[verticalAlign],
                    {
                        [styles.overlayHidden]: !overlay,
                    },
                )}
                backdropProps={{
                    transparent: !overlay,
                }}
                contentTransitionProps={{
                    ...contentTransitionProps,
                }}
                disableBlockingScroll={!overlay}
                contentClassName={styles.drawerContent}
                onWheel={handleWheel}
                transitionProps={{ timeout: 200 }}
            >
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
            </Drawer>
        );
    }

    return null;
});
