import { BaseModalProps } from '@alfalab/core-components-base-modal';

import { TMargin } from './typings';

export type BaseUniversalModalProps = {
    /**
     * Расположение по горизонтали и сторона с которой модал “выезжает” при открытии
     * @default center
     */
    horizontalAlign?: 'start' | 'center' | 'end';

    /**
     * Расположение модального окна по вертикали
     * @default center
     */
    verticalAlign?: 'top' | 'center' | 'bottom';

    /**
     * Ширина модального окна
     * fullWidth - ширина модального окна подстроится под viewport
     * minWidth - 500
     * @default 500
     */
    width?: number | 'fullWidth';

    /**
     * Высота модального окна
     * fullHeight - высота модального окна подстроится под viewport
     * minHeight - 264
     * @default fullHeight
     */
    height?: number | 'fullHeight';

    /**
     * Наличие оверлея
     * @default true
     */
    overlay?: boolean;

    /**
     * Устанавливает отступы модального окна
     * По умолчанию для бокового модала 0px, для центрального auto
     */
    margin?:
        | [TMargin, TMargin, TMargin, TMargin]
        | [TMargin, TMargin, TMargin]
        | [TMargin, TMargin]
        | [TMargin];

    /**
     * Хэндлер закрытия модалки
     */
    onClose?: () => void;
};

export type UniversalModalDesktopProps = BaseUniversalModalProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open' | 'className'>;

export type ModalBySideProps = UniversalModalDesktopProps;

export type ModalByCenterProps = UniversalModalDesktopProps;
