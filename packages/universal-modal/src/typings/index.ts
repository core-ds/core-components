import { type UniversalModalDesktopProps } from '../desktop';
import { type UniversalModalMobileProps } from '../mobile';

export interface UniversalModalContextType {
    modalWidth: UniversalModalDesktopProps['width'];
}

export interface UniversalModalResponsiveProps
    extends UniversalModalDesktopProps,
        UniversalModalMobileProps {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
}
