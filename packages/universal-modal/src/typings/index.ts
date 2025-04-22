import { UniversalModalDesktopProps } from '../desktop';
import { UniversalModalMobileProps } from '../mobile';

export type TResponsiveModalContext = {
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
