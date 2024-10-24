import { ReactNode } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { TModalHeaderPresetMobile } from './typings';

type BaseUniversalModalMobileProps = {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;

    /**
     * Слот для кастомного хэдера. Этот пропс не будет работать если вы используете пресеты для хэдера
     */
    header?: ReactNode;
};

export type UniversalModalMobileProps = BaseUniversalModalMobileProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open' | 'className' | 'transitionProps'> &
    TModalHeaderPresetMobile;
