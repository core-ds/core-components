import React, { FC, MutableRefObject } from 'react';

import { IconButton, IconButtonProps } from '@alfalab/core-components-icon-button';
import { TooltipDesktop } from '@alfalab/core-components-tooltip/desktop';
import { ArrowsInwardMIcon } from '@alfalab/icons-glyph/ArrowsInwardMIcon';
import { ArrowsOutwardMIcon } from '@alfalab/icons-glyph/ArrowsOutwardMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { PointerDownMIcon } from '@alfalab/icons-glyph/PointerDownMIcon';
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
            colors='inverted'
            aria-label='Открыть в полноэкранном режиме'
            className={styles.iconButton}
        />
    </TooltipDesktop>
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
            colors='inverted'
            aria-label='Выйти из полноэкранного режима'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const MuteVideo: FC<Props> = ({ buttonRef, ...restProps }) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Выключить звук'
        fallbackPlacements={['bottom-end']}
    >
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={SoundMIcon}
            colors='inverted'
            aria-label='Выключить звук'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const UnmuteVideo: FC<Props> = ({ buttonRef, ...restProps }) => (
    <TooltipDesktop
        trigger='hover'
        position='bottom'
        content='Включить звук'
        fallbackPlacements={['bottom-end']}
    >
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={SoundCrossMIcon}
            colors='inverted'
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
            colors='inverted'
            aria-label='Скачать'
            className={styles.iconButton}
        />
    </TooltipDesktop>
);

export const Exit: FC<Props> = (props) => (
    <IconButton
        {...props}
        icon={CrossMIcon}
        colors='inverted'
        aria-label='Закрыть'
        className={styles.iconButton}
    />
);
