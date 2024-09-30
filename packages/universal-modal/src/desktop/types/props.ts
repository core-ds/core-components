import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { DrawerProps } from '@alfalab/core-components-drawer';

export type UniversalModalDesktopProps = BaseModalProps &
    Pick<DrawerProps, 'nativeScrollbar' | 'contentTransitionProps'> & {
        /**
         * Ширина модального окна
         * @default "s"
         */
        size?: 's' | 500;

        /**
         * Управление наличием закрывающего крестика
         * @default false
         */
        hasCloser?: boolean;

        /**
         * Расположение по горизонтали и сторона с которой модал “выезжает” при открытии.
         * @default right
         */
        horizontalAlign: 'left' | 'right' | 'center';
    };
