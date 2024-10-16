import { BaseModalProps } from '@alfalab/core-components-base-modal';

import { BaseUniversalModalProps } from './desktop/types/props';

export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    dataTestId?: string;
} | null;

export type UniversalModalResponsiveProps = BaseUniversalModalProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open'> & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;

        /**
         * Значение по-умолчанию для хука useMatchMedia
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
    };
