import { BaseModalProps } from '@balafla/core-components-base-modal';

export type BaseUniversalModalMobileProps = {
    /**
     * Хэндлер закрытия модалки
     */
    onClose?: () => void;

    /** Сторона с которой будет появляться модальное окно */
    appearance?: 'bottom' | 'right';
};

export type UniversalModalMobileProps = BaseUniversalModalMobileProps &
    Pick<
        BaseModalProps,
        | 'children'
        | 'dataTestId'
        | 'open'
        | 'className'
        | 'wrapperClassName'
        | 'onUnmount'
        | 'transitionProps'
    >;
