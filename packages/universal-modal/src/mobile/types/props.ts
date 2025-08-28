import { BaseModalProps } from '@alfalab/core-components-base-modal';

export type BaseUniversalModalMobileProps = {
    /** Сторона с которой будет появляться модальное окно */
    appearance?: 'bottom' | 'right';
};

export type UniversalModalMobileProps = BaseUniversalModalMobileProps &
    Pick<BaseModalProps, 'open'> &
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
    >;
