import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { isMacOS, isSafari } from '@alfalab/core-components-shared';

import { useScrollableContainerRef } from '../../hooks/use-scrollable-container-ref';
import { type UniversalModalDesktopProps } from '../../types/props';
import { getFullSizeModalTransitions } from '../../utils/get-full-size-modal-transitions';
import { getHeightStyle } from '../../utils/get-height-style';
import { getMarginStyles } from '../../utils/get-margin-styles';
import { getWidthStyle } from '../../utils/get-width-style';
import { ModalContent } from '../modal-content/modal-content';

import styles from './index.module.css';
import safariTransitions from './transitions/safari-transitions.module.css';
import transitions from './transitions/transitions.module.css';

// в safari некорректно отрабатывает transform:scale (???), поэтому применяем немного другую анимацию
const transitionProps = isMacOS() && isSafari() ? safariTransitions : transitions;

export const CenterModal = forwardRef<HTMLDivElement, UniversalModalDesktopProps>((props, ref) => {
    const {
        dataTestId,
        className,
        open,
        children,
        width = 500,
        height = 'hugContent',
        verticalAlign = 'center',
        overlay = true,
        margin,
        scrollableContainerRef: scrollableContainerRefProp,
        onClose,
        scrollLock = false,
        ...restProps
    } = props;

    const componentRef = useRef<HTMLDivElement>(null);
    const { handleWheel, scrollableContainerRef } = useScrollableContainerRef({
        overlay,
        refObject: scrollableContainerRefProp,
    });

    const {
        isFullSizeModal,
        componentTransitions: fullSizeModalContentTransitions,
        backdropTransitions: fullSizeModalBackdropTransitions,
    } = getFullSizeModalTransitions({ verticalAlign, width, height });

    const withoutOverlay = !overlay;

    return (
        <BaseModal
            {...restProps}
            open={open}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            scrollHandler='content'
            scrollLock={scrollLock}
            wrapperClassName={cn(styles.baseModalContainer, {
                [styles.wrapperJustifyStart]: verticalAlign === 'top',
                [styles.wrapperJustifyCenter]: verticalAlign === 'center',
                [styles.wrapperJustifyEnd]: verticalAlign === 'bottom',
                [styles.withoutOverlay]: withoutOverlay,
            })}
            className={cn(styles.component, className, styles.baseModalComponent, {
                ...getMarginStyles({ styles, margin }),
            })}
            transitionProps={{
                classNames: transitionProps,
                ...(isFullSizeModal && fullSizeModalContentTransitions),
                ...restProps.transitionProps,
            }}
            backdropProps={{
                shouldRender: overlay,
                ...(isFullSizeModal && fullSizeModalBackdropTransitions),
                ...restProps.backdropProps,
            }}
            componentDivProps={{
                style: {
                    width: getWidthStyle(width, margin),
                    ...getHeightStyle(height, margin),
                },
            }}
            onWheel={handleWheel}
            onClose={onClose}
        >
            <ModalContent height={height} scrollableContainerRef={scrollableContainerRef}>
                {children}
            </ModalContent>
        </BaseModal>
    );
});
