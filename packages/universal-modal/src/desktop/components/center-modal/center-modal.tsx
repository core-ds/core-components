import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { browser, os } from '@alfalab/core-components-shared';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getMarginStyles } from '../../utils/get-margin-styles';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

import styles from './index.module.css';
import safariTransitions from './transitions/safari-transitions.module.css';
import transitions from './transitions/transitions.module.css';

// в safari некорректно отрабатывает transform:scale (???), поэтому применяем немного другую анимацию
const transitionProps = os.isMacOS() && browser.isSafari() ? safariTransitions : transitions;

export const CenterModal = forwardRef<HTMLDivElement, UniversalModalDesktopProps>((props, ref) => {
    const {
        dataTestId,
        className,
        open,
        children,
        width = 500,
        height = 'fullHeight',
        verticalAlign = 'center',
        overlay = true,
        margin,
        onClose,
        ...restProps
    } = props;

    const componentRef = useRef<HTMLDivElement>(null);

    useModalWidth({ width, open, componentRef, margin });
    useModalHeight({ height, open, componentRef, margin });
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const {
        isFullSizeModal,
        componentTransitions: fullSizeModalContentTransitions,
        backdropTransitions: fullSizeModalBackdropTransitions,
    } = getFullSizeModalTransitions({ verticalAlign, width, height });

    return (
        <BaseModal
            {...restProps}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            transitionProps={{
                classNames: transitionProps,
                ...(isFullSizeModal && fullSizeModalContentTransitions),
                ...restProps.transitionProps,
            }}
            backdropProps={{
                transparent: !overlay,
                ...(isFullSizeModal && fullSizeModalBackdropTransitions),
                ...restProps.backdropProps,
            }}
            className={cn(styles.component, className, {
                [styles.overlayHidden]: !overlay,
                [styles.verticalTop]: verticalAlign === 'top',
                [styles.verticalBottom]: verticalAlign === 'bottom',
                ...getMarginStyles({ styles, margin }),
            })}
            scrollHandler='content'
            open={open}
            disableBlockingScroll={!overlay}
            onWheel={handleWheel}
            onClose={onClose}
        >
            <div className={styles.container}>
                <BaseUniversalModalContent wheelDeltaY={wheelDeltaY}>
                    {children}
                </BaseUniversalModalContent>
            </div>
        </BaseModal>
    );
});
