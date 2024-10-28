import { BaseModalProps } from '@alfalab/core-components-base-modal';

import { TModalFooterPresetMobile, TModalHeaderPresetMobile } from './typings';

type BaseUniversalModalMobileProps = {
    /**
     * Хэндлер закрытия модалки
     */
    onClose?: () => void;
};

export type UniversalModalMobileProps = BaseUniversalModalMobileProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open' | 'className' | 'transitionProps'> &
    TModalHeaderPresetMobile &
    TModalFooterPresetMobile;
