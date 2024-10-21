import { ReactNode } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { DrawerProps } from '@alfalab/core-components-drawer';

import { TMargin, TModalFooterPreset, TModalHeaderPreset } from './typings';

export type BaseUniversalModalProps = {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;

    /**
     * Расположение по горизонтали и сторона с которой модал “выезжает” при открытии
     * @default center
     */
    horizontalAlign?: 'left' | 'center' | 'right';

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
     * По умолчанию для бокового модала 12px, для центрального auto
     */
    margin?:
        | [TMargin, TMargin, TMargin, TMargin]
        | [TMargin, TMargin, TMargin]
        | [TMargin, TMargin]
        | [TMargin];

    /**
     * Слот для кастомного хэдера. Этот пропс не будет работать если вы используете пресеты для хэдера
     */
    header?: ReactNode;

    /**
     * Слот для кастомного футера. Этот пропс не будет работать если вы используете пресеты для футера
     */
    footer?: ReactNode;
};

export type UniversalModalDesktopProps = BaseUniversalModalProps &
    Pick<BaseModalProps, 'children' | 'dataTestId' | 'open'>;

export type ModalBySideProps = UniversalModalDesktopProps &
    Pick<DrawerProps, 'contentTransitionProps'> &
    Pick<BaseModalProps, 'wrapperClassName' | 'className'> &
    TModalHeaderPreset &
    TModalFooterPreset;

export type ModalByCenterProps = UniversalModalDesktopProps &
    Pick<BaseModalProps, 'transitionProps' | 'className'> &
    TModalHeaderPreset &
    TModalFooterPreset;
