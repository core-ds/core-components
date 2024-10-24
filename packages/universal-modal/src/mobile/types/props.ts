import { ReactNode } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';

import { TModalFooterPresetMobile, TModalHeaderPresetMobile } from './typings';

type BaseUniversalModalMobileProps = {
    /**
     * Слот для кастомного хэдера. Этот пропс не будет работать если вы используете пресеты для хэдера
     */
    header?: ReactNode;

    /**
     * Слот для кастомного футера. Этот пропс не будет работать если вы используете пресеты для футера
     */
    footer?: ReactNode;

    /**
     * Хэндлер закрытия модалки
     */
    onClose?: () => void;
};

export type UniversalModalMobileProps = BaseUniversalModalMobileProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open' | 'className' | 'transitionProps'> &
    TModalHeaderPresetMobile &
    TModalFooterPresetMobile;
