import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { browser, os } from '@alfalab/core-components-shared';

import { useModalHeight } from '../../hooks/useModalHeight';
import { useModalMargin } from '../../hooks/useModalMargin';
import { useModalWheel } from '../../hooks/useModalWheel';
import { useModalWidth } from '../../hooks/useModalWidth';
import { ModalByCenterProps } from '../../types/props';
import { BaseUniversalModalContent } from '../base-universal-modal-content/base-universal-modal-content';

import fullSizeBackdropTransitions from '../../styles/full-size-backdrop-transitions.module.css';
import fullSizeVerticalTopTransitions from '../../styles/full-size-vertical-top-transitions.module.css';
import styles from './styles/center-modal.module.css';
import safariTransitions from './styles/transitions/safari-transitions.module.css';
import transitions from './styles/transitions/transitions.module.css';

// в safari некорректно отрабатывает transform:scale (???), поэтому применяем немного другую анимацию
const transitionProps = os.isMacOS() && browser.isSafari() ? safariTransitions : transitions;

export const CenterModal = forwardRef<HTMLDivElement, ModalByCenterProps>((props, ref) => {
    const {
        dataTestId,
        className,
        open,
        children,
        width = 500,
        height = 'fullHeight',
        verticalAlign = 'center',
        overlay = true,
        margin = ['auto'],
        onClose,
        ...restProps
    } = props;

    const componentRef = useRef<HTMLDivElement>(null);

    useModalMargin({
        margin,
        open,
        componentRef,
        verticalAlign,
        horizontalAlign: restProps.horizontalAlign,
    });
    useModalWidth(width, open, componentRef);

    useModalHeight(height, open, componentRef);
    const { wheelDeltaY, handleWheel } = useModalWheel(overlay);

    const isFullSizeModal = width === 'fullWidth' && height === 'fullHeight';

    return (
        <BaseModal
            {...restProps}
            dataTestId={dataTestId}
            ref={ref}
            componentRef={componentRef}
            transitionProps={{
                classNames: transitionProps,
                ...(isFullSizeModal &&
                    verticalAlign === 'top' && {
                        timeout: {
                            enter: 200,
                            exit: 400,
                        },
                        classNames: fullSizeVerticalTopTransitions,
                    }),
                ...restProps.transitionProps,
            }}
            backdropProps={{
                transparent: !overlay,
                ...(isFullSizeModal && {
                    timeout: {
                        enter: 0,
                        exit: 400,
                    },
                    transitionClassNames: fullSizeBackdropTransitions,
                }),
            }}
            className={cn(styles.component, className, {
                [styles.overlayHidden]: !overlay,
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
