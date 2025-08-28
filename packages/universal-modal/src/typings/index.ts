import { UniversalModalDesktopProps } from '../desktop';
import { UniversalModalMobileProps } from '../mobile';

export type UniversalModalContextType = {
    modalWidth: UniversalModalDesktopProps['width'];
    modalHeaderHighlighted?: boolean;
    modalFooterHighlighted?: boolean;
    hasHeader: boolean;
    hasFooter: boolean;
    setModalHeaderHighlighted?: (value: boolean) => void;
    setModalFooterHighlighted?: (value: boolean) => void;
};

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
