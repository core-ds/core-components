import React, { FC, MutableRefObject } from 'react';
import cn from 'classnames';

import { IconButton, IconButtonProps } from '@alfalab/core-components-icon-button';
import { TooltipDesktop } from '@alfalab/core-components-tooltip/desktop';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';
import { ArrowsInwardMIcon } from '@alfalab/icons-glyph/ArrowsInwardMIcon';
import { ArrowsOutwardMIcon } from '@alfalab/icons-glyph/ArrowsOutwardMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { PauseCompactMIcon } from '@alfalab/icons-glyph/PauseCompactMIcon';
import { PlayCompactMIcon } from '@alfalab/icons-glyph/PlayCompactMIcon';
import { PointerDownMIcon } from '@alfalab/icons-glyph/PointerDownMIcon';
import { ShareMIcon } from '@alfalab/icons-glyph/ShareMIcon';
import { SoundCrossMIcon } from '@alfalab/icons-glyph/SoundCrossMIcon';
import { SoundMIcon } from '@alfalab/icons-glyph/SoundMIcon';

import styles from './index.module.css';

type Props = Omit<IconButtonProps, 'icon' | 'colors'> & {
    buttonRef?: MutableRefObject<HTMLButtonElement | null>;
    download?: string | boolean;
};

export const Fullscreen: FC<Props> = ({ buttonRef, ...restProps }) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Открыть в полноэкранном режиме'
        fallbackPlacements={['bottom-end']}
    >
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={ArrowsOutwardMIcon}
            aria-label='Открыть в полноэкранном режиме'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const BackArrow: FC<Props> = ({ buttonRef, ...restProps }) => (
    <IconButton
        {...restProps}
        ref={buttonRef}
        icon={ArrowLeftMIcon}
        aria-label='Вернуться назад'
        className={styles.iconButton}
    />
);

export const Play: FC<Props> = ({ buttonRef, className, ...restProps }) => (
    <IconButton
        {...restProps}
        ref={buttonRef}
        icon={PlayCompactMIcon}
        aria-label='Проиграть видео'
        className={cn(styles.iconButton, className)}
    />
);

export const Pause: FC<Props> = ({ buttonRef, className, ...restProps }) => (
    <IconButton
        {...restProps}
        ref={buttonRef}
        icon={PauseCompactMIcon}
        aria-label='Поставить паузу на видео'
        className={cn(styles.iconButton, className)}
    />
);

export const ExitFullscreen: FC<Props> = ({ buttonRef, ...restProps }) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Выйти из полноэкранного режима'
        fallbackPlacements={['bottom-end']}
    >
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={ArrowsInwardMIcon}
            aria-label='Выйти из полноэкранного режима'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const MuteVideo: FC<Props> = ({ buttonRef, className, ...restProps }) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Выключить звук'
        fallbackPlacements={['bottom-end']}
        targetClassName={className}
    >
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={SoundMIcon}
            aria-label='Выключить звук'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const UnmuteVideo: FC<Props> = ({ buttonRef, className, ...restProps }) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Включить звук'
        fallbackPlacements={['bottom-end']}
        targetClassName={className}
    >
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={SoundCrossMIcon}
            aria-label='Включить звук'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const Download: FC<Props> = (props) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Скачать'
        fallbackPlacements={['bottom-end']}
    >
        <IconButton
            {...props}
            icon={PointerDownMIcon}
            aria-label='Скачать'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const Share: FC<Props> = (props) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Поделиться'
        fallbackPlacements={['bottom-end']}
    >
        <IconButton
            {...props}
            icon={ShareMIcon}
            aria-label='Скачать'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const Exit: FC<Props> = (props) => (
    <IconButton {...props} icon={CrossMIcon} aria-label='Закрыть' className={styles.iconButton} />
);
