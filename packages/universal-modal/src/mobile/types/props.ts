import { ReactNode } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';

import { TModalHeaderPresetMobile } from './typings';

type BaseUniversalModalMobileProps = {
    /**
     * Слот для кастомного хэдера. Этот пропс не будет работать если вы используете пресеты для хэдера
     */
    header?: ReactNode;

    /**
     * Хэндлер закрытия модалки
     */
    onClose?: () => void;
};

export type UniversalModalMobileProps = BaseUniversalModalMobileProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open' | 'className' | 'transitionProps'> &
    TModalHeaderPresetMobile;
