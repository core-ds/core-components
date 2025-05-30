import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { browser, os } from '@alfalab/core-components-shared';

import { useModalWheel } from '../../hooks/useModalWheel';
import { UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getHeightStyle } from '../../utils/get-height-style';
import { getMarginStyles } from '../../utils/get-margin-styles';
import { getMaxHeightStyle } from '../../utils/get-max-height-style';
import { getWidthStyle } from '../../utils/get-width-style';
import { ModalContent } from '../modal-content/modal-content';

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
        scrollableContainerRef,
        onClose,
        ...restProps
    } = props;

    const componentRef = useRef<HTMLDivElement>(null);

    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const {
        isFullSizeModal,
        componentTransitions: fullSizeModalContentTransitions,
        backdropTransitions: fullSizeModalBackdropTransitions,
    } = getFullSizeModalTransitions({ verticalAlign, width, height });

    return (
        <BaseModal
            {...restProps}
            open={open}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            scrollHandler='content'
            disableBlockingScroll={!overlay}
            wrapperClassName={cn({
                [styles.wrapperJustifyStart]: verticalAlign === 'top',
                [styles.wrapperJustifyCenter]: verticalAlign === 'center',
                [styles.wrapperJustifyEnd]: verticalAlign === 'bottom',
            })}
            className={cn(styles.component, className, {
                [styles.overlayHidden]: !overlay,
                ...getMarginStyles({ styles, margin }),
            })}
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
            componentDivProps={{
                style: {
                    width: getWidthStyle(width, margin),
                    height: getHeightStyle(height, margin),
                    ...(height === 'hugContent' && {
                        maxHeight: getMaxHeightStyle(margin),
                    }),
                },
            }}
            onWheel={handleWheel}
            onClose={onClose}
        >
            <ModalContent
                height={height}
                wheelDeltaY={wheelDeltaY}
                scrollableContainerRef={scrollableContainerRef}
            >
                {children}
            </ModalContent>
        </BaseModal>
    );
});
