import { UniversalModalDesktopProps } from './desktop/types/props';
import { UniversalModalMobileProps } from './mobile/types/props';

export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    dataTestId?: string;
    modalWidth?: number;
    modalHeaderHighlighted?: boolean;
    modalFooterHighlighted?: boolean;
    setModalWidth?: (width: number) => void;
    setModalHeaderHighlighted?: (value: boolean) => void;
    setModalFooterHighlighted?: (value: boolean) => void;
} | null;

export type UniversalModalResponsiveProps = UniversalModalDesktopProps &
    UniversalModalMobileProps & {
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
