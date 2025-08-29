import { BaseModalProps } from '@alfalab/core-components-base-modal';

export interface BaseUniversalModalMobileProps {
    /** Сторона с которой будет появляться модальное окно */
    appearance?: 'bottom' | 'right';
}

export interface UniversalModalMobileProps
    extends BaseUniversalModalMobileProps,
        Pick<BaseModalProps, 'open'>,
        Partial<
            Pick<
                BaseModalProps,
                | 'children'
                | 'dataTestId'
                | 'className'
                | 'wrapperClassName'
                | 'onUnmount'
                | 'transitionProps'
                | 'onClose'
            >
        > {}
