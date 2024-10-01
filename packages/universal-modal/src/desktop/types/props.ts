import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { DrawerProps } from '@alfalab/core-components-drawer';

export type BaseUniversalModalProps = {
    /**
     * Ширина модального окна
     * @default "s"
     */
    size?: 's' | 500; // todo remove

    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;

    /**
     * Расположение по горизонтали и сторона с которой модал “выезжает” при открытии.
     * @default right
     */
    horizontalAlign?: 'left' | 'right' | 'center';

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
    height: number | 'fullHeight';
};

export type UniversalModalDesktopProps = BaseModalProps &
    BaseUniversalModalProps &
    Pick<DrawerProps, 'nativeScrollbar' | 'contentTransitionProps'>;
